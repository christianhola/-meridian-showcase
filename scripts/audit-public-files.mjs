import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);
const blockedName = /(?:^|\/)(?:\.env(?:\..+)?|id_rsa|id_ed25519|credentials\.json|.*\.(?:pem|p12|pfx|key))$/i;
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  /\bgh[pousr]_[a-zA-Z0-9]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bsk-(?:proj-)?[A-Za-z0-9_-]{24,}\b/,
  /\bsb_secret_[A-Za-z0-9_-]{20,}\b/,
];
let failures = 0;
for (const path of tracked) {
  if (blockedName.test(path) && !path.endsWith(".env.example")) {
    console.error("Forbidden file name:", path); failures++; continue;
  }
  if (!/\.(?:js|mjs|ts|tsx|json|md|yml|yaml|html|css|svg|txt|sh)$/i.test(path)) continue;
  const content = readFileSync(path, "utf8");
  if (secretPatterns.some(pattern => pattern.test(content))) {
    console.error("Potential credential pattern in:", path); failures++;
  }
}
console.log("Public-surface audit:", tracked.length, "tracked files;", failures, "alerts.");
if (failures) process.exitCode = 1;
