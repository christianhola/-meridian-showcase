import { ArrowUpRight } from "lucide-react";
import { proofItems } from "../data/showcase";

export function ProofGrid() {
  return (
    <section className="section" id="proof">
      <div className="section-heading">
        <span className="eyebrow">01 / Proof layer</span>
        <div>
          <h2>La visión necesita evidencia.</h2>
          <p>
            Cada capacidad se etiqueta por estado. Meridian no presenta una idea futura
            como si ya estuviera operando en producción.
          </p>
        </div>
      </div>

      <div className="proof-grid">
        {proofItems.map((item) => (
          <article className="proof-card" key={item.title}>
            <span className={`status-tag status-tag--${item.state.toLowerCase()}`}>
              {item.state}
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <footer>
              <span>{item.evidence}</span>
              {item.href ? (
                <a href={item.href} aria-label={`Abrir evidencia de ${item.title}`}>
                  <ArrowUpRight size={15} />
                </a>
              ) : null}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
