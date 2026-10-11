import { readFileSync } from "node:fs";
import { validateRegistry, CATEGORIES } from "./lib/registry-validation.mjs";

const registry = JSON.parse(readFileSync(new URL("../community/registry.json", import.meta.url), "utf8"));
const errors = validateRegistry(registry);
if (errors.length) throw new Error("Invalid registry; run npm run community:check first");
const entries = CATEGORIES.flatMap(category => registry[category].map(item => ({ category, ...item })));
if (!entries.length) {
  console.log("No published repositories to audit.");
  process.exit(0);
}
const token = process.env.GITHUB_TOKEN;
const failures = [];
const results = [];
for (const entry of entries) {
  const repo = new URL(entry.repository).pathname.slice(1).replace(/\/$/, "");
  const response = await fetch("https://api.github.com/repos/" + repo, {
    headers: {
      "Accept": "application/vnd.github+json",
      "User-Agent": "meridian-community-readonly-audit",
      ...(token ? { "Authorization": "Bearer " + token } : {}),
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) {
    failures.push(entry.category + "/" + entry.slug + ": GitHub HTTP " + response.status);
    continue;
  }
  const metadata = await response.json();
  if (metadata.private || metadata.archived || metadata.disabled) {
    failures.push(entry.category + "/" + entry.slug + ": private, archived or disabled");
  }
  results.push({
    category: entry.category, slug: entry.slug, repository: entry.repository,
    stars: metadata.stargazers_count ?? null, defaultBranch: metadata.default_branch ?? null,
    lastPushedAt: metadata.pushed_at ?? null, githubLicense: metadata.license?.spdx_id ?? null,
  });
}
console.log(JSON.stringify({ checked: entries.length, results, failures }, null, 2));
if (failures.length) process.exitCode = 1;
