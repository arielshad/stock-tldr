import type { ReactNode } from "react";
import type { ReleaseItem } from "../data/schema";
import { track } from "../lib/analytics";

/**
 * "ASK AI" row for the release modal — mirrors ShareButtons styling.
 * One row of 30x30 square icon buttons that open various AI chatbots
 * with a pre-filled prompt about the release.
 *
 * Buttons (left → right):
 *   1. ChatGPT   — chat.openai.com
 *   2. Claude    — claude.ai
 *   3. Gemini    — gemini.google.com
 *   4. Perplexity — perplexity.ai
 *   5. Grok      — x.com/i/grok
 *
 * Icons are inlined SVG paths with `fill: currentColor` so they flip
 * to brand color on hover. Default state is gray (var(--muted)).
 */

// ---- Brand SVG icons ----

export function IconChatGPT() {
  // OpenAI logomark
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

export function IconClaude() {
  // Anthropic Claude logomark (simplified A shape)
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.709 15.955l4.72-11.908h1.574l4.727 11.908h-1.628l-1.216-3.176H7.532l-1.2 3.176H4.709zm3.26-4.594h4.06L10.03 6.08h-.064l-1.998 5.28zm8.757-1.453c.095-1.643 1.4-2.932 3.527-2.932 2.222 0 3.476 1.289 3.476 3.097v5.882h-1.47v-1.388h-.064c-.413.893-1.335 1.58-2.622 1.58-1.605 0-2.932-.988-2.932-2.574 0-1.69 1.327-2.574 3.43-2.686l2.188-.12v-.59c0-1.185-.715-1.811-1.908-1.811-1.128 0-1.811.558-1.94 1.542h-1.685zm5.533 2.12l-1.844.103c-1.256.072-1.899.542-1.899 1.312 0 .762.643 1.264 1.613 1.264 1.28 0 2.13-.87 2.13-2.05v-.63z" />
    </svg>
  );
}

export function IconGemini() {
  // Google Gemini sparkle/star
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.352 0 0 5.352 0 12s5.352 12 12 12 12-5.352 12-12S18.648 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6-9.6-4.32-9.6-9.6 4.32-9.6 9.6-9.6zm-.48 3.84c-.624 2.184-1.392 3.168-2.736 4.08-1.344.912-2.784 1.2-4.584 1.2.408.024.816.048 1.224.048 1.848.048 3.36.456 4.56 1.296 1.2.84 1.92 2.016 2.496 4.296.192-.768.384-1.416.624-1.968.24-.576.528-1.056.864-1.488.336-.408.744-.768 1.224-1.08.48-.288 1.032-.528 1.656-.72.624-.168 1.344-.288 2.16-.36-1.872-.048-3.408-.456-4.584-1.296-1.176-.816-1.944-1.992-2.904-4.008z" />
    </svg>
  );
}

export function IconPerplexity() {
  // Perplexity AI logo (simplified abstract mark)
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5L2 7.125v9.75L12 22.5l10-5.625v-9.75L12 1.5zM4 8.625l8-4.5 8 4.5v6.75l-8 4.5-8-4.5v-6.75z" />
      <path d="M12 6.75v10.5M6 9.75l6 3.375 6-3.375" />
    </svg>
  );
}

export function IconGrok() {
  // X/Grok logo (using X logo since Grok is X's AI)
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export interface AIPlatform {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
}

/**
 * Build the prompt that will be sent to AI chatbots. Includes key
 * details about the release so the AI can provide useful context.
 */
function buildPrompt(item: ReleaseItem): string {
  const parts = [
    `Tell me more about "${item.title}" by ${item.org}.`,
    ``,
    `Quick context: ${item.explainer.tagline}`,
    ``,
    `I want to understand:`,
    `- What makes this significant?`,
    `- How does it compare to alternatives?`,
    `- What are the key technical details?`,
    `- Should I try it? What's the learning curve?`,
  ];
  return parts.join("\n");
}

export function useAITargets(item: ReleaseItem): AIPlatform[] {
  const prompt = buildPrompt(item);
  const encodedPrompt = encodeURIComponent(prompt);

  return [
    {
      id: "chatgpt",
      label: "ChatGPT",
      href: `https://chatgpt.com/?q=${encodedPrompt}`,
      icon: <IconChatGPT />,
    },
    {
      id: "claude",
      label: "Claude",
      href: `https://claude.ai/new?q=${encodedPrompt}`,
      icon: <IconClaude />,
    },
    {
      id: "gemini",
      label: "Gemini",
      href: `https://gemini.google.com/app?hl=en`,
      icon: <IconGemini />,
    },
    {
      id: "perplexity",
      label: "Perplexity",
      href: `https://perplexity.ai/search?q=${encodedPrompt}`,
      icon: <IconPerplexity />,
    },
    {
      id: "grok",
      label: "Grok",
      href: `https://x.com/i/grok?text=${encodedPrompt}`,
      icon: <IconGrok />,
    },
  ];
}

export function AskAIButtons({
  item,
  source = "modal",
}: {
  item: ReleaseItem;
  source?: "card" | "modal";
}) {
  const platforms = useAITargets(item);

  return (
    <section className="modal-share modal-askai" aria-label="Ask AI about this release">
      <span className="modal-share-lbl">ASK AI</span>
      <div className="share-row">
        {platforms.map((p) => (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noreferrer noopener"
            className="share-btn"
            data-platform={p.id}
            title={`Ask ${p.label}`}
            aria-label={`Ask ${p.label} about this release`}
            onClick={() =>
              track("release:ask-ai", {
                id: item.id,
                platform: p.id,
                source,
              })
            }
          >
            {p.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
