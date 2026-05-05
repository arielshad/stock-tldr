---
name: buttondown
description: Create, update, list, and delete Buttondown email drafts via API. Triggers when user says "send to buttondown", "create draft", "upload newsletter", "buttondown draft", or similar. DRAFTS ONLY — never publishes.
---

# Buttondown Skill

Push a local newsletter markdown file into Buttondown as a **draft**. The user reviews and publishes manually from the Buttondown UI — this skill never sends, schedules, or publishes.

## Hard rule — drafts only

Every `POST` or `PATCH` to `/v1/emails` MUST set `"status": "draft"`. Do not use `"about_to_send"`, `"scheduled"`, or any other value. If the user explicitly asks to "send" or "schedule," stop and confirm first — "create a newsletter" / "upload" / "push to Buttondown" always means draft.

## Auth

The API token lives in the `BUTTONDOWN_TOKEN` environment variable. Never hardcode it, never write it to a file, never echo it.

```bash
# User sets this once in their shell profile:
export BUTTONDOWN_TOKEN='<their-token>'
```

If `BUTTONDOWN_TOKEN` is unset, abort and ask the user to set it. Do not prompt for the token inline — that would leak it into chat history.

## Create a draft from a markdown file

```bash
bun -e '
const fs = require("fs");
const path = process.argv[1]; // passed via --
const body = fs.readFileSync(path, "utf8");
const subject = process.env.SUBJECT;
const res = await fetch("https://api.buttondown.email/v1/emails", {
  method: "POST",
  headers: {
    "Authorization": "Token " + process.env.BUTTONDOWN_TOKEN,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    subject,
    body,
    status: "draft",
    email_type: "public"
  })
});
console.log(res.status, await res.text());
' -- newsletters/daily/2026_04_18_daily_digest.md
```

Invoke with:

```bash
SUBJECT='AI/TLDR Daily Digest — April 18, 2026' bun -e '...' -- <markdown-path>
```

A successful call returns `201` and a JSON payload including `id` (e.g. `em_...`) and `absolute_url` (the preview URL on buttondown.com). Report both back to the user so they can open and publish from the UI.

## Subject line convention

For AI/TLDR daily digests, use: `AI/TLDR Daily Digest — <Month> <Day>, <Year>` (em dash, not hyphen). Match the date displayed inside the markdown header.

## Update an existing draft

If the user edits the markdown and wants to re-upload, **update the existing draft** rather than creating a new one — otherwise duplicates pile up.

```bash
# PATCH /v1/emails/<id>
curl -X PATCH "https://api.buttondown.email/v1/emails/<id>" \
  -H "Authorization: Token $BUTTONDOWN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"body": "...", "subject": "...", "status": "draft"}'
```

If the user doesn't tell you the id, list recent drafts first (see below) and ask which one to update.

## List recent drafts

```bash
curl -s "https://api.buttondown.email/v1/emails?status=draft&ordering=-creation_date" \
  -H "Authorization: Token $BUTTONDOWN_TOKEN" | \
  bun -e 'const d = await Bun.stdin.json(); for (const e of d.results.slice(0,10)) console.log(e.id, "|", e.subject);'
```

## Delete a draft

Only with explicit user confirmation — deletion is irreversible.

```bash
curl -X DELETE "https://api.buttondown.email/v1/emails/<id>" \
  -H "Authorization: Token $BUTTONDOWN_TOKEN"
```

## Typical flow

1. User: "push today's digest to Buttondown"
2. Skill: locate today's file under `newsletters/daily/YYYY_MM_DD_daily_digest.md`
3. Skill: `POST /v1/emails` with `status: "draft"` and the file contents
4. Skill: report back the `id` and `absolute_url`
5. User reviews in Buttondown UI and publishes manually

## Troubleshooting

- **401 Unauthorized** — `BUTTONDOWN_TOKEN` is missing, wrong, or revoked.
- **400 with `subject already exists`** — a draft with the same subject is already there; switch to PATCH on the existing id.
- **422 validation error** — check that `status` is `"draft"` and `email_type` is `"public"` (or `"premium"` / `"free"` if that's the plan).
- **Body renders with literal `\r\n`** — Buttondown accepts raw HTML/markdown; don't double-escape. Read the file as UTF-8 text and pass through `JSON.stringify`.
