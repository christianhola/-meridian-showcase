import { Pause, Play, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const steps = [
  ["INTENT", "Diseñar onboarding enterprise"],
  ["ROUTER", "wilenny · design"],
  ["POLICY", "workspace scope verified"],
  ["WORKER", "designEngineer"],
  ["TOOLS", "repo · browser · image"],
  ["VERIFY", "responsive · a11y · evidence"],
] as const;

export function LiveTrace() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((value) => (value + 1) % steps.length),
      1150,
    );
    return () => window.clearInterval(id);
  }, [playing]);

  const progress = useMemo(
    () => Math.round(((active + 1) / steps.length) * 100),
    [active],
  );

  return (
    <section className="trace" aria-label="Demostración de trace de agente">
      <div className="trace__glow" aria-hidden="true" />
      <header className="trace__header">
        <div>
          <span className="eyebrow eyebrow--dark">Agent trace / demo</span>
          <strong>trace_7f31 · workspace-safe</strong>
        </div>
        <span className="trace__running">
          <span />
          RUNNING
        </span>
      </header>

      <div className="trace__steps">
        {steps.map(([label, value], index) => {
          const done = index < active;
          const current = index === active;
          return (
            <div
              key={label}
              className={[
                "trace-step",
                done ? "is-done" : "",
                current ? "is-current" : "",
              ].join(" ")}
            >
              <span className="trace-step__label">{label}</span>
              <span className="trace-step__value">{value}</span>
              <span className="trace-step__dot" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      <div className="trace__footer">
        <div className="trace__progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <code>{progress}%</code>
        <button
          type="button"
          className="icon-button icon-button--dark"
          onClick={() => setPlaying((value) => !value)}
          aria-label={playing ? "Pausar trace" : "Reproducir trace"}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>

      <div className="trace__verified">
        <ShieldCheck size={15} />
        Demo visual — no representa telemetría live de producción.
      </div>
    </section>
  );
}
