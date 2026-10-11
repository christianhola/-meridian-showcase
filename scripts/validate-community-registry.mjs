import { readFileSync } from "node:fs";
import { validateRegistry, CATEGORIES } from "./lib/registry-validation.mjs";

const registry = JSON.parse(readFileSync(new URL("../community/registry.json", import.meta.url), "utf8"));
const errors = validateRegistry(registry);
if (errors.length > 0) {
  for (const error of errors) console.error("Registry error: " + error);
  process.exitCode = 1;
} else {
  const total = CATEGORIES.reduce((sum, category) => sum + registry[category].length, 0);
  console.log("Community registry validated: " + total + " published entries.");
}
