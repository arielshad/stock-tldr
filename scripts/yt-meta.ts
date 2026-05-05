#!/usr/bin/env bun
/**
 * YouTube metadata helper.
 *
 * Usage:  bun scripts/yt-meta.ts <youtube-url-or-id>
 *
 * Hits the public oembed endpoint (no auth, no scraping) and returns
 * a normalized JSON blob the agent can drop directly into a video item:
 *
 *   { videoId, title, channelName, channelUrl, thumbnailUrl }
 *
 * Exit 0 = found, exit 1 = invalid input or oembed failure.
 */
const arg = process.argv[2];
if (!arg) {
  console.error("usage: bun scripts/yt-meta.ts <youtube-url-or-id>");
  process.exit(1);
}

function extractVideoId(input: string): string | null {
  if (/^[\w-]{11}$/.test(input)) return input;
  try {
    const u = new URL(input);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    const v = u.searchParams.get("v");
    if (v) return v;
    const m = u.pathname.match(/\/(?:embed|shorts|v)\/([\w-]{11})/);
    if (m) return m[1];
  } catch {
    /* not a URL */
  }
  return null;
}

const videoId = extractVideoId(arg);
if (!videoId) {
  console.error(`could not extract video id from: ${arg}`);
  process.exit(1);
}

const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
  watchUrl,
)}&format=json`;

async function fetchUploadDate(id: string): Promise<string | null> {
  // Scrape the watch page for the uploadDate / datePublished meta tag.
  // YouTube exposes these in JSON-LD and as <meta itemprop="datePublished">.
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; stock-tldr-sweep-bot; +https://stock-tldr.xyz)",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m =
      html.match(/"uploadDate":"([^"]+)"/) ??
      html.match(/<meta itemprop="datePublished" content="([^"]+)"/) ??
      html.match(/"datePublished":"([^"]+)"/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

try {
  const res = await fetch(oembedUrl, {
    headers: { "User-Agent": "stock-tldr-sweep-bot" },
  });
  if (!res.ok) {
    console.error(`oembed returned ${res.status} for ${videoId}`);
    process.exit(1);
  }
  const data = (await res.json()) as {
    title?: string;
    author_name?: string;
    author_url?: string;
  };
  const uploadDate = await fetchUploadDate(videoId);
  let ageHours: number | null = null;
  if (uploadDate) {
    const ms = Date.now() - new Date(uploadDate).getTime();
    if (Number.isFinite(ms)) ageHours = Math.floor(ms / (1000 * 60 * 60));
  }
  const out = {
    videoId,
    watchUrl,
    title: data.title ?? "",
    channelName: data.author_name ?? "",
    channelUrl: data.author_url ?? "",
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    uploadDate,
    ageHours,
    freshFor72hBar: ageHours !== null && ageHours <= 72,
  };
  console.log(JSON.stringify(out, null, 2));
} catch (err) {
  console.error(`oembed fetch failed: ${(err as Error).message}`);
  process.exit(1);
}
