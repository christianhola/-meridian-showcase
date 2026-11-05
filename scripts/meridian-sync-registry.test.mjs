import { test } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Meridian Sync exposes a shadcn registry source", () => {
  const registry = JSON.parse(read("registry.json"));
  assert.equal(registry.$schema, "https://ui.shadcn.com/schema/registry.json");
  assert.equal(registry.name, "meridian-sync");

  const names = registry.items.map(item => item.name);
  assert.deepEqual(names, [
    "motion-button",
    "metric-card",
    "prompt-composer",
    "component-workbench",
  ]);

  const motionButton = registry.items.find(item => item.name === "motion-button");
  assert.ok(motionButton.dependencies.includes("motion@14.9.1"));
  assert.ok(motionButton.registryDependencies.includes("button"));
});

test("catalog uses real install commands and three workbench modes", () => {
  const catalog = read("src/components/MeridianSyncCatalog.tsx");
  assert.equal(catalog.includes("pnpm dlx meridian add"), false);
  assert.equal(catalog.includes("npx shadcn@latest add"), true);
  assert.equal(catalog.includes('"preview" | "code" | "tokens"'), true);
  assert.match(catalog, /Preview/);
  assert.match(catalog, /Code/);
  assert.match(catalog, /Tokens/);
  assert.equal(catalog.includes("ComponentThumbnail"), true);
});

test("every catalog item has a dedicated preview renderer", () => {
  const preview = read("src/components/MeridianSyncPreview.tsx");
  const required = [
    "Button",
    "Card",
    "Input",
    "Tabs",
    "Area Chart",
    "Toast",
    "Accordion",
    "Alert",
    "Dialog",
    "Dropdown Menu",
    "Select",
    "Textarea",
    "Switch",
    "Table",
    "Progress",
    "Skeleton",
    "Tooltip",
    "Command",
    "Badge",
    "Avatar",
    "Prompt Composer",
  ];

  for (const name of required) {
    assert.equal(
      preview.includes('case "' + name + '"'),
      true,
      "missing preview renderer for " + name,
    );
  }

  assert.equal(preview.includes("generic-preview"), false);
});

test("preview motion is compositor-friendly and reduced-motion aware", () => {
  const css = read("src/meridian-sync.css");
  assert.equal(css.includes("translate3d"), true);
  assert.equal(css.includes("will-change: transform"), true);
  assert.equal(css.includes("prefers-reduced-motion: reduce"), true);
  assert.equal(css.includes(".ms-gpu-spot"), true);
});
