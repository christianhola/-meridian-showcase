import { test } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("editorial polish is loaded after the legacy stylesheet", () => {
  const entry = read("src/main.tsx");
  assert.match(entry, /import "\.\/styles\.css";\s*import "\.\/editorial-polish\.css";/);
});

test("interactive controls keep keyboard focus and reduced-motion behavior", () => {
  const css = read("src/editorial-polish.css");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\[data-reveal\]/);
  assert.match(css, /@media \(max-width: 760px\)/);
});
