import { ArrowRight, Github, Menu, PauseCircle, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import ecosystemUrl from "../assets/meridian-ecosystem-hub.svg";
import { ArchitectureMap } from "./components/ArchitectureMap";
import { CommunityHub } from "./components/CommunityHub";
import { AgentResponseShowcase } from "./components/AgentResponseShowcase";
import { ProofGrid } from "./components/ProofGrid";
import { StatusMatrix } from "./components/StatusMatrix";
import { WilennyLab } from "./components/WilennyLab";

export function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.08 },
    );

    const nodes = document.querySelectorAll("[data-reveal]");
    nodes.forEach((node) => reveal.observe(node));
    return () => reveal.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Meridian Community">
          <span className="brand-mark">M</span>
          <span>MERIDIAN / COMMUNITY</span>
        </a>

        <nav className="topnav" aria-label="Primary navigation">
          <a href="#community">Community</a>
          <a href="#playground">Playground</a>
          <a href="#directory">Directory</a>
          <a href="#proof">Proof</a>
          <a href="#architecture">Architecture</a>
          <a href="#wilenny">WILENNY</a>
          <a href="#status">Status</a>
          <a className="nav-pill" href="https://github.com/christianhola/-meridian-showcase">
            GitHub <Github size={14} />
          </a>
        </nav>

        <button
          type="button"
          className="menu-button"
          aria-label={mobileOpen ? "Cerrar navegación" : "Abrir navegación"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {mobileOpen ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            ["Community", "#community"],
            ["Playground", "#playground"],
            ["Directory", "#directory"],
            ["Proof", "#proof"],
            ["Architecture", "#architecture"],
            ["WILENNY", "#wilenny"],
            ["Status", "#status"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)}>
              {label}<ArrowRight size={15} />
            </a>
          ))}
        </nav>
      ) : null}

      <main id="top">
        <section className="hero">
          <div className="hero-copy" data-reveal>
            <span className="hero-kicker">
              <span className="pulse-dot" />
              Meridian Community / Developer preview
            </span>
            <h1>
              Tools for builders.
              <span>Made to be explored.</span>
            </h1>
            <p>
              Build with transparent agent interfaces, reproducible starters and portable skills.\n              Explore real code, propose improvements and help shape the Meridian ecosystem.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#playground">
                Try the interactive demo <ArrowRight size={15} />
              </a>
              <a className="button button--secondary" href="https://github.com/christianhola/-meridian-showcase/tree/main/examples/agent-response-starter" target="_blank" rel="noreferrer">
                Get the starter
              </a>
            </div>
            <div className="hero-meta">
              <span><Sparkles size={13} /> open-source building blocks</span>
              <span><PauseCircle size={13} /> demo data, zero secrets</span>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <AgentResponseShowcase />
          </div>
        </section>

        <section className="developer-start" aria-labelledby="dev-start-title" data-reveal>
          <div className="developer-start__heading">
            <span className="eyebrow">Explore · learn · contribute</span>
            <h2 id="dev-start-title">Your first build starts here<span>.</span></h2>
            <p>Local-first tutorials and transparent demos. No fictional SDK imports, no production tokens, no hidden setup.</p>
          </div>
          <div className="developer-start__steps">
            <a href="https://github.com/christianhola/-meridian-showcase/tree/main/examples/agent-response-starter" target="_blank" rel="noreferrer">
              <span>01 / RUN</span><strong>Agent response starter</strong><small>A real local HTTP API, browser UI and tests.</small><ArrowRight size={18} aria-hidden="true"/>
            </a>
            <a href="https://github.com/christianhola/-meridian-showcase/tree/main/examples/mcp-readonly" target="_blank" rel="noreferrer">
              <span>02 / CONNECT</span><strong>Read-only MCP server</strong><small>Official SDK v2, typed tool and protocol tests.</small><ArrowRight size={18} aria-hidden="true"/>
            </a>
            <a href="https://github.com/christianhola/-meridian-showcase/blob/main/skills/wilenny/SKILL.md" target="_blank" rel="noreferrer">
              <span>03 / LEARN</span><strong>Portable WILENNY skill</strong><small>Capability routing, safety and evaluations.</small><ArrowRight size={18} aria-hidden="true"/>
            </a>
            <a href="https://github.com/christianhola/-meridian-showcase/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">
              <span>04 / CONTRIBUTE</span><strong>Make your first contribution</strong><small>Guidelines, reviews and documented boundaries.</small><ArrowRight size={18} aria-hidden="true"/>
            </a>
          </div>
        </section>

        <div data-reveal><CommunityHub /></div>
        <div data-reveal><ProofGrid /></div>
        <div data-reveal><ArchitectureMap /></div>

        <section className="ecosystem-strip" data-reveal>
          <div>
            <span className="eyebrow">System map</span>
            <h2>Un producto, múltiples capas coordinadas.</h2>
            <p>
              El hub conserva los diagramas técnicos existentes, pero ahora forman parte
              de una narrativa navegable y no dependen del README para tener contexto.
            </p>
          </div>
          <div className="ecosystem-art">
            <img src={ecosystemUrl} alt="Mapa del ecosistema Meridian" />
          </div>
        </section>

        <div data-reveal><WilennyLab /></div>
        <div data-reveal><StatusMatrix /></div>

        <section className="cta" data-reveal>
          <span className="eyebrow eyebrow--dark">Next frontier</span>
          <h2>Open collaboration, built responsibly.</h2>
          <p>
            The first examples are here. The public organization, verified community catalog and full launch security review are still being prepared.
          </p>
          <div className="cta-actions">
            <a className="button button--light" href="https://github.com/christianhola/-meridian-showcase/blob/main/README.md">Read the technical hub</a>
            <a className="button button--ghost-dark" href="https://github.com/christianhola/-meridian-showcase/blob/main/skills/wilenny/SKILL.md">
              Inspect WILENNY
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <span className="brand-mark brand-mark--small">M</span>
          <strong>MERIDIAN</strong>
        </div>
        <p>Building an auditable operating layer for intelligent work.</p>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
