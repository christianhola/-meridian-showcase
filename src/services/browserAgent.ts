import type { ExecutionContext, ToolExecutionResult } from "../engine/types";
import { failed } from "../engine/types";
import type { BrowserAdapter } from "./toolRegistry";

export type BrowserCapture = Readonly<{
  finalUrl: string;
  visibleText: string;
  screenshotBase64?: string;
}>;

export interface BrowserDriver {
  navigate(url: string): Promise<BrowserCapture>;
  click(selector: string): Promise<BrowserCapture>;
}

/** For use ONLY inside a separately authenticated server-side browser worker.
 * This wrapper does not install or create Playwright and never executes in the public demo.
 */
export class BrowserAgent implements BrowserAdapter {
  private currentUrl: string | null = null;
  constructor(
    private readonly driver: BrowserDriver,
    private readonly allowedHosts: ReadonlySet<string>,
  ) { }

  private safeURL(raw: string): string | null {
    try {
      const url = new URL(raw);
      if (url.protocol !== "https:" || url.username || url.password ||
          url.port || !this.allowedHosts.has(url.hostname.toLowerCase()) ||
          url.href.length > 2048) return null;
      return url.href;
    } catch { return null; }
  }

  private capture(result: BrowserCapture): ToolExecutionResult {
    const safe = this.safeURL(result.finalUrl);
    if (!safe) {
      this.currentUrl = null;
      return failed("DENIED", "Redirected outside the approved HTTPS hosts");
    }
    this.currentUrl = safe;
    const artifacts: Array<NonNullable<ToolExecutionResult["artifacts"]>[number]> = [];
    if (result.screenshotBase64) {
      if (result.screenshotBase64.length > 1_000_000 ||
          !/^[A-Za-z0-9+/]+={0,2}$/.test(result.screenshotBase64)) {
        return failed("FAILED", "Invalid or oversized screenshot");
      }
      artifacts.push({ kind: "screenshot", mediaType: "image/png",
        data: result.screenshotBase64, name: "browser-capture.png" });
    }
    return { ok: true, code: "OK", output: result.visibleText.slice(0, 9000), artifacts };
  }

  async navigate(url: string): Promise<ToolExecutionResult> {
    const safe = this.safeURL(url);
    if (!safe) return failed("DENIED", "Only allowlisted HTTPS destinations are permitted");
    try { return this.capture(await this.driver.navigate(safe)); }
    catch { return failed("FAILED", "Browser navigation failed"); }
  }

  async click(selector: string): Promise<ToolExecutionResult> {
    if (!this.currentUrl) return failed("DENIED", "Navigate to an approved page first");
    if (!selector || selector.length > 240 || /[\r\n]/.test(selector)) {
      return failed("INVALID_ARGUMENTS", "Invalid locator");
    }
    // A host-side browser worker must additionally block unexpected navigations,
    // file downloads, form submission and unapproved requests at the network layer.
    try { return this.capture(await this.driver.click(selector)); }
    catch { return failed("FAILED", "Browser click failed"); }
  }
}
