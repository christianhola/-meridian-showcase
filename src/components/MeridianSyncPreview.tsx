import {
  AlertTriangle,
  ArrowUp,
  Bell,
  Check,
  ChevronDown,
  CircleUserRound,
  Command,
  Copy,
  FileText,
  Globe2,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";

export type PreviewName =
  | "Button"
  | "Card"
  | "Input"
  | "Tabs"
  | "Area Chart"
  | "Toast"
  | "Accordion"
  | "Alert"
  | "Dialog"
  | "Dropdown Menu"
  | "Select"
  | "Textarea"
  | "Switch"
  | "Table"
  | "Progress"
  | "Skeleton"
  | "Tooltip"
  | "Command"
  | "Badge"
  | "Avatar"
  | "Prompt Composer";

export function ComponentThumbnail({ name }: { name: PreviewName }) {
  return (
    <span className="ms-thumb" data-kind={name.toLowerCase().replaceAll(" ", "-")} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export function MeridianSyncPreview({
  name,
  theme,
}: {
  name: PreviewName;
  theme: "light" | "dark";
}) {
  const spotRef = useRef<HTMLSpanElement>(null);

  const updateSpot = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = event.currentTarget.getBoundingClientRect();
    const spot = spotRef.current;
    if (!spot) return;
    const x = event.clientX - stage.left - 170;
    const y = event.clientY - stage.top - 170;
    spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <div
      className="ms-preview-canvas"
      data-theme={theme}
      onPointerMove={updateSpot}
      onPointerLeave={() => {
        if (spotRef.current) spotRef.current.style.transform = "translate3d(-420px,-420px,0)";
      }}
    >
      <span ref={spotRef} className="ms-gpu-spot" aria-hidden="true" />
      <span className="ms-preview-grid" aria-hidden="true" />
      <div className="ms-preview-object">{renderPreview(name)}</div>
    </div>
  );
}

function renderPreview(name: PreviewName) {
  switch (name) {
    case "Button":
      return (
        <div className="ms-demo-stack">
          <div className="ms-demo-row">
            <button className="ms-real-button ms-real-button--primary" type="button">Deploy agent</button>
            <button className="ms-real-button ms-real-button--secondary" type="button">View code</button>
            <button className="ms-real-button ms-real-button--outline" type="button">Outline</button>
            <button className="ms-real-button ms-real-button--ghost" type="button">Ghost</button>
          </div>
          <div className="ms-demo-row">
            <button className="ms-real-button ms-real-button--danger" type="button">Delete</button>
            <button className="ms-real-icon-button" type="button" aria-label="Settings"><Settings2 size={15} /></button>
            <button className="ms-real-button ms-real-button--primary" type="button" disabled>Disabled</button>
          </div>
          <p className="ms-demo-note"><Check size={13} /> visible focus · loading-safe · reduced motion</p>
        </div>
      );

    case "Card":
      return (
        <div className="ms-metric-grid">
          <article className="ms-metric-card">
            <header><span>Total revenue</span><small>↗ +12.5%</small></header>
            <strong>$1,250.00</strong>
            <p>Trending up this month</p>
          </article>
          <article className="ms-metric-card">
            <header><span>Active accounts</span><small>Live</small></header>
            <strong>45,678</strong>
            <p>Healthy workspace activity</p>
          </article>
        </div>
      );

    case "Input":
      return (
        <div className="ms-form-card">
          <label>
            <span>Workspace name</span>
            <input defaultValue="Meridian Cloud" />
            <small>Used in your runtime namespace.</small>
          </label>
          <label>
            <span>Repository</span>
            <input placeholder="owner/repository" aria-invalid="true" />
            <small className="is-error">Use the owner/repository format.</small>
          </label>
        </div>
      );

    case "Tabs":
      return (
        <div className="ms-tabs-card">
          <div role="tablist" aria-label="Example tabs" className="ms-real-tabs">
            <button type="button" role="tab" aria-selected="true">Preview</button>
            <button type="button" role="tab" aria-selected="false">Code</button>
            <button type="button" role="tab" aria-selected="false">Props</button>
          </div>
          <div className="ms-tab-content">
            <strong>Preview state</strong>
            <span>Context stays visible while switching views.</span>
          </div>
        </div>
      );

    case "Area Chart":
      return (
        <div className="ms-chart-card">
          <header><div><span>Requests</span><strong>18.4k</strong></div><small>Last 24 hours</small></header>
          <svg viewBox="0 0 640 230" role="img" aria-label="Request activity chart">
            <defs>
              <linearGradient id="msArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity=".22" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="ms-chart-area" d="M0 190 C95 168 115 70 202 115 S335 185 414 92 S535 77 640 28 V230 H0 Z" />
            <path className="ms-chart-line" d="M0 190 C95 168 115 70 202 115 S335 185 414 92 S535 77 640 28" />
          </svg>
          <footer><span>00:00</span><span>08:00</span><span>16:00</span><span>Now</span></footer>
        </div>
      );

    case "Toast":
      return (
        <div className="ms-real-toast" role="status">
          <span className="ms-toast-icon"><Check size={15} /></span>
          <div><strong>Deployment queued</strong><small>Preview build will start shortly.</small></div>
          <button type="button">Undo</button>
        </div>
      );

    case "Accordion":
      return (
        <div className="ms-accordion-card">
          <details open>
            <summary>Runtime settings <ChevronDown size={15} /></summary>
            <p>Configure retries, tool approvals and execution limits without leaving context.</p>
          </details>
          <details>
            <summary>Observability <ChevronDown size={15} /></summary>
            <p>Trace model calls, tool execution and latency.</p>
          </details>
        </div>
      );

    case "Alert":
      return (
        <div className="ms-real-alert" role="alert">
          <AlertTriangle size={18} />
          <div><strong>Approval required</strong><p>Review the proposed write before it reaches production.</p></div>
          <button type="button">Review</button>
        </div>
      );

    case "Dialog":
      return (
        <div className="ms-dialog-demo">
          <div className="ms-dialog-window" role="dialog" aria-modal="true" aria-labelledby="ms-dialog-title">
            <span className="ms-dialog-icon"><Sparkles size={17} /></span>
            <h4 id="ms-dialog-title">Deploy runtime?</h4>
            <p>Create a preview deployment from the current branch.</p>
            <div><button className="ms-real-button ms-real-button--secondary" type="button">Cancel</button><button className="ms-real-button ms-real-button--primary" type="button">Deploy</button></div>
          </div>
        </div>
      );

    case "Dropdown Menu":
      return (
        <div className="ms-menu-demo">
          <button className="ms-real-button ms-real-button--secondary" type="button">Actions <ChevronDown size={14} /></button>
          <div className="ms-real-menu" role="menu">
            <button role="menuitem" type="button"><Copy size={14} /> Duplicate <kbd>⌘D</kbd></button>
            <button role="menuitem" type="button"><FileText size={14} /> Export <kbd>⌘E</kbd></button>
            <span />
            <button role="menuitem" type="button" className="is-danger">Archive</button>
          </div>
        </div>
      );

    case "Select":
      return (
        <label className="ms-select-demo">
          <span>Model</span>
          <select defaultValue="reasoning">
            <option value="fast">Meridian Fast</option>
            <option value="reasoning">Meridian Reasoning</option>
            <option value="vision">Meridian Vision</option>
          </select>
          <small>Used for this workspace only.</small>
        </label>
      );

    case "Textarea":
      return (
        <label className="ms-textarea-demo">
          <span>System instruction</span>
          <textarea defaultValue="Summarize the workspace status and cite the relevant source." />
          <small>Markdown supported · 4,000 characters max</small>
        </label>
      );

    case "Switch":
      return (
        <div className="ms-switch-card">
          <div><strong>Persist runtime state</strong><small>Keep state between approved sessions.</small></div>
          <label className="ms-real-switch">
            <input type="checkbox" defaultChecked aria-label="Persist runtime state" />
            <span />
          </label>
        </div>
      );

    case "Table":
      return (
        <div className="ms-table-wrap">
          <table className="ms-real-table">
            <thead><tr><th>Run</th><th>Status</th><th>Model</th><th>Latency</th></tr></thead>
            <tbody>
              <tr><td>#2841</td><td><span className="ms-status-pill is-good">Success</span></td><td>Reasoning</td><td>184ms</td></tr>
              <tr><td>#2840</td><td><span className="ms-status-pill">Queued</span></td><td>Fast</td><td>—</td></tr>
              <tr><td>#2839</td><td><span className="ms-status-pill is-good">Success</span></td><td>Vision</td><td>231ms</td></tr>
            </tbody>
          </table>
        </div>
      );

    case "Progress":
      return (
        <div className="ms-progress-card">
          <div><strong>Indexing workspace</strong><span>72%</span></div>
          <div className="ms-real-progress" role="progressbar" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}><span /></div>
          <small>18 of 25 sources processed</small>
        </div>
      );

    case "Skeleton":
      return (
        <div className="ms-skeleton-card" aria-busy="true" aria-label="Loading preview">
          <span className="ms-skeleton-avatar" />
          <div><span /><span /><span /></div>
        </div>
      );

    case "Tooltip":
      return (
        <div className="ms-tooltip-demo">
          <button className="ms-real-icon-button" type="button" aria-describedby="ms-tooltip"><Copy size={15} /></button>
          <span id="ms-tooltip" role="tooltip">Copy code <kbd>⌘C</kbd></span>
        </div>
      );

    case "Command":
      return (
        <div className="ms-command-demo">
          <div className="ms-command-search"><Search size={15} /><input placeholder="Type a command or search…" aria-label="Command search" /><kbd>⌘K</kbd></div>
          <small>Suggestions</small>
          <button type="button"><Command size={15} /><span>Open command center</span><kbd>⌘P</kbd></button>
          <button type="button"><Settings2 size={15} /><span>Workspace settings</span><kbd>⌘,</kbd></button>
          <button type="button"><Bell size={15} /><span>Notifications</span><kbd>⌘N</kbd></button>
        </div>
      );

    case "Badge":
      return (
        <div className="ms-badge-row">
          <span className="ms-real-badge">Default</span>
          <span className="ms-real-badge is-blue">Preview</span>
          <span className="ms-real-badge is-green">Healthy</span>
          <span className="ms-real-badge is-red">Blocked</span>
          <span className="ms-real-badge is-outline">Outline</span>
        </div>
      );

    case "Avatar":
      return (
        <div className="ms-avatar-demo">
          <span className="ms-avatar is-image"><CircleUserRound size={26} /></span>
          <span className="ms-avatar">CD</span>
          <span className="ms-avatar is-agent"><Sparkles size={16} /></span>
          <div><strong>Meridian team</strong><small>3 active collaborators</small></div>
        </div>
      );

    case "Prompt Composer":
      return (
        <div className="ms-composer-demo">
          <textarea placeholder="Ask Meridian anything…" aria-label="Prompt preview" />
          <div className="ms-composer-actions">
            <div>
              <button type="button" aria-label="Add attachment"><Plus size={15} /></button>
              <button type="button"><Globe2 size={14} /> Search</button>
              <button type="button" aria-label="Attach file"><Paperclip size={15} /></button>
              <button type="button" aria-label="More tools"><MoreHorizontal size={15} /></button>
            </div>
            <button className="ms-composer-send" type="button" aria-label="Send prompt"><ArrowUp size={16} /></button>
          </div>
        </div>
      );
  }
}
