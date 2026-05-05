import { useEffect, useRef, useState } from "react";
import { CATEGORY_ORDER, type Category } from "../data/schema";
import { CATEGORY_META } from "../data/categories";
import { track } from "../lib/analytics";

export function FilterBar({
  active,
  counts,
  query,
  onToggle,
  onClear,
  onQuery,
  totalShown,
  totalAll,
}: {
  active: Set<Category>;
  counts: Record<Category, number>;
  query: string;
  onToggle: (cat: Category) => void;
  onClear: () => void;
  onQuery: (q: string) => void;
  totalShown: number;
  totalAll: number;
}) {
  // Chips live behind a CATEGORIES (N) ▾ button on both desktop and mobile.
  // Desktop: CSS positions the panel as an absolute popover below the bar.
  // Mobile: CSS drops it to `position: static` so it flows as a third row
  // inside the filterbar flexbox. Same React state, same DOM — CSS-only
  // differentiation keeps the logic simple.
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close on outside click / Escape. Only attach listeners when open —
  // avoids unnecessary work when the panel is closed.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !btnRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Fire search:used once the query settles (600ms idle) with ≥2 chars.
  // A ref tracks the last-reported length so a user who keeps typing
  // only generates one event per query session.
  const lastReportedRef = useRef<number>(0);
  useEffect(() => {
    const len = query.trim().length;
    if (len < 2) {
      lastReportedRef.current = 0;
      return;
    }
    const t = setTimeout(() => {
      if (len !== lastReportedRef.current) {
        track("search:used", { length: len });
        lastReportedRef.current = len;
      }
    }, 600);
    return () => clearTimeout(t);
  }, [query]);

  // Only show the x/y count when a filter is active. Otherwise "152/152" is
  // pure visual noise.
  const filtered = active.size > 0 || query.trim().length > 0;

  return (
    <div className="filterbar" role="toolbar" aria-label="Feed controls">
      <div className="fb-anchor fb-anchor-left">
        <button
          ref={btnRef}
          type="button"
          className={`fb-cat-btn ${open ? "fb-cat-btn-open" : ""} ${
            active.size > 0 ? "fb-cat-btn-active" : ""
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="fb-cat-panel"
        >
          CATEGORIES
          {active.size > 0 && (
            <span className="fb-cat-btn-num">{active.size}</span>
          )}
          <span className="fb-cat-btn-arrow" aria-hidden="true">
            {open ? "▴" : "▾"}
          </span>
        </button>
      </div>

      <div className="fb-anchor fb-anchor-right">
        {filtered && (
          <span className="filterbar-status" title="matching / total">
            {totalShown}
            <span className="filterbar-status-sep">/</span>
            {totalAll}
          </span>
        )}
        <div className="search">
          <span className="search-prompt">/</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="search"
            aria-label="Search releases"
          />
        </div>
      </div>

      {open && (
        <div
          id="fb-cat-panel"
          ref={panelRef}
          className="fb-cat-panel"
          role="group"
          aria-label="Category filters"
        >
          <button
            type="button"
            className={`chip chip-all ${active.size === 0 ? "chip-on" : ""}`}
            onClick={() => {
              onClear();
            }}
          >
            ALL <span className="chip-count">{totalAll}</span>
          </button>
          {CATEGORY_ORDER.map((c) => {
            const meta = CATEGORY_META[c];
            const on = active.has(c);
            return (
              <button
                type="button"
                key={c}
                className={`chip ${on ? "chip-on" : ""}`}
                onClick={() => onToggle(c)}
                title={meta.blurb}
              >
                {meta.label} <span className="chip-count">{counts[c] ?? 0}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
