import { Check, Code2, Copy, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type CatalogItem = {
  name: string;
  group: string;
  description: string;
  code: string;
};

const catalog: CatalogItem[] = [
  {
    name: "Button",
    group: "Core",
    description: "Acción primaria, secundaria y destructiva con estados claros.",
    code: `<button className="ms-button ms-button--primary">Deploy agent</button>\n<button className="ms-button ms-button--outline">View code</button>`,
  },
  {
    name: "Card",
    group: "Core",
    description: "Superficie modular para datos, configuración y resultados.",
    code: `<article className="ms-card">\n  <span className="ms-eyebrow">Runtime status</span>\n  <strong>All systems operational</strong>\n</article>`,
  },
  {
    name: "Input",
    group: "Forms",
    description: "Campo enterprise con label, descripción y estado de validación.",
    code: `<label className="ms-field">\n  <span>Workspace name</span>\n  <input placeholder="Meridian Cloud" />\n</label>`,
  },
  {
    name: "Tabs",
    group: "Navigation",
    description: "Cambia entre Preview, Code y estados del componente.",
    code: `<div className="ms-tabs">\n  <button data-active="true">Preview</button>\n  <button>Code</button>\n</div>`,
  },
  {
    name: "Area Chart",
    group: "Charts",
    description: "Visualización compacta para latencia, uso y actividad del runtime.",
    code: `<div className="ms-chart ms-chart--area" aria-label="Runtime activity chart">\n  <svg viewBox="0 0 600 180" role="img">\n    <path d="M0 150 C80 132 110 75 190 108 S310 146 380 75 S500 92 600 24" />\n  </svg>\n</div>`,
  },
  {
    name: "Toast",
    group: "Feedback",
    description: "Confirmación no bloqueante para acciones reversibles.",
    code: `<div className="ms-toast" role="status">\n  <span className="ms-status-dot" />\n  Runtime checkpoint saved\n</div>`,
  },
  { name: "Accordion", group: "Layout", description: "Agrupa contenido avanzado sin perder contexto.", code: `<details className="ms-accordion" open>\n  <summary>Advanced runtime settings</summary>\n  <p>Configure retries, tools and execution limits.</p>\n</details>` },
  { name: "Alert", group: "Feedback", description: "Mensaje persistente para avisos, errores y permisos.", code: `<div className="ms-alert" role="alert">\n  <strong>Approval required</strong>\n  <span>Review the proposed write before continuing.</span>\n</div>` },
  { name: "Dialog", group: "Overlay", description: "Superficie modal para crear, editar y confirmar.", code: `<dialog open className="ms-dialog">\n  <h2>Deploy runtime</h2>\n  <p>Choose the target environment.</p>\n</dialog>` },
  { name: "Dropdown Menu", group: "Overlay", description: "Acciones secundarias para un recurso o contexto.", code: `<button className="ms-menu-trigger">Actions</button>\n<div className="ms-menu">\n  <button>Duplicate</button>\n  <button>Archive</button>\n</div>` },
  { name: "Select", group: "Forms", description: "Selector compacto para modelos, regiones y entornos.", code: `<label className="ms-field">\n  <span>Model</span>\n  <select defaultValue="meridian">\n    <option value="meridian">Meridian Fast</option>\n    <option value="reasoning">Meridian Reasoning</option>\n  </select>\n</label>` },
  { name: "Textarea", group: "Forms", description: "Entrada larga para prompts, políticas y notas.", code: `<label className="ms-field">\n  <span>System instruction</span>\n  <textarea placeholder="Describe the task..." />\n</label>` },
  { name: "Switch", group: "Forms", description: "Activa o desactiva una capacidad sin salir del flujo.", code: `<label className="ms-switch-row">\n  <span>Persist runtime state</span>\n  <input type="checkbox" defaultChecked />\n</label>` },
  { name: "Table", group: "Data", description: "Datos operativos con lectura rápida y estados claros.", code: `<table className="ms-table">\n  <tbody><tr><td>Run 2841</td><td>Success</td><td>184ms</td></tr></tbody>\n</table>` },
  { name: "Progress", group: "Data", description: "Estado cuantificable de una tarea en ejecución.", code: `<div className="ms-progress" aria-label="Ingestion progress"\n  role="progressbar" aria-valuenow={72}>\n  <span style={{ width: "72%" }} />\n</div>` },
  { name: "Skeleton", group: "Feedback", description: "Carga estructural sin saltos de layout.", code: `<div className="ms-skeleton" aria-busy="true">\n  <span /><span /><span />\n</div>` },
  { name: "Tooltip", group: "Overlay", description: "Explicación breve para controles compactos.", code: `<button className="ms-icon-button" aria-label="Copy">\n  <Copy size={14} />\n  <span className="ms-tooltip">Copy code</span>\n</button>` },
  { name: "Command", group: "Navigation", description: "Búsqueda global y comandos rápidos del workspace.", code: `<div className="ms-command">\n  <Search size={15} />\n  <input placeholder="Search commands..." />\n  <kbd>⌘ K</kbd>\n</div>` },
  { name: "Badge", group: "Core", description: "Estado compacto para recursos, ejecuciones y versiones.", code: `<span className="ms-badge ms-badge--success">Healthy</span>` },
  { name: "Avatar", group: "Core", description: "Identidad de miembros, owners y agentes.", code: `<div className="ms-avatar" aria-label="Meridian agent">M</div>` },
];

const groups = ["All", "Core", "Forms", "Navigation", "Layout", "Data", "Charts", "Overlay", "Feedback"];

export function MeridianSyncCatalog() {
  const [activeGroup, setActiveGroup] = useState("All");
  const [activeName, setActiveName] = useState("Button");
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const visibleItems = useMemo(() => catalog.filter(item => {
    const matchesGroup = activeGroup === "All" || item.group === activeGroup;
    const matchesQuery = `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesGroup && matchesQuery;
  }), [activeGroup, query]);

  const activeItem = catalog.find(item => item.name === activeName) ?? catalog[0];
  const installCommand = `pnpm dlx meridian add ${activeItem.name.toLowerCase().replace(/\s+/g, "-")}`;

  const copyCode = async () => {
    await navigator.clipboard?.writeText(activeItem.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="section meridian-sync" id="meridian-sync" aria-labelledby="meridian-sync-title">
      <div className="meridian-sync__heading">
        <div>
          <span className="eyebrow"><Sparkles size={13} /> Meridian Sync / Component library</span>
          <h2 id="meridian-sync-title">The runtime, <span>made visible.</span></h2>
          <p>Una librería interactiva para explorar componentes, revisar su preview y copiar el código sin salir de Meridian.</p>
        </div>
          <div className="meridian-sync__metrics" aria-label="Library metrics">
          <strong>{String(catalog.length).padStart(2, "0")}</strong><span>ready components</span>
          <strong>02</strong><span>modes per block</span>
        </div>
      </div>

      <div className="meridian-sync__shell">
        <aside className="meridian-sync__sidebar" aria-label="Component catalog navigation">
          <div className="meridian-sync__sidebar-title"><span>Catalog</span><small>v0.1</small></div>
          <label className="meridian-sync__search">
            <Search size={14} aria-hidden="true" />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search components" aria-label="Search components" />
          </label>
          <div className="meridian-sync__groups">
            {groups.map(group => (
              <button type="button" key={group} className={activeGroup === group ? "is-active" : ""} onClick={() => setActiveGroup(group)}>
                <span>{group}</span><small>{group === "All" ? catalog.length : catalog.filter(item => item.group === group).length}</small>
              </button>
            ))}
          </div>
          <div className="meridian-sync__sidebar-foot"><span className="ms-status-dot" /> Live catalog preview</div>
        </aside>

        <div className="meridian-sync__content">
          <div className="meridian-sync__component-list" role="listbox" aria-label="Components">
            {visibleItems.map(item => (
              <button type="button" role="option" aria-selected={activeItem.name === item.name} key={item.name} className={activeItem.name === item.name ? "is-active" : ""} onClick={() => { setActiveName(item.name); setMode("preview"); }}>
                <span><strong>{item.name}</strong><small>{item.group}</small></span><span className="meridian-sync__list-mark">{activeItem.name === item.name ? "●" : "○"}</span>
              </button>
            ))}
          </div>

          <div className="meridian-sync__stage">
            <header className="meridian-sync__stage-head">
              <div><span className="eyebrow">Component / {activeItem.group}</span><h3>{activeItem.name}</h3><p>{activeItem.description}</p></div>
              <div className="meridian-sync__tabs" role="tablist" aria-label="Component view">
                <button type="button" role="tab" aria-selected={mode === "preview"} className={mode === "preview" ? "is-active" : ""} onClick={() => setMode("preview")}>Preview</button>
                <button type="button" role="tab" aria-selected={mode === "code"} className={mode === "code" ? "is-active" : ""} onClick={() => setMode("code")}><Code2 size={13} /> Code</button>
              </div>
            </header>

            <div className="meridian-sync__install"><span>Install</span><code>{installCommand}</code><button type="button" onClick={() => navigator.clipboard?.writeText(installCommand)}><Copy size={13} /> Copy</button></div>

            {mode === "preview" ? <div className="meridian-sync__preview" aria-label={`${activeItem.name} preview`}>
              {activeItem.name === "Button" && <div className="ms-preview-stack"><div className="ms-preview-line"><button className="ms-button ms-button--primary">Deploy agent</button><button className="ms-button ms-button--outline">View code</button><button className="ms-button ms-button--ghost">Cancel</button></div><div className="ms-preview-caption"><Check size={14} /> keyboard-ready / focus-visible</div></div>}
              {activeItem.name === "Card" && <article className="ms-card"><div className="ms-card__icon"><Sparkles size={17} /></div><span className="ms-eyebrow">Runtime status</span><strong>All systems operational</strong><p>12 active agents · 0 blocked runs</p><div className="ms-card__bar"><span /></div></article>}
              {activeItem.name === "Input" && <div className="ms-form-preview"><label className="ms-field"><span>Workspace name</span><input defaultValue="Meridian Cloud" /></label><span className="ms-helper">Used in your runtime namespace.</span></div>}
              {activeItem.name === "Tabs" && <div className="ms-tabs-preview"><div className="ms-tabs"><button data-active="true">Preview</button><button>Code</button><button>Props</button></div><div className="ms-tab-panel"><span className="ms-eyebrow">Selected view</span><strong>Preview state</strong><p>Interactive components keep their context.</p></div></div>}
              {activeItem.name === "Area Chart" && <div className="ms-chart"><div className="ms-chart__labels"><span>98ms</span><span>12ms</span></div><svg viewBox="0 0 600 180" role="img" aria-label="Runtime activity"><defs><linearGradient id="sync-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6576ff" stopOpacity=".42" /><stop offset="1" stopColor="#6576ff" stopOpacity="0" /></linearGradient></defs><path className="ms-chart__fill" d="M0 150 C80 132 110 75 190 108 S310 146 380 75 S500 92 600 24 V180 H0 Z" /><path className="ms-chart__line" d="M0 150 C80 132 110 75 190 108 S310 146 380 75 S500 92 600 24" /></svg><div className="ms-chart__axis"><span>09:00</span><span>12:00</span><span>15:00</span><span>18:00</span></div></div>}
              {activeItem.name === "Toast" && <div className="ms-toast" role="status"><span className="ms-status-dot" /><div><strong>Checkpoint saved</strong><small>Runtime state persisted 2s ago</small></div><button type="button">Undo</button></div>}
              {!['Button', 'Card', 'Input', 'Tabs', 'Area Chart', 'Toast'].includes(activeItem.name) && <div className="ms-generic-preview"><div className="ms-generic-preview__bar"><span className="ms-status-dot" /><span>{activeItem.group} / {activeItem.name}</span><span className="ms-generic-preview__dots">•••</span></div><div className="ms-generic-preview__body"><div className="ms-generic-preview__icon"><Sparkles size={18} /></div><strong>{activeItem.name} component</strong><p>{activeItem.description}</p><div className="ms-generic-preview__controls"><span /><span /><span /></div></div></div>}
            </div> : <div className="meridian-sync__code"><div className="meridian-sync__code-head"><span>tsx</span><button type="button" onClick={copyCode}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy code"}</button></div><pre><code>{activeItem.code}</code></pre></div>}
          </div>
        </div>
      </div>
    </section>
  );
}
