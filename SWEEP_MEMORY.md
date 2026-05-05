# SWEEP_MEMORY.md — Stock/TLDR Sweep History

Persistent log of sweep-agent tunings: what we tried, what failed, what
stuck, and why. The agent reads this BEFORE every sweep and BEFORE any
prompt change. Append-only — never delete entries, only mark them
superseded with a forward-link.

## Why this file exists

The sweep agent has historically had a few canonical failure modes:

1. **Padding** — "this category is empty, let me add something okay-ish"
   to fill perceived gaps. The fix is always: empty sweep is success.
2. **Stale items** — adding items whose `date` is older than the 72h cap
   because they're "still trending." `finalize-sweep.ts` enforces the
   cap; the agent must not try to bypass it.
3. **Semantic dedup misses** — the same news with two different titles +
   URLs slipping in twice. Hard rule 3 in the prompt is on the agent.
4. **Hallucinated tickers / numbers** — making up an EPS print or deal
   size to fill a metric. Zero hallucination.

When a new failure mode shows up, append a new entry below describing
the trigger, the root cause, the fix, and the status. Future sweeps
will see it.

## Format

Each entry:

```
### YYYY-MM-DD-<letter> — <short title>

**Trigger**: what happened that surfaced the issue.
**Root cause**: why it happened.
**Fix**: what we changed (file + concrete change).
**Status**: open / shipped / superseded by YYYY-MM-DD-<letter>.
```

## Entries

### 2026-05-05-A — Bootstrap

**Trigger**: Stock/TLDR forked from the AI/TLDR codebase. Empty feed,
fresh schema, finance-focused agent prompt.
**Root cause**: N/A — bootstrap entry.
**Fix**: Schema + categories + prompt rewritten for markets domain;
empty `releases.json` and `sweeps.json`; SWEEP_MEMORY history reset.
**Status**: shipped.
