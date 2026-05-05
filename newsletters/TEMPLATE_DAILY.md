# AI/TLDR Daily Digest Template

Optimized for **Buttondown + Gmail mobile/web**. Changes from v1:

- **No outer header block** — Buttondown's Classic wrapper handles the title, so we start straight with cards. Avoids triple-header duplication in the delivered email.
- **Fluid widths** — `width="100%"` with `max-width` in inline style only. The old `width="600"` HTML attribute caused Gmail Android to render at 600px then scale down (the "zoomed-out tiny text" effect).
- **Fluid images** — removed fixed `height: 220px` + `object-fit: cover`. Gmail mobile doesn't reliably honor `object-fit`, so fixed height blows out aspect ratio. Use `height: auto` and let the real image dimensions drive layout.
- **Inline-block badges** — replaced the nested badge `<table>` with `inline-block` spans. Gmail mobile sometimes stacks nested table cells vertically, producing the "lots of tiny containers" look.
- **Tighter padding** — `16px 8px` outer, `16px` card (was `32px 16px` / `20px`). Buttondown adds its own outer padding, so ours should be modest.
- **Explainer text halved** — the agent writes `whatIsIt`/`howItWorks`/`whyItMatters`/`forWho` short. Target: 1–2 short sentences each in the newsletter (the full long-form lives on the website card).
- **System monospace fallback** — `Menlo, Consolas, monospace` instead of `JetBrains Mono` (not a web-safe font; Gmail falls back to default anyway).

## Structure

Start directly with the HTML tables — no markdown title, no outer header row.

```html
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#050505" style="background-color: #050505;">
<tr>
<td align="center" style="padding: 16px 8px;">

<table width="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">

{CARDS}

<!-- FOOTER -->
<tr>
<td style="padding-top: 32px; border-top: 2px solid #f5f5f0; text-align: center;">
<p style="margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #f5f5f0;">All releases at <a href="https://ai-tldr.dev" style="color: #f7ff00; text-decoration: none;">ai-tldr.dev</a></p>
<p style="margin: 0; font-size: 14px; color: #8a8a85;">Simple explanations • No jargon • Updated daily</p>
</td>
</tr>

</table>
</td>
</tr>
</table>

<!-- Open-tracking pixel (pomegra analytics). Must be the last element in the body. -->
<img src="https://analytics.pomegra.io/p/iVFoPRUpT" width="1" height="1" alt="" style="display:none" border="0">
```

## Card Template

```html
<!-- CARD: {TITLE} -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<!-- Image row (omit if no image) -->
<tr>
<td>
<img src="{IMAGE_URL}" alt="{ALT}" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<!-- Badges: inline-block spans, not a nested table -->
<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">{CATEGORY}</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: {IMP_BG}; color: {IMP_FG}; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">{IMPORTANCE}</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">{DATE}</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">{TITLE}</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">{TAGLINE}</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
{WHAT_IS_IT_SHORT}
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
{HOW_IT_WORKS_SHORT}
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
{WHY_IT_MATTERS_SHORT}
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
{FOR_WHO_SHORT}
</p>

<!-- Card footer -->
<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">{ORG}</td>
<td align="right"><a href="{URL}" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>
```

## Design Tokens (Dark Theme)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | #050505 | Main background |
| `--bg-2` | #0e0e0e | Card background |
| `--bg-3` | #181818 | Badge background |
| `--fg` | #f5f5f0 | Primary text |
| `--muted` | #8a8a85 | Secondary text, taglines |
| `--line` | #f5f5f0 | Card borders |
| `--line-dim` | #2a2a28 | Internal dividers |
| `--acc` | #f7ff00 | Yellow accent (links, labels) |

## Importance Badge Colors

| Importance | Background (`{IMP_BG}`) | Text (`{IMP_FG}`) |
|------------|-------------------------|-------------------|
| MAJOR | #f7ff00 | #050505 |
| NOTABLE | #181818 | #f5f5f0 |
| SEISMIC | #f7ff00 | #050505 |
| NEW | #00f0a8 | #050505 |
| SECURITY | #ff0040 | #ffffff |

## Fonts

- **Body:** Inter, -apple-system, BlinkMacSystemFont, sans-serif
- **Badges/CTAs:** Menlo, Consolas, monospace

## Rules

1. **Classic template in Buttondown** — Modern template prepends a duplicate masthead we can't hide on the free plan. Switch via [buttondown.com/settings/email](https://buttondown.com/settings/email).
2. **No outer header block** — Buttondown's Classic wrapper already carries the title.
3. **Single column** — 600px max width via inline style, centered.
4. **Short explainers** — 1–2 sentences per `What/How/Why/Who` block. The full long-form version lives on the website card ([ai-tldr.dev](https://ai-tldr.dev)).
5. **All links active** — Never mention a tool without linking it.
6. **Omit image row if none available** — don't leave broken `<img>` tags.
7. **5–8 cards** — pick most important recent releases.
8. **No border-radius** — brutalist aesthetic.
9. **No markdown header** — start directly with `<table>`.
10. **No HTML attribute widths** — always `width="100%"` + `max-width` in inline style. Gmail Android scales down fixed-px widths.

## Content Mapping

From `releases.json` item:

| Field | Source | Notes |
|-------|--------|-------|
| IMAGE_URL | `item.image.url` | |
| ALT | `item.image.alt` | |
| CATEGORY | `item.categories[0]` (uppercase) | |
| IMPORTANCE | `item.importance` (uppercase) | |
| DATE | `item.date` | |
| TITLE | `item.title` | |
| TAGLINE | `item.explainer.tagline` | |
| WHAT_IS_IT_SHORT | First 1–2 sentences of `item.explainer.whatIsIt` | |
| HOW_IT_WORKS_SHORT | First 1–2 sentences of `item.explainer.howItWorks` | |
| WHY_IT_MATTERS_SHORT | First 1–2 sentences of `item.explainer.whyItMatters` | |
| FOR_WHO_SHORT | First 1–2 sentences of `item.explainer.forWho` | |
| ORG | `item.org` | |
| URL | `item.url` | |

## Subject line

Use Buttondown's subject as the headline. Convention: `AI/TLDR Daily Digest — <Month> <Day>, <Year>` (em dash). It shows as the big title in the Classic wrapper, so make it descriptive.

## Example

See: `newsletters/daily/2026_04_18_daily_digest.md` (after v3 transforms applied).
