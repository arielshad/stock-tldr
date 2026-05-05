import { useEffect, useRef, useState } from "react";
import type { ReleaseItem } from "../data/schema";
import {
  IconCheck,
  IconCopy,
  IconShare,
  IconShareDots,
  useShareTargets,
} from "./ShareButtons";
import { track } from "../lib/analytics";

/**
 * Single share trigger button that sits in the top-right corner of
 * every feed card, to the LEFT of the existing `.card-visit` (↗) link.
 * Click → small popup menu appears below the button with the full set
 * of share targets (native share if supported, copy link, X, Bluesky,
 * LinkedIn, Reddit, Hacker News).
 *
 * All click events are `stopPropagation`'d because the card itself has
 * an `onClick={() => onOpen(item)}` handler that opens the release
 * modal — we don't want the share button to also open the modal.
 *
 * Escape key + outside click close the popup. Escape uses capture
 * phase + stopPropagation so it doesn't bubble up to the release
 * modal's own ESC handler (which would also close the modal if it
 * were open on top of the card — shouldn't happen, but defensive).
 */
export function CardShareButton({ item }: { item: ReleaseItem }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const {
    platforms,
    canNativeShare,
    copied,
    handleCopy,
    handleNativeShare,
  } = useShareTargets(item);

  // Close popup on outside click + Escape. Runs only while open.
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
      className="card-share"
      ref={rootRef}
      // Stop all pointer / key events from bubbling up to the card —
      // the card itself is a role="button" that opens the modal.
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="card-share-trigger"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        title="Share"
        aria-label={open ? "Close share menu" : "Share this release"}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <IconShareDots />
      </button>

      {open && (
        <div className="card-share-popup" role="menu">
          {canNativeShare && (
            <button
              type="button"
              className="share-btn"
              data-platform="native"
              onClick={(e) => {
                e.stopPropagation();
                track("release:share", {
                  id: item.id,
                  platform: "native",
                  source: "card",
                });
                handleNativeShare();
                setOpen(false);
              }}
              title="Share…"
              aria-label="Open native share sheet"
              role="menuitem"
            >
              <IconShare />
            </button>
          )}
          <button
            type="button"
            className={`share-btn ${copied ? "share-btn-copied" : ""}`}
            data-platform="copy"
            onClick={(e) => {
              e.stopPropagation();
              track("release:share", {
                id: item.id,
                platform: "copy",
                source: "card",
              });
              handleCopy();
              // Let the user see the checkmark + yellow flash for a
              // moment, then auto-dismiss the popup. 1400ms is just
              // under the hook's 1600ms `copied` reset, so the popup
              // closes before the icon reverts — no jarring flip.
              setTimeout(() => setOpen(false), 1400);
            }}
            title={copied ? "Copied!" : "Copy link"}
            aria-label={copied ? "Link copied" : "Copy link to this release"}
            role="menuitem"
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
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                track("release:share", {
                  id: item.id,
                  platform: p.id,
                  source: "card",
                });
                setOpen(false);
              }}
            >
              {p.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
