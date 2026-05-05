---
name: daily-digest
description: Generate daily newsletter digest for Buttondown subscribers. Triggers when user says "daily digest", "newsletter", "generate digest", or similar.
---

# Daily Digest Skill

Generates a daily AI/TLDR newsletter digest in dark brutalist style matching the website.

## When to use

Use this skill when the user asks to:
- "Generate daily digest"
- "Create newsletter"
- "Daily digest"
- "Newsletter for today"
- "Generate digest for [date]"

## Output location

Save generated digests to:
```
newsletters/daily/{YYYY}_{MM}_{DD}_daily_digest.md
```

Example: `newsletters/daily/2026_04_15_daily_digest.md`

## Before generating

1. **Check if today's digest exists:**
   ```bash
   # UTC matches the GH Actions workflow — a local run late evening in
   # a positive-offset timezone would otherwise look for tomorrow's file.
   ls newsletters/daily/$(date -u +%Y_%m_%d)_daily_digest.md 2>/dev/null
   ```

2. **If exists, ask user what to do:**
   Use `AskUserQuestion` tool with options:
   - `overwrite` - Replace existing digest
   - `append` - Add new releases to existing digest
   - `cancel` - Do nothing

## Generation steps

1. **Read recent releases:**
   - Read `src/data/releases.json`
   - Filter to releases from last 1-3 days
   - Pick 5-8 most important (seismic > major > notable)

2. **Read template:**
   - Reference `newsletters/TEMPLATE_DAILY.md` for structure and design tokens

3. **Generate content:**
   - Use dark theme with `bgcolor` tables (email-safe)
   - Single column, 600px max width
   - Include full explainer content (whatIsIt, howItWorks, whyItMatters, forWho)
   - All tool/product mentions must have active links
   - No markdown header — start directly with `<table>`

4. **Write to file:**
   - Save to `newsletters/daily/{YYYY}_{MM}_{DD}_daily_digest.md`

## Card content mapping

From `releases.json` item — use FULL content, not simplified:

| Card Field | Source |
|------------|--------|
| IMAGE_URL | `item.image.url` |
| CATEGORY | `item.categories[0]` (uppercase) |
| IMPORTANCE | `item.importance` (uppercase) |
| DATE | `item.date` |
| TITLE | `item.title` |
| TAGLINE | `item.explainer.tagline` |
| WHAT_IS_IT | `item.explainer.whatIsIt` (full text) |
| HOW_IT_WORKS | `item.explainer.howItWorks` (full text) |
| WHY_IT_MATTERS | `item.explainer.whyItMatters` (full text) |
| FOR_WHO | `item.explainer.forWho` (full text) |
| ORG | `item.org` |
| URL | `item.url` |

## Design tokens

- Background: #050505
- Card background: #0e0e0e
- Text: #f5f5f0
- Muted: #8a8a85
- Accent: #f7ff00
- Fonts: Inter (body), JetBrains Mono (badges/CTAs)

## Important rules

- **Dark theme** — Use `bgcolor` on tables for email compatibility
- **Full content** — Include complete What/How/Why/For paragraphs
- **All links active** — Never mention a tool without a link
- **Use real images** — From releases.json, or omit image row
- **5-8 cards** — Pick the most important releases
- **No border-radius** — Brutalist aesthetic
- **No markdown header** — Start with `<table>` directly

## After generating

1. Tell user the digest was created
2. Provide the file path
3. Commit and push if running in CI
