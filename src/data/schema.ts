/**
 * Content schema for DxbEstate Intel opportunity cards.
 *
 * The external collection agent MUST emit JSON conforming to `ReleaseFeed`.
 * Adding a new category = add an entry to `Category`, `CATEGORY_ORDER`,
 * AND `CATEGORY_META` in src/data/categories.ts. No other code changes
 * required.
 */

export type Category =
  | "distress"
  | "offplan"
  | "ready"
  | "rental"
  | "flip"
  | "developer"
  | "auction"
  | "visa"
  | "luxury"
  | "commercial"
  | "land"
  | "market"
  | "lead"
  | "duplicate"
  | "legal"
  | "media";

export const CATEGORY_ORDER: Category[] = [
  "distress",
  "offplan",
  "ready",
  "rental",
  "flip",
  "developer",
  "auction",
  "visa",
  "luxury",
  "commercial",
  "land",
  "market",
  "lead",
  "duplicate",
  "legal",
  "media",
];

export type Importance = "rumor" | "notable" | "major" | "seismic";

/**
 * The "explain like a sharp Dubai property operator" block.
 * Every item MUST have one. Keep each field punchy and concrete —
 * no marketing fluff, no hand-waving, no broker hype.
 */
export interface Explainer {
  /** One-sentence elevator pitch. Max ~140 chars. */
  tagline: string;
  /** What's the news, plainly. 2–3 sentences. */
  whatIsIt: string;
  /** Deal mechanics — asking price, area, yield, fees, payment plan, transfer timeline.
   *  2–4 sentences. */
  howItWorks: string;
  /** Why this matters for Dubai buyers/sellers — comps, yield, scarcity, exit path, risks. 2–3 sentences. */
  whyItMatters: string;
  /** Optional: who this is most useful for (e.g. "cash buyers", "holiday-home operators", "end users"). */
  forWho?: string;
  /** Optional: a listing page, portal search, DLD page, map, or due-diligence URL. */
  tryIt?: string;
}

/**
 * Image associated with a listing/opportunity. Strongly preferred but technically
 * optional — if missing the card renders a category-tinted text placeholder.
 * The agent prompt requires `image` on every item it produces.
 */
export interface ReleaseImage {
  /** Direct image URL — must be HTTPS, must return 200 when fetched. */
  url: string;
  /** Alt text — required for a11y. */
  alt: string;
  /** How the image should fit its frame. Default 'cover'. */
  fit?: "cover" | "contain";
  /** Optional credit line shown under the modal hero. */
  credit?: string;
}

/**
 * Source/broker attribution used by media or lead items.
 * Renders as a small avatar overlay in the corner of the image preview.
 * Every field must be verified — no guessed avatar URLs.
 */
export interface ReleaseAuthor {
  /** Real broker/source name. */
  name: string;
  /** Popular @handle or agency tag. */
  handle?: string;
  /** HTTPS avatar URL — must return 200. Prefer platform-hosted (x.com, youtube, substack). */
  avatarUrl?: string;
  /** Optional link to author's profile/channel page. */
  profileUrl?: string;
}

export interface ReleaseItem {
  id: string;
  /**
   * One or more categories. An item with [distress, ready] shows up under
   * both the DISTRESS and READY filter chips. The first entry is the
   * "primary" category and is used for the prominent badge on the card.
   */
  categories: Category[];
  title: string;
  /** Portal / broker / developer / source organization. */
  org: string;
  /**
   * Public listing / verification date (YYYY-MM-DD). Shown on the card.
   */
  date: string;
  /**
   * ISO timestamp of when finalize-sweep.ts ingested this item into the
   * feed. Drives sort order so newly-swept items float to the top
   * regardless of their `date`. Stamped automatically.
   */
  publishDate: string;
  url: string;
  /** Short summary — the headline blurb. ≤240 chars. */
  summary: string;
  tags: string[];
  importance: Importance;
  /**
   * Short area/building codes this opportunity is about (DXB-MARINA, JVC, DOWNTOWN, etc.). Optional. Cap at ~6 to avoid spammy chip rows.
   */
  tickers?: string[];
  /** Concrete numbers. Free-form key→value, e.g. {"Ask": "AED 1.25M", "Size": "820 sqft", "Gross yield": "7.1%", "DLD transfer": "4%"}. */
  metrics?: Record<string, string | number>;
  links?: { label: string; url: string }[];
  explainer: Explainer;
  image?: ReleaseImage;
  /**
   * Author / creator attribution. Used primarily for article + video items
   * to show an avatar overlay on the card image. Optional elsewhere.
   */
  author?: ReleaseAuthor;
}

export interface ReleaseFeed {
  generatedAt: string;
  promptVersion: string;
  source: string;
  items: ReleaseItem[];
}

// -------------------------------------------------------------------------
// Sweep log
// -------------------------------------------------------------------------
//
// The update agent writes `src/data/releases.json / src/data/opportunities.json` AND appends one entry
// to `src/data/sweeps.json` per run. The sweep log powers the /log page
// so users can see what changed, when, and why. It is append-only — the
// agent MUST NOT rewrite existing entries.
//

export interface SweepAddedItem {
  id: string;
  title: string;
  /** Primary (first) category of the added item. */
  category: Category;
  /** One-sentence "why was this included". */
  note: string;
}

export interface SweepUpdatedItem {
  id: string;
  title: string;
  /** One-sentence "what changed". */
  note: string;
}

export interface SweepRemovedItem {
  id: string;
  title: string;
  /** One-sentence "why was this dropped". */
  reason: string;
}

/**
 * One entry in the sweep log. Append-only — the agent writes a fresh
 * entry per run and never edits old ones.
 */
export interface SweepReport {
  /** Kebab slug from timestamp, e.g. "sweep-2026-04-12t1642z". */
  id: string;
  /** ISO timestamp the sweep ran. Matches the feed's `generatedAt`. */
  timestamp: string;
  /**
   * Run label. Same convention as `ReleaseFeed.source`:
   *   "github-actions-sweep"  — the every-2h cron
   *   "manual-backfill"       — human-kicked backfill
   *   "manual-<reason>"       — any other human-kicked run
   */
  source: string;
  /** 1–2 sentence friendly prose summary of the whole sweep. */
  summary: string;
  counts: {
    added: number;
    updated: number;
    removed: number;
  };
  added: SweepAddedItem[];
  updated: SweepUpdatedItem[];
  removed: SweepRemovedItem[];
  /**
   * Categories the sweep actually searched this run, regardless of
   * whether any item was added for them. Proves breadth-of-search
   * for "zero items this sweep" runs and lets us audit which
   * categories get neglected over time. Optional on legacy entries
   * written before the coverage rule; required on new sweeps.
   */
  coverage?: Category[];
  /** Stable ids from src/data/scan-plan.ts that the agent actually searched. */
  sourcesChecked?: string[];
}

export interface SweepLog {
  sweeps: SweepReport[];
}

// Compatibility aliases for the Dubai property product language while the
// existing UI modules keep their historical Release* component names.
export type OpportunityItem = ReleaseItem;
export type OpportunityFeed = ReleaseFeed;
