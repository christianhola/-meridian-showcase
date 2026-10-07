import { Check, ChevronRight, FlaskConical } from "lucide-react";
import { useMemo, useState } from "react";
import { wilennyScenarios } from "../data/showcase";

export function WilennyLab() {
  const [selectedId, setSelectedId] = useState(wilennyScenarios[0].id);
  const [run, setRun] = useState(0);
  const selected = useMemo(
    () => wilennyScenarios.find((item) => item.id === selectedId)!,
    [selectedId],
  );

  return (
    <section className="section" id="wilenny">
      <div className="section-heading">
        <span className="eyebrow">03 / WILENNY</span>
        <div>
          <h2>Una skill orquestadora debe poder evaluarse.</h2>
          <p>
            Esta consola demuestra cómo WILENNY clasifica rutas y explicita worker,
            herramientas, aprobación y criterio de salida.
          </p>
        </div>
      </div>

      <div className="wilenny-lab">
        <nav className="wilenny-tabs" aria-label="Escenarios WILENNY">
          {wilennyScenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              className={scenario.id === selectedId ? "is-active" : ""}
              onClick={() => {
                setSelectedId(scenario.id);
                setRun((value) => value + 1);
              }}
            >
              <span>{scenario.label}</span>
              <ChevronRight size={15} />
            </button>
          ))}
        </nav>

        <article className="wilenny-console" key={`${selectedId}-${run}`}>
          <header>
            <span className="eyebrow eyebrow--dark">
              <FlaskConical size={13} /> Route simulation
            </span>
            <span className="wilenny-console__ok">
              <Check size={13} /> policy-safe
            </span>
          </header>
          <div className="wilenny-console__rows">
            <ResultRow label="route" value={selected.route} />
            <ResultRow label="worker" value={selected.worker} />
            <ResultRow label="tools" value={selected.tools} />
            <ResultRow label="approval" value={selected.approval} />
            <ResultRow label="outcome" value={selected.outcome} />
          </div>
          <p>
            El repo incluye un eval pack versionado con 12 escenarios de contrato. Las
            métricas de modelos solo se publicarán cuando existan ejecuciones reproducibles.
          </p>
        </article>
      </div>
    </section>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="result-row">
      <code>{label}</code>
      <span>{value}</span>
    </div>
  );
}
