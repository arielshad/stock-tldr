---
name: daily-digest
description: Generate daily Stock/TLDR newsletter digest for Resend subscribers. Triggers when user says "daily digest", "newsletter", "generate digest", or similar.
---

# Daily Digest Skill

Generates a daily Stock/TLDR newsletter digest in dark brutalist style matching the website. Output is raw HTML inside a `.md` file, ready to be uploaded as a Resend Broadcast (the `daily-digest.yml` workflow does the upload as a draft).

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

Example: `newsletters/daily/2026_05_06_daily_digest.md`

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
   - Filter to releases from last 1–3 days
   - Pick 5–8 most important (seismic > major > notable)

2. **Read template:**
   - Reference `newsletters/TEMPLATE_DAILY.md` for structure, header/footer blocks, and design tokens

3. **Generate content:**
   - Open with the header block (Stock/TLDR · Daily Digest + display date)
   - Use dark theme with `bgcolor` tables (email-safe)
   - Single column, 600px max width
   - Include short explainers (1–2 sentences per What/How/Why/Who)
   - All tool/product/ticker mentions must have active links
   - End with the unsubscribe footer containing the literal placeholder `{{{RESEND_UNSUBSCRIBE_URL}}}`

4. **Write to file:**
   - Save to `newsletters/daily/{YYYY}_{MM}_{DD}_daily_digest.md`

## Card content mapping

From `releases.json` item — use SHORT content (first 1–2 sentences):

| Card Field | Source |
|------------|--------|
| IMAGE_URL | `item.image.url` |
| CATEGORY | `item.categories[0]` (uppercase) |
| IMPORTANCE | `item.importance` (uppercase) |
| DATE | `item.date` |
| TITLE | `item.title` |
| TAGLINE | `item.explainer.tagline` |
| WHAT_IS_IT_SHORT | First 1–2 sentences of `item.explainer.whatIsIt` |
| HOW_IT_WORKS_SHORT | First 1–2 sentences of `item.explainer.howItWorks` |
| WHY_IT_MATTERS_SHORT | First 1–2 sentences of `item.explainer.whyItMatters` |
| FOR_WHO_SHORT | First 1–2 sentences of `item.explainer.forWho` |
| ORG | `item.org` |
| URL | `item.url` |

## Design tokens

- Background: #050505
- Card background: #0e0e0e
- Text: #f5f5f0
- Muted: #8a8a85
- Accent: #f7ff00
- Fonts: Inter (body), Menlo/Consolas (badges/CTAs)

## Important rules

- **Dark theme** — Use `bgcolor` on tables for email compatibility
- **Short explainers** — 1–2 sentences each; full long-form lives on the website
- **All links active** — Never mention a tool/ticker without a link
- **Use real images** — From releases.json, or omit image row
- **5–8 cards** — Pick the most important releases
- **No border-radius** — Brutalist aesthetic
- **Header + unsubscribe footer required** — Resend doesn't add a wrapper
- **`{{{RESEND_UNSUBSCRIBE_URL}}}`** — literal three-brace placeholder in the footer link

## After generating

1. Tell user the digest was created
2. Provide the file path
3. Commit and push if running in CI — the `daily-digest.yml` workflow then uploads the file as a Resend Broadcast in DRAFT state for the user to review at https://resend.com/broadcasts
