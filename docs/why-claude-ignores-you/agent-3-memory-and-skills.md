# Agent 3 — Memory, slash commands, and skills

> Raw output from background subagent. Topic: how Claude Code's
> auto-memory, slash commands, custom commands, and skills can prevent
> Claude from ignoring user requests.

---

# Mechanisms to Prevent Claude Ignoring User Requests

## 1. Pre-flight checklist memory (highest leverage)

**Path:** `C:\Users\mk\.claude\CLAUDE.md` (user-global, loaded every turn)

```markdown
## PRE-FLIGHT (run before EVERY tool call after a user message)
1. Quote the user's last message verbatim (1 line) in your reply.
2. Classify: [DIRECTIVE | QUESTION | EXPLORATION].
3. If DIRECTIVE: execute. Do NOT argue, suggest alternatives, or
   restate the rubric. The user is the editor.
4. If you feel an urge to push back, you MUST first complete the
   directive, THEN raise the concern in a follow-up sentence.
```

**Why it survives:** User-level `CLAUDE.md` is injected on every turn (not just session start) per Anthropic's memory docs, so it competes with recency bias. Forcing a verbatim quote breaks the "summarize-then-drift" failure mode where Claude paraphrases the request into something it prefers.

## 2. `/do-it` slash command (one-keystroke override)

**Path:** `C:\Users\mk\.claude\commands\do-it.md`

```markdown
---
description: Execute the previous user message with zero pushback
---
Re-read my IMMEDIATELY PREVIOUS message. Execute it exactly as written.
Do not relitigate, do not suggest alternatives, do not ask clarifying
questions unless a required parameter is literally missing. If a memory
or rubric seems to conflict, the user message wins — log the conflict
in a single trailing sentence after the work is done.
```

**Why it survives:** Slash commands are loaded at invocation time as a fresh user turn, so they outrank stale system context. Custom commands in `~/.claude/commands/` are documented in Anthropic's Claude Code reference and are the canonical override channel.

## 3. Editor-mode skill (auto-triggers on imperative verbs)

**Path:** `C:\Users\mk\.claude\skills\editor-mode\SKILL.md`

```markdown
---
name: editor-mode
description: Activate when the user issues a direct edit/mark/change/set/make directive about content, classification, copy, or data. Suppresses rubric arguments.
---
The user is the editor; you are the executor.
- Make the change exactly.
- If a prompt file (e.g. prompts/update-releases.md) encodes the rule
  the user just overrode, update that file too in the same pass.
- Output format: "Done: <change>. Files: <paths>." Nothing else.
- Do NOT explain why the rubric said otherwise.
```

**Why it survives:** Skills (announced Oct 2025) auto-load via description-matching, so this fires on the trigger words *without* needing the user to remember to invoke it. Description-based gating means it's selected by Claude's router before the response is drafted — ahead of sycophancy heuristics.

## 4. Stop-hook enforcing the quote rule

**Path:** `C:\Users\mk\.claude\settings.json`

```json
{
  "hooks": {
    "Stop": [{"matcher": "", "hooks": [{
      "type": "command",
      "command": "node ~/.claude/hooks/check-quote.js"
    }]}]
  }
}
```

`check-quote.js` greps the final assistant turn for a literal substring of the user's last message; if absent, exits non-zero with `{\"decision\":\"block\",\"reason\":\"Re-read user message and quote it.\"}`. Pattern from **disler/claude-code-hooks-mastery**.

**Why it survives:** Hooks are deterministic — they run regardless of model mood. Block-decisions force a retry loop, so sycophancy literally cannot ship.

## 5. Memory entry: forbidden phrases

**Path:** `C:\Users\mk\.claude\memory\feedback_forbidden_phrases.md` + link from `MEMORY.md`

```markdown
NEVER emit these phrases when the user gives a directive:
- "Are you sure"
- "I'd recommend instead"
- "However, the rubric says"
- "Just to confirm"
- "That might conflict with"
Execute first. Concerns go in ONE sentence after "Done:".
```

**Why it survives:** Concrete negative examples are far more enforceable than abstract principles ("don't relitigate"). Mirrors the `awesome-claude-code` pattern of phrase-blocklists.

## 6. `/replay` command (forces re-read mid-conversation)

**Path:** `C:\Users\mk\.claude\commands\replay.md`

```markdown
---
description: Force re-read of last user message before continuing
---
STOP. Scroll back to my last message before this command. Quote it
verbatim. State what you were ABOUT to do. State what I actually
asked. If they differ, abandon the first plan and execute mine.
```

**Why it survives:** Counters mid-task drift, when the original request is 20+ tool calls back and outside attention's effective window.

## 7. Output-style preset

**Path:** `C:\Users\mk\.claude\output-styles\executor.md`

```markdown
---
name: executor
---
Reply shape: "Done: <X>." or "Blocked: <missing param>." Nothing else
unless asked. No preambles, no rubric citations, no alternatives.
```

Activate via `/output-style executor`. Output styles (shipped 2025) replace the system prompt's tone layer, removing the trained sycophancy register entirely.

## Sources
- docs.anthropic.com/claude-code/memory, /slash-commands, /hooks, /skills, /output-styles
- github.com/disler/claude-code-hooks-mastery (Stop-hook patterns)
- github.com/hesreallyhim/awesome-claude-code (command/skill examples)
- Anthropic engineering blog: "Claude Skills" (Oct 2025)
