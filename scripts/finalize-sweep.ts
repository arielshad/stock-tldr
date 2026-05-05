#!/usr/bin/env bun
/**
 * Merge a sweep-draft.json into releases.json + sweeps.json.
 *
 * Usage:  bun scripts/finalize-sweep.ts [draft-path] [--source <label>]
 *
 * Default draft: sweep-draft.json (repo root).
 * Default source label: "github-actions-sweep".
 *
 * What it does:
 *   1. Loads draft, current releases.json, current sweeps.json.
 *   2. Validates: every newItems[].id is NOT already in the feed.
 *      (duplicate id → hard fail with a pointer to SWEEP_MEMORY.md.)
 *   3. Applies updates[] in place (legitimate "fix existing entry" path).
 *   4. Sorts items by date DESC.
 *   6. Writes new releases.json.
 *   7. Builds a SweepReport from the diff vs the prior file:
 *      counts, added[], updated[], removed[], summary, coverage.
 *   8. Appends to sweeps.json.
 *   9. Runs check-feed validation inline.
 *  10. Soft-fails (warns) on: >2 paper-primary, 0 video + cadence
 *      breach, coverage <15.
 *
 * Exits non-zero ONLY on hard validation failures. Soft warnings go to
 * stderr but the process completes successfully so the cron commit
 * still ships — the next sweep's sweep-context.ts will see the gap.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import type {
  ReleaseFeed,
  ReleaseItem,
  SweepLog,
  SweepReport,
  Category,
} from "../src/data/schema.ts";

const args = process.argv.slice(2);
const sourceIdx = args.indexOf("--source");
const sourceLabel =
  sourceIdx >= 0 ? args[sourceIdx + 1] : "github-actions-sweep";
const consumed = new Set<number>();
if (sourceIdx >= 0) {
  consumed.add(sourceIdx);
  consumed.add(sourceIdx + 1);
}
const draftPath =
  args.find(
    (a, i) => !a.startsWith("--") && !consumed.has(i),
  ) ?? "sweep-draft.json";

if (!existsSync(draftPath)) {
  console.error(`draft not found: ${draftPath}`);
  process.exit(1);
}

interface DraftUpdate {
  id: string;
  patch: Partial<ReleaseItem>;
  note?: string;
}
interface DraftRemoval {
  id: string;
  reason: string;
}
interface Draft {
  newItems?: ReleaseItem[];
  updates?: DraftUpdate[];
  removals?: DraftRemoval[];
  summary?: string;
  coverage?: Category[];
  notes?: Record<string, string>; // id → why-included note
  videoSearch?: { channelsChecked: string[]; qualifying: boolean; reason?: string };
}

const draft = JSON.parse(readFileSync(draftPath, "utf8")) as Draft;
const newItems = draft.newItems ?? [];
const updates = draft.updates ?? [];
const removals = draft.removals ?? [];

const releasesPath = "src/data/releases.json";
const sweepsPath = "src/data/sweeps.json";

const feed = JSON.parse(readFileSync(releasesPath, "utf8")) as ReleaseFeed;
const log = JSON.parse(readFileSync(sweepsPath, "utf8")) as SweepLog;

// 1) Hard rule: no duplicate ids OR normalized-id collisions OR
// canonical-URL collisions. The latter two catch the case where the
// agent emits a slightly-different slug for an existing release.
const normId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
function canonUrl(u: string): string {
  try {
    const url = new URL(u);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const path = url.pathname.replace(/\/+$/, "");
    const query = url.search;
    return `${url.protocol}//${host}${path}${query}`.toLowerCase();
  } catch {
    return u.toLowerCase();
  }
}
const existing = new Map(feed.items.map((i) => [i.id, i]));
const existingNormIds = new Map(feed.items.map((i) => [normId(i.id), i.id]));
const existingUrls = new Map(feed.items.map((i) => [canonUrl(i.url), i.id]));
const collisions: string[] = [];
for (const c of newItems) {
  if (existing.has(c.id)) collisions.push(`${c.id}: exact id match`);
  const nm = normId(c.id);
  const nmHit = existingNormIds.get(nm);
  if (nmHit && nmHit !== c.id)
    collisions.push(`${c.id}: normalizes to same slug as existing "${nmHit}"`);
  const cu = canonUrl(c.url);
  const urlHit = existingUrls.get(cu);
  if (urlHit && urlHit !== c.id)
    collisions.push(`${c.id}: same canonical URL as existing "${urlHit}"`);
}
if (collisions.length > 0) {
  console.error("finalize-sweep: collision(s) in newItems:");
  for (const c of collisions) console.error(`  - ${c}`);
  console.error(
    "\nSWEEP_MEMORY.md entry 2026-04-28-A: never re-add an existing release.",
  );
  console.error(
    "If the existing entry needs a fix, use `updates[]` with the existing id.",
  );
  process.exit(1);
}

// 2) Schema-ish minimum: every new item has id, url, image.url, ≥2 links
const minSchemaErrors: string[] = [];
const sweepNow = Date.now();
const MAX_DATE_AGE_HOURS = 72;
for (const item of newItems) {
  if (!item.id) minSchemaErrors.push("(missing id)");
  if (!item.url) minSchemaErrors.push(`${item.id}: missing url`);
  if (!item.image?.url) minSchemaErrors.push(`${item.id}: missing image.url`);
  if ((item.links ?? []).length < 2)
    minSchemaErrors.push(`${item.id}: needs ≥2 links`);
  if (!item.explainer) minSchemaErrors.push(`${item.id}: missing explainer`);
  if (!item.categories?.length)
    minSchemaErrors.push(`${item.id}: missing categories`);
  // 72h date cap (Hard Rule 2 in prompts/update-releases.md). The
  // Mythos bug shipped a 17-day-old release. Don't repeat it.
  if (item.date) {
    const dt = new Date(item.date + "T00:00:00Z").getTime();
    const ageH = (sweepNow - dt) / (1000 * 60 * 60);
    if (ageH > MAX_DATE_AGE_HOURS) {
      minSchemaErrors.push(
        `${item.id}: date ${item.date} is ${Math.floor(ageH)}h old ` +
          `(max ${MAX_DATE_AGE_HOURS}h). Old releases stay un-added.`,
      );
    }
  }
}
if (minSchemaErrors.length > 0) {
  console.error("finalize-sweep: schema errors in draft:");
  for (const e of minSchemaErrors) console.error(`  - ${e}`);
  process.exit(1);
}

// 3) Stamp generatedAt + publishDate on every new item
const generatedAt = new Date().toISOString();
for (const item of newItems) {
  item.publishDate = generatedAt;
}

// 4) Apply updates in place
const updatedReports: { id: string; title: string; note: string }[] = [];
for (const u of updates) {
  const target = existing.get(u.id);
  if (!target) {
    console.error(`finalize-sweep: update target id not found: ${u.id}`);
    process.exit(1);
  }
  Object.assign(target, u.patch);
  updatedReports.push({
    id: u.id,
    title: target.title,
    note: u.note ?? "updated",
  });
}

// 5) Apply removals
const removedReports: { id: string; title: string; reason: string }[] = [];
const removalIds = new Set(removals.map((r) => r.id));
const beforeRemoval = feed.items.length;
if (removalIds.size > 0) {
  for (const r of removals) {
    const target = existing.get(r.id);
    if (target)
      removedReports.push({ id: r.id, title: target.title, reason: r.reason });
  }
  feed.items = feed.items.filter((i) => !removalIds.has(i.id));
}
if (feed.items.length !== beforeRemoval - removalIds.size) {
  console.error("finalize-sweep: removal count mismatch");
  process.exit(1);
}

// 6) Merge new items + sort
feed.items = [...feed.items, ...newItems];
feed.items.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
feed.generatedAt = generatedAt;
feed.source = sourceLabel;

// 7) Write releases.json
writeFileSync(releasesPath, JSON.stringify(feed, null, 2) + "\n");

// 8) Build sweep report
const sweepId = `sweep-${generatedAt
  .toLowerCase()
  .replace(/[-:]/g, "")
  .replace(/\.\d+z$/, "z")
  .replace(/z$/, "z")}`;
const report: SweepReport = {
  id: sweepId,
  timestamp: generatedAt,
  source: sourceLabel,
  summary: draft.summary ?? `Sweep added ${newItems.length} item(s).`,
  counts: {
    added: newItems.length,
    updated: updatedReports.length,
    removed: removedReports.length,
  },
  added: newItems.map((i) => ({
    id: i.id,
    title: i.title,
    category: i.categories[0],
    note: draft.notes?.[i.id] ?? `Added under ${i.categories[0]}.`,
  })),
  updated: updatedReports,
  removed: removedReports,
  coverage: draft.coverage,
};

log.sweeps.push(report);
writeFileSync(sweepsPath, JSON.stringify(log, null, 2) + "\n");

// 9) Run check-feed inline
const checkSeen = new Map<string, number>();
for (const i of feed.items) checkSeen.set(i.id, (checkSeen.get(i.id) ?? 0) + 1);
const checkDupes = [...checkSeen.entries()].filter(([, c]) => c > 1);
if (checkDupes.length > 0) {
  console.error("post-merge dupe ids detected (should not happen):");
  for (const [id, c] of checkDupes) console.error(`  ${id} × ${c}`);
  process.exit(1);
}

// 10) Soft warnings
const warnings: string[] = [];
const todayIso = generatedAt.slice(0, 10);

if ((draft.coverage ?? []).length < 8) {
  warnings.push(
    `coverage: ${(draft.coverage ?? []).length}/8 categories searched ` +
      `(no quota — informational only).`,
  );
}

const result = {
  sweepId,
  generatedAt,
  added: newItems.length,
  updated: updatedReports.length,
  removed: removedReports.length,
  feedSize: feed.items.length,
  warnings,
  ok: true,
  todayIso,
};
console.log(JSON.stringify(result, null, 2));
if (warnings.length > 0) {
  console.error(`finalize-sweep completed with ${warnings.length} warning(s):`);
  for (const w of warnings) console.error(`  ⚠ ${w}`);
}
