// Deliberately read-only and deterministic. No filesystem, shell, network or credentials.
const catalog = Object.freeze({
  plugin: Object.freeze({
    name: "Plugin interface",
    description: "An extension contract should declare arguments, permissions, expected output and errors.",
    safety: "Validate arguments and require owner approval before any privileged action.",
  }),
  mcp: Object.freeze({
    name: "MCP server",
    description: "A Model Context Protocol server exposes typed tools through an authorized host.",
    safety: "Keep server credentials off the browser. This example exposes read-only demo data only.",
  }),
  starter: Object.freeze({
    name: "Local starter",
    description: "A reproducible minimal project for trying UI patterns without external services.",
    safety: "Use fake example data and do not embed production tokens.",
  }),
});
export function getBuildingBlock(type) {
  return Object.hasOwn(catalog, type) ? catalog[type] : null;
}
