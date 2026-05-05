# Agent 1 — Hooks-based prevention mechanisms

> Raw output from background subagent. Topic: Claude Code's hook system
> (UserPromptSubmit, PreToolUse, PostToolUse, Stop, SubagentStop,
> PreCompact, SessionStart) as enforcement against ignore-the-user
> behavior.

---

# Claude Code Hooks: Preventing Ignore-the-User Behavior

Hooks are shell commands the **harness** (not Claude) executes at lifecycle events. Because Claude can't bypass them, they're the right tool for "you keep doing X — stop." The key lever is **exit code 2**: on `PreToolUse`, `UserPromptSubmit`, `Stop`, and `SubagentStop`, exit 2 **blocks the action and pipes stderr back into Claude's context as feedback**. Configure in `~/.claude/settings.json` or `.claude/settings.json`.

## 1. UserPromptSubmit — frustration detector

**Prevents:** Misreading user frustration ("WHY did you do X??") as urgency to keep coding. Injects a forced pause.

```json
{ "hooks": { "UserPromptSubmit": [{ "hooks": [{ "type": "command",
  "command": "P=$(jq -r .prompt); echo \"$P\" | grep -qiE 'why|stop|wait|wtf|frustrat|listen|i told you|you keep' && echo '{\"hookSpecificOutput\":{\"hookEventName\":\"UserPromptSubmit\",\"additionalContext\":\"USER IS FRUSTRATED OR ASKING A QUESTION. Do NOT execute. Answer the question first, summarize what you did wrong, await direction.\"}}'; exit 0"
}]}]}}
```

## 2. PreToolUse on Write — block new helper files

**Prevents:** Creating new files for one-line helpers instead of editing existing ones.

```json
{ "hooks": { "PreToolUse": [{ "matcher": "Write", "hooks": [{ "type": "command",
  "command": "F=$(jq -r .tool_input.file_path); C=$(jq -r .tool_input.content | wc -l); [ ! -e \"$F\" ] && [ \"$C\" -lt 30 ] && { echo \"Refusing to create new file <30 lines ($F). Add to an existing module or justify in chat first.\" >&2; exit 2; }; exit 0"
}]}]}}
```

## 3. PreToolUse on Edit — guard load-bearing data

**Prevents:** Stripping data without thinking (e.g., dropping fields from `releases.json`).

```json
{ "hooks": { "PreToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command",
  "command": "F=$(jq -r .tool_input.file_path); echo \"$F\" | grep -qE 'releases\\.json|SWEEP_MEMORY|CLAUDE\\.md' && { echo \"This file is load-bearing. Confirm with the user BEFORE writing. Re-read it, state the diff in plain English, wait.\" >&2; exit 2; }; exit 0"
}]}]}}
```

## 4. PreToolUse — relitigation blocker

**Prevents:** Arguing with a decision the user already made. Triggers when Claude tries a long Bash explanation right after the user said "just do it."

```json
{ "hooks": { "PreToolUse": [{ "matcher": "Bash", "hooks": [{ "type": "command",
  "command": "C=$(jq -r .tool_input.command); echo \"$C\" | grep -qE 'echo .*(but|however|actually|i think|the rubric)' && { echo \"You are relitigating. The user is the editor. Execute the instruction as given.\" >&2; exit 2; }; exit 0"
}]}]}}
```

## 5. Stop — completion-claim verifier

**Prevents:** Saying "done" when typecheck passed but UI was never opened, or when the user's actual ask wasn't addressed. Exit 2 forces Claude back into the loop with the stderr message ([dev.to 3-layer loop](https://dev.to/shipwithaiio/how-to-build-a-self-verification-loop-in-claude-code-3-layers-20-minutes-m1p)).

```json
{ "hooks": { "Stop": [{ "hooks": [{ "type": "command",
  "command": "[ \"$(jq -r .stop_hook_active)\" = true ] && exit 0; bun run typecheck >/dev/null 2>&1 || { echo 'typecheck failing — do not stop' >&2; exit 2; }; git diff --name-only HEAD | grep -qE '\\.(css|tsx)$' && { echo 'You touched UI. Confirm in your reply that you loaded bun dev and verified visually, or revert.' >&2; exit 2; }; exit 0"
}]}]}}
```

## 6. PostToolUse — audit log + drift detector

**Prevents:** Silent pattern drift (no block, but creates a record you can grep).

```json
{ "hooks": { "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command",
  "command": "jq -c '{ts:(now|todate),tool:.tool_name,file:.tool_input.file_path}' >> ~/.claude/audit.log"
}]}]}}
```

## 7. SessionStart — load the rules every time

**Prevents:** Forgetting CLAUDE.md / SWEEP_MEMORY rules mid-session. `additionalContext` is injected straight into the model's context.

```json
{ "hooks": { "SessionStart": [{ "matcher": "startup|resume", "hooks": [{ "type": "command",
  "command": "echo '{\"hookSpecificOutput\":{\"hookEventName\":\"SessionStart\",\"additionalContext\":\"RULES: (1) never create new files for <30 line helpers. (2) user is editor — execute, do not argue. (3) UI changes require browser verify. (4) frustration = stop and answer.\"}}'"
}]}]}}
```

## Why these work

The harness runs hooks deterministically; Claude can't talk its way past `exit 2`. Stderr becomes new tokens in Claude's context, so the correction is *read* not *ignored*. Pair injection (UserPromptSubmit, SessionStart) with blocking (PreToolUse, Stop) for an "agent buddy" loop ([disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery), [iamfakeguru/claude-md](https://github.com/iamfakeguru/claude-md)).

## Sources

- [Hooks reference — Claude Code Docs](https://code.claude.com/docs/en/hooks)
- [Self-Verification Loop in Claude Code (3 Layers)](https://dev.to/shipwithaiio/how-to-build-a-self-verification-loop-in-claude-code-3-layers-20-minutes-m1p)
- [Claude Code Hooks: Practical Guide with 10 Real-World Examples](https://thepromptshelf.dev/blog/claude-code-hooks-guide/)
- [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery)
- [iamfakeguru/claude-md — self-correcting directives](https://github.com/iamfakeguru/claude-md)
- [PreToolUse exit code 2 bug/behavior issue #24327](https://github.com/anthropics/claude-code/issues/24327)
