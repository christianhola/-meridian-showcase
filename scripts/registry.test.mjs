import { test } from "node:test";
import { strict as assert } from "node:assert";
import { validateRegistry, CATEGORIES } from "./lib/registry-validation.mjs";

const empty = () => ({
  schemaVersion: "1.1",
  ...Object.fromEntries(CATEGORIES.map(category => [category, []])),
});
const valid = () => ({
  slug: "plugin-task-helper", name: "Task helper", description: "An example with docs",
  repository: "https://github.com/example/plugin-task-helper", status: "published",
  license: "MIT", tags: ["typescript"], demoUrl: "https://example.org/demo",
});

test("empty registry is valid", () => assert.deepEqual(validateRegistry(empty()), []));
test("reviewed public entry is valid", () => {
  const data = empty(); data.plugins.push(valid());
  assert.deepEqual(validateRegistry(data), []);
});
test("rejects unapproved entries", () => {
  const data = empty(); data.plugins.push({ ...valid(), status: "submitted" });
  assert.match(validateRegistry(data).join(" "), /published/);
});
test("rejects invalid protocols and duplicates", () => {
  const data = empty();
  data.plugins.push(valid(), { ...valid(), demoUrl: "javascript:alert(1)" });
  const errors = validateRegistry(data).join(" ");
  assert.match(errors, /duplicate/); assert.match(errors, /HTTPS/);
});
test("rejects untrusted repository URLs and missing fields", () => {
  const data = empty(); data.mcps.push({ ...valid(), license: "", repository: "https://evil.test/mcp" });
  assert.match(validateRegistry(data).join(" "), /license/);
  assert.match(validateRegistry(data).join(" "), /GitHub URL/);
});
