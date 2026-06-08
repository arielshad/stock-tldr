import { useEffect, useRef, useState } from "react";
import { track } from "../lib/analytics";

/**
 * Scroll-triggered newsletter popup.
 *
 * Fires once the user has scrolled past a threshold (they've shown intent
 * by engaging with the feed), then never again — the outcome is persisted
 * in localStorage so a returning or scrolling-back visitor isn't nagged
 * twice. "Seen" is written the instant we render, so even a hard refresh
 * mid-scroll won't re-trigger it.
 */

const STORAGE_KEY = "stldr:newsletter-popup:v1";
// How far down the page (px) before we consider the user "engaged".
const SCROLL_TRIGGER = 700;

function alreadyHandled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) != null;
  } catch {
    return false;
  }
}

function markHandled(outcome: "seen" | "subscribed" | "dismissed"): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ outcome, at: Date.now() }),
    );
  } catch {
    /* private mode / storage disabled — degrade silently */
  }
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  // Tracks whether this mount has already committed to showing the popup,
  // so the scroll handler can detach itself and never fire twice.
  const triggered = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (alreadyHandled()) return;

    const maybeShow = () => {
      if (triggered.current) return;
      if (window.scrollY < SCROLL_TRIGGER) return;
      triggered.current = true;
      window.removeEventListener("scroll", maybeShow);
      // Persist immediately: a refresh mid-scroll shouldn't re-pop.
      markHandled("seen");
      setOpen(true);
      track("newsletter-popup:show");
    };

    window.addEventListener("scroll", maybeShow, { passive: true });
    // In case the page is restored already scrolled down.
    maybeShow();

    return () => window.removeEventListener("scroll", maybeShow);
  }, []);

  // Focus the email field + allow Esc to dismiss while open.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close("dismissed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = (reason: "dismissed" | "subscribed") => {
    markHandled(reason);
    setOpen(false);
    track("newsletter-popup:close", { reason });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        track("newsletter-popup:submit", { ok: true });
        setStatus("success");
        markHandled("subscribed");
      } else {
        track("newsletter-popup:submit", { ok: false });
        setStatus("error");
      }
    } catch {
      track("newsletter-popup:submit", { ok: false });
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="np-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="np-title"
      onClick={(e) => {
        // Click on the backdrop (not the card) dismisses.
        if (e.target === e.currentTarget) close("dismissed");
      }}
    >
      <div className="np-card">
        <button
          type="button"
          className="np-x"
          aria-label="Close"
          onClick={() => close("dismissed")}
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="np-success">
            <span className="np-check">OK</span>
            <p className="np-success-msg">
              You&rsquo;re in. The next digest hits your inbox.
            </p>
            <button
              type="button"
              className="np-done"
              onClick={() => close("subscribed")}
            >
              CLOSE
            </button>
          </div>
        ) : (
          <>
            <span className="np-kicker">DAILY DIGEST</span>
            <h2 id="np-title" className="np-title">
              Don&rsquo;t trade on yesterday&rsquo;s news.
            </h2>
            <p className="np-sub">
              Equities, macro, rates, FX, commodities &amp; crypto — the moves
              that matter, summarized and in your inbox before the open. Free.
            </p>

            <form className="np-form" onSubmit={handleSubmit}>
              <span className="np-prompt">&gt;</span>
              <input
                ref={inputRef}
                type="email"
                name="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "..." : "GET THE EDGE"}
              </button>
            </form>
            {status === "error" && (
              <span className="np-error">Something broke — try again.</span>
            )}

            <button
              type="button"
              className="np-decline"
              onClick={() => close("dismissed")}
            >
              No thanks, I like being the last to know.
            </button>
          </>
        )}
      </div>
    </div>
  );
}
