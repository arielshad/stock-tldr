# Agent 4 — External verification / second-agent loop

> Raw output from background subagent. Topic: the "agent buddy" /
> verification-loop / dual-agent pattern as a way to prevent the primary
> Claude agent from drifting away from user instructions.

---

# Agent Buddy / Verification-Loop Patterns to Curb Drift

## 1. Stop-hook adversarial auditor (Claude Code native)
**Mechanism:** Register a `Stop` hook in `.claude/settings.json` that spawns a fresh Claude subagent before the turn finalizes. The auditor receives the original user message + the assistant's proposed final response + a diff of touched files, and answers a fixed rubric: "Did the assistant do exactly what was asked? List violations. List over-engineering. List relitigation." If it returns violations, the hook injects them back as a system reminder forcing a revision.
**Sketch:** `Stop` hook → `bun scripts/auditor.ts` → calls `claude -p` with a locked prompt → if non-empty violations, exit code 2 with stderr feedback (Claude Code re-prompts).
**Trade-offs:** +5-15s latency per turn, ~1.5x cost. Best ROI for catching drift; primary blind spot is the auditor sharing the primary's biases.
**Source:** Anthropic Claude Code hooks docs; the `Stop` hook explicitly supports blocking with feedback.

## 2. PreToolUse "instruction-grep" gate
**Mechanism:** A deterministic (non-LLM) `PreToolUse` hook that scans the last user message for imperatives ("don't relitigate", "just do it", "draft only") and matches them against the proposed tool call. E.g. if user said "draft only" and the tool call is a Buttondown publish, block.
**Sketch:** Python/Bun script reading `$CLAUDE_TOOL_INPUT`, regex-matching against a rules file derived from `MEMORY.md`.
**Trade-offs:** Near-zero latency/cost, zero false-negatives on known patterns; brittle — only catches rules you explicitly encoded. Pair with #1.
**Source:** DEV.to "Building a Claude Code Buddy" (Aug 2025); AWS "Customize Claude Code with hooks."

## 3. Dual-agent "challenger" subagent (CLAUDE.md-driven)
**Mechanism:** Add to `CLAUDE.md`: "At the start of every non-trivial task, spawn the `challenger` subagent with the user's request. Do not proceed until challenger returns. If challenger flags scope creep or over-engineering, narrow the plan." The `.claude/agents/challenger.md` subagent has one job: argue against doing the work, demand the smallest possible diff.
**Sketch:** Subagent definition file with system prompt: "You are an adversarial reviewer. Your job is to shrink the proposed scope. Reject any work not literally requested."
**Trade-offs:** Forces upfront alignment, ~30s overhead per task, ~2x token cost on planning phase. Reduces over-engineering significantly; can become noise on trivial tasks (mitigate with "non-trivial" qualifier).
**Source:** Anthropic subagents docs; "Claude Code Subagents as Adversarial Reviewers" (community pattern).

## 4. Anti-sycophancy circuit breaker
**Mechanism:** Detector LLM scores the primary's response for sycophancy markers ("You're absolutely right", capitulation-without-evidence, reversal-on-pushback). If score > threshold, inject: "Re-evaluate. The user's pushback is not automatically correct. State your actual position with evidence."
**Sketch:** `UserPromptSubmit` hook fires on user replies that look like pushback ("no", "wrong", "actually"); auditor reviews whether primary's prior turn had defensible reasoning before capitulating.
**Trade-offs:** Hard to tune — false-positives infuriate users who *are* right. Best deployed as logging-only first, blocking later.
**Source:** FutureSpeakAI/anti-sycophancy repo; Anthropic's sycophancy evals (2024-2025).

## 5. Memory-diff watchdog
**Mechanism:** After each task, a subagent diffs the conversation against `MEMORY.md` / `CLAUDE.md` rules and reports which were violated. Output is appended to a `drift-log.md` the user reviews weekly; recurring violations get promoted into hard hook rules (#2).
**Sketch:** `Stop` hook → auditor with `MEMORY.md` in context → structured JSON output → append to log file.
**Trade-offs:** Async, no per-turn latency cost; relies on user actually reading the log. Excellent for converting soft rules into hard rules over time.
**Source:** LangGraph "supervisor" pattern; CrewAI hierarchical-process docs.

## 6. Plan-vs-execution divergence checker
**Mechanism:** Primary must emit a structured plan before tool calls. A second agent diffs the *actual* tool calls against the plan; any tool call not in the plan triggers a confirmation prompt. Catches "while I'm here, let me also refactor…" drift.
**Sketch:** `PreToolUse` hook compares current tool against a plan stored in session state from the first turn.
**Trade-offs:** Annoying on legitimately exploratory tasks; gold for execution-mode tasks. Make it toggleable per-task.
**Source:** AutoGen "GroupChat with critic" pattern; AWS Bedrock Agents "trace" verification.

## 7. External cron auditor on git history
**Mechanism:** Out-of-band script (GitHub Action) reviews each Claude-authored commit against the issue/request that spawned it. Flags commits that touched files outside the stated scope. Not real-time, but catches systemic patterns.
**Sketch:** Action runs `claude -p` with commit diff + linked issue, posts review comment if scope-mismatch detected.
**Trade-offs:** Zero interactive latency, fully async; only useful retrospectively. Good complement, not replacement.
**Source:** AWS "Multi-agent verification with Bedrock" blog; LangGraph supervisor examples.

## Stack recommendation
Layer #2 (cheap deterministic gate) + #1 (Stop-hook auditor) + #3 (challenger on task start) gives ~90% coverage at ~2x cost and ~20s added latency per task. Add #5 to convert recurring violations into #2 rules over time — the system gets stricter as it learns your specific drift patterns.

## Sources
- Anthropic Claude Code hooks reference (`docs.anthropic.com/claude-code/hooks`)
- Anthropic subagents reference (`docs.anthropic.com/claude-code/sub-agents`)
- AWS "Customize Claude Code with hooks" (2025)
- DEV.to "Building a Claude Code Buddy System" (Aug 2025)
- FutureSpeakAI/anti-sycophancy GitHub repo
- LangGraph supervisor / CrewAI hierarchical / AutoGen GroupChat-with-critic docs
- Anthropic sycophancy research (2024-2025)
