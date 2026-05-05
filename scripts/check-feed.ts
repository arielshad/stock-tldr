#!/usr/bin/env bun
/**
 * Validate releases.json:
 *   - no exact-id duplicates
 *   - no normalized-id duplicates (lowercased, alphanumeric-only)
 *   - no canonical-URL duplicates
 *
 * The last two catch the case where the agent emits a slightly-
 * different slug (claude-opus-4-7 vs anthropic-claude-opus-4-7) for
 * the same release.
 */
import feed from "../src/data/releases.json" with { type: "json" };

const items = (feed as { items: Array<{ id: string; title: string; url: string }> }).items;

const normId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
function canonUrl(u: string): string {
  try {
    const url = new URL(u);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const path = url.pathname.replace(/\/+$/, "");
    // Keep query string — YouTube ?v=, search engines, etc rely on it.
    // Drop fragment + lowercase host/path. Query stays as-is (case sensitive).
    const query = url.search;
    return `${url.protocol}//${host}${path}${query}`.toLowerCase();
  } catch {
    return u.toLowerCase();
  }
}

const idSeen = new Map<string, string[]>();
const normSeen = new Map<string, string[]>();
const urlSeen = new Map<string, string[]>();

for (const it of items) {
  const id = it.id;
  const n = normId(id);
  const u = canonUrl(it.url);
  idSeen.set(id, [...(idSeen.get(id) ?? []), id]);
  normSeen.set(n, [...(normSeen.get(n) ?? []), id]);
  urlSeen.set(u, [...(urlSeen.get(u) ?? []), id]);
}

let bad = false;
const idDupes = [...idSeen.entries()].filter(([, v]) => v.length > 1);
if (idDupes.length > 0) {
  console.error("duplicate ids:");
  for (const [k, v] of idDupes) console.error(`  ${k} × ${v.length}`);
  bad = true;
}
const normDupes = [...normSeen.entries()].filter(
  ([, v]) => new Set(v).size > 1,
);
if (normDupes.length > 0) {
  console.error("ids that normalize to the same slug:");
  for (const [k, v] of normDupes)
    console.error(`  norm=${k}: ${[...new Set(v)].join(", ")}`);
  bad = true;
}
const urlDupes = [...urlSeen.entries()].filter(
  ([, v]) => new Set(v).size > 1,
);
if (urlDupes.length > 0) {
  console.error("items pointing at the same canonical URL:");
  for (const [k, v] of urlDupes)
    console.error(`  ${k}: ${[...new Set(v)].join(", ")}`);
  bad = true;
}

if (bad) {
  console.error(
    "\nSee SWEEP_MEMORY.md entry 2026-04-28-A. Use `updates[]` to fix existing items, never re-add.",
  );
  process.exit(1);
}
console.log(`feed ok — ${items.length} items, no id/url duplicates`);
