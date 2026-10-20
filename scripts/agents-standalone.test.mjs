import { test } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Agent Studio is a separate page with preserved Community access", () => {
  const app = read("src/App.tsx");
  const site = read(".github/workflows/docs-pages.yml");
  const docs = read("docs/.vitepress/config.mts");
  assert.match(app, /endsWith\("\/agents"\)/);
  assert.match(app, /agents-standalone/);
  assert.match(app, /href: "\/-meridian-showcase\/agents\//);
  assert.match(site, /dist\/agents\/index\.html/);
  assert.match(site, /dist\/app/);
  assert.match(docs, /link: '\/agents\//);
});

test("Model messages are visually separate by role and rendered as Markdown", () => {
  const component = read("src/components/AgentsWorkspace.tsx");
  const styles = read("src/components/AgentsWorkspace.css");
  const renderer = read("src/components/AgentMarkdown.tsx");
  assert.match(component, /agentTurns\.map/);
  assert.match(component, /agents-turn--assistant/);
  assert.match(component, /AgentMarkdown text=\{t\.text\}/);
  assert.match(styles, /\.agents-turn--assistant\{align-self:stretch/);
  assert.match(styles, /\.agents-turn\{align-self:flex-end/);
  assert.match(renderer, /agent-markdown-code/);
  assert.doesNotMatch(renderer, /dangerouslySetInnerHTML|srcDoc|eval\(/);
  assert.match(renderer, /https\?/);
});

test("Long model replies are limited only in the API payload, never in display", () => {
  const transport = read("src/components/freeModelStream.ts");
  const component = read("src/components/AgentsWorkspace.tsx");
  assert.match(transport, /content: message\.content\.slice\(0, 1200\)/);
  assert.match(component, /AgentMarkdown text=\{t\.text\}/);
  assert.doesNotMatch(component, /t\.text\.slice\(0, 1200\)/);
});

test("Verified GitHub sources render as safe real anchors, not fused Markdown text", () => {
  const component=read("src/components/AgentsWorkspace.tsx");
  const styles=read("src/components/AgentsWorkspace.css");
  const router=read("src/services/agentToolRouter.ts");
  assert.match(component, /sources\?: string\[\]/);
  assert.match(component, /text:selected\.text,sources:selected\.sources/);
  assert.match(component, /agents-verified-sources/);
  assert.match(component, /href=\{url\} target="_blank" rel="noopener noreferrer"/);
  assert.match(component, /t\.sources\.join\("\\\\n"\)/);
  assert.doesNotMatch(component, /text:selected\.text\s*\+/);
  assert.match(styles, /\.agents-verified-sources\s*\{/);
  assert.match(router, /github\\\.com/);
});
