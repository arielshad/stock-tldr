import { useMemo, useState } from "react";
import { allSweeps } from "../data/sweeps";
import type { SweepReport } from "../data/schema";
import { track } from "../lib/analytics";

const PAGE_SIZE = 20;

function formatTimestamp(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  return { date: `${yyyy}-${mm}-${dd}`, time: `${hh}:${mi}Z` };
}

function sourceBadge(source: string): string {
  if (source === "github-actions-sweep") return "CRON";
  if (source.startsWith("manual")) return "MANUAL";
  return source.toUpperCase().slice(0, 8);
}

function SweepEntry({
  sweep,
  expanded,
  onToggle,
  onOpenOpportunity,
}: {
  sweep: SweepReport;
  expanded: boolean;
  onToggle: () => void;
  onOpenOpportunity: (id: string) => void;
}) {
  const ts = formatTimestamp(sweep.timestamp);
  const badge = sourceBadge(sweep.source);
  return (
    <article className={`sweep ${expanded ? "sweep-open" : ""}`}>
      <button
        type="button"
        className="sweep-head"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <span className="sweep-date">
          <span className="sweep-date-d">{ts.date}</span>
          <span className="sweep-date-t">{ts.time}</span>
        </span>
        <span className={`sweep-badge sweep-badge-${badge.toLowerCase()}`}>
          {badge}
        </span>
        <span className="sweep-counts">
          <span className="sweep-c sweep-c-add">+{sweep.counts.added}</span>
          <span className="sweep-c sweep-c-upd">~{sweep.counts.updated}</span>
          <span className="sweep-c sweep-c-rem">−{sweep.counts.removed}</span>
        </span>
        <span className="sweep-summary">{sweep.summary}</span>
        <span className="sweep-chevron" aria-hidden="true">
          {expanded ? "▾" : "▸"}
        </span>
      </button>

      {expanded && (
        <div className="sweep-body">
          {sweep.sourcesChecked && sweep.sourcesChecked.length > 0 && (
            <section className="sweep-section">
              <h3 className="sweep-section-title">
                SOURCES SEARCHED <span className="sweep-section-count">{sweep.sourcesChecked.length}</span>
              </h3>
              <div className="sweep-source-chips" aria-label="Sources searched in this sweep">
                {sweep.sourcesChecked.map((sourceId) => (
                  <span className="sweep-source-chip" key={sourceId}>
                    {sourceId}
                  </span>
                ))}
              </div>
            </section>
          )}

          {sweep.added.length > 0 && (
            <section className="sweep-section">
              <h3 className="sweep-section-title">
                ADDED <span className="sweep-section-count">{sweep.added.length}</span>
              </h3>
              <ul className="sweep-list">
                {sweep.added.map((item) => (
                  <li key={item.id} className="sweep-item">
                    <button
                      type="button"
                      className="sweep-item-head"
                      onClick={() => onOpenOpportunity(item.id)}
                    >
                      <span className="badge badge-cat sweep-cat">
                        {item.category}
                      </span>
                      <span className="sweep-item-title">{item.title}</span>
                    </button>
                    <p className="sweep-item-note">{item.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {sweep.updated.length > 0 && (
            <section className="sweep-section">
              <h3 className="sweep-section-title">
                UPDATED <span className="sweep-section-count">{sweep.updated.length}</span>
              </h3>
              <ul className="sweep-list">
                {sweep.updated.map((item) => (
                  <li key={item.id} className="sweep-item">
                    <button
                      type="button"
                      className="sweep-item-head"
                      onClick={() => onOpenOpportunity(item.id)}
                    >
                      <span className="sweep-item-title">{item.title}</span>
                    </button>
                    <p className="sweep-item-note">{item.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {sweep.removed.length > 0 && (
            <section className="sweep-section">
              <h3 className="sweep-section-title">
                REMOVED <span className="sweep-section-count">{sweep.removed.length}</span>
              </h3>
              <ul className="sweep-list">
                {sweep.removed.map((item) => (
                  <li key={item.id} className="sweep-item">
                    <span className="sweep-item-title">{item.title}</span>
                    <p className="sweep-item-note">{item.reason}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </article>
  );
}

export function SweepLogPage({
  onOpenOpportunity,
}: {
  onOpenOpportunity: (id: string) => void;
}) {
  const sweeps = useMemo(() => allSweeps(), []);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    // Open the most recent sweep by default.
    return sweeps.length > 0 ? new Set([sweeps[0].id]) : new Set();
  });
  const [page, setPage] = useState(1);

  const visible = sweeps.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sweeps.length;

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totals = useMemo(() => {
    let added = 0;
    let updated = 0;
    let removed = 0;
    for (const s of sweeps) {
      added += s.counts.added;
      updated += s.counts.updated;
      removed += s.counts.removed;
    }
    return { added, updated, removed };
  }, [sweeps]);

  return (
    <>
      <div className="log-header">
        <h1 className="log-title">Dubai property Changelog</h1>
        <span className="log-subtitle">
          {sweeps.length} sweeps · +{totals.added} items added · ~{totals.updated}{" "}
          updated · −{totals.removed} removed
        </span>
      </div>

      <div className="log-body">
        {sweeps.length === 0 ? (
          <div className="log-empty">// no sweeps yet</div>
        ) : (
          <>
            {visible.map((sweep) => (
              <SweepEntry
                key={sweep.id}
                sweep={sweep}
                expanded={expanded.has(sweep.id)}
                onToggle={() => toggle(sweep.id)}
                onOpenOpportunity={onOpenOpportunity}
              />
            ))}
            {hasMore && (
              <button
                type="button"
                className="log-more"
                onClick={() => {
                  const next = page + 1;
                  track("log:load-more", { page: next });
                  setPage(next);
                }}
              >
                LOAD MORE ({sweeps.length - visible.length} MORE)
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
