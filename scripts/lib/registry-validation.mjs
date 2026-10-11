export const CATEGORIES = ["plugins", "templates", "sdks", "integrations", "mcps", "showcase"];
const slug = /^[a-z0-9][a-z0-9-]{0,62}$/;
const github = /^https:\/\/github\.com\/[A-Za-z0-9-]{1,39}\/[A-Za-z0-9_.-]{1,100}\/?$/;

export function validateRegistry(registry) {
  const errors = [];
  if (!registry || typeof registry !== "object" || Array.isArray(registry)) {
    return ["Registry must be an object"];
  }
  if (registry.schemaVersion !== "1.1") errors.push("Unsupported schemaVersion");
  for (const key of Object.keys(registry)) {
    if (!["schemaVersion", ...CATEGORIES].includes(key)) errors.push("Unexpected category: " + key);
  }
  for (const category of CATEGORIES) {
    if (!Array.isArray(registry[category])) {
      errors.push(category + ": expected an array");
      continue;
    }
    const slugs = new Set();
    for (const [index, entry] of registry[category].entries()) {
      const context = category + "[" + index + "]";
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        errors.push(context + ": expected an object");
        continue;
      }
      for (const key of ["slug", "name", "description", "repository", "license"]) {
        if (typeof entry[key] !== "string" || !entry[key].trim()) errors.push(context + ": missing " + key);
      }
      if (typeof entry.slug === "string") {
        if (!slug.test(entry.slug)) errors.push(context + ": invalid slug");
        if (slugs.has(entry.slug)) errors.push(context + ": duplicate slug");
        slugs.add(entry.slug);
      }
      if (typeof entry.repository !== "string" || !github.test(entry.repository)) {
        errors.push(context + ": repository must be a public GitHub URL");
      }
      if (entry.status !== "published") errors.push(context + ": only reviewed published entries may be listed");
      if (entry.tags !== undefined && (!Array.isArray(entry.tags) || entry.tags.length > 8 ||
        entry.tags.some(tag => typeof tag !== "string" || tag.length < 2 || tag.length > 30))) {
        errors.push(context + ": tags must be an array of up to eight short strings");
      }
      if (entry.demoUrl !== undefined) {
        try { if (new URL(entry.demoUrl).protocol !== "https:") throw new Error("https required"); }
        catch { errors.push(context + ": demoUrl requires HTTPS"); }
      }
    }
  }
  return errors;
}
