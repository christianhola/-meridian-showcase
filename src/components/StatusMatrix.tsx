import { statusRows } from "../data/showcase";

export function StatusMatrix() {
  return (
    <section className="section status-section" id="status">
      <div className="section-heading">
        <span className="eyebrow">04 / Product state</span>
        <div>
          <h2>Un mapa honesto del sistema.</h2>
          <p>
            El showcase distingue lo disponible de lo que todavía está siendo construido.
          </p>
        </div>
      </div>

      <div className="status-table" role="table" aria-label="Estado de Meridian">
        {statusRows.map(([name, state]) => (
          <div className="status-row" role="row" key={name}>
            <span role="cell">{name}</span>
            <span
              role="cell"
              className={`status-tag status-tag--${state.toLowerCase()}`}
            >
              {state}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
