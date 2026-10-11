import { useMemo, useState } from "react";
import { ArrowUpRight, Search, ShieldCheck } from "lucide-react";
import data from "../../community/registry.json";

type Category = "plugins" | "templates" | "sdks" | "integrations" | "mcps" | "showcase";
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
const registry = data as Record<Category, Entry[]>;
const filters: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "plugins", label: "Plugins" },
  { key: "templates", label: "Templates" },
  { key: "sdks", label: "SDKs" },
  { key: "integrations", label: "Integrations" },
  { key: "mcps", label: "MCP" },
  { key: "showcase", label: "Showcase" },
];
const entries = filters.filter(filter => filter.key !== "all").flatMap(filter =>
  registry[filter.key as Category].map(item => ({ ...item, category: filter.key as Category })),
);

export function CommunityDirectory() {
  const [category, setCategory] = useState<"all" | Category>("all");
  const [term, setTerm] = useState("");
  const results = useMemo(() => {
    const query = term.trim().toLocaleLowerCase();
    return entries.filter(item => (category === "all" || item.category === category) &&
      (!query || [item.name, item.description, item.slug, ...(item.tags || [])].some(
        text => text.toLocaleLowerCase().includes(query),
      )));
  }, [category, term]);

  return (
    <section className="directory-section" aria-labelledby="directory-heading" id="directory">
      <div className="directory-heading">
        <div>
          <span className="eyebrow">Curated by maintainers</span>
          <h3 id="directory-heading">Community directory<span>.</span></h3>
          <p>Only reviewed, publicly available projects appear here. Every listing links to its source code.</p>
        </div>
        <div className="directory-count" aria-label={entries.length + " published projects"}>
          <strong>{entries.length}</strong><span>VERIFIED ENTRIES</span>
        </div>
      </div>
      <div className="directory-controls">
        <div className="directory-filters" aria-label="Filter by project type">
          {filters.map(filter => (
            <button type="button" key={filter.key} aria-pressed={category === filter.key}
              className={category === filter.key ? "is-active" : ""}
              onClick={() => setCategory(filter.key)}>{filter.label}</button>
          ))}
        </div>
        <label className="directory-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input type="search" value={term} onChange={event => setTerm(event.target.value)}
            placeholder="Search projects" />
        </label>
      </div>
      {results.length ? (
        <div className="directory-results" aria-live="polite">
          {results.map(item => (
            <a className="directory-result" key={item.category + "/" + item.slug}
              href={item.repository} target="_blank" rel="noreferrer">
              <div><span className="directory-type">{item.category} · {item.license}</span>
                <h4>{item.name} <ArrowUpRight size={16} aria-hidden="true" /></h4>
                <p>{item.description}</p></div>
              <div className="directory-tags">{item.tags?.map(tag => <span key={tag}>{tag}</span>)}</div>
            </a>
          ))}
        </div>
      ) : (
        <div className="directory-empty" role="status">
          <ShieldCheck size={26} aria-hidden="true" />
          <strong>{entries.length === 0 ? "The directory is getting ready." : "No matching projects."}</strong>
          <p>{entries.length === 0
            ? "The first projects will be listed after maintainer review. We don't invent plugins or developer activity."
            : "Try a different category or search term."}</p>
        </div>
      )}
    </section>
  );
}
