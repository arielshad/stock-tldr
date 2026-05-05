<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#050505" style="background-color: #050505;">
<tr>
<td align="center" style="padding: 16px 8px;">

<table width="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">

<!-- CATCH-UP LEDE -->
<tr>
<td style="padding: 4px 4px 0;">
<p style="margin: 0 0 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f7ff00; font-family: Menlo, Consolas, monospace;">// FRESH — APR 21-22</p>
<p style="margin: 0; font-size: 14px; color: #8a8a85; line-height: 1.5;">Seven releases today: OpenAI's reasoning image model with 2K output, Google's research agent hitting 93% on DeepSearchQA, Alibaba's 35B MoE that fits in 20 GB and scores 73% SWE-bench, Tencent's open 3D world model for game engines, Brex open-sourcing an LLM-as-judge HTTP proxy for agent security, NVIDIA's quantum calibration AI, and GitHub pausing Copilot sign-ups.</p>
</td>
</tr>

<!-- CARD: GPT Image 2 -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://9to5mac.com/wp-content/uploads/sites/6/2026/04/chatgpt-images-2-0.webp" alt="ChatGPT Images 2.0 interface showing text-accurate image generation with the new GPT Image 2 model" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-21</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">GPT Image 2 — OpenAI's Reasoning-Augmented Image Model with 2K Resolution</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">OpenAI's new image model thinks before it generates — reasoning and optionally searching the web before producing images.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://platform.openai.com/docs/models/gpt-image-2" style="color: #f7ff00;">GPT Image 2</a> is OpenAI's latest image generation model powering ChatGPT Images 2.0. It adds an optional Thinking mode that reasons through the prompt and can search the web before generating, supports output up to 2K resolution, and produces up to 8 consistent images from a single prompt — maintaining character and style across all of them.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Two modes: Instant (fast, direct generation) and Thinking (planning pass before generation, optionally with web search). A dedicated text-rendering subsystem handles small text, dense UI elements, iconography, and non-Latin scripts. Available via API as <code style="font-family: Menlo, Consolas, monospace; color: #f7ff00;">gpt-image-2</code> in <code style="font-family: Menlo, Consolas, monospace; color: #f7ff00;">/v1/images/generations</code>.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Prior image models struggled with text fidelity and consistent multi-image output. The 8-image consistent-batch feature opens storyboards, character sheets, and multi-panel marketing assets. Token-based pricing and Batch API support (50% discount) make it more economical than flat per-image fees.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Developers building image generation into products; designers needing text-accurate or complex-layout images.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">OpenAI</td>
<td align="right"><a href="https://platform.openai.com/docs/models/gpt-image-2" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Google Deep Research Max -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/documents/gemini-3.1-pro_deep-research-and-max_blog_evals.png" alt="Deep Research Max benchmark evaluation charts comparing performance across DeepSearchQA and other research benchmarks" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">TOOL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-21</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Google Deep Research Max — Autonomous Research Agent Hits 93.3% DeepSearchQA with MCP Support</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Google's Deep Research Max is an async research agent that plans, iterates, and synthesizes — now with MCP access to private data and native chart generation.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/next-generation-gemini-deep-research/" style="color: #f7ff00;">Google released two new variants</a> of its Deep Research agent in the Gemini API — both powered by Gemini 3.1 Pro. The Max variant is async and exhaustive; the standard variant is faster for interactive UIs. New additions: arbitrary MCP server connections for private data, inline chart generation, collaborative research planning, and full multimodal input (PDFs, CSVs, images, video).
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Deep Research Max uses extended test-time compute — it iteratively plans, searches, and refines across multiple passes before producing a final cited report. MCP support lets it reach financial databases or internal systems mid-session, not just the public web. Deploy via the Gemini API as <code style="font-family: Menlo, Consolas, monospace; color: #f7ff00;">gemini-deep-research-max-04-2026</code>.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
A 27-point jump on DeepSearchQA (66.1% → 93.3%) is a meaningful quality step. MCP support transforms Deep Research from a web-only tool into one that reasons over proprietary data — directly competitive for internal research workflows and cron-based due-diligence pipelines.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Enterprise developers building research automation; analysts who need deep synthesis across private and public data sources.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Google DeepMind</td>
<td align="right"><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/next-generation-gemini-deep-research/" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Qwen3.6-35B-A3B -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen3.6/logo.png" alt="Qwen3.6-35B-A3B — Alibaba Qwen MoE coding model logo" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-17</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Qwen3.6-35B-A3B — 35B MoE Coding Model, 3B Active Params, SWE-bench 73.4%</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Alibaba's 35B MoE model uses only 3B active params, scores 73.4% SWE-bench Verified, and runs locally on a MacBook Pro.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://huggingface.co/Qwen/Qwen3.6-35B-A3B" style="color: #f7ff00;">Qwen3.6-35B-A3B</a> is a sparse Mixture-of-Experts model from Alibaba released under Apache 2.0. With 256 experts and only 3B parameters activated per forward pass, it delivers coding and reasoning performance comparable to dense models far larger. It supports text, image, and video inputs with a native 262K-token context window.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The model uses Gated DeltaNet (a hybrid attention variant) with a 256-expert MoE feed-forward layer. A <code style="font-family: Menlo, Consolas, monospace; color: #f7ff00;">preserve_thinking</code> flag retains reasoning traces across multi-turn agent conversations. Weights in BF16 run locally via vLLM, SGLang, or LM Studio in roughly 20 GB.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
At 3B active parameters, inference cost is a fraction of comparable dense models. Scoring 73.4% on SWE-bench Verified and 86.0% on GPQA puts it in frontier coding territory while running locally. Apache 2.0 makes it fully commercial-use-friendly.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Developers building coding agents; teams wanting frontier-class reasoning locally at low inference cost.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Alibaba / Qwen</td>
<td align="right"><a href="https://huggingface.co/Qwen/Qwen3.6-35B-A3B" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: HY-World 2.0 -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://opengraph.githubassets.com/1/Tencent-Hunyuan/HY-World-2.0" alt="Tencent-Hunyuan/HY-World-2.0 GitHub repository — multi-modal 3D world model for reconstructing and generating 3D scenes" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
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

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">HY-World 2.0 — Tencent Open-Sources 3D World Model: Image or Text to Navigable 3D Scene</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Tencent's open 3D world model turns a single image or text prompt into a fully navigable, editable 3D scene — real geometry, not video.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://github.com/Tencent-Hunyuan/HY-World-2.0" style="color: #f7ff00;">HY-World 2.0</a> is a multi-modal world model from Tencent Hunyuan. Unlike video world models that output pixel sequences, it produces real 3D assets — meshes, 3D Gaussian Splattings, and point clouds — that import into Blender, Unreal Engine, Unity, or NVIDIA Isaac Sim. 1.5K GitHub stars within days of release.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
A four-stage pipeline: HY-Pano 2.0 generates a panorama from the input; WorldNav plans a navigation trajectory; WorldStereo 2.0 expands with stereo depth; WorldMirror 2.0 fuses everything into 3DGS or mesh output — predicting depth, surface normals, camera params, and 3DGS attributes in one forward pass. WorldMirror 2.0 weights are open now; full generation pipeline coming soon.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Video world models output non-editable pixel streams. HY-World 2.0 produces persistent, game-engine-compatible assets. For game developers this means generating level prototypes from text or reference images directly — without any additional reconstruction pipeline.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Game developers, robotics and simulation researchers, VFX and 3D artists, digital twin builders.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Tencent Hunyuan</td>
<td align="right"><a href="https://github.com/Tencent-Hunyuan/HY-World-2.0" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: CrabTrap -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://opengraph.githubassets.com/1/brexhq/CrabTrap" alt="brexhq/CrabTrap GitHub repository — LLM-as-judge HTTP proxy for securing AI agent outbound requests" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">REPO</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">NOTABLE</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-17</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">CrabTrap — LLM-as-Judge HTTP Proxy to Secure AI Agents in Production</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">CrabTrap sits between your AI agent and the internet, vetting every outbound request against natural-language security policies before they leave.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://github.com/brexhq/CrabTrap" style="color: #f7ff00;">CrabTrap</a> is an open-source Go+TypeScript HTTP/HTTPS proxy from Brex Engineering that intercepts all outbound requests made by AI agents. A two-tier policy engine checks each request: first a fast static rules layer (URL patterns, HTTP methods), then an LLM-as-judge layer evaluating the full request context against natural-language policies. Includes SSRF protection, a PostgreSQL audit log, and a web UI for policy management.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Agents route all HTTP(S) traffic through CrabTrap by setting proxy environment variables. Static rules execute in microseconds; the LLM judge activates on fewer than 3% of requests in Brex's production deployment. Request bodies and headers (capped at 4KB) are encoded as structured JSON before being sent to the judge — preventing prompt injection via adversarial request content.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
AI agents calling external APIs are an expanding attack surface: SSRF, data exfiltration, and adversarially-crafted tool calls are real production risks. CrabTrap's natural-language policies can express intent ("never send customer data outside company domains") without exhaustively enumerating every legitimate URL.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Teams running AI agents in production who need enforceable security guardrails on external API calls.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Brex</td>
<td align="right"><a href="https://www.brex.com/journal/building-crabtrap-open-source" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: NVIDIA Ising -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://developer-blogs.nvidia.com/wp-content/uploads/2026/04/Ising-Quantum-1024x576.jpg" alt="NVIDIA Ising quantum AI model — diagram showing AI-powered calibration and error correction workflows for quantum processors" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">NOTABLE</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-14</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">NVIDIA Ising — Open AI Models for Quantum Processor Calibration and Error Correction</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">NVIDIA's Ising family applies AI to two core quantum computing bottlenecks: calibrating noisy qubits and decoding quantum errors in real time.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://nvidianews.nvidia.com/news/nvidia-launches-ising-the-worlds-first-open-ai-models-to-accelerate-the-path-to-useful-quantum-computers" style="color: #f7ff00;">NVIDIA Ising</a> is a family of open AI models for quantum hardware teams. Ising Calibration is a 35B-parameter MoE vision-language model (built on Qwen3.5-35B-A3B) that interprets qubit calibration plots and runs agentic calibration workflows. Ising Decoding is a lightweight 3D CNN (~1–2M parameters) for real-time quantum error correction. Weights on <a href="https://huggingface.co/nvidia/Ising-Calibration-1-35B-A3B" style="color: #f7ff00;">HuggingFace</a>.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Ising Calibration is fine-tuned on 72.5K calibration experiment images, scoring 74.7% on the new QCalEval benchmark — outperforming Gemini 3.1 Pro, Claude Opus 4.6, and GPT 5.4. The Decoding models use FP8 quantization for low-latency inference and run 2.5× faster with 3× better accuracy than pyMatching, the open-source baseline most quantum research groups use.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Manual quantum processor calibration typically takes days per device. Ising Calibration automates it using the same experimental plots a physicist would read. Major labs including Fermilab, Harvard, and the UK National Physical Laboratory are already adopting the models.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Quantum hardware teams and academic research groups working on superconducting qubits or neutral atom processors.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">NVIDIA</td>
<td align="right"><a href="https://nvidianews.nvidia.com/news/nvidia-launches-ising-the-worlds-first-open-ai-models-to-accelerate-the-path-to-useful-quantum-computers" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: GitHub Copilot Plan Changes -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://github.blog/wp-content/uploads/2026/01/generic-github-logo-right.png" alt="GitHub logo — GitHub Copilot individual plan changes announcement April 2026" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">ECOSYSTEM</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">NOTABLE</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-20</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">GitHub Copilot Pauses New Sign-Ups and Removes Opus from Pro Tier</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">GitHub Copilot's individual plans are being restructured: new Pro/Pro+/Student sign-ups paused, Opus pulled from Pro tier, usage limits tightened.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/" style="color: #f7ff00;">GitHub announced</a> on April 20 that it is pausing new sign-ups for Copilot Pro, Pro+, and Student plans while keeping Copilot Free open. Opus models are removed from Pro plans — only Pro+ retains Opus 4.7 access. A refund window runs through May 20 for affected subscribers.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The changes reflect a structural mismatch between flat-rate subscription pricing and the compute cost of agentic workflows — a single agentic session with parallelized background agents can consume 10–100× the compute of a simple autocomplete request. GitHub is moving to a tiered model with visible usage limits in VS Code and the Copilot CLI.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
This is a bellwether for flat-rate AI subscriptions as agentic usage scales. Losing Opus access on Pro — and being unable to add new team members — is an immediate workflow disruption for many developers. 241 HN points signals practitioners are paying close attention.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Individual developers and teams currently on GitHub Copilot Pro or Pro+ plans.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">GitHub</td>
<td align="right"><a href="https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
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
