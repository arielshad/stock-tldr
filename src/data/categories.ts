import type { Category } from "./schema";

/**
 * Category metadata — single source of truth for the category badge
 * shown on every release card and in the filter bar.
 *
 * To add a new category:
 *   1. Add it to `Category` and `CATEGORY_ORDER` in src/data/schema.ts.
 *   2. Add an entry below.
 *   3. Done — cards and filters auto-include it.
 */

export interface CategoryMeta {
  id: Category;
  label: string;   // shown on the badge
  short: string;   // 1–3 char glyph for tight spaces
  blurb: string;   // shown in filter tooltip / hero
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  earnings: {
    id: "earnings",
    label: "EARNINGS",
    short: "$",
    blurb: "Quarterly results, beats / misses, guidance updates",
  },
  mover: {
    id: "mover",
    label: "MOVER",
    short: "↕",
    blurb: "Single-stock big moves, halts, gappers, squeezes",
  },
  macro: {
    id: "macro",
    label: "MACRO",
    short: "Σ",
    blurb: "Fed, CPI, jobs, GDP, central banks, geopolitical",
  },
  mna: {
    id: "mna",
    label: "M&A",
    short: "⊕",
    blurb: "Mergers, acquisitions, takeovers, spin-offs",
  },
  ipo: {
    id: "ipo",
    label: "IPO",
    short: "▲",
    blurb: "S-1 filings, IPO debuts, direct listings, SPACs",
  },
  analyst: {
    id: "analyst",
    label: "ANALYST",
    short: "★",
    blurb: "Sell-side upgrades, downgrades, price-target moves",
  },
  regulatory: {
    id: "regulatory",
    label: "REG",
    short: "§",
    blurb: "SEC, DOJ, antitrust, tariffs, sanctions, lawsuits",
  },
  insider: {
    id: "insider",
    label: "INSIDER",
    short: "◉",
    blurb: "13F, 13D, insider transactions, big buybacks",
  },
  sector: {
    id: "sector",
    label: "SECTOR",
    short: "▦",
    blurb: "Sector rotations, broad theme moves",
  },
  rates: {
    id: "rates",
    label: "RATES",
    short: "%",
    blurb: "Yields, curves, treasury auctions, credit spreads",
  },
  fx: {
    id: "fx",
    label: "FX",
    short: "¤",
    blurb: "USD/DXY, JPY, EM currency moves and interventions",
  },
  commodity: {
    id: "commodity",
    label: "COMMOD",
    short: "◆",
    blurb: "Oil, gold, gas, copper, ag, OPEC, energy",
  },
  crypto: {
    id: "crypto",
    label: "CRYPTO",
    short: "₿",
    blurb: "BTC, ETH, alts, ETFs, exchange + protocol news",
  },
  rumor: {
    id: "rumor",
    label: "RUMOR",
    short: "?",
    blurb: "Credible market rumors from named journalists",
  },
  article: {
    id: "article",
    label: "ARTICLE",
    short: "✎",
    blurb: "Influential commentary — Levine, Lyn Alden, memos",
  },
  video: {
    id: "video",
    label: "VIDEO",
    short: "▷",
    blurb: "Top finance YouTubers, podcasts, viral segments",
  },
};
