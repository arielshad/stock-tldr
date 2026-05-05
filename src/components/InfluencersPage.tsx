import { useMemo, useState } from "react";
import {
  influencers,
  PLATFORM_META,
  type Influencer,
  type Platform,
} from "../data/influencers";
import { track } from "../lib/analytics";

const ALL_PLATFORMS: Platform[] = [
  "youtube",
  "twitter",
  "github",
  "blog",
  "podcast",
  "linkedin",
  "substack",
];

function tierClass(raw: number): string {
  if (raw >= 1000000) return "inf-tier-mega";
  if (raw >= 300000) return "inf-tier-big";
  if (raw >= 100000) return "inf-tier-mid";
  return "inf-tier-base";
}

function InfluencerCard({ person, rank }: { person: Influencer; rank: number }) {
  const meta = PLATFORM_META[person.platform];
  return (
    <a
      className={`inf-card ${tierClass(person.followersRaw)} inf-plat-${person.platform}`}
      href={person.url}
      target="_blank"
      rel="noreferrer noopener"
      onClick={() =>
        track("influencer:click", {
          id: person.id,
          platform: person.platform,
        })
      }
    >
      <span className="inf-rank">#{rank}</span>
      <img
        className="inf-avatar"
        src={person.image}
        alt={person.name}
        loading="lazy"
      />
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

export function InfluencersPage() {
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...influencers].sort(
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
        <h1 className="inf-title">Top Markets Voices to Follow</h1>
        <span className="inf-subtitle">
          {influencers.length} traders, analysts &amp; commentators · sorted by reach
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
            const count = influencers.filter((i) => i.platform === p).length;
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
            placeholder="search name, handle, topic…"
            aria-label="Search influencers"
          />
        </div>
      </div>

      <div className="inf-grid">
        {filtered.length === 0 ? (
          <div className="inf-empty">// no matches</div>
        ) : (
          filtered.map((person, i) => (
            <InfluencerCard key={person.id} person={person} rank={i + 1} />
          ))
        )}
      </div>
    </>
  );
}
