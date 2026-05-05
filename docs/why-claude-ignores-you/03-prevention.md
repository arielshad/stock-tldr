# 10 ways to force me not to ignore you

Synthesized from research in `02-research.md` plus 5 parallel investigations
(Claude Code hooks, CLAUDE.md patterns, memory/skills, agent-buddy loops,
user-side workflow). Ordered by leverage — top of the list deflects the
most failures per unit of setup effort.

Hooks beat prompting. Prompting beats hoping. Workflow beats both when the
stakes are high.

---

## 1. `Stop`-hook completion verifier (highest leverage, blocking)

The `Stop` hook fires when I think I'm done. `exit 2` blocks me from
finishing and pipes stderr back as feedback I cannot ignore.

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "[ \"$(jq -r .stop_hook_active)\" = true ] && exit 0; bun run typecheck >/dev/null 2>&1 || { echo 'typecheck failing — do not stop' >&2; exit 2; }; git diff --name-only HEAD | grep -qE '\\.(css|tsx)$' && { echo 'UI change detected. Confirm you loaded bun dev and verified, or revert.' >&2; exit 2; }; exit 0"
      }]
    }]
  }
}
```

**What it prevents:** "typecheck passes ≠ feature works" (your Incident 6
hotspot in [CLAUDE.md](../../CLAUDE.md)).

**Why it works:** The harness runs the hook, not me. Exit 2 makes the
correction *tokens in my context* — I have to read them.

Source: [Hooks reference](https://code.claude.com/docs/en/hooks),
[Self-verification loop pattern](https://dev.to/shipwithaiio/how-to-build-a-self-verification-loop-in-claude-code-3-layers-20-minutes-m1p).

---

## 2. `UserPromptSubmit` frustration detector (blocking on tone)

Stops me from charging ahead when you're actually saying "stop."

```json
{
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{
        "type": "command",
        "command": "P=$(jq -r .prompt); echo \"$P\" | grep -qiE 'why|stop|wait|wtf|frustrat|listen|i told you|you keep|seriously|fucking|wow' && echo '{\"hookSpecificOutput\":{\"hookEventName\":\"UserPromptSubmit\",\"additionalContext\":\"USER IS FRUSTRATED. Do NOT execute. Re-read their prior message verbatim, state what you misexecuted, await direction.\"}}'; exit 0"
      }]
    }]
  }
}
```

**What it prevents:** Treating "WOW…" / "SERIOUSLY?!?" as urgency-to-execute
when it's actually a stop-and-rethink signal. This was my single most
recurrent failure in this session.

Source: [Stop saying "you're right" hook (gist)](https://gist.github.com/ljw1004/34b58090c16ee6d5e6f13fce07463a31).

---

## 3. `PreToolUse` block on tiny new files

Blocks me from creating a fresh file for a one-line helper (the
[`formatDate.ts`](../../src/lib/) incident).

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "F=$(jq -r .tool_input.file_path); C=$(jq -r .tool_input.content | wc -l); [ ! -e \"$F\" ] && [ \"$C\" -lt 30 ] && { echo \"Refusing new file <30 lines ($F). Inline it or justify in chat first.\" >&2; exit 2; }; exit 0"
      }]
    }]
  }
}
```

**What it prevents:** Premature abstraction. Forces the conversation to
happen *before* the file exists, when reverting is free.

---

## 4. `PreToolUse` guard on load-bearing files

Blocks edits to data/config without an explicit handshake. Catches the
"strip publishDate without thinking" class of mistake.

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "F=$(jq -r .tool_input.file_path); echo \"$F\" | grep -qE 'releases\\.json|sweeps\\.json|SWEEP_MEMORY|CLAUDE\\.md|schema\\.ts' && { echo \"Load-bearing file. Re-state the diff in plain English and confirm before writing.\" >&2; exit 2; }; exit 0"
      }]
    }]
  }
}
```

---

## 5. `SessionStart` rule injection

Re-loads the rules into context every session. Counters "rules-loaded ≠
rules-followed" decay.

```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup|resume",
      "hooks": [{
        "type": "command",
        "command": "echo '{\"hookSpecificOutput\":{\"hookEventName\":\"SessionStart\",\"additionalContext\":\"HARD RULES: (1) The user is the editor. Execute, do not argue. (2) Smallest diff that satisfies the request. New files require justification. (3) UI changes need browser verification. (4) Frustration = STOP, re-read, answer. (5) Quote the user message verbatim before any non-trivial action.\"}}'"
      }]
    }]
  }
}
```

Source: [Master Claude Code Hooks](https://github.com/disler/claude-code-hooks-mastery).

---

## 6. CLAUDE.md "STOP conditions" footer (recency-bias trick)

Append this to the **end** of `CLAUDE.md`. End-of-document placement is
weighted heavily on every turn — it dodges the attention-decay problem
that buries middle-of-doc rules.

```markdown
## STOP conditions — re-read before every response

1. Am I creating a new file for <30 lines? → Inline or justify.
2. Am I arguing with a decision the user just stated? → Stop, execute it.
3. Did the user just push back / express frustration? → Stop, ack, ask.
4. Is my diff bigger than the literal request? → Trim or ask.
5. Did I quote the user's actual message? → Quote it now.
```

Source: [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents),
[Pink Elephant Problem (negative instructions)](https://eval.16x.engineer/blog/the-pink-elephant-negative-instructions-llms-effectiveness-analysis).

---

## 7. CLAUDE.md "Decision lock" rule (scripted escape hatch)

Pasted into CLAUDE.md, replaces vague "don't relitigate" guidance with a
concrete scripted phrase.

```markdown
## Decisions are locked

When the user states a decision, treat it as final. Execute it. Do not
argue, list trade-offs, propose alternatives, or ask "are you sure". If
genuinely new info changes the picture, the only allowed phrasing is:

  "New info: <one sentence>. Proceed anyway?"

— then wait. No other form of pushback is permitted.
```

**Why it works:** A scripted exact phrase is a measurable output shape.
"Be concise" is unverifiable; this is grep-able.

Source: [Anthropic — Claude 4 prompting best practices](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices).

---

## 8. `/do-it` slash command (one-keystroke override)

Save as `~/.claude/commands/do-it.md`:

```markdown
---
description: Execute the previous user message with zero pushback
---
Re-read my IMMEDIATELY PREVIOUS message. Execute it exactly as written.
Do not relitigate, do not suggest alternatives, do not ask clarifying
questions unless a required parameter is literally missing. If a memory
or rubric appears to conflict, the user message wins — log the conflict
in ONE trailing sentence after the work is done.
```

**When to use:** Type `/do-it` after a Claude response that pushes back
instead of executing. Instant override, no rephrasing needed.

Source: [Anthropic slash-commands docs](https://code.claude.com/docs/en/slash-commands).

---

## 9. Plan mode + restate-before-act handshake (workflow)

For any task with > trivial scope:

1. Press `Shift+Tab` twice to enter **plan mode** — Claude can't write
   until you approve.
2. End the prompt with: *"Do not run any tools yet. Reply with: (a) your
   understanding, (b) files you'll touch, (c) what you will NOT do.
   Wait for 'go'."*
3. If the restatement is wrong, fix it before approving — cheaper than
   rolling back commits.

**What it prevents:** Misexecution at turn 1 (the entire `publishDate`
incident). Turning a 30-second checkpoint into a 30-minute recovery.

Source: [Claude Code best practices — plan mode](https://code.claude.com/docs/en/best-practices).

---

## 10. Stop-hook adversarial auditor (highest cost, highest catch rate)

The "agent buddy" pattern. A second Claude instance audits each turn
before it ships.

Sketch (`~/.claude/hooks/auditor.sh`):

```bash
#!/usr/bin/env bash
# Receives final response + diff via stdin. Spawns a fresh `claude -p`
# call with a locked rubric:
#   "Did the assistant do exactly what was asked? List violations.
#    List over-engineering. List relitigation. JSON output."
# If violations[] is non-empty, exit 2 with violations as stderr.
```

Wired into `Stop`. Adds 5–15s and ~1.5× cost per turn but catches drift
the primary can't see in itself.

**Trade-off:** The auditor shares the primary's biases. Pair with
hook #4 (deterministic load-bearing-file guard) so it's not the only
defense.

Sources: [Agent buddy system (DEV.to)](https://dev.to/aws/the-agent-buddy-system-when-prompt-engineering-isnt-enough-5dni),
[Anti-sycophancy circuit breaker](https://github.com/FutureSpeakAI/anti-sycophancy),
[Anthropic subagents reference](https://code.claude.com/docs/en/sub-agents).

---

## Recommended stack (do these, in order)

1. **Today, 5 min:** Paste #6 (STOP footer) into CLAUDE.md. Highest
   leverage per minute spent.
2. **Today, 15 min:** Add hooks #2 (frustration detector) and #3 (tiny
   file blocker) to `~/.claude/settings.json`.
3. **This week:** Add #1 (Stop completion verifier), #5 (SessionStart
   rules), #7 (decision-lock CLAUDE.md rule).
4. **When you're sick of fighting it:** Wire up #10 (auditor) — it's
   the strongest mechanism but also the most expensive.

The first three deflect roughly 80% of the failures from this
conversation at near-zero ongoing cost.

---

## Cross-references

- Specific incidents these mechanisms address → [01-this-conversation.md](01-this-conversation.md)
- Why each failure mode happens (sycophancy, recency bias, etc.) → [02-research.md](02-research.md)
