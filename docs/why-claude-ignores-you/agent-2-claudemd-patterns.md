# Agent 2 — CLAUDE.md and system-prompt patterns

> Raw output from background subagent. Topic: prompt-engineering patterns
> inside CLAUDE.md / project-instruction files that demonstrably reduce
> Claude ignoring users.

---

# Reducing "Claude ignores me" in CLAUDE.md — concrete patches

Research synthesis: the top failure modes you describe (over-engineering, relitigating, misreading frustration) are caused by (a) **negative-only rules** ("don't do X") which activate the forbidden concept via attention (the "Pink Elephant" effect), (b) **bloated context** where rules drown in noise, and (c) **behavioral abstractions** ("be concise") that have no measurable output shape. The fixes are: positive imperatives, output-shape anchors, and a short "stop conditions" block placed near the **end** of CLAUDE.md (recency bias — Claude attends most to the start and the end of long context).

## 1-7. Paste-ready additions

### 1. Default to the smallest viable change
```
## Default change size

Default action is the SMALLEST diff that satisfies the request. One-liner
fixes get one-line diffs. Do not create a new file, module, abstraction,
helper, type, or test unless the user named it or the change is impossible
without it. If you find yourself writing a second file, STOP and ask.
```
**Why:** positive output-shape anchor ("smallest diff", "one line") + a hard stop condition. Replaces vague "don't over-engineer." Output-shape rules survive attention decay because they're checkable against the diff.

### 2. Decision lock
```
## Decisions are locked once made

When the user states a decision ("use X", "mark as Y", "we're keeping Z"),
treat it as final. Execute it. Do not argue, do not list trade-offs, do
not propose alternatives, do not ask "are you sure". If you have new
information that genuinely changes the picture, say exactly: "New info:
<one sentence>. Proceed anyway?" — then wait.
```
**Why:** gives Claude a **scripted escape hatch** ("New info: …") so it doesn't relitigate to satisfy a helpfulness drive. Scripted exact phrases are far more reliable than "be concise."

### 3. Frustration = stop, not double down
```
## Reading user tone

Short replies, "no", "stop", "why are you doing this", "I already said",
or repeated corrections = you are wrong and must stop. Do NOT interpret
brevity as approval. Do NOT continue the current plan. Acknowledge in one
sentence, revert if you changed something, and ask one specific question.
```
**Why:** names the exact tokens that should trigger the behavior change. Concrete trigger words beat "read the room."

### 4. Pre-action contract (for non-trivial work)
```
## Before any edit beyond ~10 lines

State in <=3 bullets: (a) the exact change, (b) files touched, (c) what
you will NOT touch. Then make the change. If reality diverges from the
plan mid-edit, stop and re-state — don't silently expand scope.
```
**Why:** forces an output-shape commitment Claude must match. Scope creep is suppressed because the "will NOT touch" list is now load-bearing.

### 5. Answer-first for questions
```
## Questions get answers, not patches

If the user's message ends with "?" or asks "how/why/should/can/what",
the first thing in your reply is the answer. No tool calls, no edits,
until the answer is delivered and the user says proceed.
```
**Why:** binds behavior to a **syntactic trigger** (`?`). Concrete triggers are robust; "use judgment" is not.

### 6. Existing-file preference
```
## File creation is opt-in

Edit existing files by default. Creating a new file requires either:
the user named the filename, OR no existing file in the repo could
plausibly hold this code. If unsure, edit the closest existing file
and ask.
```
**Why:** flips the default. Positive rule ("edit existing") with a two-clause gate replaces the weaker "prefer editing."

### 7. Stop-conditions block (place at end of CLAUDE.md)
```
## STOP conditions — re-read before every response

1. Am I creating a file? → Justify against rule above or revert.
2. Am I arguing with a stated decision? → Stop, execute it.
3. Did the user just push back? → Stop, acknowledge, ask.
4. Is my diff bigger than the request? → Trim or ask.
```
**Why:** end-of-document placement exploits **recency bias** — the last thing in the system prompt is weighted heavily on every turn. A 4-item checklist is short enough to actually re-scan. This is the single highest-leverage addition.

## Anti-patterns to remove

- **Negative-only rules** ("don't over-engineer", "don't be verbose") — pair every prohibition with a positive output shape, or delete it.
- **Verbose preambles / philosophy** ("we value simplicity…") — Claude can't act on values, only on output shapes.
- **Long lists of synonyms for the same rule** — bloat causes other rules to be ignored. One rule per concept.
- **"IMPORTANT"/"YOU MUST" sprinkled everywhere** — works once, decays fast when overused. Reserve for 2-3 hard rules.
- **Burying critical rules in the middle of CLAUDE.md** — middle of long context is the lowest-attention region. Put hard rules at top **or** bottom.
- **Behavioral rules without a checkable artifact** — "be careful with CSS" is unverifiable; "after CSS edits, list the 3 nearest selectors you didn't touch" is.

## Sources

- [Anthropic — Claude 4 prompting best practices (positive framing, explicit output)](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices)
- [Anthropic — Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Anthropic — Claude Code best practices (CLAUDE.md)](https://code.claude.com/docs/en/best-practices)
- [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [The Pink Elephant Problem: why "don't do that" fails with LLMs](https://eval.16x.engineer/blog/the-pink-elephant-negative-instructions-llms-effectiveness-analysis)
- [Creating the Perfect CLAUDE.md (Dometrain)](https://dometrain.com/blog/creating-the-perfect-claudemd-for-claude-code/)
- [PromptHub — Analysis of the Claude 4 system prompt (descriptive vs prohibitive)](https://www.prompthub.us/blog/an-analysis-of-the-claude-4-system-prompt)
- [Claude Code memory explained (José Parreño García)](https://joseparreogarcia.substack.com/p/claude-code-memory-explained)
