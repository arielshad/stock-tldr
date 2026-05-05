<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#050505" style="background-color: #050505;">
<tr>
<td align="center" style="padding: 32px 16px;">

<table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<!-- HEADER -->
<tr>
<td style="padding-bottom: 24px; border-bottom: 2px solid #f5f5f0;">
<h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #f5f5f0; letter-spacing: -0.5px;">AI/TLDR Daily Digest</h1>
<p style="margin: 8px 0 0; font-size: 14px; color: #8a8a85;">April 15, 2026</p>
</td>
</tr>

<!-- CARD: Lyra 2.0 -->
<tr>
<td style="padding-top: 24px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">
<tr>
<td>
<img src="https://arxiv.org/html/2604.13036v1/x1.png" alt="Lyra 2.0" width="600" style="width: 100%; height: 220px; object-fit: cover; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>
<tr>
<td style="padding: 20px;">

<!-- Badges -->
<table cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
<tr>
<td bgcolor="#181818" style="background-color: #181818; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #f5f5f0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">REPO</td>
<td width="8"></td>
<td bgcolor="#f7ff00" style="background-color: #f7ff00; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #050505; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">MAJOR</td>
<td style="padding-left: 12px; font-size: 13px; color: #8a8a85;">2026-04-15</td>
</tr>
</table>

<!-- Title -->
<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Lyra 2.0 — NVIDIA's Explorable Generative 3D World Framework</h2>

<!-- Tagline -->
<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">NVIDIA's open-source framework for generating interactive 3D worlds — walk through, explore, export to Isaac Sim.</p>

<!-- What is it -->
<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
Lyra 2.0 is NVIDIA Spatial Intelligence Lab's framework for creating large, explorable 3D environments. Give it a text prompt or image and a camera trajectory; it generates a long consistent video walkthrough, reconstructs 3D Gaussian Splats from it, and serves an interactive scene you can navigate and export to real-time rendering engines or physics simulators.
</p>

<!-- How it works -->
<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The system tackles two core failure modes in long-horizon generation. Spatial forgetting — where the model hallucinates previously-seen regions — is addressed by maintaining per-frame 3D geometry and routing information via dense correspondences to relevant past frames. Temporal drifting — where small synthesis errors compound over time — is fixed through self-augmented training that exposes the model to its own degraded outputs so it learns to correct drift.
</p>

<!-- Why it matters -->
<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Generating realistic 3D training environments without real-world scanning data is a bottleneck for robotics and embodied AI research. Lyra 2.0 exports 3D Gaussians directly into NVIDIA Isaac Sim, enabling synthetic data pipelines for robot training at scale. Apache 2.0 makes it commercially usable.
</p>

<!-- Who is it for -->
<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Robotics researchers, embodied AI developers, 3D graphics practitioners.
</p>

<!-- Footer -->
<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">NVIDIA</td>
<td align="right"><a href="https://github.com/nv-tlabs/lyra" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: ERNIE-Image -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">
<tr>
<td>
<img src="https://cdn-uploads.huggingface.co/production/uploads/5f8d780e5d083370c711f575/QRt1mPSU9SCkcxxFWQje2.jpeg" alt="ERNIE-Image" width="600" style="width: 100%; height: 220px; object-fit: cover; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>
<tr>
<td style="padding: 20px;">

<table cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
<tr>
<td bgcolor="#181818" style="background-color: #181818; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #f5f5f0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">MODEL</td>
<td width="8"></td>
<td bgcolor="#181818" style="background-color: #181818; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #f5f5f0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">NOTABLE</td>
<td style="padding-left: 12px; font-size: 13px; color: #8a8a85;">2026-04-15</td>
</tr>
</table>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">ERNIE-Image — Baidu's Open-Weight Text-to-Image Diffusion Transformer</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Baidu's open-weight 8B diffusion transformer for text-to-image, with a Turbo variant that generates in 8 steps.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
ERNIE-Image is Baidu's first standalone open-weight text-to-image model. It uses a single-stream Diffusion Transformer (DiT) with 8B parameters and focuses on two known hard problems: accurately rendering dense text inside images (posters, infographics) and following complex multi-object instructions. Released under Apache 2.0 with ComfyUI, Diffusers, and SGLang support.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The DiT uses Flux's VAE for image encoding and Ministral 3.3B as the text encoder. A lightweight Prompt Enhancer expands brief inputs into richer structured descriptions before the DiT runs. A companion Turbo variant distilled via DMD and RL reduces generation to 8 inference steps while preserving quality.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Text rendering inside generated images is a persistent weak spot for open-weight models. ERNIE-Image scores 0.9733 on LongTextBench and 0.8856 on GENEval, competitive with models several times its size. Apache 2.0 and native ComfyUI/Diffusers support mean it drops directly into existing pipelines.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Developers building image generation pipelines that need accurate in-image text or complex layout control.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Baidu</td>
<td align="right"><a href="https://huggingface.co/baidu/ERNIE-Image" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Open Agents -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">
<tr>
<td>
<img src="https://images.ctfassets.net/e5382hct74si/51I1WBO8vnTmF55yZv1ZLH/9f12fd95f53ad58912608c64cddb8fec/image.png" alt="Open Agents" width="600" style="width: 100%; height: 220px; object-fit: cover; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>
<tr>
<td style="padding: 20px;">

<table cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
<tr>
<td bgcolor="#181818" style="background-color: #181818; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #f5f5f0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">REPO</td>
<td width="8"></td>
<td bgcolor="#f7ff00" style="background-color: #f7ff00; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #050505; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">MAJOR</td>
<td style="padding-left: 12px; font-size: 13px; color: #8a8a85;">2026-04-14</td>
</tr>
</table>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Open Agents — Open-Source Cloud Coding Agent Platform by Vercel Labs</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Vercel Labs' forkable cloud coding agent: chat drives the task, an isolated sandbox runs it, and Workflow SDK keeps it durable.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
Open Agents is an open-source reference app from Vercel Labs for building and deploying background coding agents entirely in the cloud. You send it a chat message, it writes and executes code in an isolated sandbox VM, then optionally commits the changes and opens a pull request — no local machine required.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Three layers work together: a Next.js web UI handles auth, sessions, and streaming chat; the agent runs as a durable Workflow SDK job (with automatic checkpointing and resumability) that lives outside the sandbox and issues file reads, shell commands, and git operations via tools; the Vercel Sandbox VM provides the isolated execution environment.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Most coding agent demos are hosted black boxes or local scripts that die when you close the terminal. Open Agents gives you the full forkable stack — web UI, agent runtime, sandbox orchestration, and GitHub integration in one repo. With 1.8k stars and 900+ commits it has real adoption.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Developers who want to build, self-host, or customize a cloud coding agent on Vercel.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Vercel Labs</td>
<td align="right"><a href="https://open-agents.dev" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: DDTree -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">
<tr>
<td>
<img src="https://opengraph.githubassets.com/1/liranringel/ddtree" alt="DDTree" width="600" style="width: 100%; height: 220px; object-fit: cover; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>
<tr>
<td style="padding: 20px;">

<table cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
<tr>
<td bgcolor="#181818" style="background-color: #181818; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #f5f5f0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">ALGORITHM</td>
<td width="8"></td>
<td bgcolor="#181818" style="background-color: #181818; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #f5f5f0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">NOTABLE</td>
<td style="padding-left: 12px; font-size: 13px; color: #8a8a85;">2026-04-14</td>
</tr>
</table>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">DDTree — Diffusion Draft Trees for Faster Speculative Decoding</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Speculative decoding via diffusion draft trees — up to 8.22× speedup over autoregressive inference, beating EAGLE-3.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
DDTree (Diffusion Draft Tree) accelerates LLM inference using speculative decoding. Instead of a single candidate token sequence per verification round, it builds a full tree of likely continuations from one block diffusion pass, then verifies the entire tree in a single forward pass of the target model.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The drafter (a small block diffusion model) produces per-position probability distributions over token sequences. DDTree selects branches to explore using a best-first heap algorithm under a fixed node budget, building a tree that maximizes the probability of finding accepted tokens. The method is lossless: the target model's output distribution is preserved exactly.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Getting more tokens per second from large models without changing their outputs is directly valuable for production inference costs. DDTree achieves 8.22× speedup on HumanEval with Qwen3-30B-MoE and outperforms EAGLE-3 on math benchmarks.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
ML engineers optimizing LLM serving latency and throughput.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Technion</td>
<td align="right"><a href="https://arxiv.org/abs/2604.12989" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Bio Discovery -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">
<tr>
<td style="padding: 20px;">

<table cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
<tr>
<td bgcolor="#181818" style="background-color: #181818; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #f5f5f0; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">TOOL</td>
<td width="8"></td>
<td bgcolor="#f7ff00" style="background-color: #f7ff00; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #050505; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">MAJOR</td>
<td style="padding-left: 12px; font-size: 13px; color: #8a8a85;">2026-04-14</td>
</tr>
</table>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Amazon Bio Discovery — AI-Powered Drug Discovery on AWS</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Amazon's no-code AI platform that lets researchers discover drug candidates without writing code.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
Amazon Bio Discovery is AWS's AI application for early-stage drug discovery. It provides access to a library of specialized biological foundation models that can generate and evaluate potential drug molecules, along with an AI agent that helps users select models, set parameters, and interpret results. Scientists can run complex computational workflows without writing code.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Researchers describe their target (e.g., a protein involved in a disease) and Bio Discovery's AI agent guides them through model selection, parameter configuration, and result interpretation. The platform accesses specialized foundation models for molecular generation, binding prediction, and ADMET property evaluation.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Drug discovery typically requires years and billions of dollars. AI is accelerating this dramatically — Insilico Medicine's fully AI-designed drug reached Phase IIa in 18 months with $6M in compute costs. Amazon Bio Discovery makes these capabilities accessible to researchers without ML expertise.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Pharmaceutical researchers, biotech startups, academic drug discovery labs.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">AWS</td>
<td align="right"><a href="https://aws.amazon.com/bio-discovery/" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Security Tools -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">
<tr>
<td style="padding: 20px;">

<table cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
<tr>
<td bgcolor="#ff0040" style="background-color: #ff0040; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #fff; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">SECURITY</td>
<td width="8"></td>
<td bgcolor="#00f0a8" style="background-color: #00f0a8; padding: 4px 10px; font-size: 11px; font-weight: 700; color: #050505; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">NEW CATEGORY</td>
</tr>
</table>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">New: AI Security Tools</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">5 essential open-source tools for securing LLM applications.</p>

<p style="margin: 0 0 12px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<a href="https://github.com/NVIDIA/garak" style="color: #f7ff00; font-weight: 700; text-decoration: none;">Garak</a> — NVIDIA's LLM vulnerability scanner. Probes for prompt injection, data leakage, hallucination, and jailbreaks across 50+ attack families. Point it at any endpoint and get a vulnerability report.
</p>

<p style="margin: 0 0 12px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<a href="https://github.com/guardrails-ai/guardrails" style="color: #f7ff00; font-weight: 700; text-decoration: none;">Guardrails AI</a> — Wraps your LLM calls with validation logic. Define what valid output looks like (JSON schema, no PII, no toxic content) and it enforces it — auto-retrying if the model fails. 100+ validators available.
</p>

<p style="margin: 0 0 12px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<a href="https://github.com/protectai/llm-guard" style="color: #f7ff00; font-weight: 700; text-decoration: none;">LLM Guard</a> — Self-hosted security layer that scans inputs for prompt injections and outputs for PII/secrets. Runs entirely on your infrastructure — sensitive data never leaves your network.
</p>

<p style="margin: 0 0 12px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<a href="https://github.com/NVIDIA/NeMo-Guardrails" style="color: #f7ff00; font-weight: 700; text-decoration: none;">NeMo Guardrails</a> — Define what your LLM can and can't do using Colang, a simple DSL. Instead of hoping your system prompt holds, you get deterministic guardrails.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<a href="https://github.com/protectai/rebuff" style="color: #f7ff00; font-weight: 700; text-decoration: none;">Rebuff</a> — Multi-layered prompt injection detection using heuristics, LLM analysis, vector similarity, and canary tokens. Gets smarter over time as it learns from new attacks.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td align="right"><a href="https://ai-tldr.dev" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: 'JetBrains Mono', monospace;">SEE ALL SECURITY TOOLS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="padding-top: 32px; border-top: 2px solid #f5f5f0; margin-top: 16px; text-align: center;">
<p style="margin: 0 0 8px; font-size: 20px; font-weight: 800; color: #f5f5f0;">All releases at <a href="https://ai-tldr.dev" style="color: #f7ff00; text-decoration: none;">ai-tldr.dev</a></p>
<p style="margin: 0; font-size: 14px; color: #8a8a85;">Simple explanations • No jargon • Updated daily</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
