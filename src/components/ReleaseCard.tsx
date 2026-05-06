import type { ReleaseItem } from "../data/schema";
import { CATEGORY_META } from "../data/categories";
import { ReleaseImage } from "./ReleaseImage";
import { CardShareButton } from "./CardShareButton";
import { CardAskAIButton } from "./CardAskAIButton";
import { track } from "../lib/analytics";
import { extractMove, formatMovePct, moveDirection } from "../lib/finance";

const importanceLabel: Record<ReleaseItem["importance"], string> = {
  rumor: "RUMOR",
  notable: "NOTABLE",
  major: "MAJOR",
  seismic: "SEISMIC",
};

export function ReleaseCard({
  item,
  onOpen,
}: {
  item: ReleaseItem;
  onOpen: (item: ReleaseItem) => void;
}) {
  const move = extractMove(item.metrics);

  return (
    <article
      className={`card card-${item.importance}`}
      data-importance={item.importance}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
      aria-label={`${item.title} — ${item.org}`}
    >
      <CardShareButton item={item} />
      <CardAskAIButton item={item} />

      <a
        className="card-visit"
        href={item.url}
        target="_blank"
        rel="noreferrer noopener"
        onClick={(e) => {
          e.stopPropagation();
          track("opportunity:url-click", {
            id: item.id,
            category: item.categories[0],
            source: "card",
          });
        }}
        onKeyDown={(e) => e.stopPropagation()}
        aria-label={`Open ${item.title} source in new tab`}
        title="Open source ↗"
      >
        ↗
      </a>

      <ReleaseImage item={item} className="card-img" />

      <div className="card-meta">
        {item.categories.map((c) => (
          <span className="badge badge-cat" key={c}>
            {CATEGORY_META[c].label}
          </span>
        ))}
        {item.tickers?.slice(0, 4).map((t) => (
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
        <span
          className="card-date"
          title={`Released ${item.date} · Ingested ${new Date(item.publishDate).toISOString()}`}
        >
          {(() => {
            const d = new Date(item.publishDate);
            const pad = (n: number) => String(n).padStart(2, "0");
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
          })()}
        </span>
      </div>

      <h2 className="card-title">{item.title}</h2>

      <p className="card-tagline">{item.explainer.tagline}</p>

      {item.importance === "seismic" && (
        <p className="card-preview">
          {item.explainer.whatIsIt.split(/(?<=\.)\s+/).slice(0, 2).join(" ")}
        </p>
      )}

      <div className="card-foot">
        <span className="card-org">{item.org}</span>
        <span className="card-srclinks">
          {item.links?.length ?? 0} source{(item.links?.length ?? 0) === 1 ? "" : "s"}
        </span>
        <span className="card-cta">DETAILS →</span>
      </div>
    </article>
  );
}
