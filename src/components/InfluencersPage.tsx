import { useMemo, useState } from "react";
import {
  sources,
  PLATFORM_META,
  type Source,
  type Platform,
} from "../data/sources";
import { track } from "../lib/analytics";

const ALL_PLATFORMS: Platform[] = [
  "portal",
  "government",
  "developer",
  "brokerage",
  "auction",
  "data",
  "media",
];

function tierClass(raw: number): string {
  if (raw >= 1000000) return "inf-tier-mega";
  if (raw >= 300000) return "inf-tier-big";
  if (raw >= 100000) return "inf-tier-mid";
  return "inf-tier-base";
}

/**
 * Build the avatar URL for an source from their platform + handle.
 *
 * We don't rely on `person.image` (which used to be a local /sources/
 * file path) because those files were never populated for the current
 * roster — every entry would 404. Instead we derive a URL that is
 * actually live on the relevant platform:
 *
 *   github   → https://github.com/<user>.png         (canonical, always 200)
 *   twitter  → https://unavatar.io/twitter/<handle>  (proxies x.com avatar)
 *   youtube  → https://unavatar.io/youtube/<handle>
 *   substack → https://unavatar.io/substack/<handle>
 *
 * For platforms unavatar doesn't reliably handle (blog, podcast,
 * linkedin, twitch) we look at `links[]` for a Twitter handle and use
 * unavatar/twitter on it. If we can't find any platform-derived URL,
 * we return null and the <SourceAvatar> component falls through to
 * the deterministic letter avatar — never a broken-image icon.
 */
function avatarUrlFor(person: Source): string | null {
  switch (person.platform) {
    case "portal":
    case "government":
    case "developer":
    case "brokerage":
    case "auction":
    case "data":
    case "media":
      return null;
  }
  return null;
}

/** Stable djb2-style hash so a given source always lands on the
 *  same letter-avatar hue, regardless of session. */
function hueFor(id: string): number {
  let h = 5381;
  for (let i = 0; i < id.length; i++) h = ((h << 5) + h + id.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}

function SourceAvatar({ person }: { person: Source }) {
  const url = avatarUrlFor(person);
  // `failed` flips when the live <img> 404s or errors. Once true we
  // never re-attempt — switch permanently to the letter avatar.
  const [failed, setFailed] = useState(false);

  if (!url || failed) {
    const initial = (person.name.match(/[A-Za-z0-9]/)?.[0] ?? "?").toUpperCase();
    return (
      <div
        className="inf-avatar inf-avatar-fallback"
        style={{ background: `hsl(${hueFor(person.id)} 55% 28%)` }}
        aria-label={person.name}
        role="img"
      >
        {initial}
      </div>
    );
  }
  return (
    <img
      className="inf-avatar"
      src={url}
      alt={person.name}
      loading="lazy"
      // Some platforms strip `referer` to block hotlinking; explicit
      // no-referrer maximizes the chance unavatar / github serve us.
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

function SourceCard({ person, rank }: { person: Source; rank: number }) {
  const meta = PLATFORM_META[person.platform];
  return (
    <a
      className={`inf-card ${tierClass(person.followersRaw)} inf-plat-${person.platform}`}
      href={person.url}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() =>
        track("source:click", {
          id: person.id,
          platform: person.platform,
        })
      }
    >
      <span className="inf-rank">#{rank}</span>
      <SourceAvatar person={person} />
      <div className="inf-body">
        <div className="inf-top">
          <span className={`badge inf-plat-badge plat-${person.platform}`}>
            {meta.icon} {meta.label}
          </span>
          <span className="inf-followers">
            {person.followers} <span className="inf-metric">{meta.metric}</span>
          </span>
        </div>
        <h3 className="inf-name">{person.name}</h3>
        {person.realName && (
          <span className="inf-realname">{person.realName}</span>
        )}
        <span className="inf-handle">@{person.handle}</span>
        <p className="inf-bio">{person.bio}</p>
        <div className="inf-bottom">
          <div className="inf-tags">
            {person.tags.map((t) => (
              <span className="inf-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          {person.links && person.links.length > 0 && (
            <div className="inf-links">
              {person.links.map((l) => (
                <span
                  key={l.platform}
                  className="inf-link-icon"
                  title={PLATFORM_META[l.platform].label}
                >
                  {PLATFORM_META[l.platform].icon}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export function SourcesPage() {
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...sources].sort(
      (a, b) => b.followersRaw - a.followersRaw,
    );
    if (activePlatform) {
      list = list.filter((p) => p.platform === activePlatform);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.handle.toLowerCase().includes(q) ||
          p.bio.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      );
    }
    return list;
  }, [activePlatform, query]);

  return (
    <>
      <div className="inf-header">
        <h1 className="inf-title">Dubai Property Source Map</h1>
        <span className="inf-subtitle">
          {sources.length} portals, government datasets, developers, auction feeds and market-data sources · sorted by workflow priority
        </span>
      </div>

      <div className="inf-filters">
        <div className="inf-chips">
          <button
            type="button"
            className={`chip ${activePlatform === null ? "chip-on" : ""}`}
            onClick={() => setActivePlatform(null)}
          >
            ALL
          </button>
          {ALL_PLATFORMS.map((p) => {
            const count = sources.filter((i) => i.platform === p).length;
            if (count === 0) return null;
            return (
              <button
                type="button"
                key={p}
                className={`chip ${activePlatform === p ? "chip-on" : ""}`}
                onClick={() =>
                  setActivePlatform(activePlatform === p ? null : p)
                }
              >
                {PLATFORM_META[p].icon} {PLATFORM_META[p].label}{" "}
                <span className="chip-count">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="search">
          <span className="search-prompt">/</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search source, area, workflow…"
            aria-label="Search sources"
          />
        </div>
      </div>

      <div className="inf-grid">
        {filtered.length === 0 ? (
          <div className="inf-empty">// no matches</div>
        ) : (
          filtered.map((person, i) => (
            <SourceCard key={person.id} person={person} rank={i + 1} />
          ))
        )}
      </div>
    </>
  );
}
