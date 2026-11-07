import { ArrowRight, Github, Menu, PauseCircle, Sparkles, X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import ecosystemUrl from "../assets/meridian-ecosystem-hub.svg";
import { ArchitectureMap } from "./components/ArchitectureMap";
import { AgentsWorkspace } from "./components/AgentsWorkspace";
import { ActivityChart } from "./components/ActivityChart";
import { LiveTrace } from "./components/LiveTrace";
import { ProofGrid } from "./components/ProofGrid";
import { StatusMatrix } from "./components/StatusMatrix";
import { VirtualDesktop } from "./components/VirtualDesktop";
import { WilennyLab } from "./components/WilennyLab";

const AtmosphericCommandCenter = lazy(() => import("./components/AtmosphericCommandCenter"));

export function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const agentRoute = { href: "/-meridian-showcase/agents/" };

  if (window.location.pathname.replace(/\\/+$/, "").endsWith("/atmosphere")) {
    return <div className="atmosphere-page" style={{ padding: "clamp(14px, 3.5vw, 45px)", minHeight: "100vh" }}>
      <Suspense fallback={<div role="status">Cargando centro atmosférico…</div>}>
        <AtmosphericCommandCenter />
      </Suspense>
    </div>;
  }

  if (window.location.pathname.replace(/\/+$/, "").endsWith("/activity")) {
    return <div className="activity-page"><ActivityChart /></div>;
  }

  if (window.location.pathname.replace(/\/+$/, "").endsWith("/desktop")) {
    return <VirtualDesktop />;
  }

  if (window.location.pathname.replace(/\/+$/, "").endsWith("/agents")) {
    return <div className="agents-standalone"><AgentsWorkspace /></div>;
  }

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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      reveal.disconnect();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#proof">Skip to interactive demo</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Meridian showcase">
          <span className="brand-mark">M</span>
          <span>MERIDIAN / COMMUNITY</span>
        </a>

        <nav className="topnav" aria-label="Principal">
          <a href="#proof" aria-current="page">The work</a>
          <a href="#architecture">System</a>
          <a href={agentRoute.href}>Agents</a>
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
        <nav className="mobile-nav" aria-label="Principal móvil">
          {[
            ["The work", "#proof"],
            ["System", "#architecture"],
            ["WILENNY", "#wilenny"],
            ["Status", "#status"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)}>
              {label}<ArrowRight size={15} />
            </a>
          ))}
          <a href="https://github.com/christianhola/-meridian-showcase" onClick={() => setMobileOpen(false)}>
            Open on GitHub <Github size={15} />
          </a>
        </nav>
      ) : null}

      <main id="top">
        <section className="hero">
          <div className="hero-copy" data-reveal>
            <span className="hero-kicker">
              Meridian Community · Open workspace · 2026
            </span>
            <h1>
              Build in public.
              <span>Keep the system legible.</span>
            </h1>
            <p>
              Open examples, working interfaces and documented systems for people who care about
              how software is made. Explore the work, take what helps and contribute back.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#proof">
                Explore the work <ArrowRight size={15} />
              </a>
              <a className="button button--secondary" href="#wilenny">
                Read the system
              </a>
            </div>
            <div className="hero-meta">
              <span><Sparkles size={13} /> documented systems</span>
              <span><PauseCircle size={13} /> built in public</span>
            </div>
          </div>
        </section>

        <section className="hero-proof" data-reveal aria-label="Meridian system preview">
          <div className="hero-proof__heading">
            <span>THE WORKING SYSTEM</span>
            <span>Preview / local / auditable</span>
          </div>
          <LiveTrace />
        </section>

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
            <a className="button button--light" href="./README.md">Read the technical hub</a>
            <a className="button button--ghost-dark" href="./skills/wilenny/SKILL.md">
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
