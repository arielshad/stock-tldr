# Agent 5 — User-side workflow + harness settings

> Raw output from background subagent. Topic: what the human can do
> (not the AI) — workflow, plan mode, permissions, conversation hygiene
> — to keep Claude from ignoring instructions.

---

# User-Side Workflow Mechanisms to Enforce Claude Code Compliance

## 1. Use Plan Mode by default (Shift+Tab twice)

**What:** Claude researches and proposes a plan via `ExitPlanMode`, then halts until you approve. No file edits, no commands run until you say go.

**Steps:**
- Press `Shift+Tab` twice to cycle into "plan mode" (indicator shows in UI), or launch with `claude --permission-mode plan`.
- Read the plan. Reject, edit, or approve. Approval drops you back into normal mode.
- For one-shot CLI runs: `claude -p "task" --permission-mode plan`.

**Use when:** Any task touching >1 file, refactors, ambiguous requests, or after Claude has been ignoring instructions — plan mode forces a checkpoint before action.

## 2. Front-load constraints with a structured prompt template

**What:** Claude weights the start and end of the prompt heavily. Put rules there, not buried mid-paragraph.

**Steps:** Use a fixed skeleton:
```
GOAL: <one sentence>
CONSTRAINTS: <do/don't list>
DELIVERABLE: <exact output shape>
BEFORE YOU ACT: restate the goal and constraints in your own words; list files you'll touch; wait for "go".
```
The "BEFORE YOU ACT" line is the lever — it forces a summary turn you can correct.

**Use when:** Every non-trivial prompt. Especially after a frustrating session where Claude went off-script.

## 3. Aggressive conversation hygiene: `/clear` early, `/compact` rarely

**What:** Long contexts cause instruction drift — earlier rules get diluted by later tool output. Compaction summarizes lossy.

**Steps:**
- `/clear` between unrelated tasks (always).
- `/clear` if Claude repeats a mistake you already corrected — the correction is being out-weighted by older context.
- Avoid `/compact` for rule-heavy sessions; start fresh and re-paste the rules instead.
- Keep durable rules in `CLAUDE.md` so `/clear` doesn't lose them.

**Use when:** Mid-session repeated failures, switching tasks, or after >30 turns.

## 4. Tighten `.claude/settings.json` permissions to force prompts

**What:** Move from `acceptEdits` / `bypassPermissions` back to `default`, and add explicit `ask` rules for risky tools.

**Steps:** In `.claude/settings.json`:
```json
{
  "permissions": {
    "defaultMode": "default",
    "ask": ["Bash(git push:*)", "Bash(rm:*)", "Write", "Edit"],
    "deny": ["Bash(git push --force:*)", "Bash(git reset --hard:*)"]
  }
}
```
Each `ask` entry forces a y/n prompt — your manual gate.

**Use when:** Working on master, on a cron-pushed repo, or any time you've been auto-approving and regretting it.

## 5. Isolate work in a git worktree before letting Claude loose

**What:** Run Claude in a throwaway worktree so a bad session can't corrupt your main checkout. Claude Code has a built-in worktree workflow.

**Steps:**
- `git worktree add ../tldr-claude feature-x` then `cd` and run Claude there.
- Or invoke the `EnterWorktree` flow if your Claude Code build exposes it.
- Review the diff in your main checkout (`git diff main..feature-x`) before merging.

**Use when:** Speculative refactors, large changes, or when you don't yet trust the plan.

## 6. Force a "restate before act" handshake

**What:** Treat the first reply as a contract. Don't let Claude execute on turn 1.

**Steps:**
- End every initial prompt with: *"Do not run any tools yet. Reply with: (a) your understanding of the goal, (b) files you will touch, (c) what you will NOT do. Wait for my 'go'."*
- If the restatement is wrong, correct it before approving — cheaper than rolling back code.

**Use when:** Tasks where misinterpretation has been costly. Pairs well with plan mode.

## 7. Use `--strict-mcp-config` and disable unused tools per-session

**What:** Fewer tools = fewer ways for Claude to "creatively" go off-task.

**Steps:**
- Launch with `claude --disallowedTools Write,Edit` for read-only research sessions.
- Use `--allowedTools Read,Grep,Glob` to scope a research-only run.
- For codebase exploration where you don't want changes: this is hard enforcement, not vibes.

**Use when:** Research, audits, "just look and tell me" tasks where edits would be unwanted.

## Sources
- docs.claude.com/en/docs/claude-code/iam (permission modes, settings.json)
- docs.claude.com/en/docs/claude-code/settings (allowedTools, defaultMode, ask/deny rules)
- docs.claude.com/en/docs/claude-code/slash-commands (`/clear`, `/compact`)
- docs.claude.com/en/docs/claude-code/cli-reference (`--permission-mode`, `--disallowedTools`)
- Anthropic engineering blog: "Claude Code best practices" (plan mode, CLAUDE.md, worktrees)
- github.com/anthropics/claude-code (issues/discussions on instruction drift, compaction loss)
