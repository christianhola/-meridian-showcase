import { readFileSync } from "node:fs";

const registry = JSON.parse(readFileSync(new URL("../community/registry.json", import.meta.url), "utf8"));
const categories = ["plugins", "templates", "sdks", "integrations", "showcase"];
const allowedStates = new Set(["submitted", "reviewed", "published"]);
const seen = new Set();

if (registry.schemaVersion !== "1.0") throw new Error("Unsupported community registry version");
for (const category of categories) {
  const items = registry[category];
  if (!Array.isArray(items)) throw new Error(category + " must be an array");
  for (const item of items) {
    if (!item || typeof item !== "object") throw new Error("Invalid entry in " + category);
    const fields = ["slug", "name", "description", "repository", "status", "license"];
    for (const field of fields) {
      if (typeof item[field] !== "string" || item[field].trim().length === 0) {
        throw new Error(category + ": missing " + field);
      }
    }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(item.slug)) throw new Error("Unsafe slug: " + item.slug);
    if (!/^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+\/?$/.test(item.repository)) {
      throw new Error("Invalid public GitHub repository URL for " + item.slug);
    }
    if (!allowedStates.has(item.status)) throw new Error("Invalid status: " + item.slug);
    if (item.status !== "published") {
      throw new Error("Unpublished contributions belong in GitHub issues, not the public registry: " + item.slug);
    }
    const key = category + ":" + item.slug;
    if (seen.has(key)) throw new Error("Duplicate registry entry: " + key);
    seen.add(key);
  }
}
console.log("Community registry verified: " + seen.size + " published entries.");
