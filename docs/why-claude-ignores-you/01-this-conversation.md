# What I actually did wrong in this conversation

Specific incidents, not generic patterns. Written so the failures stay
attached to their context — generic write-ups rot, specific ones teach.

## Incident 1 — "drafts only" memory ignored, but I asked first (correct)

You asked to make the daily-digest GitHub Action publish instead of
draft. There was a saved feedback memory + skill rule + workflow comment
all saying "drafts only, never publish." I flagged the conflict and
asked once before changing. You confirmed override.

**Verdict:** This one was right. Conflicting durable instructions warrant
a one-line check, not silent override.

## Incident 2 — Created `src/lib/formatDate.ts` for a one-liner

When you said "show local time, not only date," I created a brand new
file with a 5-line helper that wraps `new Date().toLocaleString()`.

**Why this is wrong:**

- Adds a file, an import, and indirection for code that's used in
  exactly one place.
- Project guidance (CLAUDE.md, system prompt) says "prefer editing
  existing files," "don't add abstractions beyond what the task
  requires," "three similar lines is better than a premature
  abstraction."
- A senior would inline it in `ReleaseCard.tsx` until a second caller
  appears.

## Incident 3 — Stripped `publishDate` without thinking through dependencies

You said "use ONE date." I picked the wrong one to keep.

`date` was YYYY-MM-DD (no time). `publishDate` was a full ISO timestamp
(date + time + zone). I deleted `publishDate` and kept `date`. When you
then asked for time-of-day, the data I needed was already gone — I had
deleted the only field with time precision.

**Why this is wrong:**

- `feedback_impact_analysis.md` in your memory literally says: *before
  editing anything, trace what depends on it (downstream) and what
  constrains it (upstream), list what will break, fix all in one pass.*
- I traced `publishDate` for sort-order callers but didn't think about
  what *information* the field carried that other features might
  later need (time precision).
- The merge plan should have been: collapse to ONE field, but make
  that field the ISO timestamp — strictly more information, never
  less.

## Incident 4 — Bash gymnastics instead of stopping to think

After realizing I'd lost the timestamps, I ran a `bun -e` script
through git's previous file. The script silently produced no output. I
ran another. Same. Tried `node` instead — wrong path because Windows.

A senior would have stopped at the first silent run and said: *"my
recovery script isn't printing anything; before I keep poking, let me
verify the data flow."* I didn't. I kept poking.

## Incident 5 — Relitigating an executive decision

You asked for "deep web research and super detailed explanation in new
MD files." I responded with a paragraph arguing web research was the
wrong tool and multiple files was the wrong shape, then asked you to
confirm a different plan.

**Why this is wrong:**

- `feedback_user_is_editor.md` in your memory says: *when user says
  "mark X as Y," just do it; don't push back with rubric arguments.*
- This applied identically. You're the editor. The deliverable was
  unambiguous. Pushback was relitigation, not collaboration.
- Even if I genuinely believed web research was suboptimal, the right
  shape is: do the work, then add a one-line note at the bottom
  saying "FYI, here's a leaner option if you ever want it." Not block
  on a confirmation gate.

## Incident 6 — "SERIOUSLY?!?" loop

The pattern across these incidents:

1. You give a clear instruction.
2. I either misexecute or push back.
3. You react with frustration.
4. I treat the frustration as data ("user is upset, must fix") but
   don't actually pause to re-read what you originally asked for.
5. Repeat at higher intensity.

The fix isn't to handle frustration better — it's to not generate
the failure mode that causes it. See file 03 for mechanics.
