import { useState } from "react";
import type { ReleaseItem } from "../data/schema";

/**
 * Renders an item's image with graceful fallback + optional overlays:
 *   - no image / broken image  → category-tinted fallback block
 *   - item.author              → avatar/name chip in the image corner
 *   - YouTube video URL        → play button that swaps in an inline iframe
 *
 * `interactive` controls whether the play button is wired up. Set it to
 * false where an outer element already owns the click (none today, but
 * the prop is there so we can disable inline-play inside link wrappers
 * if it ever causes nested-interaction warnings).
 */
export function ReleaseImage({
  item,
  className,
  interactive = true,
}: {
  item: ReleaseItem;
  className?: string;
  interactive?: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const [avatarErrored, setAvatarErrored] = useState(false);
  const [playing, setPlaying] = useState(false);
  const img = item.image;
  const ytId = getYouTubeId(item);
  const author = item.author;

  const authorContent = author ? (
    <>
      {author.avatarUrl && !avatarErrored ? (
        <img
          className="img-author-avatar"
          src={author.avatarUrl}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setAvatarErrored(true)}
        />
      ) : (
        <span className="img-author-avatar img-author-avatar-fallback">
          {author.name.trim().charAt(0).toUpperCase()}
        </span>
      )}
      <span className="img-author-text">
        <span className="img-author-name">{author.name}</span>
        {author.handle && (
          <span className="img-author-handle">{author.handle}</span>
        )}
      </span>
    </>
  ) : null;

  const overlay = author ? (
    author.profileUrl ? (
      <a
        className="img-author img-author-link"
        href={author.profileUrl}
        target="_blank"
        rel="noreferrer noopener"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-label={`Visit ${author.name}'s profile`}
      >
        {authorContent}
      </a>
    ) : (
      <div className="img-author" aria-hidden="true">
        {authorContent}
      </div>
    )
  ) : null;

  if (playing && ytId) {
    return (
      <div className={`item-img-frame ${className ?? ""}`}>
        <iframe
          className="yt-embed"
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={item.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const rumorCls = item.importance === "rumor" ? " item-img-rumor" : "";
  const wrapProps = ytId && interactive
    ? {
        className: `item-img-frame item-img-playable${rumorCls} ${className ?? ""}`,
        role: "button" as const,
        tabIndex: 0,
        "aria-label": `Play video: ${item.title}`,
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          setPlaying(true);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            setPlaying(true);
          }
        },
      }
    : { className: `item-img-frame${rumorCls} ${className ?? ""}` };

  if (!img || errored) {
    return (
      <div {...wrapProps}>
        <div
          className="img-fallback"
          aria-hidden="true"
          data-org={item.org}
        >
          <span className="img-fallback-org">{item.org}</span>
        </div>
        {ytId && interactive && <PlayBadge />}
        {overlay}
      </div>
    );
  }

  return (
    <div {...wrapProps}>
      <img
        className="item-img"
        src={img.url}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        style={{ objectFit: img.fit ?? "contain" }}
        onError={() => setErrored(true)}
      />
      {ytId && interactive && <PlayBadge />}
      {overlay}
    </div>
  );
}

function PlayBadge() {
  return (
    <span className="yt-play" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

function getYouTubeId(item: ReleaseItem): string | null {
  const candidates = [item.url, ...(item.links?.map((l) => l.url) ?? [])];
  for (const url of candidates) {
    const id = extractYouTubeId(url);
    if (id) return id;
  }
  return null;
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return /^[A-Za-z0-9_-]{6,}$/.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") {
        const v = u.searchParams.get("v");
        return v && /^[A-Za-z0-9_-]{6,}$/.test(v) ? v : null;
      }
      const m = u.pathname.match(/^\/(embed|shorts|v|live)\/([A-Za-z0-9_-]{6,})/);
      if (m) return m[2];
    }
    return null;
  } catch {
    return null;
  }
}
