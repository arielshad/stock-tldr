import { useEffect, useRef, useState } from "react";
import type { ReleaseItem } from "../data/schema";
import {
  IconChatGPT,
  IconClaude,
  IconGemini,
  IconPerplexity,
  IconGrok,
  useAITargets,
} from "./AskAIButtons";
import { track } from "../lib/analytics";

/**
 * AI chatbot icon for the card — a sparkle/brain glyph that matches
 * the share button's style. Used as the trigger for the popup menu.
 */
function IconAI() {
  // Simple sparkle/star representing AI
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
    </svg>
  );
}

/**
 * Single ASK AI trigger button that sits below the share button in the
 * top-right corner of every feed card. Click → popup menu appears with
 * AI chatbot options (ChatGPT, Claude, Gemini, Perplexity, Grok).
 *
 * Same behavior as CardShareButton: stopPropagation on all events,
 * Escape + outside click to close.
 */
export function CardAskAIButton({ item }: { item: ReleaseItem }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const platforms = useAITargets(item);

  // Close popup on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        e.stopPropagation();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey, true);
    };
  }, [open]);

  return (
    <div
      className="card-askai"
      ref={rootRef}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="card-askai-trigger"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        title="Ask AI"
        aria-label={open ? "Close AI menu" : "Ask AI about this release"}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <IconAI />
      </button>

      {open && (
        <div className="card-share-popup" role="menu">
          <a
            href={platforms.find((p) => p.id === "chatgpt")?.href}
            target="_blank"
            rel="noreferrer noopener"
            className="share-btn"
            data-platform="chatgpt"
            title="ChatGPT"
            aria-label="Ask ChatGPT"
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              track("release:ask-ai", {
                id: item.id,
                platform: "chatgpt",
                source: "card",
              });
              setOpen(false);
            }}
          >
            <IconChatGPT />
          </a>
          <a
            href={platforms.find((p) => p.id === "claude")?.href}
            target="_blank"
            rel="noreferrer noopener"
            className="share-btn"
            data-platform="claude"
            title="Claude"
            aria-label="Ask Claude"
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              track("release:ask-ai", {
                id: item.id,
                platform: "claude",
                source: "card",
              });
              setOpen(false);
            }}
          >
            <IconClaude />
          </a>
          <a
            href={platforms.find((p) => p.id === "gemini")?.href}
            target="_blank"
            rel="noreferrer noopener"
            className="share-btn"
            data-platform="gemini"
            title="Gemini"
            aria-label="Ask Gemini"
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              track("release:ask-ai", {
                id: item.id,
                platform: "gemini",
                source: "card",
              });
              setOpen(false);
            }}
          >
            <IconGemini />
          </a>
          <a
            href={platforms.find((p) => p.id === "perplexity")?.href}
            target="_blank"
            rel="noreferrer noopener"
            className="share-btn"
            data-platform="perplexity"
            title="Perplexity"
            aria-label="Ask Perplexity"
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              track("release:ask-ai", {
                id: item.id,
                platform: "perplexity",
                source: "card",
              });
              setOpen(false);
            }}
          >
            <IconPerplexity />
          </a>
          <a
            href={platforms.find((p) => p.id === "grok")?.href}
            target="_blank"
            rel="noreferrer noopener"
            className="share-btn"
            data-platform="grok"
            title="Grok"
            aria-label="Ask Grok"
            role="menuitem"
            onClick={(e) => {
              e.stopPropagation();
              track("release:ask-ai", {
                id: item.id,
                platform: "grok",
                source: "card",
              });
              setOpen(false);
            }}
          >
            <IconGrok />
          </a>
        </div>
      )}
    </div>
  );
}
