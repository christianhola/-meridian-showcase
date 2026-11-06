import { test } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("editorial polish is consolidated into the base stylesheet", () => {
  const entry = read("src/main.tsx");
  const css = read("src/styles.css");
  assert.equal(entry.includes("./editorial-polish.css"), false);
  assert.equal(css.includes("=== Integrated editorial polish layer ==="), true);
});

test("interactive controls keep keyboard focus and reduced-motion behavior", () => {
  const css = read("src/styles.css");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\[data-reveal\]/);
  assert.match(css, /@media \(max-width: 760px\)/);
});

test("product system remains the final visual layer and covers the full application", () => {
  const entry = read("src/main.tsx");
  const css = read("src/product-system.css");
  assert.equal(entry.includes('import "./meridian-sync.css";\nimport "./product-system.css";'), true);
  for (const selector of [
    ".topbar",
    ".community-card",
    ".architecture-node",
    ".wilenny-console",
    ".agents-workspace",
    ".virtual-desktop",
  ]) {
    assert.equal(css.includes(selector), true, "missing selector: " + selector);
  }
  assert.equal(css.includes("translate3d"), true);
  assert.equal(css.includes("prefers-reduced-motion: reduce"), true);
});
