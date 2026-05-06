#!/usr/bin/env bun
/**
 * Verify every URL and image in a sweep-draft.json.
 *
 * Usage:  bun scripts/verify-draft.ts [draft-path]
 *
 * Default draft path: sweep-draft.json (repo root).
 *
 * Draft schema (loose):
 *   {
 *     newItems: ReleaseItem[],
 *     updates?:  { id, patch }[],
 *     summary?: string,
 *     coverage?: Category[],
 *     videoSearch?: { channelsChecked, qualifying, reason }
 *   }
 *
 * For every newItems[i].url, every links[].url, and every image.url:
 *   - HTTP GET (Range 0-1023) with a 15s timeout
 *   - Expect 2xx after redirects
 *   - For image.url, also expect content-type starting with "image/"
 *
 * Concurrency: 8. Per-host concurrency cap: 2 (avoids rate-limiting on
 * a single domain like github.com or huggingface.co).
 *
 * Exits 1 with a structured JSON error report if anything fails.
 */
import { readFileSync, existsSync } from "node:fs";

const draftPath = process.argv[2] ?? "sweep-draft.json";
if (!existsSync(draftPath)) {
  console.error(`draft not found: ${draftPath}`);
  process.exit(1);
}

interface DraftItem {
  id: string;
  url: string;
  links?: { label: string; url: string }[];
  image?: { url: string };
}
interface Draft {
  newItems?: DraftItem[];
  updates?: { id: string; patch: Partial<DraftItem> }[];
}

const draft = JSON.parse(readFileSync(draftPath, "utf8")) as Draft;
const items = draft.newItems ?? [];

interface Probe {
  itemId: string;
  field: string;
  url: string;
  expectImage: boolean;
}
const probes: Probe[] = [];
for (const it of items) {
  if (it.url) probes.push({ itemId: it.id, field: "url", url: it.url, expectImage: false });
  for (const [i, l] of (it.links ?? []).entries()) {
    if (l.url)
      probes.push({
        itemId: it.id,
        field: `links[${i}](${l.label})`,
        url: l.url,
        expectImage: false,
      });
  }
  if (it.image?.url)
    probes.push({
      itemId: it.id,
      field: "image.url",
      url: it.image.url,
      expectImage: true,
    });
}

interface ProbeResult {
  itemId: string;
  field: string;
  url: string;
  ok: boolean;
  status?: number;
  contentType?: string;
  error?: string;
}

async function check(p: Probe): Promise<ProbeResult> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15_000);
  try {
    // Bun fetch auto-decompresses gzip, but a partial body from `Range`
    // ends in a truncated gzip stream → ZlibError on github.com / pypi
    // / etc. Two-pronged fix: ask for identity encoding, AND only send
    // Range for images (where servers reliably honor it). For HTML we
    // accept the small wasted bytes — pages are usually <100KB.
    const headers: Record<string, string> = {
      "User-Agent": "dxb-estate-intel-sweep-bot",
      "Accept-Encoding": "identity",
      Accept: p.expectImage ? "image/*" : "text/html,*/*",
    };
    if (p.expectImage) headers.Range = "bytes=0-1023";
    const res = await fetch(p.url, {
      method: "GET",
      headers,
      redirect: "follow",
      signal: ctrl.signal,
    });
    const ct = res.headers.get("content-type") ?? "";
    await res.body?.cancel().catch(() => {});
    if (!res.ok && res.status !== 206) {
      return { ...p, ok: false, status: res.status, contentType: ct };
    }
    if (p.expectImage && !ct.toLowerCase().startsWith("image/")) {
      return {
        ...p,
        ok: false,
        status: res.status,
        contentType: ct,
        error: "expected image/* content-type",
      };
    }
    return { ...p, ok: true, status: res.status, contentType: ct };
  } catch (err) {
    return { ...p, ok: false, error: (err as Error).message };
  } finally {
    clearTimeout(timer);
  }
}

// Per-host concurrency: 2. Global concurrency: 8.
const PER_HOST = 2;
const hostQueues = new Map<string, number>();
let active = 0;
const GLOBAL = 8;

async function runProbes(): Promise<ProbeResult[]> {
  const out: ProbeResult[] = [];
  let idx = 0;
  return new Promise((resolve) => {
    const launch = () => {
      while (active < GLOBAL && idx < probes.length) {
        const p = probes[idx];
        let host = "unknown";
        try {
          host = new URL(p.url).host;
        } catch {
          /* */
        }
        const inHost = hostQueues.get(host) ?? 0;
        if (inHost >= PER_HOST) {
          // skip this one for now, find the next probe whose host has slack
          let scanned = 0;
          let found = -1;
          for (let j = idx + 1; j < probes.length; j++) {
            scanned++;
            if (scanned > 50) break;
            try {
              const h = new URL(probes[j].url).host;
              if ((hostQueues.get(h) ?? 0) < PER_HOST) {
                found = j;
                break;
              }
            } catch {
              /* */
            }
          }
          if (found < 0) break;
          // swap
          [probes[idx], probes[found]] = [probes[found], probes[idx]];
          continue;
        }
        idx++;
        active++;
        hostQueues.set(host, inHost + 1);
        check(p).then((r) => {
          out.push(r);
          active--;
          hostQueues.set(host, (hostQueues.get(host) ?? 1) - 1);
          if (idx >= probes.length && active === 0) resolve(out);
          else launch();
        });
      }
      if (probes.length === 0) resolve(out);
    };
    launch();
  });
}

console.error(
  `verifying ${probes.length} URLs across ${items.length} items...`,
);
const t0 = Date.now();
const results = await runProbes();
const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

const failures = results.filter((r) => !r.ok);
const summary = {
  draft: draftPath,
  itemsChecked: items.length,
  probesTotal: probes.length,
  probesOk: results.length - failures.length,
  probesFailed: failures.length,
  elapsedSeconds: Number(elapsed),
};

if (failures.length > 0) {
  console.error("verify-draft FAILED:");
  console.error(JSON.stringify({ summary, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ summary, ok: true }, null, 2));
