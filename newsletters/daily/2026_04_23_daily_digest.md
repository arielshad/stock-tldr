<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#050505" style="background-color: #050505;">
<tr>
<td align="center" style="padding: 16px 8px;">

<table width="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">

<!-- CATCH-UP LEDE -->
<tr>
<td style="padding: 4px 4px 0;">
<p style="margin: 0 0 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f7ff00; font-family: Menlo, Consolas, monospace;">// FRESH — APR 22-23</p>
<p style="margin: 0; font-size: 14px; color: #8a8a85; line-height: 1.5;">Seven releases today: Alibaba's Qwen3.6-27B scores 77.2% SWE-bench at 27B dense params and runs on a consumer GPU, SpaceX locks an option to acquire Cursor for $60B, Anthropic ships Claude Opus 4.7 with 87.6% SWE-bench and 3× vision resolution, OpenAI launches cloud-persistent Workspace Agents for teams, Google unveils 8th-gen TPUs designed for the agentic era, Vercel's universal agent skills CLI hits 15.5k stars, and HKUDS's multimodal RAG framework trends on GitHub.</p>
</td>
</tr>

<!-- CARD: Qwen3.6-27B -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen3.6/logo.png" alt="Qwen3.6-27B — Alibaba Qwen team's 27B dense open-weights multimodal model with 77.2% SWE-bench Verified performance" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">SEISMIC</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-22</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Qwen3.6-27B — Flagship-Level Coding in a 27B Dense Open-Weights Model</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">A 27B dense model scoring 77.2% SWE-bench Verified — Apache 2.0, multimodal, runnable on consumer hardware.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://huggingface.co/Qwen/Qwen3.6-27B" style="color: #f7ff00;">Qwen3.6-27B</a> is the first dense model in Alibaba's Qwen3.6 family — 27B fully-dense parameters scoring 77.2% SWE-bench Verified, 94.1% AIME 2026, and 87.8% GPQA Diamond. Handles text, images, and video natively. Apache 2.0.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The architecture alternates Gated DeltaNet linear-attention layers with standard attention blocks, enabling efficient long-context processing up to 262k tokens (1M with YaRN). A "preserve thinking" option carries reasoning traces across multi-turn agentic loops to reduce redundant replanning.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
At 27B parameters it runs on a single consumer GPU with quantization, while matching or exceeding prior-generation 70B-class models on coding benchmarks. For teams that can't send source code to an external API, this raises the practical ceiling for self-hosted coding agents.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Self-hosters and teams running local coding agents on consumer GPUs; developers needing open-weights multimodal reasoning.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Qwen (Alibaba)</td>
<td align="right"><a href="https://huggingface.co/Qwen/Qwen3.6-27B" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: SpaceX / Cursor -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://techcrunch.com/wp-content/uploads/2026/02/GettyImages-2256968212.jpg?w=1024" alt="Elon Musk speaking at the World Economic Forum in Davos, January 2026 — SpaceX has option to acquire Cursor for $60B" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">ECOSYSTEM</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">SEISMIC</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-21</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">SpaceX Has Option to Acquire Cursor for $60B — Colossus Compute Deal Already Active</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">SpaceX locked in an option to buy Cursor for $60B — putting the leading AI coding IDE on a path to Elon Musk's orbit.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://techcrunch.com/2026/04/21/spacex-is-working-with-cursor-and-has-an-option-to-buy-the-startup-for-60-billion/" style="color: #f7ff00;">SpaceX announced a partnership</a> giving it two options: pay $10B for Cursor's product and distribution, or exercise a full acquisition for $60B. xAI is already renting tens of thousands of Colossus chips to Cursor for model training, and two senior Cursor engineering leaders have departed for xAI.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The deal is structured as a two-step option, not a completed purchase. Cursor has already been migrating training workloads to xAI's Colossus supercomputer — described as equivalent to one million Nvidia H100 chips. Cursor's valuation has risen from $2.5B in 2025 to an expected ~$50B in the next round.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Cursor currently runs primarily on Anthropic's Claude models. An acquisition by SpaceX/xAI would almost certainly mean migrating toward Grok — restructuring the model relationship for millions of developers mid-workflow. This is load-bearing infrastructure for agentic coding stacks at many teams, and governance is changing hands.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Developers using Cursor daily; teams with Cursor Enterprise contracts; anyone tracking who controls the AI coding tools stack.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">SpaceX / Cursor</td>
<td align="right"><a href="https://techcrunch.com/2026/04/21/spacex-is-working-with-cursor-and-has-an-option-to-buy-the-startup-for-60-billion/" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Claude Opus 4.7 -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://www-cdn.anthropic.com/images/4zrzovbb/website/96ea2509a90e527642c822303e56296a07bcfce4-1920x1080.png" alt="Claude Opus 4.7 announcement — Anthropic's most capable generally available model with improved coding, vision, and agentic capabilities" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">SEISMIC</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-16</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Claude Opus 4.7 — 87.6% SWE-bench, 3.75MP Vision, Task Budgets, at Same $5/$25 Pricing</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Anthropic's most capable publicly available model: double-digit coding gains, 3× vision resolution, and a new effort system — same price as the model it replaces.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://www.anthropic.com/news/claude-opus-4-7" style="color: #f7ff00;">Claude Opus 4.7</a> scores 87.6% SWE-bench Verified, 64.3% SWE-bench Pro, and resolves 3× more production tasks than Opus 4.6 on the Rakuten enterprise benchmark. Vision jumps from 1568px to 2576px (3.75MP, over 3× the pixels). Context is 1M tokens, max output 128k, pricing unchanged at $5/M input and $25/M output.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Two new API features ship with 4.7: task budgets (an advisory token target for an entire agentic loop so the model can self-regulate cost on long-horizon tasks) and a new <code style="font-family: Menlo, Consolas, monospace; color: #f7ff00;">xhigh</code> effort level. Important: the new tokenizer produces 1.0–1.35× more tokens from the same text — check the migration guide before upgrading.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
For agentic coding, the 3× Rakuten improvement means Opus 4.7 handles the hardest class of enterprise codebase tasks that previously needed close human supervision. The task budget API gives operators a new lever for cost control on long-horizon workflows.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Teams running agentic coding pipelines on Claude API; developers doing vision-heavy work (computer use, document extraction, chart analysis); anyone migrating from Opus 4.6.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Anthropic</td>
<td align="right"><a href="https://www.anthropic.com/news/claude-opus-4-7" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: OpenAI Workspace Agents -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://storage.ghost.io/c/2a/1b/2a1b1782-8506-4d7d-bf53-ad3fb52e2a0f/content/images/size/w2000/2026/04/ChatGPT-Agents-04-21-2026_04_13_PM.jpg" alt="Screenshot of the ChatGPT workspace agents interface showing team-shared agent configuration" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">TOOL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-22</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">OpenAI Workspace Agents — Team-Shared, Cloud-Running ChatGPT Agents Powered by Codex</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Team-shared, cloud-persistent ChatGPT agents that replace Custom GPTs with always-on Codex-powered workflows.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://openai.com/index/introducing-workspace-agents-in-chatgpt/" style="color: #f7ff00;">Workspace agents</a> are OpenAI's successor to Custom GPTs — built for organizational use. Teams can build and share agents that live in the cloud, connect to Google Calendar, SharePoint, Gmail, and Slack, and run on a schedule or in response to messages even when no user is active. Free research preview until May 6 for Business, Enterprise, Edu, and Teachers plans.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Admins configure an agent conversationally — describe behavior, grant app permissions, add memory, set a schedule or trigger. The agent then runs continuously in the cloud, preparing meeting briefs, routing tickets, or generating reports, and surfaces results in ChatGPT or Slack.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Custom GPTs were one-off conversation assistants with no persistence. Workspace agents replace them with schedulable, tool-connected teammates that work around the clock — the path from chatbot to real workflow automation without building a separate agent runtime.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Teams and admins on ChatGPT Business, Enterprise, Edu, or Teachers plans.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">OpenAI</td>
<td align="right"><a href="https://openai.com/index/introducing-workspace-agents-in-chatgpt/" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Google TPU 8th Gen -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/two_chips_for_the_agentic_era_her.width-600.format-webp.webp" alt="Google TPU 8t and TPU 8i chips — 8th-generation AI accelerators designed for training and agentic inference workloads" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">ECOSYSTEM</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-22</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Google TPU 8t and TPU 8i — 8th-Gen AI Chips Built for Training and Agentic Inference</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Google's new AI chips separate training and inference into dedicated silicon for the first time — each optimized for the agentic-era workload it serves.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/eighth-generation-tpu-agentic-era/" style="color: #f7ff00;">Google announced two distinct 8th-gen TPUs</a> at Cloud Next 2026: TPU 8t for training (121 ExaFlops FP4, 9,600-chip superpods, 2 petabytes shared HBM, 97%+ goodput) and TPU 8i for inference (288 GB HBM per chip, 3× more on-chip SRAM, 80% better perf/dollar). GA later in 2026.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
TPU 8t achieves near-linear scaling at million-chip scale by doubling interchip interconnect bandwidth versus the previous generation. TPU 8i's 3× SRAM increase reduces inference cycles stalled on HBM — directly addressing the bottleneck for multi-step agent workloads with short-burst, high-frequency request patterns.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Agentic workloads have a fundamentally different compute profile than single-turn inference. The TPU 8i directly addresses that bottleneck at Google's scale. For training, million-chip near-linear scaling removes the ceiling that forces large runs to split across logical clusters.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
ML teams training large models on Google Cloud; teams running AI agent workloads on Vertex AI at scale.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Google</td>
<td align="right"><a href="https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/eighth-generation-tpu-agentic-era/" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: vercel-labs/skills -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://opengraph.githubassets.com/1/vercel-labs/skills" alt="vercel-labs/skills GitHub repository — universal agent skills CLI with 15.5k stars" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">REPO</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-17</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">vercel-labs/skills — Universal CLI for Discovering and Installing Agent Skills Across 45+ Coding Tools</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">One CLI to install, share, and discover reusable instruction sets for any AI coding agent.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://github.com/vercel-labs/skills" style="color: #f7ff00;">vercel-labs/skills</a> is a package manager for agent skills — portable SKILL.md files that define reusable behaviors you install into any of 45+ supported coding agents, including Claude Code, Cursor, OpenCode, Cline, and GitHub Copilot. The companion directory at <a href="https://skills.sh" style="color: #f7ff00;">skills.sh</a> lists 91,000+ community skills. 15.5k GitHub stars, trending today.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Each skill lives in a directory with a SKILL.md file (YAML frontmatter + instructions). Install with <code style="font-family: Menlo, Consolas, monospace; color: #f7ff00;">npx skills add owner/repo</code> — the CLI clones the skill into your project or global config, where the agent picks it up as part of its system context. Skills can be project-scoped or global with versioning and updates.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Coding agent instructions are currently scattered across dotfiles, system prompts, and README snippets — not shareable or versioned. Skills gives practitioners a package manager for that knowledge: install once, use everywhere, update with one command.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Developers using Claude Code, Cursor, OpenCode, or any of 45 supported coding agents.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Vercel Labs</td>
<td align="right"><a href="https://github.com/vercel-labs/skills" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: RAG-Anything -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://opengraph.githubassets.com/1/HKUDS/RAG-Anything" alt="RAG-Anything GitHub repository — multimodal RAG framework for text, images, tables, and equations" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">REPO</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-03-24</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">RAG-Anything — All-in-One Multi-Modal RAG Framework for Text, Images, Tables, and Equations</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">RAG for real-world documents — handles images, tables, equations, and charts alongside text in a single pipeline.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://github.com/HKUDS/RAG-Anything" style="color: #f7ff00;">RAG-Anything</a> is an open-source framework from HKUDS that extends LightRAG to work with multimodal documents — PDFs, reports, scientific papers — that mix text with images, tables, equations, and charts. Each element type gets a specialized parser, and all are merged into a cross-modal knowledge graph for retrieval. 17.6k GitHub stars, trending today.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Documents are parsed by MinerU, Docling, or PaddleOCR into typed elements. Image regions go through a VLM for captioning; tables become relational entries; equations convert to LaTeX. All elements merge into a dual-graph capturing both cross-modal entity relationships and textual semantics, then queries hit both graphs and results are fused before ranking.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Most production RAG systems lose a document's non-text content by converting to plain text and discarding tables and figures. RAG-Anything keeps that information in the graph, giving substantially better answers on financial reports, technical manuals, and research papers.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
ML engineers and backend developers building RAG over rich, mixed-content document corpora.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">HKUDS</td>
<td align="right"><a href="https://github.com/HKUDS/RAG-Anything" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

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
