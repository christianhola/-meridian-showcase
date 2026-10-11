// Safe, deterministic, public demonstration data. No provider calls.
const scenarios = Object.freeze({
  starter: Object.freeze({
    title: "Build a developer-friendly agent response",
    answer: "Start with a small response card, accessible tool steps and a clear status label.",
    steps: ["Choose a scenario", "Render local example data", "Verify what is simulated"],
  }),
  permissions: Object.freeze({
    title: "Design a permission-scoped integration",
    answer: "Treat model tool requests as untrusted input. Validate schemas, permissions and output.",
    steps: ["Describe the tool", "Validate input", "Explain permissions"],
  }),
  security: Object.freeze({
    title: "Prepare a public repository",
    answer: "Review history, docs, licenses and security reporting before changing visibility.",
    steps: ["Audit tracked files", "Review full history", "Enable private reporting"],
  }),
});
export function getScenario(key) {
  return Object.hasOwn(scenarios, key) ? scenarios[key] : null;
}
