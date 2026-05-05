# Stock/TLDR

A comprehensive, real-time tracker of what's moving markets.

## What this is

Stock/TLDR is **not** a curated newsletter that picks 10 highlights per
week. It is a **high-volume feed** that captures every market-moving
release — earnings prints, FOMC decisions, M&A deals, regulatory actions,
big single-name moves, macro prints, commodity moves, FX interventions,
and crypto flows. Think Hacker News, but specifically for markets.

The volume is high because markets move fast. Dozens of things hit the
tape every day across thousands of issuers, regulators, and central
banks. The quality bar is "is this real, recent, and primary-source
verified" — not "is this one of the top 5 stories this week."
Categories and ticker filters exist so users can navigate a large feed,
not to limit what goes in.

## Who it's for

Active traders, allocators, finance-curious developers, retail readers
who want to understand what just moved. The tone is sharp and factual,
not editorialized. Every item has a plain-English explainer (what
happened, the actual numbers, why markets care) so you actually
understand what you're looking at.

## ⚠️ Not investment advice

Stock/TLDR is informational. It is **not** investment, financial, or
trading advice. Every item links to its primary source — verify before
making any financial decision.

## How it works

1. **Content lives in a single JSON file** (`src/data/releases.json`)
   that conforms to the schema in `src/data/schema.ts`.
2. **An automated agent** runs on a cron schedule (every 2 hours via
   GitHub Actions) and refreshes the feed by following the prompt in
   `prompts/update-releases.md`. The agent uses web search and fetch
   to discover and verify every release — no hallucination, no
   invented tickers, no made-up EPS numbers.
3. **The frontend** is a Bun + Vite + React + TypeScript single-page
   app with a brutalist editorial design. The feed is a **single
   chronological stream sorted by ingest time** (newest first). Card
   size is driven by importance (seismic = large, notable = small)
   but there is no grouping — all items flow together. Cards are
   filterable by category and searchable. Clicking a card opens a
   detail modal with the full explainer, the metrics, and verified
   source links.

## Key design decisions

- **Flat chronological feed.** Items are sorted by `publishDate`
  (when the sweep ingested them), not by importance. Card size
  reflects importance visually, but the stream is continuous.
- **72-hour hard cap on `date`.** The actual public release date of
  the news must be within 72 hours of the sweep. Old stories don't
  get added even if FinTwit is still chatting about them.
- **No quantity caps.** If 30 things move the tape in a day, the
  feed shows 30 things. The agent does not skip releases to hit a
  target number.
- **Multi-category items.** Each release can belong to multiple
  categories (e.g. an earnings beat that gapped 12% is `["earnings",
  "mover"]`). Filter chips match any category.
- **Tickers as a first-class field.** Each item carries an array of
  uppercase tickers (`NVDA`, `BTC-USD`, `^GSPC`). Optional —
  Fed/CPI items often have none — but central to filtering equities
  by name.
- **Zero-hallucination policy.** Every URL, image, metric, and
  ticker in the feed must be fetched and verified by the agent in
  the run that produced it. If a URL can't be verified, the item
  gets dropped.
- **No editorializing.** The feed reports what happened, not what
  to do about it. No "buy the dip", no "this is bullish", no
  permabull/permabear framing.
- **Explainers are the product.** Every item has a structured
  explainer (what happened / how it works / why markets care / who
  this is most useful for / try this URL). This is the thing that
  makes the site worth visiting vs. just refreshing Bloomberg.

## Architecture

```
src/
  data/
    schema.ts          # TypeScript types (ReleaseItem, ReleaseFeed, Category, etc.)
    releases.json      # The content — written by the agent, rendered by the UI
    categories.ts      # Category metadata (labels, glyphs, blurbs)
    feed.ts            # Typed accessors, filters, sort helpers
    influencers.ts     # Curated finance / markets voices
  components/
    ReleaseCard.tsx     # Grid card with image, badges, tagline, ticker chips
    ReleaseModal.tsx    # 16:9 detail modal with explainer panels + sources
    ReleaseImage.tsx    # Image with onError fallback
    FilterBar.tsx       # Category chips + search input
  App.tsx               # Page shell, filter state, URL-driven modal
  App.css               # All layout + component styles
  index.css             # Global reset + CSS variables
  main.tsx              # React entrypoint

prompts/
  update-releases.md    # The agent prompt — single source of truth for content updates

.github/workflows/
  update-releases.yml   # Cron job that runs the agent every 2 hours
```

## Running locally

```bash
bun install
bun dev
```

## Adding a category

1. Add the value to the `Category` union and `CATEGORY_ORDER` in
   `src/data/schema.ts`.
2. Add a matching entry in `src/data/categories.ts`.
3. Done — filter chips, cards, and modal badges pick it up automatically.

## Updating content

The feed updates automatically via GitHub Actions. To trigger manually:

```bash
gh workflow run "Update releases (every 2h)"
```

Or run the agent locally by spawning a Claude Code subagent with
`prompts/update-releases.md` as the task prompt.

## License

MIT
