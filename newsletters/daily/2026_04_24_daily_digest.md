<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#050505" style="background-color: #050505;">
<tr>
<td align="center" style="padding: 16px 8px;">

<table width="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">

<!-- CATCH-UP LEDE -->
<tr>
<td style="padding: 4px 4px 0;">
<p style="margin: 0 0 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f7ff00; font-family: Menlo, Consolas, monospace;">// FRESH — APR 22-24</p>
<p style="margin: 0; font-size: 14px; color: #8a8a85; line-height: 1.5;">Seven releases today: DeepSeek drops V4 — a 1.6T MIT-licensed open-weights MoE that tops LiveCodeBench with 93.5 and undercuts frontier API prices, OpenAI ships GPT-5.5 to ChatGPT and Codex, Cohere acquires Aleph Alpha at a $20B valuation in a transatlantic sovereign AI deal, Anthropic expands Claude connectors to 15 everyday consumer apps, Anthropic publishes a detailed postmortem on three bugs that degraded Claude Code for 47 days, Tencent open-sources a 295B MoE with 74.4% SWE-bench led by an ex-OpenAI researcher, and OpenAI launches cloud-persistent Workspace Agents for teams.</p>
</td>
</tr>

<!-- CARD: DeepSeek V4 -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/main/assets/dsv4_performance.png" alt="DeepSeek V4-Pro benchmark performance chart comparing to Claude Opus 4.6 and Gemini 3.1 Pro on coding and reasoning tasks" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">SEISMIC</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-24</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">DeepSeek V4 — 1.6T Open-Weights MoE Tops LiveCodeBench with MIT License</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">DeepSeek's new open-weights flagship: two MIT-licensed MoE models with 1M-token context and top-tier coding performance released today.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro" style="color: #f7ff00;">DeepSeek V4</a> is an open-weights model family with two Mixture-of-Experts variants: V4-Pro (1.6T total parameters, 49B activated per token) and V4-Flash (284B total, 13B activated). Both support 1 million tokens of context under the MIT license, with API access live now.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
V4 introduces Hybrid Attention that cuts single-token inference FLOPs to 27% of V3.2's and KV cache to 10%, plus Manifold-Constrained Hyper-Connections and a Muon Optimizer. Three reasoning modes (Non-Think, Think High, Think Max) let you trade speed for quality.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
V4-Pro's Think Max mode scores 93.5 on LiveCodeBench and Codeforces 3206, ahead of Gemini 3.1 Pro and Claude Opus 4.6 on the same benchmarks. V4-Flash pricing at $0.14/MTok input undercuts most frontier APIs, and MIT removes all usage restrictions.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
ML engineers building coding agents or needing open-weights frontier-quality reasoning; API users looking for competitive pricing.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">DeepSeek</td>
<td align="right"><a href="https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: GPT-5.5 -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://us1.discourse-cdn.com/openai1/optimized/4X/3/6/f/36ff9861231810bf7b3751d59044e4a605922cd1_2_690x388.jpeg" alt="GPT-5.5 announcement on OpenAI Developer Community — new flagship model for ChatGPT and Codex" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">SEISMIC</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-23</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">GPT-5.5 — OpenAI's Flagship Model Ships to ChatGPT and Codex</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">OpenAI's newest flagship lands in ChatGPT and Codex — sharper than 5.4 with the same latency, and fewer tokens per task.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://community.openai.com/t/gpt-5-5-is-here-available-in-codex-and-chatgpt-today/1379630" style="color: #f7ff00;">GPT-5.5</a> is OpenAI's newest flagship model, available now to paid ChatGPT and Codex subscribers. OpenAI describes it as their smartest and most intuitive model — able to understand unclear problems and determine next steps with minimal guidance. A GPT-5.5 Pro variant is available for Pro, Business, and Enterprise users.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
GPT-5.5 matches GPT-5.4 on per-token latency while operating at a higher capability level, and uses significantly fewer tokens to complete the same Codex tasks. API pricing is $5/MTok input and $30/MTok output with a 1M token context window — API access coming soon after safety vetting.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
OpenAI shipped GPT-5.5 six weeks after GPT-5.4, signaling an accelerating release cadence as frontier labs compete. For teams running Codex-powered pipelines, the efficiency gains translate directly to lower costs. The superapp framing — ChatGPT, Codex, and an AI browser converging — points at platform consolidation.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
ChatGPT Pro and Business users; teams using Codex for automated coding workflows.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">OpenAI</td>
<td align="right"><a href="https://community.openai.com/t/gpt-5-5-is-here-available-in-codex-and-chatgpt-today/1379630" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Cohere + Aleph Alpha -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://media.thenextweb.com/2026/04/Cohere.avif" alt="Cohere acquires Aleph Alpha — $20B transatlantic AI merger announced in Berlin with government ministers" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">ECOSYSTEM</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-24</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Cohere Acquires Aleph Alpha — $20B Transatlantic Sovereign AI Deal</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Cohere acquires Aleph Alpha at a $20B combined valuation, forming a transatlantic sovereign AI player backed by two governments.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
Canadian enterprise AI company <a href="https://thenextweb.com/news/cohere-aleph-alpha-merger-20-billion" style="color: #f7ff00;">Cohere is acquiring Germany's Aleph Alpha</a>, valuing the combined entity at approximately $20 billion. Cohere shareholders receive ~90% of the merged company. Simultaneously, Schwarz Group (Lidl, Kaufland) is investing $600 million in Cohere's Series E.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Cohere brings $240M ARR and global enterprise customers. Aleph Alpha contributes German government relationships and public-sector anchor clients. The merged entity will operate with dual headquarters in Canada and Germany, focusing on sovereign AI for defense, finance, energy, and healthcare on European infrastructure.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Germany's Digital Minister and Canada's AI Minister both attended the Berlin announcement. For European enterprise buyers who need AI under European law and on European infrastructure, this creates a better-resourced alternative to US frontier providers with active government backing.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
European enterprise and government buyers seeking sovereign AI deployments; existing Cohere and Aleph Alpha customers.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Cohere</td>
<td align="right"><a href="https://thenextweb.com/news/cohere-aleph-alpha-merger-20-billion" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Claude Connectors for Everyday Life -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6903d22a8c18ce1b5adef7e9_6b1470e7fa2fb7280502291f204b88c412690076-1000x1000.svg" alt="Claude connectors for everyday life — Anthropic blog post about new consumer app integrations" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">TOOL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-23</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Claude Connectors for Everyday Life — Uber, Spotify, Instacart, TurboTax, and 11 More</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Claude now connects to 15 everyday consumer apps — from Uber and Spotify to TurboTax — and can act on your behalf with your approval.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://claude.com/blog/connectors-for-everyday-life" style="color: #f7ff00;">Anthropic has expanded Claude's connector ecosystem</a> beyond productivity tools to 15 consumer apps: Uber, Uber Eats, Spotify, Instacart, Booking.com, Resy, TripAdvisor, TurboTax, Credit Karma, StubHub, Taskrabbit, Thumbtack, AllTrails, and Audible. Claude surfaces relevant connectors in context — mention a hike, AllTrails appears; mention dinner plans, Resy does.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Connectors use Anthropic's MCP integration layer. When a transaction is needed — booking a restaurant, calling an Uber, adding to a cart — Claude confirms with the user before executing. Once activated with one click, a connector is available across all conversations. Team and Enterprise admins can restrict permitted actions.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Claude was primarily a text and work-productivity assistant. Adding consumer apps shifts it toward a life-management layer — one conversational interface for errands, bookings, and finances. No sponsored placements: Claude surfaces only apps the user has connected, and every action requires explicit approval.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Claude users who want a single conversational interface for everyday tasks like ordering food, booking travel, or filing taxes.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Anthropic</td>
<td align="right"><a href="https://claude.com/blog/connectors-for-everyday-life" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Anthropic Claude Code Quality Postmortem -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://www-cdn.anthropic.com/images/4zrzovbb/website/de3bcf9733b61f57234d8c45e663b1bd48677ea1-3840x2160.png" alt="Anthropic engineering blog post about recent Claude Code quality issues and the three bugs that caused them" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">ARTICLE</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-23</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Anthropic Claude Code Quality Postmortem — Three Bugs That Degraded Claude for 47 Days</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Anthropic's first public quality postmortem confirms three bugs made Claude Code less capable from March to April 2026 — and explains why they were hard to detect.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://www.anthropic.com/engineering/april-23-postmortem" style="color: #f7ff00;">Anthropic published an engineering post</a> acknowledging three separate bugs that affected Claude Code between March 4 and April 20, 2026 — following weeks of widespread user quality regression reports. All three are fixed in v2.1.116; usage limits were reset for all subscribers.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
The three bugs: (1) Reasoning effort was silently lowered from high to medium on March 4, degrading quality for 34 days. (2) A caching optimization from March 26 cleared reasoning history after idle sessions, making Claude forgetful and draining usage limits via cache misses. (3) A system prompt change April 16 limited inter-tool-call text to 25 words, causing a 3% intelligence drop. All three were hard to reproduce in evaluations because they affected users unpredictably.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Claude Code has become load-bearing infrastructure for many development teams. This is Anthropic's first detailed quality postmortem — setting a transparency precedent that practitioners have been asking for and explaining the specific interaction effects that made the regressions hard to catch in evals.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Claude Code subscribers and teams using Anthropic's API who experienced quality issues in March–April 2026.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Anthropic</td>
<td align="right"><a href="https://www.anthropic.com/engineering/april-23-postmortem" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>

<!-- CARD: Tencent Hy3-Preview -->
<tr>
<td style="padding-top: 16px;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#0e0e0e" style="background-color: #0e0e0e; border: 1px solid #f5f5f0;">

<tr>
<td>
<img src="https://huggingface.co/tencent/Hy3-preview/resolve/main/assets/logo-en.png" alt="Hy3-preview logo from Tencent's Hunyuan team" width="100%" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 1px solid #f5f5f0;">
</td>
</tr>

<tr>
<td style="padding: 16px;">

<div style="margin-bottom: 12px; line-height: 1.5;">
<span style="display: inline-block; background-color: #181818; color: #f5f5f0; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MODEL</span>
<span style="display: inline-block; width: 6px;">&nbsp;</span>
<span style="display: inline-block; background-color: #f7ff00; color: #050505; padding: 4px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: Menlo, Consolas, monospace; vertical-align: middle;">MAJOR</span>
<span style="display: inline-block; padding-left: 12px; font-size: 13px; color: #8a8a85; vertical-align: middle;">2026-04-23</span>
</div>

<h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #f5f5f0; line-height: 1.2;">Tencent Hy3-Preview — 295B Open-Source MoE with 74.4% SWE-bench</h2>

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Tencent's first open-source flagship under ex-OpenAI researcher Yao Shunyu — 74.4% SWE-bench in a 295B MoE available today on OpenRouter.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://huggingface.co/tencent/Hy3-preview" style="color: #f7ff00;">Hy3-preview</a> is a 295B-parameter Mixture-of-Experts model from Tencent's Hunyuan team, released as open weights on HuggingFace. It activates 21B parameters per token, scores 74.4% on SWE-bench Verified and 87.2% on GPQA Diamond, and is led by Yao Shunyu, formerly of OpenAI.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
MoE architecture with 192 experts, top-8 activated per token. Three inference-time reasoning modes (no_think / low / high) let you trade compute for depth. Context window is 256K tokens at BF16. Day-1 deployment into Tencent's Yuanbao consumer app and CodeBuddy coding assistant.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
74.4% on SWE-bench Verified is among the highest scores for any open-weights model at this scale. It's accessible via OpenRouter's free tier today — practitioners get a capable coding and reasoning model without a frontier-lab waitlist or usage restrictions.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
ML engineers and self-hosters who need a powerful coding and reasoning model with open weights and no usage restrictions.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #2a2a28; padding-top: 16px;">
<tr>
<td style="font-size: 14px; font-weight: 700; color: #f5f5f0;">Tencent</td>
<td align="right"><a href="https://huggingface.co/tencent/Hy3-preview" style="color: #f7ff00; font-size: 13px; font-weight: 700; text-decoration: none; text-transform: uppercase; font-family: Menlo, Consolas, monospace;">DETAILS →</a></td>
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

<p style="margin: 0 0 20px; font-size: 15px; color: #8a8a85; line-height: 1.5;">Team-shared, cloud-persistent ChatGPT agents that replace Custom GPTs with always-on Codex-powered workflows — free in research preview until May 6.</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">What is it?</strong><br>
<a href="https://openai.com/index/introducing-workspace-agents-in-chatgpt/" style="color: #f7ff00;">Workspace agents</a> are OpenAI's successor to Custom GPTs, built for organizational use. Teams build and share agents that live in the cloud, connect to Google Calendar, SharePoint, Gmail, and Slack, and run on a schedule or in response to incoming messages — even with no user active. Research preview for Business, Enterprise, Edu, and Teachers plans.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">How does it work?</strong><br>
Admins configure an agent conversationally: describe what it should do, grant app permissions, add memory, and set a schedule or trigger. The agent runs continuously in the cloud — preparing meeting briefs, routing tickets, generating reports — and surfaces results in ChatGPT or Slack directly.
</p>

<p style="margin: 0 0 16px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Why does it matter?</strong><br>
Custom GPTs were one-off chat assistants with no persistence. Workspace agents replace them with schedulable, tool-connected teammates that work around the clock. For engineering and ops teams on ChatGPT Enterprise, this is the path from chatbot to real workflow automation without building a separate agent runtime.
</p>

<p style="margin: 0 0 20px; font-size: 15px; color: #f5f5f0; line-height: 1.6;">
<strong style="color: #f7ff00;">Who is it for?</strong><br>
Teams and admins on ChatGPT Business, Enterprise, Edu, or Teachers plans — free in research preview until May 6, 2026.
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
