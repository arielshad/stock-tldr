#!/usr/bin/env bun
/**
 * Post-build static page generation for DxbEstate Intel.
 *
 * Reads the single source of truth (src/data/opportunities.json and
 * src/data/sources.ts) and, for every opportunity + the sources
 * page, writes a pre-rendered HTML file at the right path with the
 * correct <title>, <meta>, and Open Graph tags injected.
 *
 * After this script runs, dist/ looks like:
 *
 *   dist/
 *     index.html                                 ← homepage
 *     sources/index.html                     ← sources page
 *     opportunities/<id>/index.html                   ← one per opportunity
 *     sitemap.xml
 *     robots.txt
 *
 * Cloudflare Pages/Workers serves static files first, so a request to
 * /opportunities/dubai-marina-distress-2br-under-comp-may-2026 gets the pre-rendered file (and
 * Googlebot/social scrapers see real meta tags). The SPA shell in that
 * file then boots React, detects the path, and shows the modal for the
 * matching item.
 *
 * Fallbacks (paths that don't match a generated file) are handled by
 * public/_redirects — Cloudflare Pages serves /index.html with a 200
 * for any unknown path so client routing still works.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import feed from "../src/data/opportunities.json" with { type: "json" };
import type { OpportunityItem } from "../src/data/schema";

// -----------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------

const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, "") ||
  "https://dxb-estate-intel.xyz";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const __dirname = dirname(fileURLToPath(import.meta.url));
// With @cloudflare/vite-plugin + a Worker entry, vite emits the SPA into
// dist/client/ (and the worker bundle into dist/dxb_estate_intel/). Wrangler's
// generated config serves dist/client/ as static assets, so all prerendered
// HTML must land there too.
const DIST = join(__dirname, "..", "dist", "client");
const TEMPLATE_PATH = join(DIST, "index.html");

// -----------------------------------------------------------------------
// HTML escaping — plain values only, never arbitrary HTML
// -----------------------------------------------------------------------

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// -----------------------------------------------------------------------
// Meta tag injection
// -----------------------------------------------------------------------

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType: "website" | "article";
  ogImage: string;
  ogImageAlt?: string;
  publishedTime?: string;
}

// -----------------------------------------------------------------------
// JSON-LD helpers
// -----------------------------------------------------------------------
//
// One JSON-LD block per page, tuned for the schema type that matches the
// page's content. Google's rich result validators are picky: missing a
// required property silently disables the rich result, so we err on the
// side of filling every optional field that has a cheap source of truth.
//

function wrapJsonLd(data: unknown): string {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
}

const ORG_REF = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: "DxbEstate Intel",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
};

const WEBSITE_REF = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "DxbEstate Intel",
  alternateName: "DxbEstate Intel",
  description:
    "Dubai property opportunities, duplicate listings, seller leads, developer launches, DLD/rent signals and deal checks — refreshed every 2 hours.",
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#org` },
};

/**
 * Homepage JSON-LD: WebSite + Organization as a @graph so Google can
 * pick up sitelinks search metadata + rich brand metadata in one block.
 */
function renderJsonLdHome(): string {
  return wrapJsonLd({
    "@context": "https://schema.org",
    "@graph": [WEBSITE_REF, ORG_REF],
  });
}

/**
 * CollectionPage JSON-LD for the /sources and /log index pages.
 * Ties the page back to the WebSite + Organization entities via @id.
 */
function renderJsonLdCollectionPage(opts: {
  url: string;
  name: string;
  description: string;
}): string {
  return wrapJsonLd({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#org` },
  });
}

function renderJsonLdArticle(item: OpportunityItem): string {
  const url = `${SITE_URL}/opportunities/${item.id}`;
  const description = item.explainer?.tagline ?? item.summary;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description,
    url,
    datePublished: item.date,
    // We don't track per-item modification timestamps, so fall back to the
    // feed-level generatedAt — crawlers use this to decide whether to
    // recrawl, and "never modified" signals a stale feed.
    dateModified: (feed as { generatedAt?: string }).generatedAt ?? item.date,
    author: {
      "@type": "Organization",
      name: item.org,
    },
    publisher: { "@id": `${SITE_URL}/#org` },
    image: {
      "@type": "ImageObject",
      url: item.image?.url ?? DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    articleSection: item.categories[0],
    keywords: item.tags.join(", "),
  };
  return wrapJsonLd(data);
}

/**
 * BreadcrumbList for opportunity pages. Two levels: Home → opportunity title.
 * (There's no intermediate `/opportunities` index page — the homepage IS
 * the opportunity listing — so we link straight back to `/`.)
 */
function renderJsonLdBreadcrumb(item: OpportunityItem): string {
  return wrapJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "DxbEstate Intel",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: item.title,
        item: `${SITE_URL}/opportunities/${item.id}`,
      },
    ],
  });
}

function renderMetaBlock(meta: PageMeta): string {
  const rows = [
    `<title>${escapeText(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="DxbEstate Intel" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeAttr(meta.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    meta.ogImageAlt
      ? `<meta property="og:image:alt" content="${escapeAttr(meta.ogImageAlt)}" />`
      : null,
    `<meta property="og:locale" content="en_US" />`,
    meta.publishedTime
      ? `<meta property="article:published_time" content="${escapeAttr(meta.publishedTime)}" />`
      : null,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(meta.ogImage)}" />`,
  ].filter((r): r is string => r !== null);
  return rows.join("\n    ");
}

/**
 * Given the built Vite index.html, strip the existing <title> +
 * <meta> + <link rel="canonical"> tags and replace them with ours.
 * Leaves the rest of the document (fonts, scripts, styles, root div)
 * intact so the SPA still boots.
 */
function injectMeta(
  template: string,
  meta: PageMeta,
  extraJsonLd?: string,
): string {
  let html = template;

  // Remove existing title
  html = html.replace(/<title>[^<]*<\/title>\s*/g, "");
  // Remove existing description, canonical, og:*, twitter:*, article:*
  // Match any <meta> tag whose name/property matches these, regardless
  // of attribute order. The content attribute may contain slashes
  // (e.g. "DxbEstate Intel"), so we can't use [^/]* — match up to the closing
  // `>` with a non-greedy quantifier on non-`>` chars.
  html = html.replace(
    /<meta\s+(?:name|property)="(?:description|twitter:[^"]+|og:[^"]+|article:[^"]+)"[^>]*?>\s*/g,
    "",
  );
  html = html.replace(/<link\s+rel="canonical"[^>]*?>\s*/g, "");
  // Strip the dev-fallback JSON-LD block from the template. Prerender
  // injects a page-specific JSON-LD stack (WebSite+Org for home,
  // CollectionPage for /sources + /log, Article+Breadcrumb for each
  // opportunity) so each page carries exactly the schema that matches its
  // content instead of sharing the dev WebSite fallback.
  html = html.replace(
    /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/g,
    "",
  );
  // Clean up the "<!-- Canonical -->", "<!-- Open Graph -->", and
  // "<!-- Twitter Card -->" section comments so the resulting head
  // isn't littered with empty labels.
  html = html.replace(/<!--\s*(?:Canonical|Open Graph|Twitter Card)\s*-->\s*/g, "");
  // Drop empty HTML comments left over from the meta tags that were
  // commented out in the source template (`<!-- -->`).
  html = html.replace(/<!--\s*-->\s*/g, "");

  // Inject our block right after <meta name="viewport" ...>
  const block = renderMetaBlock(meta);
  html = html.replace(
    /(<meta\s+name="viewport"[^>]*?>)/,
    `$1\n    ${block}`,
  );

  // Inject the page-specific JSON-LD stack just before </head>. Callers
  // pass exactly the schema that matches the page — Article+Breadcrumb
  // for a opportunity, WebSite+Org for home, CollectionPage for index pages.
  if (extraJsonLd) {
    html = html.replace("</head>", `  ${extraJsonLd}\n  </head>`);
  }

  return html;
}

// -----------------------------------------------------------------------
// Per-item meta builders
// -----------------------------------------------------------------------

/**
 * Build a opportunity page's `<title>`, aiming to stay under 60 characters
 * so Google doesn't silently truncate the brand suffix. Priority order:
 *   1. `${title} — ${org} | DxbEstate Intel`  (ideal)
 *   2. `${title} | DxbEstate Intel`            (drop org)
 *   3. `${title}`                         (title alone; opportunity names
 *       longer than 60 chars will still wrap in SERPs, but at least
 *       we don't waste a truncated brand suffix)
 */
function buildOpportunityTitle(item: OpportunityItem): string {
  const brand = " | DxbEstate Intel";
  const withOrg = `${item.title} — ${item.org}${brand}`;
  if (withOrg.length <= 60) return withOrg;
  const withoutOrg = `${item.title}${brand}`;
  if (withoutOrg.length <= 60) return withoutOrg;
  return item.title;
}

function opportunityMeta(item: OpportunityItem): PageMeta {
  const tagline = item.explainer?.tagline ?? item.summary;
  // Description should be ≤ 160 chars for best SEO truncation behavior.
  const description = tagline.length > 155
    ? tagline.slice(0, 152) + "…"
    : tagline;

  return {
    title: buildOpportunityTitle(item),
    description,
    canonical: `${SITE_URL}/opportunities/${item.id}`,
    ogType: "article",
    ogImage: item.image?.url ?? DEFAULT_OG_IMAGE,
    ogImageAlt: item.image?.alt,
    publishedTime: item.date,
  };
}

// ---- Static page meta ---------------------------------------------------
// Title guidance:  primary keyword first, brand suffix, ≤60 chars.
// Description guidance:  120–158 chars, natural keyword usage, CTA.

const HOME_META: PageMeta = {
  title: "Dubai Real-Estate Intelligence — Listings, Leads, Deals | DxbEstate Intel",
  description:
    "Dubai property opportunities, duplicate listings, seller leads, developer launches, DLD/rent signals and deal checks — refreshed every 2 hours.",
  canonical: `${SITE_URL}/`,
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  ogImageAlt: "DxbEstate Intel — Dubai property opportunities explained every 2 hours",
};

const SOURCES_META: PageMeta = {
  title: "Dubai Property Source Map — Portals, DLD, Developers | DxbEstate Intel",
  description:
    "A source map of Dubai portals, DLD/RERA data, developers, auctions, brokerages and market-data feeds used by the collection workflow.",
  canonical: `${SITE_URL}/sources`,
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  ogImageAlt: "Dubai property source map — portals, DLD/RERA, developers and data",
};

const LOG_META: PageMeta = {
  title: "Collection Log — Dubai Listing Changes & Deal Signals | DxbEstate Intel",
  description:
    "The full changelog of DxbEstate Intel sweeps — every opportunity added, updated or removed, with coverage and a one-line rationale.",
  canonical: `${SITE_URL}/log`,
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  ogImageAlt: "DxbEstate Intel sweep log — Dubai property collection changelog",
};

// -----------------------------------------------------------------------
// Sitemap
// -----------------------------------------------------------------------

function buildSitemap(
  urls: { loc: string; lastmod?: string; changefreq?: string; priority?: number }[],
): string {
  const body = urls
    .map((u) => {
      const parts = [`    <loc>${escapeText(u.loc)}</loc>`];
      if (u.lastmod) parts.push(`    <lastmod>${u.lastmod}</lastmod>`);
      if (u.changefreq) parts.push(`    <changefreq>${u.changefreq}</changefreq>`);
      if (u.priority !== undefined)
        parts.push(`    <priority>${u.priority.toFixed(1)}</priority>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------

async function writeHtml(relPath: string, html: string): Promise<void> {
  const full = join(DIST, relPath);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, html, "utf8");
}

async function main() {
  console.log(`[prerender] SITE_URL = ${SITE_URL}`);
  const template = await readFile(TEMPLATE_PATH, "utf8");

  // 1. Homepage — WebSite + Organization JSON-LD graph
  await writeHtml(
    "index.html",
    injectMeta(template, HOME_META, renderJsonLdHome()),
  );

  // 2. Sources page — CollectionPage JSON-LD
  await writeHtml(
    "sources/index.html",
    injectMeta(
      template,
      SOURCES_META,
      renderJsonLdCollectionPage({
        url: `${SITE_URL}/sources`,
        name: "Top Dubai property Voices to Follow",
        description: SOURCES_META.description,
      }),
    ),
  );

  // 3. Sweep log page — CollectionPage JSON-LD
  await writeHtml(
    "log/index.html",
    injectMeta(
      template,
      LOG_META,
      renderJsonLdCollectionPage({
        url: `${SITE_URL}/log`,
        name: "Dubai property Changelog",
        description: LOG_META.description,
      }),
    ),
  );

  // 4. One page per opportunity — Article + BreadcrumbList JSON-LD
  let count = 0;
  const items = feed.items as OpportunityItem[];
  for (const item of items) {
    const jsonLd = `${renderJsonLdArticle(item)}\n    ${renderJsonLdBreadcrumb(item)}`;
    const html = injectMeta(template, opportunityMeta(item), jsonLd);
    await writeHtml(`opportunities/${item.id}/index.html`, html);
    count++;
  }

  // 5. Sitemap
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = buildSitemap([
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: "daily", priority: 1.0 },
    {
      loc: `${SITE_URL}/sources`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${SITE_URL}/log`,
      lastmod: today,
      changefreq: "daily",
      priority: 0.7,
    },
    ...items.map((i) => ({
      loc: `${SITE_URL}/opportunities/${i.id}`,
      lastmod: i.date,
      changefreq: "monthly" as const,
      priority: 0.6,
    })),
  ]);
  await writeFile(join(DIST, "sitemap.xml"), sitemap, "utf8");

  // 6. robots.txt
  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  await writeFile(join(DIST, "robots.txt"), robots, "utf8");

  console.log(
    `[prerender] wrote ${count} opportunity pages + sources + /log + sitemap.xml + robots.txt`,
  );
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
