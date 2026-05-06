# DxbEstate Intel

A Dubai real-estate intelligence platform that automatically collects public listings and source signals, organizes them into opportunity cards, keeps them updated, and helps an operator find or sell good deals faster.

## What this is

DxbEstate Intel is **not** a glossy property blog. It is a high-volume operating feed for Dubai property work: portal listings, duplicate ads, developer launches, DLD/RERA signals, auction lots, motivated-seller clues, rent/yield screens, luxury leads, commercial stock, and off-plan assignment pressure.

The product turns messy listing data into actionable cards: what the opportunity is, what to verify, how the numbers work, why it matters, and who should act on it.

## Who it's for

Dubai brokers, buyer agents, seller reps, investors, short-let operators, developers, family-office buyers, and real-estate teams that need a cleaner way to monitor public inventory and source opportunities.

## ⚠️ Not legal, tax, investment, or brokerage advice

The platform is informational. Every card should link back to its public source and call out verification steps: title deed/Oqood, tenancy, service charges, NOC, broker authority, DLD comps, rent index, payment-plan obligations, and transfer costs.

## How it works

1. **Content lives in JSON** (`src/data/releases.json`, with `src/data/opportunities.json` symlinked for product-language compatibility) and conforms to `src/data/schema.ts`.
2. **An automated Claude/agent sweep** runs on a cron schedule via GitHub Actions. It follows `prompts/update-releases.md` / `prompts/update-opportunities.md`, searches property portals and official sources, verifies links, writes a sweep draft, and finalizes it into the feed plus the sweep log.
3. **The frontend** is a Bun + Vite + React + TypeScript SPA with a brutalist intelligence-dashboard design. Cards are filterable by opportunity category and searchable by area, building, source, tags and explainer text.
4. **The sweep log** keeps a public audit trail of what was added, updated, removed, and which categories were covered.

## Key design decisions

- **Chronological opportunity feed.** Newly ingested/updated opportunities float to the top.
- **Multi-category cards.** One card can be `distress + ready + rental`, or `offplan + developer + visa`.
- **Duplicate detection is a feature.** Same-unit listings across brokers are merged and treated as negotiation/source intelligence.
- **Operator-first explainers.** Every card answers: what is it, how does it work, why does it matter, who is it for, and what should be verified next.
- **No hype.** The platform does not say “buy this.” It captures evidence, numbers, risks, and next checks.
- **Same CI/CD/AI pattern.** The repo keeps the existing Cloudflare deploy, scheduled Claude Code sweep, finalizer, typecheck, build, prerender, and newsletter patterns, extended for Dubai real estate.

## Architecture

```text
src/
  data/
    schema.ts              # Category, ReleaseItem/OpportunityItem, sweep types
    releases.json          # Canonical feed data
    opportunities.json     # Symlink for product-language compatibility
    categories.ts          # Dubai real-estate category metadata
    feed.ts                # Typed accessors, filters, sort helpers
    sources.ts             # Source-map compatibility export
    influencers.ts         # Dubai source map (portals, DLD/RERA, developers, data)
  components/
    ReleaseCard.tsx        # Historical component name; renders opportunity cards
    OpportunityCard.tsx    # Product-language wrapper
    ReleaseModal.tsx       # Historical component name; renders detail modal
    OpportunityModal.tsx   # Product-language wrapper
    InfluencersPage.tsx    # Historical file name; now exports SourcesPage
    SweepLogPage.tsx       # Collection/sweep changelog
  App.tsx                  # Page shell, filters, routes, modal state

prompts/
  update-releases.md       # Canonical collection-agent prompt
  update-opportunities.md  # Product-language copy of the prompt

.github/workflows/
  update-releases.yml      # Scheduled Claude Code sweep
  deploy.yml               # Cloudflare Workers deploy
  daily-digest.yml         # Optional email digest pattern
```

## Running locally

```bash
bun install
bun dev
```

## Validate/build

```bash
bun run typecheck
bun run lint
bun run build
```

## Updating content manually

Create a `sweep-draft.json`, then run:

```bash
bun scripts/finalize-sweep.ts sweep-draft.json --source manual-backfill
bun run build
```

Or run the agent locally with `prompts/update-opportunities.md` as the task prompt.

## License

MIT
