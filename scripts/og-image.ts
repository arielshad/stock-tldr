#!/usr/bin/env bun
/**
 * og:image / twitter:image extractor.
 *
 * Usage:  bun scripts/og-image.ts <page-url>
 *
 * Fetches the page, parses the head for og:image / twitter:image meta
 * tags, verifies the resulting URL returns an image content-type, and
 * prints JSON:
 *
 *   { pageUrl, imageUrl, contentType, source: "og:image" | "twitter:image" }
 *
 * Exits 1 if no image found or the candidate URL is not an image.
 */
const arg = process.argv[2];
if (!arg) {
  console.error("usage: bun scripts/og-image.ts <page-url>");
  process.exit(1);
}

const UA = "dxb-estate-intel-sweep-bot";

async function fetchHead(url: string) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,*/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`page fetch ${res.status}`);
  // Only need the first ~100KB for head meta; many pages are huge.
  const reader = res.body?.getReader();
  if (!reader) return await res.text();
  const decoder = new TextDecoder();
  let html = "";
  let bytes = 0;
  while (bytes < 200_000) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    html += decoder.decode(value, { stream: true });
    if (html.includes("</head>")) break;
  }
  await reader.cancel().catch(() => {});
  return html;
}

function pickMeta(
  html: string,
  prop: string,
  attr: "property" | "name",
): string | null {
  const re = new RegExp(
    `<meta[^>]*\\s${attr}=["']${prop}["'][^>]*>`,
    "i",
  );
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  const content = tag.match(/\scontent=["']([^"']+)["']/i)?.[1];
  return content ?? null;
}

function resolve(maybeRelative: string, base: string) {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

try {
  const html = await fetchHead(arg);
  let source: string | null = null;
  let imageUrl =
    pickMeta(html, "og:image", "property") ??
    pickMeta(html, "og:image:url", "property") ??
    null;
  if (imageUrl) source = "og:image";
  if (!imageUrl) {
    imageUrl = pickMeta(html, "twitter:image", "name");
    if (imageUrl) source = "twitter:image";
  }
  if (!imageUrl) {
    console.error("no og:image or twitter:image found");
    process.exit(1);
  }
  imageUrl = resolve(imageUrl, arg);

  // Verify it returns an image content-type
  const headRes = await fetch(imageUrl, {
    method: "GET",
    headers: { "User-Agent": UA, Range: "bytes=0-1023" },
    redirect: "follow",
  });
  const ct = headRes.headers.get("content-type") ?? "";
  if (!headRes.ok) {
    console.error(`image fetch ${headRes.status}: ${imageUrl}`);
    process.exit(1);
  }
  if (!ct.startsWith("image/")) {
    console.error(`not an image (content-type=${ct}): ${imageUrl}`);
    process.exit(1);
  }
  await headRes.body?.cancel().catch(() => {});
  const out = {
    pageUrl: arg,
    imageUrl,
    contentType: ct.split(";")[0],
    source,
  };
  console.log(JSON.stringify(out, null, 2));
} catch (err) {
  console.error(`og-image failed: ${(err as Error).message}`);
  process.exit(1);
}
