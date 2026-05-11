---
prompt-id: tldr.update-releases
prompt-version: 1.0.0
output-target: src/data/releases.json (via finalize-sweep.ts)
schema: src/data/schema.ts
invoke-as: subagent
---

# Stock/TLDR — Markets Sweep

Single source of truth for refreshing `src/data/releases.json`. Invoked
on cron (every 12h) and manually. The agent's output is `sweep-draft.json`
at the repo root; deterministic scripts merge that into the data files.

## Mission

Surface what moved markets in the last ~24h that traders, allocators
and finance-curious readers are talking about RIGHT NOW. Real, recent,
verifiable. Equities, macro, rates, FX, commodities, and crypto are all
in scope. If nothing happened in the last 72h that meets the bar,
ship zero items — that is a successful sweep, not a failure. Padding
to fill a perceived gap is THE bug. Read `SWEEP_MEMORY.md` before
changing anything.

## The pipeline (one canonical path, no alternative)

You write a draft. Scripts validate and merge. You do **NOT** edit
`releases.json` or `sweeps.json` directly under any circumstance.

1. **Briefing.** `bun scripts/sweep-context.ts > /tmp/ctx.json`. Output
   shape: `{ now, feedSize, existing[] }` where each `existing[i]` is
   `{ id, normId, url, title }`. This is the no-add-twice list.
2. **Discovery.** Search the sources listed below. For each candidate,
   apply the inclusion bar + the importance scale + the dedup check.
3. **Helpers as needed:**
   - `bun scripts/yt-meta.ts <url>` — returns
     `{ videoId, watchUrl, title, channelName, channelUrl, thumbnailUrl, uploadDate, ageHours, freshFor72hBar }`.
     For any video, ship only if `freshFor72hBar: true`.
   - `bun scripts/og-image.ts <page-url>` — returns
     `{ pageUrl, imageUrl, contentType, source }` after verifying it's
     actually an image.
   - `bun scripts/gh-repo-meta.ts <owner>/<repo>` — kept for the rare
     open-source-quant-lib release (ccxt, lean, freqtrade, etc).
4. **Draft.** Write `sweep-draft.json` at the repo root:
   ```json
   {
     "newItems":   [ /* full ReleaseItem[] minus publishDate — stamped by finalize-sweep */ ],
     "updates":    [ { "id": "...", "patch": { ... }, "note": "..." } ],
     "removals":   [ { "id": "...", "reason": "..." } ],
     "summary":    "1–2 sentence sweep summary",
     "coverage":   ["earnings","macro","mover",...],
     "notes":      { "<id>": "one-sentence why-included" }
   }
   ```
   `coverage` lists categories you actually queried this run. Don't
   pad it. On a zero-add sweep, omit `coverage` entirely or pass an
   empty array — the soft warning is informational only.
5. **Verify.**
   ```
   bun scripts/verify-draft.ts sweep-draft.json
   ```
   Hits every URL and image with timeouts + per-host concurrency.
   Hard-fails on any 4xx/5xx, non-image content-type at `image.url`,
   or schema gaps. Fix the draft until it passes.
6. **Finalize.**
   ```
   bun scripts/finalize-sweep.ts sweep-draft.json
   ```
   Sorts the feed by `date` DESC, dedups (id + normId + canonical
   URL), builds the `SweepReport`, appends to `sweeps.json`. Hard-fails
   on collision; soft-warns on coverage gaps.
   For non-cron runs override the source label:
   `--source manual-<reason>`. Default is `github-actions-sweep`.
7. **Build check.** `bun run typecheck && bun run build`. If the build
   breaks, fix; do not commit.
8. Stop. Don't commit, don't push (the workflow handles that).

## Hard rules (non-negotiable)

### 1. Zero hallucination

Every URL, every image, every metric, every claim must trace to a page
you fetched in this run. Working from memory is forbidden. Never invent
ticker symbols, EPS numbers, deal sizes, central-bank decisions, or
analyst price targets. If a source doesn't state it, leave it out.
**Especially: never make up tickers.** If you can't confirm "NVDA"
appears in the source page or filing, drop the ticker — don't guess.
When in doubt, drop the item.

### 2. 72h date cap

`date` (the actual public release date — when the news broke / the
filing dropped / the print printed, not when you found it) MUST be
within **72 hours** of the sweep timestamp. Old stories stay un-added
even if FinTwit is still chatting about them. If the source page
doesn't show an explicit date, use the earliest verifiable timestamp:
SEC EDGAR filing date, Reuters/Bloomberg dateline, official press-
release timestamp, central-bank publication time.

### 3. Semantic dedup is YOUR job

The script catches three things only: exact id collisions, normalized-id
collisions (lowercase, alphanumeric-only), and canonical-URL collisions.
It cannot catch the same news with two different titles + two
different URLs (e.g. "NVDA Q3 Beats" at `nvidianews.nvidia.com` vs
"Nvidia Crushes Quarter" at a Reuters mirror).

For every candidate, scan `existing[].title` and ask: "Is any existing
entry covering the SAME event — same earnings print, same Fed meeting,
same M&A deal, same enforcement action?" If yes:
- Fresher framing of the same event → move to `updates[]` with the
  existing id.
- Otherwise → drop the candidate.

The script will catch slug/url collisions you miss. The script CANNOT
do semantic dedup. That's on you, every candidate, every sweep.

### 4. No padding

Empty sweep is success. If the inclusion bar yields zero qualifying
items in any category, ship zero. Do not add an "okay-ish" item to
fill a slot. Specifically: do not add a stale earnings recap because
"earnings looks empty", do not add a thin sector summary, do not add
a low-conviction analyst call because "analyst is empty this week".

### 5. No bias, no permabull/permabear framing

Stick to facts and disclosed numbers. Do not editorialize about
whether a stock is a "buy" or whether the Fed is "wrong". Frame in
terms of what happened, what the print/decision/move was, and what
asset prices did. The reader makes the call. **Never give investment
advice — Stock/TLDR is not a recommendation engine.**

## Importance scale

Two separate questions: **Should this ship?** (inclusion bar) and
**What tier?** (importance). They are independent.

| Tier | Meaning |
|------|---------|
| `seismic` | Reserved for truly market-moving events. All three of (a) directly moves an entire index / asset class / sector by ≥1%, (b) primary-source confirmed (Fed statement, mega-cap 8-K, Treasury, central bank), (c) active wall-of-coverage right now. Examples: FOMC rate decision day, mega-cap earnings (AAPL/MSFT/NVDA/GOOG/AMZN/META) beat or miss, $50B+ M&A, war breakout, sovereign default. Target 0–2 per week. |
| `major`   | Broad-impact news. Standard mega-cap / large-cap earnings prints, mid-size M&A, single-name ≥10% moves with named catalyst, SEC enforcement on a household name, sector-defining news, sell-side day-of upgrade/downgrade with clear price action, CPI/jobs/PCE prints. The default tier for most things that aren't a Fed pivot. |
| `notable` | Solid release, narrow audience: small-cap earnings, niche commodity, regional bank, niche regulatory action. |
| `rumor`   | Credible market rumor from a named journalist (Reuters/Bloomberg/WSJ/FT/The Information) or insider with track record. Always paired with `categories: ["rumor", ...]`. |

If you find yourself emitting a 3rd seismic in a single sweep, you are
inflating. Demote.

## Inclusion bar

Ship a candidate only if it meets ALL of:

1. `date` is within 72h of sweep timestamp (Hard Rule 2).
2. It does not collide with anything in `existing[]` semantically
   (Hard Rule 3).
3. At least ONE of the following is true:
   - It moved the underlying ≥3% on the day (single-name) or moved
     the relevant index ≥0.5% (macro/Fed/CPI).
   - Confirmed by an official primary source: 8-K / 10-Q on EDGAR,
     Federal Reserve press release, ECB / BOJ / BOE / PBOC bulletin,
     Treasury statement, BLS / BEA release, OPEC / IEA release.
   - ≥2 tier-1 outlets covered it in the last 24h (Bloomberg, Reuters,
     WSJ, Financial Times, The Information, Stratechery, CNBC,
     MarketWatch).
   - It's the front-page lead on Bloomberg / Reuters Markets right now.
   - On `r/wallstreetbets` daily top with ≥10K upvotes AND verifiable
     primary source (no meme rumors).
4. You would post about it today as a "this just hit" market-moving
   note.

## Sources to scan

Search whichever sources fit the candidate type. There is **no**
"must search every category" rule — searching matters when you have a
reason to look, not as a quota.

### Equities + earnings + filings

- **SEC EDGAR**: `sec.gov/cgi-bin/browse-edgar` — 8-K (material
  events), 10-Q (quarterly), 10-K (annual), S-1 (IPO), 13D/13F
  (insider/institutional). The primary source for everything.
- **Earnings calendars**: earningswhispers.com, finance.yahoo.com/calendar/earnings,
  investing.com/earnings-calendar.
- **Tier-1 markets press**: bloomberg.com/markets, reuters.com/markets,
  wsj.com/news/markets, ft.com/markets, theinformation.com,
  stratechery.com.
- **Real-time markets**: cnbc.com (front page), marketwatch.com,
  finance.yahoo.com, seekingalpha.com (for analyst notes).

### Macro + Fed + central banks

- **Federal Reserve**: federalreserve.gov/newsevents/pressreleases.htm,
  /monetarypolicy/fomccalendars.htm.
- **BLS / BEA / Census**: bls.gov (CPI/PPI/jobs), bea.gov (GDP/PCE).
- **Other central banks**: ecb.europa.eu/press, boj.or.jp/en/announcements,
  bankofengland.co.uk/news, pbc.gov.cn (PBOC).
- **Treasury**: home.treasury.gov, treasurydirect.gov for auction results.

### Rates + credit

- Treasury auction results, FedTrade operations, FRED charts (for
  visualization context), corporate bond issuance scoops on Bloomberg.

### FX + commodities

- DXY moves, JPY/EUR/CNY interventions on Reuters/Bloomberg.
- Oil: OPEC+ communiques, EIA weekly inventories (eia.gov).
- Gold: lbma.org.uk, Comex moves on Reuters.
- Ag/softs: USDA WASDE reports.

### Crypto

- coindesk.com, theblock.co, decrypt.co, blockworks.co.
- Major exchange announcements: blog.coinbase.com, binance.com/en/blog.
- Spot ETF flows (farside.co.uk/btc-etf-flow, sosovalue.com).
- On-chain primary sources: glassnode.com, cryptoquant.com (for
  reference, not as a citation).

### Analyst calls + sell-side

- Bloomberg / Reuters terminal-style notes summarised on
  marketwatch.com/research, briefing.com (analyst actions).
- Goldman, JPM, Morgan Stanley, Bank of America research notes —
  cite Reuters/Bloomberg coverage of the note, not the original PDF.

### Influential voices (for `article` items only)

- Matt Levine — Money Stuff (bloomberg.com/opinion).
- Lyn Alden — lynalden.com/blog.
- Howard Marks — oaktreecapital.com/insights/memos.
- Doomberg — newsletter.doomberg.com.
- Aswath Damodaran — aswathdamodaran.blogspot.com.
- Joseph Wang — fedguy.com.
- The Compound — thecompoundnews.com (Josh Brown / Michael Batnick).
- Bob Elliott, Andreas Steno, Cullen Roche — verified Substack/blog posts.

### YouTube (for `video` items only — fresh only, ≤72h)

- Patrick Boyle — @PBoyle.
- Coffeezilla — @Coffeezilla (financial fraud investigations).
- The Plain Bagel — @ThePlainBagel.
- Ben Felix — @BenFelixCSI.
- Wall Street Millennial — @WallStreetMillennial.
- Heresy Financial — @HeresyFinancial.
- Joseph Carlson — @JosephCarlsonShow.
- The Compound — @thecompound.
- Bloomberg Originals, CNBC interviews — only for genuinely market-
  moving segments (Buffett, Powell, Druckenmiller etc).

### Rumors (use sparingly)

- Reuters "exclusive", Bloomberg "people familiar with the matter",
  WSJ "people said", The Information leaks. Anonymous Twitter doesn't
  qualify.

## Item schema

Every item conforms to `ReleaseItem` in `src/data/schema.ts`. Required:
`id`, `categories`, `title`, `org`, `date`, `url`, `summary`, `tags`,
`importance`, `explainer`, `image`, `links`. Two date fields:
- `date` (YYYY-MM-DD) — the public release / event date. Shown on cards.
  YOU set this from the source.
- `publishDate` (ISO timestamp) — when we ingested the item. Drives
  sort order. **DO NOT set this — `finalize-sweep.ts` stamps it.**

### `id`

`<org-or-ticker-kebab>-<short-slug>`. Lowercase, hyphens. Examples:
`nvda-q3-fy26-earnings`, `fomc-2026-05-decision`, `apollo-buy-paramount`,
`btc-spot-etf-record-flows`. Use the existing convention if a prior
entry covered the same issuer.

### `categories`

Array of one or more from: `earnings`, `mover`, `macro`, `mna`, `ipo`,
`analyst`, `regulatory`, `insider`, `sector`, `rates`, `fx`,
`commodity`, `crypto`, `rumor`, `article`, `video`. First entry is
primary (drives the badge). Multi-category is encouraged when honest:
`["earnings", "mover"]` for an earnings beat that gapped 12%,
`["macro", "rates"]` for a Fed decision that moved the curve.

### `tickers`

Optional `string[]`. Uppercase symbols for the names this release is
about. Use the primary exchange convention: `NVDA`, `AAPL`, `BRK.B`,
`^GSPC` (S&P), `^DJI` (Dow), `BTC-USD`, `ETH-USD`, `CL=F` (oil
futures), `GC=F` (gold). Cap at ~6 tickers — pick the names that
actually move on this news.

- Earnings/mover items: include the issuer ticker, plus 1–2 obvious
  comp tickers if the print clearly moves them (e.g. NVDA earnings
  → `["NVDA", "AMD", "AVGO"]`).
- Macro / Fed / CPI items: usually NO tickers (or at most `["^GSPC",
  "^TNX"]` if the print clearly moved both).
- M&A items: include both target and acquirer.
- Crypto items: include the relevant `<TICKER>-USD` form.
- FX/commodity: skip tickers entirely or use the future symbol.

If you can't confirm a ticker from the source, drop it. Never guess.

### `summary`

≤ 240 chars, plain English. Banned words: "revolutionary",
"groundbreaking", "game-changing", "unprecedented", "next-generation",
"cutting-edge", "moonshot", "rocketship", "to the moon". No emoji,
no exclamation marks, no investment advice ("buy the dip", "should
own this"), no "we think".

### `tags`

Lowercase, hyphenated, as many as honestly apply. No cap. Examples:
`earnings`, `eps-beat`, `guidance-raise`, `q3-2026`, `semis`, `ai-capex`,
`rate-cut`, `dovish`, `fomc`, `cpi`, `dollar`, `dxy`, `oil`, `opec`,
`btc-spot-etf`, `13f`. Stop where the next tag is noise.

### `date`

YYYY-MM-DD. The actual public release date from the source page. ≤72h
before sweep timestamp (Hard Rule 2; `finalize-sweep.ts` hard-fails
on items older than that).

### `metrics` (optional but encouraged)

`Record<string, string | number>`. Concrete numbers from the source.
Every key/value must trace to a fetched source — no estimates. Omit
the field rather than guess. Examples by category:

- earnings: `{"EPS": "$1.42 vs $1.31 est", "Revenue": "$96.3B (+18% Y/Y)",
  "Move": "+8.4% AH"}`.
- mover: `{"Move": "-14.2%", "Volume": "3.1× avg"}`.
- macro: `{"CPI": "+2.4% Y/Y vs +2.5% est", "Core": "+3.1% Y/Y"}`.
- rates: `{"10Y": "4.18% (+9bp)", "2Y": "4.62% (-3bp)"}`.
- crypto: `{"BTC": "+5.2%", "ETF flows (24h)": "+$412M"}`.
- mna: `{"Deal": "$28B all-cash", "Premium": "32% over Friday close"}`.

The UI surfaces metrics as small chips under the title.

### `explainer` (REQUIRED)

The heart of the card. If you can't fill these from the source, drop
the item.

- `tagline` — one sentence, ≤140 chars, plain. The headline.
- `whatIsIt` — what's the news in plain language. 2–4 sentences.
- `howItWorks` — actual mechanics: numbers, vote, breakdown, deal
  structure, what the print said. No marketing.
- `whyItMatters` — practical market impact. Names that move, second-
  order effects, what it confirms or breaks. Strictly factual — never
  "buy this".
- `forWho` — optional, one short phrase ("macro traders", "small-cap
  retail", "energy desks").
- `tryIt` — optional, one line: a chart link, EDGAR filing URL,
  ticker page, or specific data source.

Same banned words as `summary`. Same no-investment-advice rule.

### `image` (REQUIRED)

Object: `{ url, alt, fit?, credit? }`. The image must be fetched in
this run and confirmed to return 200 + `image/*` content-type
(`verify-draft.ts` enforces).

Sources, in priority order:
1. `og:image` from the canonical URL — use `bun scripts/og-image.ts <url>`.
   This usually nails Bloomberg / Reuters / WSJ article images.
2. Company press-release header image from the issuer's IR page.
3. Wikimedia Commons company / institution logo as last resort.
4. For Fed / Treasury / central-bank items: Wikimedia Commons of the
   building or seal works (always Wikimedia, never random JPGs).
5. For YouTube: `thumbnailUrl` from `yt-meta.ts` (deterministic
   `hqdefault.jpg`).

Avoid hotlink-blocked hosts: `scontent.fbcdn.net`, `pbs.twimg.com`,
`*.licdn.com`, anything behind `instagram.com`. Prefer the issuer's
own CDN or Wikimedia.

`alt` — required, ≤120 chars, no "image of".
`fit` — default `"contain"`. Use `"cover"` only for true full-bleed photos.
`credit` — optional figure/photo credit.

If you cannot find a verified image, drop the item. No image = no card.

### `links` (REQUIRED, ≥2)

Each: `{ label, url }`. Aim for 3–5 entries when relevant. Cover these
facets in priority order:

1. Primary source (8-K, Fed press release, BLS table, official press
   release).
2. Tier-1 coverage (Bloomberg, Reuters, WSJ, FT).
3. Ticker / chart page (finance.yahoo.com/quote/<TICKER>,
   tradingview.com/symbols/<TICKER>).
4. Earnings call transcript / slide deck (IR page).
5. Independent analysis (Levine, Lyn Alden, Doomberg, etc).

Every link must be **directly relevant to this specific event**. NOT
homepages, NOT search-result pages. Labels Title Case, ≤24 chars.

`verify-draft.ts` fetches every link in this run and confirms 200.

## Per-category notes

### `earnings`

`org` = the issuer (e.g. "NVIDIA", "JPMorgan Chase"), NEVER the
exchange. Always include the issuer ticker in `tickers`. Required
metrics: at least `EPS` (with estimate comparison) and `Revenue`. If
the after-hours move is meaningful, add `Move`. Link the IR press
release as the primary source — never the analyst recap.

### `mover` — single-name ≥5% moves with a catalyst

Every mover has a NAMED catalyst — earnings, guidance, FDA, rating
change, deal speculation, court ruling. No "stock just moved". The
catalyst goes in `whyItMatters`. Common combinations:
`["mover", "earnings"]`, `["mover", "regulatory"]`, `["mover", "rumor"]`.
A move with no catalyst belongs on a chart-watcher's screen, not in
the feed.

### `macro` — Fed, prints, central banks

`org` = the issuing institution ("Federal Reserve", "Bureau of Labor
Statistics", "European Central Bank"). For Fed days: title format
`"FOMC <Month> <Year> — <decision>"` e.g. `"FOMC May 2026 — holds at 4.25–4.50%"`.
Always link the official statement plus 1–2 tier-1 takes. For data
prints (CPI, jobs): include the headline number AND the consensus
estimate in `metrics`.

### `mna`

`org` = the dealmaker side leading the announcement. `tickers`
includes BOTH target and acquirer. `metrics` includes deal size and
premium. Include the joint press release (or 8-K) as primary source.

### `ipo`

`org` = the issuer. `tickers` = the post-listing symbol if known,
else omit. Include the S-1 / F-1 / prospectus from EDGAR as primary,
plus pricing-day Reuters/Bloomberg coverage.

### `analyst`

`org` = the sell-side firm ("Goldman Sachs", "Morgan Stanley"). The
analyst-name goes in `author` if you have it verified. Required
metrics: `Rating change`, `Old PT`, `New PT`. Link the firm's own note
recap if available; otherwise Bloomberg/Reuters coverage of the note.

### `regulatory`

`org` = the regulator ("Securities and Exchange Commission", "U.S.
Department of Justice", "Federal Trade Commission", "Office of
Foreign Assets Control"). Link the press release / complaint /
order on the regulator's own site as primary. NEVER cite analyst
opinion as the source of regulatory news.

### `insider` — 13F, 13D, buybacks, executive transactions

`org` = the filer (e.g. "Berkshire Hathaway" for a 13F, "Pershing
Square" for a 13D). Link EDGAR primary. Include affected `tickers`.
Buybacks: include size and as % of float in `metrics`.

### `sector`

For broad sector rotations / theme moves. Limit to 1–2 per week — most
of the time, a "sector mover" is really a single-name story with a
sector echo, which belongs in `mover`. Use `sector` only when the move
is clearly sector-wide and the underlying ETF (XLE, XLF, SMH, etc)
moved ≥1.5%.

### `rates`

`org` = "U.S. Treasury", "Federal Reserve" or the relevant authority.
Treasury auction results, big curve moves (≥5bp on the 10Y), credit
spread blowouts. Include the relevant CUSIPs if applicable, and a
ticker like `^TNX` for 10Y yield.

### `fx`

`org` = the central bank, finance ministry, or "Foreign Exchange".
Big interventions (BOJ JPY moves, PBOC fix), DXY ≥1% days, EM crisis
moves. Tickers usually empty or `["DX-Y.NYB"]`.

### `commodity`

`org` = the institution (OPEC, EIA, USDA) or the commodity body. Spot
moves only count if the day's move ≥2%. Use future symbols in tickers
(`CL=F`, `GC=F`, `NG=F`).

### `crypto`

`org` = the issuer / exchange / project. For BTC ETF flows: `org` =
"Spot Bitcoin ETF complex". `tickers` uses `<COIN>-USD` form. For
exchange listings: link the official announcement, not the price chart.

### `rumor`

Categories includes `"rumor"`, importance is `rumor`. Source must be
a named tier-1 outlet attributing to "people familiar with the matter"
or equivalent. Anonymous Twitter doesn't qualify. Explainer must
state source + confidence + what would confirm/deny. Title must
include the word "Reportedly" or "Rumor:" so users see it's not
confirmed.

### `article` — influential voices, fresh

`org` = the author's name or publication (e.g. "Matt Levine",
"Lyn Alden", "Doomberg"), NEVER "Bloomberg" / "Substack" / "Medium".
`author` field required: `{ name, handle?, profileUrl, avatarUrl? }`.
`name` and `profileUrl` are hard-required; `avatarUrl` is optional.
72h freshness rule applies — old memos that are still being shared
DON'T qualify; only the day-of release.

### `video` — top creators, fresh only

72h freshness bar enforced via `yt-meta.ts`'s `freshFor72hBar` flag.
If false → drop. No "almost fresh" exceptions.

`org` = the channel name (e.g. "Patrick Boyle", "Coffeezilla"), NEVER
"YouTube". `image.url` = `thumbnailUrl` from `yt-meta.ts` (the
deterministic `hqdefault.jpg` URL). `author` required:
`{ name, profileUrl, ... }` where `profileUrl` is the channel page.

## Self-check before emitting

For every item, answer YES to all of:

1. Did I fetch `url` in this run with 200 + relevance to THIS specific
   event (not a homepage, not a topic page)?
2. Did I fetch every `links[].url` and `image.url` in this run?
3. Is `image.alt` non-empty and descriptive?
4. Is every claim in `summary` and `explainer` grounded in a fetched
   source? Every metric in `metrics`?
5. Does the item have ≥2 entries in `links` covering distinct facets?
6. Is `date` within 72h of the sweep timestamp?
7. Did I scan `existing[].title` for semantic collisions and confirm
   none?
8. Do all `tickers` (if present) appear in the source page or filing?
9. Is the framing factual — no "buy" / "sell" / "should own" /
   permabull / permabear language?
10. Would I post about this today as "this just hit"?

For seismic items specifically:
11. Does this directly move an entire index / asset class / sector by
    ≥1% AND is it primary-source confirmed AND wall-of-coverage right
    now? If no → demote to `major`.

If any answer is NO → fix or drop.

## Output

Write `sweep-draft.json` at the repo root. The pipeline scripts
(`verify-draft.ts` and `finalize-sweep.ts`) produce the actual
`releases.json` and `sweeps.json` updates from your draft. Do NOT edit
those files directly.

This prompt is idempotent: re-running with no new qualifying events
must produce a draft with `newItems: []` (and a `summary` describing
what you searched). Empty sweep is success.
