import { ArrowRight, Github, Menu, PauseCircle, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import ecosystemUrl from "../assets/meridian-ecosystem-hub.svg";
import { ArchitectureMap } from "./components/ArchitectureMap";
import { CommunityHub } from "./components/CommunityHub";
import { LiveTrace } from "./components/LiveTrace";
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
              Evidence-first AI operating layer
            </span>
            <h1>
              Built by builders.
              <span>Powered by Meridian.</span>
            </h1>
            <p>
              An open collaboration space for plugin authors, MCP developers, SDK maintainers
              and people building useful software around Meridian.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#community">
                Explore the community <ArrowRight size={15} />
              </a>
              <a className="button button--secondary" href="#wilenny">
                Explore WILENNY
              </a>
            </div>
            <div className="hero-meta">
              <span><Sparkles size={13} /> agent orchestration</span>
              <span><PauseCircle size={13} /> preview-first execution</span>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <LiveTrace />
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
          <h2>Del manifiesto a la evidencia reproducible.</h2>
          <p>
            El siguiente paso del showcase es conectar demos seguras, evals versionados y
            traces anonimizados del runtime real sin publicar secretos ni datos de clientes.
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
