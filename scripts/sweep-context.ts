#!/usr/bin/env bun
/**
 * Pre-sweep context briefing.
 *
 * Tells the agent two things and nothing else:
 *   - the current time
 *   - what is already in the feed (so it doesn't re-add)
 *
 * No category gaps, no cadence numbers, no "starved" lists, no
 * thresholds. The agent has historically interpreted any such signal
 * as a quota and padded the feed to fill it. Don't surface gaps.
 */
import feed from "../src/data/releases.json" with { type: "json" };
import type { ReleaseFeed } from "../src/data/schema.ts";

const f = feed as unknown as ReleaseFeed;

const now = new Date().toISOString();

// Normalize an id for matching: lowercase, strip non-alphanumeric.
// Agent emitting "claude-opus-4-7" should still collide with the
// existing "anthropic-claude-opus-4-7" if the URL is the same;
// but the id-side guard catches near-misses too.
const normId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Canonical URL for matching: lowercase, drop trailing slash + query +
// fragment + leading "www.". Two items pointing at the same canonical
// URL are the same release.
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

const existing = f.items.map((i) => ({
  id: i.id,
  normId: normId(i.id),
  url: canonUrl(i.url),
  title: i.title,
}));

const out = {
  now,
  feedSize: f.items.length,
  // Hard rule: the agent must not emit a newItem whose id, normalized id,
  // or canonical primary URL collides with anything in this list.
  // `finalize-sweep.ts` enforces all three.
  existing,
};

console.log(JSON.stringify(out, null, 2));
