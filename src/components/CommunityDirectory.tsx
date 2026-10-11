import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Code2, FolderGit2, Search, ShieldCheck, X } from "lucide-react";
import data from "../../community/registry.json";

type Category = "plugins" | "templates" | "sdks" | "integrations" | "mcps" | "showcase";
type Filter = "all" | "official" | Category;
type Entry = {
  slug: string;
  name: string;
  description: string;
  repository: string;
  status: "published";
  license: string;
  tags?: string[];
  demoUrl?: string;
};
type FirstPartyResource = {
  id: string;
  category: "templates" | "mcps" | "showcase";
  name: string;
  summary: string;
  source: string;
  documentation: string;
  kind: string;
  tags: string[];
};

const repository = "https://github.com/christianhola/-meridian-showcase";
const official: FirstPartyResource[] = [
  {
    id: "agent-response-starter",
    category: "templates",
    name: "Agent Response Starter",
    summary: "A working browser interface and local HTTP endpoint. Zero API keys and no external packages.",
    source: repository + "/tree/main/examples/agent-response-starter",
    documentation: repository + "/blob/main/examples/agent-response-starter/README.md",
    kind: "Runnable starter",
    tags: ["Node.js", "UI", "Local-first"],
  },
  {
    id: "readonly-mcp",
    category: "mcps",
    name: "Read-only MCP Server",
    summary: "Official MCP v2 SDK example with a real stdio handshake, typed tool and protocol-level tests.",
    source: repository + "/tree/main/examples/mcp-readonly",
    documentation: repository + "/blob/main/examples/mcp-readonly/README.md",
    kind: "MCP example",
    tags: ["MCP", "TypeScript SDK", "Read-only"],
  },
  {
    id: "wilenny-skill",
    category: "showcase",
    name: "WILENNY Agent Skill",
    summary: "Portable capability routing guide with versioned evaluation scenarios and security boundaries.",
    source: repository + "/tree/main/skills/wilenny",
    documentation: repository + "/blob/main/skills/wilenny/SKILL.md",
    kind: "Agent skill",
    tags: ["Agent skills", "Evaluations", "Safety"],
  },
];

const registry = data as Record<Category, Entry[]>;
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "official", label: "By Meridian" },
  { key: "plugins", label: "Plugins" },
  { key: "templates", label: "Starters" },
  { key: "mcps", label: "MCP" },
  { key: "sdks", label: "SDKs" },
  { key: "integrations", label: "Integrations" },
  { key: "showcase", label: "Showcase" },
];
const categories: readonly Category[] = ["plugins", "templates", "sdks", "integrations", "mcps", "showcase"];
const published = categories.flatMap(category => registry[category].map(item => ({ ...item, category })));

export function CommunityDirectory() {
  const [category, setCategory] = useState<Filter>("all");
  const [term, setTerm] = useState("");
  const query = term.trim().toLocaleLowerCase();
  const matches = (values: string[]) => !query || values.some(value => value.toLocaleLowerCase().includes(query));
  const officialResults = useMemo(() => official.filter(item =>
    (category === "all" || category === "official" || category === item.category) &&
    matches([item.name, item.summary, item.kind, ...item.tags])
  ), [category, query]);
  const communityResults = useMemo(() => published.filter(item =>
    (category === "all" || category === item.category) &&
    matches([item.name, item.description, item.slug, ...(item.tags || [])])
  ), [category, query]);
  const hasResults = officialResults.length + communityResults.length > 0;

  return (
    <section className="directory-section" aria-labelledby="directory-heading" id="directory">
      <div className="directory-heading">
        <div>
          <span className="eyebrow">Explore verified source code</span>
          <h3 id="directory-heading">Developer directory<span>.</span></h3>
          <p>Start with working examples maintained in this repository. External projects are listed only after review.</p>
        </div>
        <div className="directory-summary" aria-label="Directory totals">
          <div><strong>{official.length}</strong><span>IN-REPO EXAMPLES</span></div>
          <div><strong>{published.length}</strong><span>EXTERNAL LISTINGS</span></div>
        </div>
      </div>
      <div className="directory-controls">
        <div className="directory-filters" role="group" aria-label="Filter developer resources">
          {filters.map(filter => (
            <button type="button" key={filter.key} aria-pressed={category === filter.key}
              className={category === filter.key ? "is-active" : ""}
              onClick={() => setCategory(filter.key)}>{filter.label}</button>
          ))}
        </div>
        <div className="directory-search">
          <Search size={16} aria-hidden="true" />
          <label className="sr-only" htmlFor="directory-query">Search developer resources</label>
          <input id="directory-query" type="search" value={term} onChange={event => setTerm(event.target.value)}
            placeholder="Search examples and projects…" autoComplete="off" />
          {term ? <button type="button" onClick={() => setTerm("")} aria-label="Clear resource search">
            <X size={15} aria-hidden="true" />
          </button> : null}
        </div>
      </div>
      <div className="directory-results-meta" aria-live="polite" aria-atomic="true">
        <span>{officialResults.length + communityResults.length} {query ? "matching" : "available"} resources</span>
        <span>Source-first · No fabricated projects</span>
      </div>
      {hasResults ? <>
        {officialResults.length > 0 ? <>
          <div className="directory-subheading"><h4><FolderGit2 size={16} aria-hidden="true" /> Maintained examples</h4>
            <span>Available with repository access</span></div>
          <div className="directory-results">
            {officialResults.map(item => (
              <article className="directory-result directory-result--official" key={item.id}>
                <div>
                  <span className="directory-type"><ShieldCheck size={13} aria-hidden="true" /> {item.kind} · in repo</span>
                  <h4>{item.name}</h4>
                  <p>{item.summary}</p>
                </div>
                <div>
                  <div className="directory-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <div className="directory-result__actions">
                    <a href={item.source} target="_blank" rel="noreferrer">View source <ArrowUpRight size={14} aria-hidden="true" /></a>
                    <a href={item.documentation} target="_blank" rel="noreferrer"><BookOpen size={14} aria-hidden="true" /> Guide</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </> : null}
        {communityResults.length > 0 ? <>
          <div className="directory-subheading"><h4><Code2 size={16} aria-hidden="true" /> Community publications</h4>
            <span>Reviewed public repositories</span></div>
          <div className="directory-results">
            {communityResults.map(item => (
              <a className="directory-result" key={item.category + "/" + item.slug}
                href={item.repository} target="_blank" rel="noreferrer">
                <div><span className="directory-type">{item.category} · {item.license}</span>
                  <h4>{item.name} <ArrowUpRight size={16} aria-hidden="true" /></h4>
                  <p>{item.description}</p></div>
                <div className="directory-tags">{item.tags?.map(tag => <span key={tag}>{tag}</span>)}</div>
              </a>
            ))}
          </div>
        </> : null}
      </> : <div className="directory-empty" role="status">
        <Search size={26} aria-hidden="true" />
        <strong>Nothing matches those filters yet.</strong>
        <p>Try another category or search for “MCP”, “starter” or “skill”. External submissions are reviewed before appearing here.</p>
        <button className="directory-reset" type="button" onClick={() => { setCategory("all"); setTerm(""); }}>
          Show all resources
        </button>
      </div>}
      {published.length === 0 && !query && category === "all" ?
        <p className="directory-disclaimer">Community submissions will appear here after review. The three examples above are included in this repository, not independent community submissions.</p>
        : null}
    </section>
  );
}
