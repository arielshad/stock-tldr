import { useEffect } from "react";
import type { ReleaseItem } from "../data/schema";
import { CATEGORY_META } from "../data/categories";
import { ReleaseImage } from "./ReleaseImage";
import { ShareButtons } from "./ShareButtons";
import { AskAIButtons } from "./AskAIButtons";
import { track } from "../lib/analytics";
import { extractMove, formatMovePct, moveDirection } from "../lib/finance";

const importanceLabel: Record<ReleaseItem["importance"], string> = {
  rumor: "RUMOR",
  notable: "NOTABLE",
  major: "MAJOR",
  seismic: "SEISMIC",
};

export function ReleaseModal({
  item,
  onClose,
}: {
  item: ReleaseItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const ex = item.explainer;
  const move = extractMove(item.metrics);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="modal">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕ ESC
        </button>

        {/* Left: image + sources pane */}
        <aside className="modal-left">
          <ReleaseImage item={item} className="modal-img" />
          <div className="modal-left-meta">
            {item.categories.map((c) => (
              <span className="badge badge-cat" key={c}>
                {CATEGORY_META[c].label}
              </span>
            ))}
            {item.tickers?.map((t) => (
              <span className="badge badge-ticker" key={t}>
                {t}
              </span>
            ))}
            {move && (
              <span
                className={`move move-${moveDirection(move.pct)}`}
                title={move.raw}
              >
                <span className="move-arrow" aria-hidden="true">
                  {move.pct > 0 ? "▲" : move.pct < 0 ? "▼" : "•"}
                </span>
                {formatMovePct(move.pct)}
              </span>
            )}
            <span className={`badge badge-imp imp-${item.importance}`}>
              {importanceLabel[item.importance]}
            </span>
            <span className="modal-date">{item.date}</span>
          </div>

          <section className="modal-sources">
            <h3 className="panel-h modal-sources-h">// SOURCES ↓</h3>
            <ul className="sources-list">
              {(item.links && item.links.length > 0
                ? item.links
                : [{ label: "Source", url: item.url }]
              ).map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="source-link"
                    onClick={() =>
                      track("opportunity:url-click", {
                        id: item.id,
                        category: item.categories[0],
                        source: "modal",
                      })
                    }
                  >
                    <span className="source-label">{l.label}</span>
                    <span className="source-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <ShareButtons item={item} source="modal" />
          <AskAIButtons item={item} source="modal" />
        </aside>

        {/* Right: content pane */}
        <div className="modal-right">
          <header className="modal-head">
            <h2 className="modal-title">{item.title}</h2>
            {item.author ? (
              <p className="modal-org">
                {item.author.profileUrl ? (
                  <a
                    href={item.author.profileUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="modal-author-link"
                  >
                    {item.author.name}
                    {item.author.handle && (
                      <span className="modal-author-handle">
                        {" "}
                        {item.author.handle}
                      </span>
                    )}
                    <span className="modal-author-arrow"> ↗</span>
                  </a>
                ) : (
                  <>
                    {item.author.name}
                    {item.author.handle && (
                      <span className="modal-author-handle">
                        {" "}
                        {item.author.handle}
                      </span>
                    )}
                  </>
                )}
              </p>
            ) : (
              <p className="modal-org">{item.org}</p>
            )}
            <p className="modal-tagline">{ex.tagline}</p>
          </header>

          <div className="modal-grid">
            <section className="panel">
              <h3 className="panel-h">// WHAT IS IT</h3>
              <p>{ex.whatIsIt}</p>
            </section>
            <section className="panel">
              <h3 className="panel-h">// HOW IT WORKS</h3>
              <p>{ex.howItWorks}</p>
            </section>
            <section className="panel">
              <h3 className="panel-h">// WHY IT MATTERS</h3>
              <p>{ex.whyItMatters}</p>
            </section>
            {(ex.forWho || ex.tryIt) && (
              <section className="panel">
                <h3 className="panel-h">// WHO + HOW TO TRY</h3>
                {ex.forWho && (
                  <p>
                    <strong>For:</strong> {ex.forWho}
                  </p>
                )}
                {ex.tryIt && (
                  <p style={{ marginTop: 4 }}>
                    <strong>Try:</strong>{" "}
                    {/^https?:\/\//.test(ex.tryIt) ? (
                      <a
                        className="try-code try-link"
                        href={ex.tryIt}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={() =>
                          track("opportunity:tryit-click", {
                            id: item.id,
                            category: item.categories[0],
                          })
                        }
                      >
                        {ex.tryIt} <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <code className="try-code">{ex.tryIt}</code>
                    )}
                  </p>
                )}
              </section>
            )}
          </div>

          <footer className="modal-foot">
            {item.metrics && (
              <dl className="metric-table">
                {Object.entries(item.metrics)
                  // The Move chip already shows in the header — don't
                  // duplicate it in the table below.
                  .filter(([k]) => !/^move\b/i.test(k))
                  .slice(0, 8)
                  .map(([k, v]) => (
                    <div className="metric-row" key={k}>
                      <dt className="metric-key">{k}</dt>
                      <dd className="metric-val">{v}</dd>
                    </div>
                  ))}
              </dl>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="modal-tags">
                {item.tags.slice(0, 8).map((t) => (
                  <span className="tag" key={t}>
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
