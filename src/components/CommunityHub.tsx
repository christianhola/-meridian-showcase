import { ArrowRight, ArrowUpRight, Boxes, Code2, Github, Puzzle, Workflow } from "lucide-react";

const repository = "https://github.com/christianhola/-meridian-showcase";

const tracks = [
  {
    icon: Puzzle,
    prefix: "plugin-*",
    title: "Marketplace de plugins",
    copy: "Extensiones, widgets y herramientas revisadas. Las contribuciones se registran antes de publicarse.",
    detail: "Extensiones",
  },
  {
    icon: Boxes,
    prefix: "template-* / starter-*",
    title: "Plantillas y starters",
    copy: "Puntos de partida reproducibles, con documentación, pruebas y configuración de ejemplo sin secretos.",
    detail: "Plantillas",
  },
  {
    icon: Code2,
    prefix: "sdk-*",
    title: "SDKs para desarrolladores",
    copy: "Clientes tipados por lenguaje, versionados según su compatibilidad real con las APIs disponibles.",
    detail: "Librerías",
  },
  {
    icon: Workflow,
    prefix: "integrations-*",
    title: "Integraciones externas",
    copy: "Conectores de terceros con permisos explícitos, OAuth o webhooks y revisiones de seguridad.",
    detail: "Conectores",
  },
] as const;

export function CommunityHub() {
  return (
    <section className="section community-section" id="community" aria-labelledby="community-title">
      <div className="community-intro">
        <div>
          <span className="eyebrow">03 / Open ecosystem</span>
          <h2 id="community-title">Construyamos Meridian juntos<span>.</span></h2>
          <p>
            Meridian Community reunirá extensiones, herramientas, plantillas y proyectos de
            desarrolladores. El catálogo comienza vacío: solo mostraremos proyectos reales,
            publicados y revisados.
          </p>
        </div>
        <a className="button button--primary" href={repository} target="_blank" rel="noreferrer">
          <Github size={17} aria-hidden="true" />
          Explorar el repositorio
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <div className="community-grid" aria-label="Cuatro categorías de contribución">
        {tracks.map(({ icon: Icon, prefix, title, copy, detail }, index) => (
          <article className="community-card" key={prefix}>
            <div className="community-card__top">
              <span className="community-card__icon"><Icon size={22} aria-hidden="true" /></span>
              <span className="community-card__number">0{index + 1}</span>
            </div>
            <span className="community-card__prefix">{prefix}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
            <span className="community-card__foot">{detail} · Convocatoria abierta próximamente</span>
          </article>
        ))}
      </div>

      <div className="community-showcase" id="built-with-meridian">
        <div>
          <span className="eyebrow eyebrow--dark">Built with Meridian</span>
          <h3>Hecho por la comunidad<span>.</span></h3>
          <p>
            Este espacio mostrará aplicaciones y herramientas enviadas por sus creadores.
            Aún no hay proyectos comunitarios verificados en el catálogo.
          </p>
          <span className="community-showcase__state">0 publicaciones verificadas · Registro inicial</span>
        </div>
        <div className="community-showcase__actions">
          <span>¿Estás construyendo algo con Meridian?</span>
          <a href={repository + "/issues/new?template=showcase-submission.yml"} target="_blank" rel="noreferrer">
            Proponer un proyecto <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href={repository + "/blob/main/docs/COMMUNITY-MANIFESTO.md"} target="_blank" rel="noreferrer">
            Leer nuestro manifiesto <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="community-next">
        <span>Empieza aquí</span>
        <p>Una comunidad confiable empieza con normas claras, código revisable y documentación honesta.</p>
        <a href={repository + "/blob/main/CONTRIBUTING.md"} target="_blank" rel="noreferrer">
          Guía para contribuir <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
