import {
  Check,
  Code2,
  Copy,
  Eye,
  Moon,
  PackagePlus,
  Palette,
  Search,
  Sparkles,
  Sun,
} from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import {
  ComponentThumbnail,
  MeridianSyncPreview,
  type PreviewName,
} from "./MeridianSyncPreview";

type CatalogItem = {
  name: PreviewName;
  slug: string;
  group: string;
  description: string;
  install: string;
  source: "meridian" | "shadcn";
  code: string;
};

const code = (...lines: string[]) => lines.join("\n");

const catalog: CatalogItem[] = [
  {
    name: "Button",
    slug: "motion-button",
    group: "Core",
    description: "Acciones primarias, secundarias y destructivas con Motion opcional, foco visible y estados disabled.",
    install: "npx shadcn@latest add christianhola/-meridian-showcase/motion-button",
    source: "meridian",
    code: code(
      'import { MeridianMotionButton } from "@/components/ui/meridian-motion-button"',
      "",
      "export function Actions() {",
      "  return (",
      '    <div className="flex gap-2">',
      '      <MeridianMotionButton>Deploy agent</MeridianMotionButton>',
      '      <MeridianMotionButton variant="outline">View code</MeridianMotionButton>',
      "    </div>",
      "  )",
      "}",
    ),
  },
  {
    name: "Card",
    slug: "metric-card",
    group: "Core",
    description: "Tarjeta de métrica compacta con jerarquía tipográfica, valor tabular y tendencia semántica.",
    install: "npx shadcn@latest add christianhola/-meridian-showcase/metric-card",
    source: "meridian",
    code: code(
      'import { MetricCard } from "@/components/meridian/metric-card"',
      "",
      "<MetricCard",
      '  label="Total revenue"',
      '  value="$1,250.00"',
      '  detail="Trending up this month"',
      '  trend="+12.5%"',
      '  tone="positive"',
      "/>",
    ),
  },
  {
    name: "Input",
    slug: "input",
    group: "Forms",
    description: "Campo sobrio con helper text, error semántico, focus-visible y contraste consistente.",
    install: "npx shadcn@latest add input label",
    source: "shadcn",
    code: code(
      'import { Input } from "@/components/ui/input"',
      'import { Label } from "@/components/ui/label"',
      "",
      '<Label htmlFor="workspace">Workspace name</Label>',
      '<Input id="workspace" defaultValue="Meridian Cloud" />',
    ),
  },
  {
    name: "Tabs",
    slug: "tabs",
    group: "Navigation",
    description: "Tabs para Preview, Code y Tokens sin perder el contexto del componente seleccionado.",
    install: "npx shadcn@latest add tabs",
    source: "shadcn",
    code: code(
      'import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"',
      "",
      '<Tabs defaultValue="preview">',
      "  <TabsList>",
      '    <TabsTrigger value="preview">Preview</TabsTrigger>',
      '    <TabsTrigger value="code">Code</TabsTrigger>',
      "  </TabsList>",
      "</Tabs>",
    ),
  },
  {
    name: "Area Chart",
    slug: "chart",
    group: "Data",
    description: "Gráfico de actividad con ejes limpios, valores legibles y degradado contenido dentro del área.",
    install: "npx shadcn@latest add chart",
    source: "shadcn",
    code: code(
      'import { ChartContainer } from "@/components/ui/chart"',
      "",
      '<ChartContainer config={config}>',
      "  {/* Recharts chart */}",
      "</ChartContainer>",
    ),
  },
  {
    name: "Toast",
    slug: "sonner",
    group: "Feedback",
    description: "Confirmación no bloqueante con acción reversible y copia corta.",
    install: "npx shadcn@latest add sonner",
    source: "shadcn",
    code: code(
      'import { toast } from "sonner"',
      "",
      'toast("Deployment queued", {',
      '  description: "Preview build will start shortly.",',
      '  action: { label: "Undo", onClick: rollback },',
      "})",
    ),
  },
  {
    name: "Accordion",
    slug: "accordion",
    group: "Layout",
    description: "Contenido técnico expandible con targets de click completos y jerarquía discreta.",
    install: "npx shadcn@latest add accordion",
    source: "shadcn",
    code: code(
      'import { Accordion } from "@/components/ui/accordion"',
      "",
      '<Accordion type="single" collapsible>{/* items */}</Accordion>',
    ),
  },
  {
    name: "Alert",
    slug: "alert",
    group: "Feedback",
    description: "Aviso persistente para permisos, estado operativo y errores recuperables.",
    install: "npx shadcn@latest add alert",
    source: "shadcn",
    code: code(
      'import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"',
      "",
      "<Alert>",
      "  <AlertTitle>Approval required</AlertTitle>",
      "  <AlertDescription>Review the proposed write.</AlertDescription>",
      "</Alert>",
    ),
  },
  {
    name: "Dialog",
    slug: "dialog",
    group: "Overlay",
    description: "Modal de confirmación con foco, cierre por teclado y acciones claramente priorizadas.",
    install: "npx shadcn@latest add dialog",
    source: "shadcn",
    code: code(
      'import { Dialog, DialogContent } from "@/components/ui/dialog"',
      "",
      '<Dialog open><DialogContent>{/* content */}</DialogContent></Dialog>',
    ),
  },
  {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    group: "Overlay",
    description: "Menú contextual con atajos, separadores y acción destructiva visualmente aislada.",
    install: "npx shadcn@latest add dropdown-menu",
    source: "shadcn",
    code: code(
      'import { DropdownMenu } from "@/components/ui/dropdown-menu"',
      "",
      "<DropdownMenu>{/* trigger + items */}</DropdownMenu>",
    ),
  },
  {
    name: "Select",
    slug: "select",
    group: "Forms",
    description: "Selector compacto para modelos, regiones y entornos, sin inventar controles personalizados.",
    install: "npx shadcn@latest add select",
    source: "shadcn",
    code: code(
      'import { Select } from "@/components/ui/select"',
      "",
      '<Select defaultValue="reasoning">{/* options */}</Select>',
    ),
  },
  {
    name: "Textarea",
    slug: "textarea",
    group: "Forms",
    description: "Entrada multilinea para instrucciones, notas y prompts largos.",
    install: "npx shadcn@latest add textarea",
    source: "shadcn",
    code: code(
      'import { Textarea } from "@/components/ui/textarea"',
      "",
      '<Textarea placeholder="Describe the task…" />',
    ),
  },
  {
    name: "Switch",
    slug: "switch",
    group: "Forms",
    description: "Toggle binario con estado visible y target táctil suficiente.",
    install: "npx shadcn@latest add switch",
    source: "shadcn",
    code: code(
      'import { Switch } from "@/components/ui/switch"',
      "",
      '<Switch aria-label="Persist runtime state" />',
    ),
  },
  {
    name: "Table",
    slug: "table",
    group: "Data",
    description: "Datos operativos densos sin sacrificar lectura, alineación o estado semántico.",
    install: "npx shadcn@latest add table",
    source: "shadcn",
    code: code(
      'import { Table } from "@/components/ui/table"',
      "",
      "<Table>{/* header + rows */}</Table>",
    ),
  },
  {
    name: "Progress",
    slug: "progress",
    group: "Data",
    description: "Progreso cuantificable de tareas y procesos en ejecución.",
    install: "npx shadcn@latest add progress",
    source: "shadcn",
    code: code(
      'import { Progress } from "@/components/ui/progress"',
      "",
      "<Progress value={72} />",
    ),
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    group: "Feedback",
    description: "Carga estructural que conserva el layout y respeta reduced motion.",
    install: "npx shadcn@latest add skeleton",
    source: "shadcn",
    code: code(
      'import { Skeleton } from "@/components/ui/skeleton"',
      "",
      '<Skeleton className="h-12 w-12 rounded-full" />',
    ),
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    group: "Overlay",
    description: "Ayuda contextual breve para iconos y controles compactos.",
    install: "npx shadcn@latest add tooltip",
    source: "shadcn",
    code: code(
      'import { Tooltip } from "@/components/ui/tooltip"',
      "",
      "<Tooltip>{/* trigger + content */}</Tooltip>",
    ),
  },
  {
    name: "Command",
    slug: "command",
    group: "Navigation",
    description: "Command palette para navegación y acciones rápidas con atajos visibles.",
    install: "npx shadcn@latest add command",
    source: "shadcn",
    code: code(
      'import { Command } from "@/components/ui/command"',
      "",
      "<Command>{/* input + groups + items */}</Command>",
    ),
  },
  {
    name: "Badge",
    slug: "badge",
    group: "Core",
    description: "Estados compactos para ejecuciones, versiones y salud del sistema.",
    install: "npx shadcn@latest add badge",
    source: "shadcn",
    code: code(
      'import { Badge } from "@/components/ui/badge"',
      "",
      '<Badge variant="outline">Preview</Badge>',
    ),
  },
  {
    name: "Avatar",
    slug: "avatar",
    group: "Core",
    description: "Identidad de miembros y agentes con fallback legible.",
    install: "npx shadcn@latest add avatar",
    source: "shadcn",
    code: code(
      'import { Avatar, AvatarFallback } from "@/components/ui/avatar"',
      "",
      "<Avatar><AvatarFallback>CD</AvatarFallback></Avatar>",
    ),
  },
  {
    name: "Prompt Composer",
    slug: "prompt-composer",
    group: "AI",
    description: "Composer para IA con herramientas, búsqueda, adjuntos y submit claro, inspirado en interfaces de producto reales.",
    install: "npx shadcn@latest add christianhola/-meridian-showcase/prompt-composer",
    source: "meridian",
    code: code(
      'import { PromptComposer } from "@/components/meridian/prompt-composer"',
      "",
      "<PromptComposer onSubmit={(prompt) => send(prompt)} />",
    ),
  },
];

const groups = ["All", "Core", "Forms", "Navigation", "Layout", "Data", "Overlay", "Feedback", "AI"];

const tokenCards = [
  ["background", "#fbfbfa", "Primary canvas"],
  ["foreground", "#181a1b", "Primary text"],
  ["primary", "#1d2021", "Primary action"],
  ["border", "#d8d9d7", "Hairline border"],
  ["muted", "#74787a", "Secondary text"],
  ["accent", "#365ec9", "Focus and data"],
] as const;

export function MeridianSyncCatalog() {
  const [activeGroup, setActiveGroup] = useState("All");
  const [activeName, setActiveName] = useState<PreviewName>("Button");
  const [mode, setMode] = useState<"preview" | "code" | "tokens">("preview");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<"code" | "install" | null>(null);
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");

  const visibleItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return catalog.filter((item) => {
      const matchesGroup = activeGroup === "All" || item.group === activeGroup;
      const matchesQuery =
        !needle ||
        `${item.name} ${item.group} ${item.description}`.toLowerCase().includes(needle);
      return matchesGroup && matchesQuery;
    });
  }, [activeGroup, query]);

  const activeItem = catalog.find((item) => item.name === activeName) ?? catalog[0];

  const copy = async (value: string, target: "code" | "install") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(target);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section
      className="section meridian-sync meridian-sync-v2"
      id="meridian-sync"
      aria-labelledby="meridian-sync-title"
    >
      <div className="meridian-sync__heading">
        <div>
          <span className="eyebrow">
            <Sparkles size={13} aria-hidden="true" /> Meridian Sync / React component registry
          </span>
          <h2 id="meridian-sync-title">
            Real components.
            <span> Real previews.</span>
          </h2>
          <p>
            Componentes React documentados como producto: preview funcional, código copiable,
            tokens visibles y comandos reales de shadcn. Sin bloques genéricos ni installs ficticios.
          </p>
        </div>
        <div className="meridian-sync__metrics" aria-label="Library metrics">
          <strong>{String(catalog.length).padStart(2, "0")}</strong>
          <span>components</span>
          <strong>04</strong>
          <span>custom registry items</span>
          <strong>03</strong>
          <span>workbench views</span>
        </div>
      </div>

      <div className="meridian-sync__shell">
        <aside className="meridian-sync__sidebar" aria-label="Component catalog navigation">
          <div className="meridian-sync__sidebar-title">
            <span className="meridian-sync__library-brand">
              <span className="meridian-sync__library-mark">M</span>
              <span>Meridian Sync</span>
            </span>
            <small>v0.2</small>
          </div>

          <label className="meridian-sync__search">
            <Search size={14} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components"
              aria-label="Search components"
            />
          </label>

          <div className="meridian-sync__groups">
            {groups.map((group) => (
              <button
                type="button"
                key={group}
                className={activeGroup === group ? "is-active" : ""}
                onClick={() => setActiveGroup(group)}
              >
                <span>{group}</span>
                <small>
                  {group === "All"
                    ? catalog.length
                    : catalog.filter((item) => item.group === group).length}
                </small>
              </button>
            ))}
          </div>

          <div className="meridian-sync__sidebar-foot">
            <span className="ms-status-dot" /> GitHub-backed shadcn registry
          </div>
        </aside>

        <div className="meridian-sync__content">
          <div className="meridian-sync__component-list" role="listbox" aria-label="Components">
            {visibleItems.length ? (
              visibleItems.map((item) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={activeItem.name === item.name}
                  key={item.name}
                  className={activeItem.name === item.name ? "is-active" : ""}
                  onClick={() => {
                    setActiveName(item.name);
                    setMode("preview");
                  }}
                >
                  <span className="meridian-sync__component-copy">
                    <ComponentThumbnail name={item.name} />
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.source === "meridian" ? "Meridian registry" : item.group}</small>
                    </span>
                  </span>
                  <span className="meridian-sync__list-mark">
                    {activeItem.name === item.name ? "●" : "○"}
                  </span>
                </button>
              ))
            ) : (
              <div className="ms-empty-state">No components match “{query}”.</div>
            )}
          </div>

          <div className="meridian-sync__stage">
            <header className="meridian-sync__stage-head">
              <div>
                <span className="eyebrow">
                  {activeItem.source === "meridian" ? "Meridian registry" : "shadcn/ui"} / {activeItem.group}
                </span>
                <h3>{activeItem.name}</h3>
                <p>{activeItem.description}</p>
              </div>

              <div className="meridian-sync__stage-actions">
                <div className="meridian-sync__theme-toggle" aria-label="Preview theme">
                  <button
                    type="button"
                    className={previewTheme === "light" ? "is-active" : ""}
                    aria-label="Light preview"
                    aria-pressed={previewTheme === "light"}
                    onClick={() => setPreviewTheme("light")}
                  >
                    <Sun size={14} />
                  </button>
                  <button
                    type="button"
                    className={previewTheme === "dark" ? "is-active" : ""}
                    aria-label="Dark preview"
                    aria-pressed={previewTheme === "dark"}
                    onClick={() => setPreviewTheme("dark")}
                  >
                    <Moon size={14} />
                  </button>
                </div>

                <div className="meridian-sync__tabs" role="tablist" aria-label="Component view">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "preview"}
                    className={mode === "preview" ? "is-active" : ""}
                    onClick={() => setMode("preview")}
                  >
                    <Eye size={13} /> Preview
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "code"}
                    className={mode === "code" ? "is-active" : ""}
                    onClick={() => setMode("code")}
                  >
                    <Code2 size={13} /> Code
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "tokens"}
                    className={mode === "tokens" ? "is-active" : ""}
                    onClick={() => setMode("tokens")}
                  >
                    <Palette size={13} /> Tokens
                  </button>
                </div>
              </div>
            </header>

            <div className="meridian-sync__install">
              <PackagePlus size={13} aria-hidden="true" />
              <code>{activeItem.install}</code>
              <button type="button" onClick={() => copy(activeItem.install, "install")}>
                {copied === "install" ? <Check size={13} /> : <Copy size={13} />}
                {copied === "install" ? "Copied" : "Copy"}
              </button>
            </div>

            {mode === "preview" ? (
              <div className="meridian-sync__preview" role="tabpanel" aria-label={`${activeItem.name} preview`}>
                <MeridianSyncPreview name={activeItem.name} theme={previewTheme} />
              </div>
            ) : null}

            {mode === "code" ? (
              <div className="meridian-sync__code" role="tabpanel" aria-label={`${activeItem.name} code`}>
                <div className="meridian-sync__code-head">
                  <span>tsx</span>
                  <button type="button" onClick={() => copy(activeItem.code, "code")}>
                    {copied === "code" ? <Check size={14} /> : <Copy size={14} />}
                    {copied === "code" ? "Copied" : "Copy code"}
                  </button>
                </div>
                <pre><code>{activeItem.code}</code></pre>
              </div>
            ) : null}

            {mode === "tokens" ? (
              <div className="meridian-sync__tokens" role="tabpanel" aria-label="Design tokens">
                {tokenCards.map(([token, swatch, detail]) => (
                  <div className="ms-token-card" key={token}>
                    <span style={{ "--token-swatch": swatch } as CSSProperties} />
                    <code>--{token}</code>
                    <small>{detail}</small>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
