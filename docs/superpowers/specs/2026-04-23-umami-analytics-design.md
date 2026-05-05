# Umami Analytics Events — Design

**Status:** approved
**Date:** 2026-04-23

## Goal

Track user interactions across AI/TLDR with Umami so we can answer:
which releases get opened, which external links get clicked, which
filters/sorts users actually touch, which sub-pages get used, and
whether conversion CTAs (subscribe, BMC) land.

Umami is already loaded in [index.html](../../../index.html) via
`https://analytics.pomegra.io/script.js`. This spec adds the event
instrumentation on top of the default pageview tracking Umami does
out of the box.

## Non-goals

- Custom session IDs or user identification (Umami is intentionally
  cookieless).
- Tracking PII — search query text is never sent; only length.
- Wrapping every link/button. Menu-open events, navigation-to-home,
  footer links, and other low-signal interactions are deliberately
  not tracked.

## Approach

### Single helper module

`src/lib/analytics.ts` exports one function:

```ts
export function track(name: string, data?: Record<string, unknown>): void
```

- Wraps `window.umami?.track(name, data)`.
- No-ops silently when `window.umami` isn't loaded (dev, adblock,
  first paint before script loads, SSR prerender).
- Declares the `Window.umami` global type in one place.

Rationale over inline `window.umami?.track(...)` calls: a single
typed entry point lets us swap providers later, add a dev-mode
console log, or drop a debug flag without touching every call site.

### Event naming

`<surface>:<action>`, lowercase, colon-separated. Properties are
small, typed, and PII-free.

## Event catalog

### Core engagement

| Event | Properties | Where |
|---|---|---|
| `release:open` | `{ id, category, importance, source: "card" \| "log" }` | `App.openModal`, `SweepLogPage.onOpenRelease` wrapper |
| `release:url-click` | `{ id, category, source: "card" \| "modal" }` | `ReleaseCard` external `<a>`, `ReleaseModal` primary link |
| `release:share` | `{ id, platform, source: "card" \| "modal" }` | `CardShareButton`, `ShareButtons` |
| `release:ask-ai` | `{ id, platform, source: "card" \| "modal" }` | `CardAskAIButton`, `AskAIButtons` |

### Feed controls

| Event | Properties | Where |
|---|---|---|
| `filter:toggle` | `{ category, active, totalActive }` | `App.toggle` |
| `search:used` | `{ length }` | `FilterBar` search input, debounced 600ms, fires once per query session when `length >= 2` |

### Navigation

| Event | Properties | Where |
|---|---|---|
| `nav` | `{ to: "feed" \| "influencers" \| "log", from }` | `App.goFeed`, `goInfluencers`, `goLog` |

### Conversions

| Event | Properties | Where |
|---|---|---|
| `subscribe:submit` | `{ ok: boolean }` | `Subscribe` form submit handler |
| `bmc:click` | — | `BuyMeCoffee` link |

### Sub-pages

| Event | Properties | Where |
|---|---|---|
| `influencer:click` | `{ id, platform }` | `InfluencersPage` profile tile |
| `log:load-more` | `{ page }` | `SweepLogPage` pagination button |

### Passive engagement

| Event | Properties | Where |
|---|---|---|
| `scroll:depth` | `{ depth: 25 \| 50 \| 75 \| 100, route }` | `useScrollDepth(route.kind)` in `App`, fires once per milestone per route |
| `heartbeat` | `{ seconds, route }` | `useHeartbeat(route.kind)` in `App`, every 15s while tab visible, 30min ceiling per route |

## Implementation notes

- **ReleaseCard vs ReleaseModal url-click:** both wrap the same
  external `<a href={item.url}>`. Each adds its own `onClick` that
  calls `track()` before the browser follows the link. Don't
  `preventDefault` — let navigation happen naturally.
- **Share / Ask-AI from card vs modal:** the inner `ShareButtons` /
  `AskAIButtons` components don't know their container. Pass
  `source: "card" | "modal"` as a prop so the track call has the
  right context. Existing `CardShareButton` / `CardAskAIButton`
  wrappers are already card-specific, so they can hardcode `"card"`.
- **Search debounce:** 600ms idle. Reset on every keystroke. Only
  fires when final length ≥ 2 chars. Implemented with a single
  `useEffect` + `setTimeout` in `FilterBar`.
- **No-op safety:** `track()` itself guards against missing
  `window.umami`, so call sites don't need any guard.
- **Scroll depth:** tracked on `window.scroll` (passive), measured as
  `(scrollY + innerHeight) / scrollHeight`. Max-reached depth only —
  scrolling back up doesn't re-fire. `route` dep on the hook resets
  the fired set per page so each route is measured independently.
- **Heartbeat:** single `setInterval(15s)` per route; the callback
  no-ops when `document.hidden`, so the `seconds` property reflects
  actual visible time rather than wall-clock time. 30-minute ceiling
  (120 beats) prevents runaway events from an abandoned tab.

## Files changed

- **New:** `src/lib/analytics.ts`
- **Modified:** `src/App.tsx`, `src/components/FilterBar.tsx`,
  `src/components/ReleaseCard.tsx`, `src/components/ReleaseModal.tsx`,
  `src/components/ShareButtons.tsx`, `src/components/CardShareButton.tsx`,
  `src/components/AskAIButtons.tsx`, `src/components/CardAskAIButton.tsx`,
  `src/components/InfluencersPage.tsx`, `src/components/SweepLogPage.tsx`,
  `src/components/Subscribe.tsx`, `src/components/BuyMeCoffee.tsx`

## Verification

- `bun run typecheck` passes
- Manual: open dev site with `window.umami` stubbed to `console.log`,
  click through feed / modal / influencers / log, confirm events
  fire with expected names and props.
