/**
 * Content schema for Stock/TLDR releases.
 *
 * The external update agent MUST emit JSON conforming to `ReleaseFeed`.
 * Adding a new category = add an entry to `Category`, `CATEGORY_ORDER`,
 * AND `CATEGORY_META` in src/data/categories.ts. No other code changes
 * required.
 */

export type Category =
  | "earnings"
  | "mna"
  | "ipo"
  | "analyst"
  | "macro"
  | "regulatory"
  | "insider"
  | "mover"
  | "sector"
  | "commodity"
  | "crypto"
  | "fx"
  | "rates"
  | "rumor"
  | "article"
  | "video";

export const CATEGORY_ORDER: Category[] = [
  "earnings",
  "mover",
  "macro",
  "mna",
  "ipo",
  "analyst",
  "regulatory",
  "insider",
  "sector",
  "rates",
  "fx",
  "commodity",
  "crypto",
  "rumor",
  "article",
  "video",
];

export type Importance = "rumor" | "notable" | "major" | "seismic";

/**
 * The "explain like a sharp trader, not a CFA textbook" block.
 * Every item MUST have one. Keep each field punchy and concrete —
 * no marketing words, no hand-waving, no permabull/permabear framing.
 */
export interface Explainer {
  /** One-sentence elevator pitch. Max ~140 chars. */
  tagline: string;
  /** What's the news, plainly. 2–3 sentences. */
  whatIsIt: string;
  /** What actually happened / mechanics — numbers, vote, rate, pricing.
   *  2–4 sentences. */
  howItWorks: string;
  /** Why does this matter for markets — names that move, second-order
   *  effects, what it confirms or breaks. 2–3 sentences. */
  whyItMatters: string;
  /** Optional: who this is most useful for (e.g. "macro traders",
   *  "small-cap retail", "energy desks"). */
  forWho?: string;
  /** Optional: a chart link, ticker page, or specific filing URL. */
  tryIt?: string;
}

/**
 * Image associated with a release. Strongly preferred but technically
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
 * Author/creator attribution used by article + video items.
 * Renders as a small avatar overlay in the corner of the image preview.
 * Every field must be verified — no guessed avatar URLs.
 */
export interface ReleaseAuthor {
  /** Real name, e.g. "Matt Levine" or "Lyn Alden". */
  name: string;
  /** Popular @handle or channel tag, e.g. "@matt_levine" or "@LynAldenContact". */
  handle?: string;
  /** HTTPS avatar URL — must return 200. Prefer platform-hosted (x.com, youtube, substack). */
  avatarUrl?: string;
  /** Optional link to author's profile/channel page. */
  profileUrl?: string;
}

export interface ReleaseItem {
  id: string;
  /**
   * One or more categories. An item with [earnings, mover] shows up under
   * both the EARNINGS and MOVER filter chips. The first entry is the
   * "primary" category and is used for the prominent badge on the card.
   */
  categories: Category[];
  title: string;
  /** Issuer / publisher / source organization. Examples:
   *  - "NVIDIA" for an NVDA earnings item
   *  - "Federal Reserve" for an FOMC decision
   *  - "Bloomberg" for a deal scoop, "WSJ" for a regulatory scoop
   *  - "Lyn Alden" for an article (author overrides for article/video). */
  org: string;
  /**
   * Public release / event date (YYYY-MM-DD). Shown on the card.
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
   * Uppercase ticker symbols this release is about. Use the primary
   * exchange convention (NVDA, not nvda; BRK.B not BRK-B; ^GSPC for
   * S&P 500; BTC-USD for crypto). Optional — many macro / Fed / FX
   * items have no single ticker. Cap at ~6 to avoid spammy chip rows;
   * pick the names that actually move.
   */
  tickers?: string[];
  /** Concrete numbers. Free-form key→value, e.g. {"EPS": "$1.42 vs $1.31 est",
   *  "Revenue": "$96.3B (+18% Y/Y)", "Move": "+8.4% AH"}. */
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
// The update agent writes `src/data/releases.json` AND appends one entry
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
}

export interface SweepLog {
  sweeps: SweepReport[];
}
