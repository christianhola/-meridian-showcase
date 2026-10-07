import { ArrowRight, Braces, CheckCircle2, Library, Shield, Workflow, Wrench } from "lucide-react";
import { useState } from "react";
import { architectureNodes } from "../data/showcase";

const icons = [Workflow, Library, Shield, Braces, Wrench, CheckCircle2];

export function ArchitectureMap() {
  const [selected, setSelected] = useState(architectureNodes[1]);

  return (
    <section className="section architecture" id="architecture">
      <div className="section-heading">
        <span className="eyebrow">02 / Architecture</span>
        <div>
          <h2>Metadata first. Context on demand.</h2>
          <p>
            El Librarian no carga todo el sistema. Primero inspecciona el catálogo,
            luego abre la capacidad correcta con permisos y contexto mínimos.
          </p>
        </div>
      </div>

      <div className="architecture-shell">
        <div className="architecture-flow" role="list">
          {architectureNodes.map((node, index) => {
            const Icon = icons[index];
            const active = selected.id === node.id;
            return (
              <div className="architecture-flow__item" key={node.id}>
                <button
                  type="button"
                  className={`architecture-node tone-${node.tone} ${active ? "is-active" : ""}`}
                  onClick={() => setSelected(node)}
                  aria-pressed={active}
                >
                  <span className="architecture-node__icon">
                    <Icon size={18} />
                  </span>
                  <span>{node.label}</span>
                </button>
                {index < architectureNodes.length - 1 ? (
                  <ArrowRight className="architecture-arrow" size={16} aria-hidden="true" />
                ) : null}
              </div>
            );
          })}
        </div>

        <aside className="architecture-detail" aria-live="polite">
          <span className="eyebrow">Selected node</span>
          <h3>{selected.label}</h3>
          <p>{selected.detail}</p>
          <code>scope=minimal · evidence=required</code>
        </aside>
      </div>
    </section>
  );
}
