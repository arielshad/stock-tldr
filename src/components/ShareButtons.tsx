import { useState, type ReactNode } from "react";
import type { ReleaseItem } from "../data/schema";
import { track } from "../lib/analytics";

/**
 * Compact share row for the release modal. One row of 30×30 square
 * icon buttons (borderless, transparent) that sit seamlessly at the
 * bottom of the modal-left aside below SOURCES.
 *
 * Buttons (left → right):
 *   1. Native Web Share sheet     — only rendered if navigator.share exists
 *   2. Copy link                  — flashes yellow for 1.6s after success
 *   3. X / Twitter                — intent/tweet
 *   4. Bluesky                    — intent/compose
 *   5. LinkedIn                   — share-offsite
 *   6. Reddit                     — submit
 *   7. Hacker News                — submitlink
 *
 * Icons are inlined SVG paths (zero network requests) with
 * `fill: currentColor` so they flip to brand color on hover. Default
 * state is gray (var(--muted)); hover takes the platform's brand
 * color. Copy + native share hover yellow (var(--acc)).
 */

// ---- Brand SVG paths (Simple Icons CC0 + Material for copy/share) ----
// These are exported so CardShareButton can reuse them without duplicating
// the inline paths or shipping a second icon set.

export function IconShareDots() {
  // Material "share" — canonical three-circles-connected glyph. Used as
  // the single trigger icon on feed cards (in CardShareButton).
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

export function IconShare() {
  // Material "open-in-new" — arrow out of a box. Used for the native
  // Web Share button since there's no universal "share" glyph.
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z" />
    </svg>
  );
}

export function IconCopy() {
  // Material "content-copy" — two stacked squares.
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  );
}

export function IconCheck() {
  // Material "check" — a single bold checkmark. Swapped in for
  // IconCopy during the ~1.6s "copied" feedback window so the user
  // sees the icon literally morph from copy → check (the yellow
  // hover color alone isn't enough of a change to read as "done").
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

export function IconX() {
  // Simple Icons — X (formerly Twitter)
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IconBluesky() {
  // Simple Icons — Bluesky (butterfly)
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
    </svg>
  );
}

export function IconLinkedIn() {
  // Simple Icons — LinkedIn
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function IconReddit() {
  // Simple Icons — Reddit (alien face in circle)
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

export function IconHackerNews() {
  // Simple Icons — Hacker News (Y in square)
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z" />
    </svg>
  );
}

export interface SharePlatform {
  id: string; // data-platform attribute — drives brand-colored hover in CSS
  label: string;
  href: string;
  icon: ReactNode;
}

export interface ShareTargets {
  /** Canonical URL being shared (points at /releases/<id>). */
  url: string;
  /** Social platforms, each with pre-built intent URL + branded icon. */
  platforms: SharePlatform[];
  /** True if the browser exposes navigator.share (mobile / Safari). */
  canNativeShare: boolean;
  /** True while the "COPIED ✓" feedback is showing (≈1.6s after click). */
  copied: boolean;
  /** Writes the URL to the clipboard. Falls back to window.prompt. */
  handleCopy: () => void | Promise<void>;
  /** Opens the OS share sheet via navigator.share. No-op if unsupported. */
  handleNativeShare: () => void;
}

/**
 * Shared hook used by both `ShareButtons` (modal row) and
 * `CardShareButton` (feed card trigger + popup). Builds the platform
 * URLs from an item + manages the "copied" flash state so both
 * consumers render the same targets with the same feedback behavior.
 */
export function useShareTargets(item: ReleaseItem): ShareTargets {
  const [copied, setCopied] = useState(false);

  // Browser origin when available (so localhost dev still produces
  // working share links), production domain as the SSR/fallback.
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://stock-tldr.xyz";
  const url = `${origin}/releases/${item.id}`;

  // Tweet-length-safe text for character-limited platforms.
  const fullText = `${item.title} — ${item.explainer.tagline}`;
  const shareText =
    fullText.length > 200 ? fullText.slice(0, 197) + "…" : fullText;

  // Plain title for platforms that accept title + URL as separate params.
  const shareTitle = `${item.title} — ${item.org}`;

  const platforms: SharePlatform[] = [
    {
      id: "x",
      label: "X / Twitter",
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      icon: <IconX />,
    },
    {
      id: "bluesky",
      label: "Bluesky",
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText + " " + url)}`,
      icon: <IconBluesky />,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: <IconLinkedIn />,
    },
    {
      id: "reddit",
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(shareTitle)}`,
      icon: <IconReddit />,
    },
    {
      id: "hackernews",
      label: "Hacker News",
      href: `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(shareTitle)}`,
      icon: <IconHackerNews />,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API can reject in insecure contexts or when denied —
      // fall back to a prompt the user can manually copy from.
      window.prompt("Copy this link:", url);
    }
  };

  // Web Share API — only on mobile / Safari. When available, surface
  // it as the first button so mobile users get the OS share sheet.
  const canNativeShare =
    typeof navigator !== "undefined" &&
    typeof (navigator as Navigator & { share?: unknown }).share === "function";

  const handleNativeShare = () => {
    navigator
      .share?.({
        title: item.title,
        text: item.explainer.tagline,
        url,
      })
      .catch(() => {
        /* user cancelled or error — no-op */
      });
  };

  return {
    url,
    platforms,
    canNativeShare,
    copied,
    handleCopy,
    handleNativeShare,
  };
}

export function ShareButtons({
  item,
  source = "modal",
}: {
  item: ReleaseItem;
  source?: "card" | "modal";
}) {
  const { platforms, canNativeShare, copied, handleCopy, handleNativeShare } =
    useShareTargets(item);

  return (
    <section className="modal-share" aria-label="Share this release">
      <span className="modal-share-lbl">SHARE</span>
      <div className="share-row">
        {canNativeShare && (
          <button
            type="button"
            className="share-btn"
            data-platform="native"
            onClick={() => {
              track("release:share", {
                id: item.id,
                platform: "native",
                source,
              });
              handleNativeShare();
            }}
            title="Share…"
            aria-label="Open native share sheet"
          >
            <IconShare />
          </button>
        )}
        <button
          type="button"
          className={`share-btn ${copied ? "share-btn-copied" : ""}`}
          data-platform="copy"
          onClick={() => {
            track("release:share", {
              id: item.id,
              platform: "copy",
              source,
            });
            handleCopy();
          }}
          title={copied ? "Copied!" : "Copy link"}
          aria-label={copied ? "Link copied" : "Copy link to this release"}
        >
          {copied ? <IconCheck /> : <IconCopy />}
        </button>
        {platforms.map((p) => (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noreferrer noopener"
            className="share-btn"
            data-platform={p.id}
            title={p.label}
            aria-label={`Share on ${p.label}`}
            onClick={() =>
              track("release:share", {
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
