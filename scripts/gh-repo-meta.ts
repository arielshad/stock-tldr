#!/usr/bin/env bun
/**
 * GitHub repo metadata helper.
 *
 * Usage:  bun scripts/gh-repo-meta.ts <owner>/<repo>
 *     OR  bun scripts/gh-repo-meta.ts https://github.com/<owner>/<repo>
 *
 * Hits api.github.com and returns a normalized JSON blob:
 *
 *   { owner, repo, fullName, stars, description, homepage,
 *     defaultBranch, license, language, htmlUrl, ogImageUrl,
 *     pushedAt, createdAt }
 *
 * Reads GITHUB_TOKEN from env if present (5000 req/h instead of 60).
 */
const raw = process.argv[2];
if (!raw) {
  console.error("usage: bun scripts/gh-repo-meta.ts <owner/repo>");
  process.exit(1);
}

let slug = raw;
try {
  if (slug.startsWith("http")) {
    const u = new URL(slug);
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) slug = `${parts[0]}/${parts[1]}`;
  }
} catch {
  /* ignore */
}
slug = slug.replace(/\.git$/, "");

if (!/^[\w.-]+\/[\w.-]+$/.test(slug)) {
  console.error(`invalid repo slug: ${slug}`);
  process.exit(1);
}

const headers: Record<string, string> = {
  "User-Agent": "dxb-estate-intel-sweep-bot",
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

try {
  const res = await fetch(`https://api.github.com/repos/${slug}`, { headers });
  if (!res.ok) {
    console.error(`github api ${res.status} for ${slug}`);
    process.exit(1);
  }
  const data = (await res.json()) as Record<string, unknown>;
  const [owner, repo] = slug.split("/");
  const out = {
    owner,
    repo,
    fullName: slug,
    stars: data.stargazers_count ?? 0,
    description: data.description ?? null,
    homepage: data.homepage || null,
    defaultBranch: data.default_branch ?? "main",
    license:
      (data.license as { spdx_id?: string } | null)?.spdx_id ?? null,
    language: data.language ?? null,
    htmlUrl: data.html_url ?? `https://github.com/${slug}`,
    ogImageUrl: `https://opengraph.githubassets.com/1/${slug}`,
    pushedAt: data.pushed_at ?? null,
    createdAt: data.created_at ?? null,
    archived: data.archived ?? false,
  };
  console.log(JSON.stringify(out, null, 2));
} catch (err) {
  console.error(`gh-repo-meta failed: ${(err as Error).message}`);
  process.exit(1);
}
