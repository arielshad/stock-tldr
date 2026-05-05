<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#050505" style="background-color: #050505;">
<tr>
<td align="center" style="padding: 16px 8px;">

<table width="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">

<!-- CATCH-UP LEDE -->
<tr>
<td style="padding: 4px 4px 0;">
<p style="margin: 0 0 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f7ff00; font-family: Menlo, Consolas, monospace;">// FRESH — APR 20-21</p>
<p style="margin: 0; font-size: 14px; color: #8a8a85; line-height: 1.5;">Seven releases today: two trillion-parameter coding models trading SWE-bench rankings, OpenAI's first life-sciences reasoning model, Karpathy's viral wiki-over-RAG pattern, NVIDIA's sobering robotics reality check, a 1.75 GB 8B on iPhones, and 207 tok/s from a single RTX 3090.</p>
</td>
</tr>

<!-- CARD: Kimi K2.6 -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://cdn-thumbnails.huggingface.co/social-thumbnails/models/moonshotai/Kimi-K2.6.png" alt="Kimi K2.6 HuggingFace model card — Moonshot AI open-source coding model" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-20</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Kimi K2.6 Open-Source Release — #1 on SWE-Bench Pro with 1T-MoE Open Weights</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Moonshot open-sources a 1T-MoE coding model that claims #1 on SWE-Bench Pro, available via API and as downloadable weights.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
Kimi K2.6 is the public open-weight release of <a href="https://www.kimi.com/blog/kimi-k2-6" style="color: #f7ff00;">Moonshot AI's flagship coding model</a> under a Modified MIT license — a 1-trillion-parameter sparse MoE (32B active) with 256K-token context, now on <a href="https://huggingface.co/moonshotai/Kimi-K2.6" style="color: #f7ff00;">HuggingFace</a>.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
It scores 58.6 on SWE-Bench Pro (rank #1), 80.2 on SWE-Bench Verified, and 66.7 on Terminal-Bench 2.0. An agent swarm infrastructure scales to 300 concurrent sub-agents for long-horizon parallelized tasks; deploy with vLLM or SGLang.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
This is a permissively licensed open-weight model claiming the top SWE-bench slot — meaningful for teams building coding agents without paying frontier API prices. 349 HN points within hours reflects genuine community interest.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Teams building or self-hosting coding agents; developers benchmarking frontier coding models.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Moonshot AI</td>
<td align="right"><a href="https://www.kimi.com/blog/kimi-k2-6" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Qwen3.6-Max-Preview -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://opengraph.githubassets.com/1/QwenLM/Qwen3.6" alt="QwenLM Qwen3.6 GitHub repository — family containing the new Max-Preview flagship model" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-20</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Qwen3.6-Max-Preview — Alibaba's 1T-Parameter Coding Flagship, #5 on SWE-bench Pro</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Alibaba's new 1T-parameter MoE flagship scores #5 on SWE-bench Pro Public and leads six coding benchmarks over Qwen3.6-Plus. Currently free on Qwen Studio.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://qwen.ai/blog?id=qwen3.6-max-preview" style="color: #f7ff00;">Qwen3.6-Max-Preview</a> is Alibaba's new API-only flagship — a ~1T-parameter sparse MoE with 262K-token context, the biggest gains over the Qwen3.6-Plus tier in agentic coding and instruction-following. Free on <a href="https://chat.qwen.ai" style="color: #f7ff00;">Qwen Studio</a>.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Benchmark gains over Qwen3.6-Plus: SkillsBench +9.9 pts, SciCode +10.8 pts, NL2Repo +5.0 pts, Terminal-Bench 2.0 +3.8 pts. SWE-bench Pro: 57.30 (rank 5/27); Terminal-Bench 2.0: 65.40 (rank 6/34). Scores 52 on the <a href="https://artificialanalysis.ai/models/qwen3-6-max" style="color: #f7ff00;">Artificial Analysis Intelligence Index</a>, ranked #2 out of 201 models.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
The Qwen3.6 open-weight series already set a high bar; Max-Preview shows where the closed-API tier now sits — well above the Plus tier. It's free to access, making it a direct comparison point against Anthropic and Google for anyone benchmarking coding pipelines.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Teams building or evaluating coding agents, agentic pipelines, and complex instruction-following systems.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Qwen (Alibaba)</td>
<td align="right"><a href="https://qwen.ai/blog?id=qwen3.6-max-preview" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: GPT-Rosalind -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://images.euronews.com/articles/stories/09/72/57/46/1536x864_cmsv2_d4600d6b-112c-5f4e-acaa-4266b76ba8c0-9725746.jpg" alt="GPT-Rosalind announcement — OpenAI's life-sciences reasoning model" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-16</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">GPT-Rosalind — OpenAI's First Domain-Specific Frontier Reasoning Model, for Life Sciences</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">OpenAI's first purpose-built domain model — frontier reasoning tuned on molecules, proteins, genes, and experimental workflows.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://openai.com/index/introducing-gpt-rosalind/" style="color: #f7ff00;">GPT-Rosalind</a> is OpenAI's first domain-specific frontier reasoning model, built for life sciences and drug discovery. Named after Rosalind Franklin, it is in research preview via ChatGPT, Codex, and the API for trusted-access enterprise customers — launch partners include Amgen, Moderna, the Allen Institute, and Thermo Fisher.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The model handles multi-step scientific workflows: literature review, evidence synthesis, genomics analysis, hypothesis generation, and experimental planning. In Codex's internal evals, GPT-Rosalind submissions ranked above the 95th percentile of human experts on prediction tasks and reached the 84th percentile on sequence generation. During the preview it does not consume credits.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Domain-specific frontier models are a different product category from general-purpose GPT-5.x — narrower but deeper. If the eval numbers hold, Rosalind is the first public frontier model explicitly designed as a lab partner, not a chatbot, and signals a serious OpenAI push into pharma.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Biotech and pharma research teams; computational biologists; drug-discovery infra leads.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">OpenAI</td>
<td align="right"><a href="https://openai.com/index/introducing-gpt-rosalind/" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Karpathy LLM Wiki -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://www.implicator.ai/content/images/size/w1000/2026/04/2026-04-08-knowledge_web.jpg" alt="Illustration of an LLM maintaining a cross-linked knowledge web of markdown wiki pages" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">ARTICLE</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-04</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Andrej Karpathy's LLM Wiki — Drop RAG, Let the Agent Maintain a Markdown Wiki</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Stop treating LLMs as retrieval-over-raw-docs. Point an agent at a folder of sources and let it build and maintain a living, cross-linked wiki instead.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
A <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" style="color: #f7ff00;">GitHub gist from Andrej Karpathy</a> sketching a new pattern for personal knowledge bases: rather than classic RAG, an LLM agent incrementally compiles raw sources into a structured markdown wiki with entity pages, concept pages, cross-references, and contradiction flags. The X post hit 16M views; the gist passed 5,000 stars.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Three operations: <em>Ingest</em> (compile new sources into the right wiki pages), <em>Query</em> (answer questions from the wiki), and <em>Lint</em> (catch contradictions and gaps). The gist is deliberately code-free — designed to be copy-pasted as instructions to your agent of choice (<a href="https://claude.ai/code" style="color: #f7ff00;">Claude Code</a>, Codex, Cursor). The wiki is just a folder of markdown files, viewable in Obsidian.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
This is the closest thing the community has had to a new consensus pattern for long-lived personal context since classic RAG. Within days, <a href="https://github.com/lucasastorian/llmwiki" style="color: #f7ff00;">community reimplementations</a>, Obsidian plugins, and agent-memory integrations started shipping.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Anyone who has tried and failed to keep a second-brain system populated, or who runs repeated research on a narrow topic.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Andrej Karpathy</td>
<td align="right"><a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: NVIDIA RoboLab -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://opengraph.githubassets.com/1/NVLabs/RoboLab" alt="NVLabs/RoboLab GitHub repository — NVIDIA simulation benchmark for robot manipulation policies" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">BENCHMARK</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">NOTABLE</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-14</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">RoboLab — NVIDIA's 120-Task Sim Benchmark Shows SOTA Robot Policies Top Out at 25.8%</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">NVIDIA's new 120-task simulation benchmark reveals that the best open robot policies succeed less than 26% of the time on manipulation tasks.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://github.com/NVLabs/RoboLab" style="color: #f7ff00;">RoboLab</a> is NVIDIA Research's simulation benchmarking platform for evaluating task-generalist robot manipulation policies — 120 tasks spanning pick-and-place, stacking, rearrangement, and tool use, organized across visual, procedural, and relational competency axes. Built on <a href="https://research.nvidia.com/labs/srl/projects/robolab/" style="color: #f7ff00;">NVIDIA Isaac Sim 5.0</a>.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
A policy model runs independently and connects to the Isaac Sim environment via a lightweight inference client. Tasks can be described with specific or vague natural language instructions. π0.5 — currently one of the strongest open VLA models — achieves only 25.8% on specific instructions and drops to 16.8% when instructions are vague.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Same scene, same goal, different wording — and the policy breaks. This quantifies a known qualitative weakness in current VLAs and gives robotics researchers a reproducible testbed to track progress. 72 HuggingFace upvotes, #1 paper today.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Robotics researchers and teams building or evaluating VLA (vision-language-action) models.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">NVIDIA</td>
<td align="right"><a href="https://arxiv.org/abs/2604.09860" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Ternary Bonsai -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://opengraph.githubassets.com/1/PrismML-Eng/Bonsai-demo" alt="PrismML-Eng/Bonsai-demo GitHub repository — 1.58-bit Ternary Bonsai language models for on-device inference" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">NOTABLE</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-16</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Ternary Bonsai — 1.58-Bit 8B Runs at 82 tok/s on M4 Pro in 1.75 GB</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">1.58-bit ternary weights fit an 8B model in 1.75 GB and run fast enough for interactive use on iPhones and MacBooks — 9× smaller than FP16.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://prismml.com/news/ternary-bonsai" style="color: #f7ff00;">Ternary Bonsai</a> is a family of language models from PrismML where every weight is one of three values: −1, 0, or +1. The 8B variant occupies 1.75 GB — about 9× smaller than a standard FP16 8B model. Apache 2.0, available as <a href="https://huggingface.co/collections/prism-ml/ternary-bonsai" style="color: #f7ff00;">GGUF and MLX variants on HuggingFace</a>.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Ternary quantization replaces floating-point multiplies with additions and subtractions, slashing storage and compute cost — especially on Apple Silicon's Neural Engine. The 8B model scores 75.5 averaged across MMLU Redux, GSM8K, HumanEval+, IFEval, and BFCLv3; throughput is 82 tok/s on M4 Pro and 27 tok/s on iPhone 17 Pro Max.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
1.75 GB fits in the RAM headroom of current iPhones and RAM-constrained laptops — no extra quantization step. At 82 tok/s on M4 Pro the throughput crosses the interactive threshold, comparable to llama.cpp Q4 quants but at a smaller footprint.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Developers targeting on-device inference on Apple Silicon or iPhones; self-hosters with memory-constrained hardware.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">PrismML</td>
<td align="right"><a href="https://prismml.com/news/ternary-bonsai" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: LuceBox Hub -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://opengraph.githubassets.com/1/Luce-Org/lucebox-hub" alt="Luce-Org/lucebox-hub GitHub repository — hand-tuned LLM inference for RTX 3090" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">REPO</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">NOTABLE</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-20</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">LuceBox Hub — Hand-Tuned LLM Inference Reaching 207 tok/s on an RTX 3090</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">LuceBox rewrites LLM inference from scratch for one GPU at a time, achieving 207 tok/s on Qwen3.5-27B on a consumer RTX 3090 — 3.43× faster than autoregressive.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://github.com/Luce-Org/lucebox-hub" style="color: #f7ff00;">LuceBox Hub</a> is an open-source inference optimization project that hand-tunes CUDA kernels specifically for individual GPU architectures — currently the NVIDIA RTX 3090. Two components: DFlash (speculative decoding for Qwen3.5-27B) and Megakernel (fused forward pass for Qwen3.5-0.8B).
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
DFlash implements speculative decoding — a smaller draft model proposes tokens that a larger verifier checks in parallel. On RTX 3090: 207 tok/s on Qwen3.5-27B, 3.43× faster than autoregressive and 2.8× faster than SGLang AWQ. The Megakernel fuses the entire forward pass of the 0.8B model into a single kernel, reaching 1.87 tok/J.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Most inference frameworks (vLLM, SGLang, llama.cpp) target broad hardware. LuceBox trades portability for raw per-chip performance. 207 tok/s means interactive use with a 27B model on a single consumer card — a meaningful threshold for self-hosters.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Self-hosters running 27B+ models on consumer NVIDIA GPUs.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Luce-Org</td>
<td align="right"><a href="https://github.com/Luce-Org/lucebox-hub" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
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
