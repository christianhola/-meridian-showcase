import { ArrowRight, ArrowUpRight, Boxes, Code2, Github, Puzzle, Workflow, Network } from "lucide-react";
import { CommunityDirectory } from "./CommunityDirectory";
import registry from "../../community/registry.json";

const repository = "https://github.com/christianhola/-meridian-showcase";
const published = registry.plugins.length + registry.templates.length + registry.sdks.length +
  registry.integrations.length + registry.mcps.length + registry.showcase.length;

const tracks = [
  { icon: Puzzle, prefix: "plugin-*", title: "Plugins & extensions",
    copy: "Custom tools, widgets, and capabilities built through documented, permission-scoped interfaces.",
    detail: "Community modules" },
  { icon: Boxes, prefix: "template-* / starter-*", title: "Templates & starters",
    copy: "Reproducible examples with documentation, local setup and a verifiable build.",
    detail: "Starter projects" },
  { icon: Code2, prefix: "sdk-*", title: "Developer SDKs",
    copy: "Typed client libraries, published only when the corresponding public APIs are stable.",
    detail: "Language libraries" },
  { icon: Network, prefix: "mcp-*", title: "MCP connectors",
    copy: "Model Context Protocol servers with documented capabilities and security boundaries.",
    detail: "Protocol connectors" },
  { icon: Workflow, prefix: "integrations-*", title: "Integrations",
    copy: "Service integrations with explicit scopes, webhook validation and support policies.",
    detail: "Third-party systems" },
] as const;

export function CommunityHub() {
  return (
    <section className="section community-section" id="community" aria-labelledby="community-title">
      <div className="community-intro">
        <div>
          <span className="eyebrow">01 / Developer ecosystem</span>
          <h2 id="community-title">Build something that matters<span>.</span></h2>
          <p>
            Explore Meridian's open ecosystem plans: extensions, MCP connectors, starter kits,
            client SDKs and a curated directory of real community projects.
          </p>
        </div>
        <a className="button button--primary" href={repository} target="_blank" rel="noreferrer">
          <Github size={17} aria-hidden="true" />
          Explore on GitHub
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="community-grid" aria-label="Five paths to contribute">
        {tracks.map(({ icon: Icon, prefix, title, copy, detail }, index) => (
          <article className="community-card" key={prefix}>
            <div className="community-card__top">
              <span className="community-card__icon"><Icon size={22} aria-hidden="true" /></span>
              <span className="community-card__number">0{index + 1}</span>
            </div>
            <span className="community-card__prefix">{prefix}</span>
            <h3>{title}</h3><p>{copy}</p>
            <span className="community-card__foot">{detail} · Proposals welcome after launch</span>
          </article>
        ))}
      </div>
      <CommunityDirectory />
      <div className="community-showcase" id="built-with-meridian">
        <div>
          <span className="eyebrow eyebrow--dark">Built with Meridian</span>
          <h3>Made by builders<span>.</span></h3>
          <p>
            Share a working project with a public repository and clear documentation.
            We review submissions before adding them to our curated directory.
          </p>
          <span className="community-showcase__state">{published} curated listings · Independent verification required</span>
        </div>
        <div className="community-showcase__actions">
          <span>Have something worth sharing?</span>
          <a href={repository + "/issues/new?template=showcase-submission.yml"} target="_blank" rel="noreferrer">
            Submit your project <ArrowRight size={16} aria-hidden="true" /></a>
          <a href={repository + "/blob/feat/meridian-community-foundation/docs/COMMUNITY-MANIFESTO.md"} target="_blank" rel="noreferrer">
            Read our manifesto <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="community-next">
        <span>Getting started</span>
        <p>Healthy ecosystems grow through secure defaults, excellent documentation and helpful maintainers.</p>
        <a href={repository + "/blob/feat/meridian-community-foundation/CONTRIBUTING.md"} target="_blank" rel="noreferrer">
          Contributing guide <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
