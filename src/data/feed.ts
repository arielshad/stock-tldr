import raw from "./releases.json";
import type { Category, ReleaseFeed, ReleaseItem } from "./schema";

export const feed = raw as ReleaseFeed;

/**
 * Items are ordered by `publishDate` DESC — the moment finalize-sweep
 * ingested them — so newly-swept items float to the top regardless of
 * their real-world `date`. Cards still display `date` to readers.
 */
export const allItems = (): ReleaseItem[] =>
  [...feed.items].sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

export const itemsByCategory = (cat: Category): ReleaseItem[] =>
  feed.items
    .filter((i) => i.categories.includes(cat))
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

export const filterItems = (
  items: ReleaseItem[],
  opts: { categories?: Set<Category>; query?: string },
): ReleaseItem[] => {
  const q = opts.query?.trim().toLowerCase();
  return items.filter((i) => {
    if (opts.categories && opts.categories.size > 0) {
      // multi-category match: item passes if ANY of its categories
      // is in the active filter set
      const hit = i.categories.some((c) => opts.categories!.has(c));
      if (!hit) return false;
    }
    if (q) {
      const hay = `${i.title} ${i.org} ${i.summary} ${i.tags.join(" ")} ${i.explainer.tagline}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
};

/**
 * Counts each item once per category it belongs to. An item with
 * categories=[repo, tool] adds 1 to both REPO and TOOL counts.
 */
export const categoryCounts = (): Record<Category, number> => {
  const out = {} as Record<Category, number>;
  for (const i of feed.items) {
    for (const c of i.categories) {
      out[c] = (out[c] ?? 0) + 1;
    }
  }
  return out;
};
