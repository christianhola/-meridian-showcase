import { test } from "node:test";
import { strict as assert } from "node:assert";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");

test("HTML has one description, correct language and mobile viewport", () => {
  const html = read("index.html");
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  assert.equal((html.match(/name="theme-color"/g) || []).length, 1);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport"/);
});

test("Navigation and agent demo expose readable interactive states", () => {
  const app = read("src/App.tsx");
  const demo = read("src/components/AgentResponseShowcase.tsx");
  assert.match(app, /Skip to interactive demo/);
  assert.match(app, /aria-current=/);
  assert.match(app, /key === "Escape"/);
  assert.match(app, /Open on GitHub/);
  assert.match(demo, /Copy example command/);
  assert.match(demo, /Clipboard access is unavailable/);
  assert.match(demo, /Next step/);
  assert.match(demo, /Simulated UI/);
});

test("All first-party resources point to committed paths", () => {
  const resources = read("src/components/CommunityDirectory.tsx");
  const expected = [
    "examples/agent-response-starter",
    "examples/mcp-readonly",
    "skills/wilenny",
  ];
  for (const folder of expected) {
    assert.ok(existsSync(new URL(folder + "/", root)), "missing directory: " + folder);
    assert.match(resources, new RegExp(folder.replaceAll("/", "\\/")));
  }
  assert.match(resources, /Available with repository access/);
  assert.match(resources, /independent community submissions/);
});
