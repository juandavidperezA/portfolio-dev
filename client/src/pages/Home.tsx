import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  X,
  Menu,
  Code2,
  Orbit,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Workflow,
  Play,
  Pause,
  MousePointer2,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectVisual from "@/components/spatial/ProjectVisual";
import "./spatial.css";

const CodexScene = lazy(() => import("@/components/spatial/CodexScene"));
const github = "https://github.com/juandavidperezA";
const email = "juandavidperezanaya@gmail.com";
const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];
const tour = [
  {
    section: "inicio",
    title: "Bienvenido a mi órbita",
    text: "Soy Codex, tu compañero de exploración. Te acompaño a conocer el trabajo de Juan David. ¿Empezamos?",
  },
  {
    section: "proyectos",
    title: "Ideas que ya son código",
    text: "Aquí está el proyecto más reciente de Juan: cinco sistemas de gestión en Java. Abre un proyecto para conocer sus detalles y explorar el código.",
  },
  {
    section: "sobre-mi",
    title: "La persona detrás del código",
    text: "Juan está en formación y aprende construyendo. Desarrollo web, bases de datos, automatización y mucha curiosidad.",
  },
  {
    section: "contacto",
    title: "Toda gran idea empieza hablando",
    text: "¿Un proyecto, una oportunidad o algo que construir juntos? Puedes escribirle por correo o conectar con él en GitHub y LinkedIn.",
  },
];
function MiniCodex() {
  return (
    <span className="mini-codex" aria-hidden="true">
      <span className="mini-antenna" />
      <span className="mini-visor">
        <i />
        <i />
      </span>
    </span>
  );
}

export default function Home() {
  const [active, setActive] = useState("inicio");
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const [guide, setGuide] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    try {
      return (
        localStorage.getItem("portfolio-motion") === "reduced" ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch {
      return false;
    }
  });
  const dialog = useRef<HTMLDialogElement>(null);
  const guidePanel = useRef<HTMLDivElement>(null);
  const guideTrigger = useRef<HTMLElement | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (guide) {
      guideTrigger.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      guidePanel.current?.focus({ preventScroll: true });
    } else {
      guideTrigger.current?.focus({ preventScroll: true });
      guideTrigger.current = null;
    }
  }, [guide]);
  useEffect(() => {
    if (guide) guidePanel.current?.focus({ preventScroll: true });
  }, [tourStep]);
  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion
      ? "reduced"
      : "full";
    try {
      localStorage.setItem(
        "portfolio-motion",
        reducedMotion ? "reduced" : "full"
      );
    } catch {
      /* optional preference */
    }
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reducedMotion]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
    else dialog.current?.close();
  }, [selected]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (media.matches) setReducedMotion(true);
    };
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);
  function navigate(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start",
      });
    setMenu(false);
  }
  function goTour(step: number) {
    setTourStep(step);
    setGuide(true);
    navigate(tour[step].section);
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopyError(true);
    }
  }
  const guideContent =
    tour[
      tourStep ??
        Math.max(
          0,
          tour.findIndex(item => item.section === active)
        )
    ];

  return (
    <div className="spatial-portfolio">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <header className="site-header">
        <a
          href="#inicio"
          className="wordmark"
          aria-label="Juan David Pérez, inicio"
        >
          <span className="logo-mark">
            j<span>d</span>.
          </span>
          <span>
            JUAN DAVID <b>PÉREZ</b>
          </span>
        </a>
        <nav
          className={menu ? "top-nav is-open" : "top-nav"}
          aria-label="Navegación principal"
        >
          {sections.slice(1).map(s => (
            <a
              className={active === s.id ? "active" : ""}
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setMenu(false)}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="github-icon"
            href={github}
            target="_blank"
            rel="noreferrer"
            aria-label="Perfil de GitHub"
          >
            <Github size={19} />
          </a>
          <a className="header-contact" href="#contacto">
            Hablemos <ArrowUpRight size={15} />
          </a>
          <button
            className="mobile-menu icon-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-label={menu ? "Cerrar navegación" : "Abrir navegación"}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section id="inicio" className="hero section-shell">
          <div className="hero-grain" />
          <div className="orbital-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> DESARROLLADOR EN FORMACIÓN{" "}
              <span className="eyebrow-line" />
            </div>
            <h1>
              Ideas en código.
              <br />
              Experiencias
              <br />
              <span>con dimensión.</span>
            </h1>
            <p className="hero-description">
              Soy <strong>Juan David Pérez.</strong> Conecto lógica, creatividad
              y curiosidad para construir experiencias digitales que van un paso
              más allá.
            </p>
            <div className="hero-buttons">
              <a href="#proyectos" className="button-primary">
                Explorar proyectos <ArrowUpRight size={18} />
              </a>
              <button className="button-text" onClick={() => goTour(0)}>
                <span className="play-ring">
                  <Play size={11} fill="currentColor" />
                </span>{" "}
                Un recorrido con Codex
              </button>
            </div>
            <div className="hero-footnote">
              <span>DESARROLLO WEB</span>
              <i />
              <span>JAVA & POO</span>
              <i />
              <span>AUTOMATIZACIÓN</span>
            </div>
          </div>
          <div className="hero-space">
            <div className="scene-coordinates">
              <span>PERSONAJE INTERACTIVO</span>
              <span>01 / CODEX</span>
            </div>
            <div className="scene-orbit scene-orbit-one" />
            <div className="scene-orbit scene-orbit-two" />
            <Suspense
              fallback={
                <div className="scene-loading">
                  <MiniCodex />
                  <span>Codex está llegando…</span>
                </div>
              }
            >
              <CodexScene
                reducedMotion={reducedMotion}
                onInteract={() => {
                  setGuide(true);
                  setTourStep(null);
                }}
              />
            </Suspense>
            <div className="scene-card">
              <span className="scene-card-icon">
                <Orbit size={20} />
              </span>
              <span>
                <b>Hola, soy Codex.</b>
                <small>Tu compañero de exploración</small>
              </span>
              <span className="status-dot" />
            </div>
            <div className="scene-interaction">
              <MousePointer2 size={12} />
              <span>Arrastra para girar · Toca para saludar</span>
            </div>
            <span className="space-cross cross-one">+</span>
            <span className="space-cross cross-two">+</span>
          </div>
          <div className="hero-bottom">
            <a href="#proyectos">
              <ArrowDown size={14} /> HAY MUCHO POR EXPLORAR
            </a>
            <span>CREATIVIDAD HUMANA. POSIBILIDADES INFINITAS.</span>
          </div>
        </section>
        <div className="tech-ribbon">
          <span className="ribbon-label">MI UNIVERSO TECNOLÓGICO</span>
          {[
            "Java",
            "JavaScript",
            "HTML / CSS",
            "Python",
            "MySQL",
            "n8n",
            "Git & GitHub",
          ].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <section id="proyectos" className="projects-section section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 — TRABAJO SELECCIONADO</p>
              <h2>
                De la idea
                <br />a la <span>realidad.</span>
              </h2>
            </div>
            <div className="section-intro">
              <p>
                Cada proyecto es una nueva forma de aprender. <br />
                Estos son algunos de mis últimos pasos.
              </p>
              <a
                href={`${github}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
              >
                Todos mis repositorios <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="project-filters" aria-label="Filtrar proyectos">
            {["Todos", "Java", "Web", "Automatización"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={filter === f ? "active" : ""}
              >
                {f}
                {f === "Todos" && <span>04</span>}
              </button>
            ))}
            <span className="filter-count" aria-live="polite">
              {
                projects.filter(
                  p => filter === "Todos" || p.category === filter
                ).length
              }{" "}
              proyectos
            </span>
          </div>
          <div className="project-grid">
            {projects
              .filter(p => filter === "Todos" || p.category === filter)
              .map(project => (
                <article
                  key={project.id}
                  className={`project-card project-${project.id}`}
                >
                  <button
                    className="project-image-button"
                    onClick={() => setSelected(project)}
                    aria-label={`Ver detalles de ${project.name}`}
                  >
                    <ProjectVisual kind={project.id} />
                    <span className="image-open">
                      <ArrowUpRight size={20} />
                    </span>
                  </button>
                  <div className="project-copy">
                    <div className="project-kicker">
                      <span>{project.label}</span>
                      <span>/{project.number}</span>
                    </div>
                    <h3>
                      <button onClick={() => setSelected(project)}>
                        {project.name}
                      </button>
                    </h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map(t => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <button
                      className="project-explore"
                      onClick={() => setSelected(project)}
                    >
                      Explorar proyecto <ArrowUpRight size={17} />
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </section>
        <section id="sobre-mi" className="about-section section-shell">
          <div className="about-editor">
            <div className="editor-title">
              <Code2 size={16} />
              <span>sobre-mi.md</span>
              <span className="editor-light" />
            </div>
            <div className="editor-content">
              <span className="editor-comment">// SIEMPRE EN CONSTRUCCIÓN</span>
              <h3>
                La curiosidad
                <br />
                es mi punto
                <br />
                de partida<span>_</span>
              </h3>
              <div className="editor-chips">
                <span>Aprender</span>
                <ArrowRight size={15} />
                <span>Construir</span>
                <ArrowRight size={15} />
                <span>Mejorar</span>
              </div>
              <div className="editor-bottom">
                <span className="status-dot" />
                <span>Una idea a la vez.</span>
                <Code2 size={17} />
              </div>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">02 — DETRÁS DEL CÓDIGO</p>
            <h2>
              Hola, soy
              <br />
              Juan David<span>.</span>
            </h2>
            <p>
              Soy estudiante de desarrollo de software. Me interesa entender
              cómo funcionan las cosas y convertir ese conocimiento en
              soluciones que se puedan usar.
            </p>
            <p>
              Mi camino conecta el desarrollo web, la programación, las bases de
              datos y la automatización. La robótica también me ha enseñado
              algo: las mejores ideas toman forma cuando trabajamos en equipo.
            </p>
            <div className="about-principles">
              <div>
                <span>01</span>
                <b>Lógica con propósito</b>
                <small>Entender el problema antes de escribir código.</small>
              </div>
              <div>
                <span>02</span>
                <b>Aprendizaje en movimiento</b>
                <small>Practicar, compartir y mejorar en cada proyecto.</small>
              </div>
            </div>
            <a
              className="inline-link"
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              Conoce mi proceso en GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <section
          className="stack-section section-shell"
          aria-labelledby="stack-title"
        >
          <div>
            <p className="eyebrow">HERRAMIENTAS PARA CONSTRUIR</p>
            <h2 id="stack-title">
              Un stack en <span>evolución.</span>
            </h2>
          </div>
          <div className="stack-grid">
            <div>
              <Code2 />
              <h3>Interfaces</h3>
              <p>HTML · CSS · JavaScript</p>
              <small>Estructura, interacción y experiencias web.</small>
            </div>
            <div>
              <Terminal />
              <h3>Lógica & datos</h3>
              <p>Java · Python · MySQL</p>
              <small>Programación, POO y bases de datos.</small>
            </div>
            <div>
              <Workflow />
              <h3>Conexiones</h3>
              <p>n8n · APIs · Git & GitHub</p>
              <small>Automatización y trabajo organizado.</small>
            </div>
          </div>
        </section>
        <section id="contacto" className="contact-section section-shell">
          <div className="contact-orbit" aria-hidden="true" />
          <p className="eyebrow">
            <span className="status-dot" /> ABIERTO A APRENDER Y COLABORAR
          </p>
          <h2>
            ¿Construimos
            <br />
            algo <span>juntos?</span>
          </h2>
          <p>
            Una idea, un reto o una nueva oportunidad.
            <br />
            Me encantaría ser parte.
          </p>
          <a className="button-primary contact-cta" href={`mailto:${email}`}>
            Hablemos de tu idea <ArrowUpRight size={20} />
          </a>
          <div className="email-row">
            <a href={`mailto:${email}`}>{email}</a>
            <button
              onClick={copyEmail}
              className="icon-button"
              aria-label="Copiar correo"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <span role="status">
              {copied
                ? "Copiado"
                : copyError
                  ? "Selecciona el correo para copiarlo"
                  : ""}
            </span>
          </div>
          <div className="contact-socials">
            <a href={github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub <ArrowUpRight size={13} />
            </a>
            <a
              href="https://www.linkedin.com/in/juan-perez-4b3851356/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="logo-mark" href="#inicio" aria-label="Volver al inicio">
          jd.
        </a>
        <span>© {new Date().getFullYear()} Juan David Pérez</span>
        <span>Hecho con curiosidad. Explorando con Codex.</span>
        <a href="#inicio">
          VOLVER ARRIBA <ArrowUpRight size={14} />
        </a>
      </footer>
      <div className="explorer-dock">
        <span className="dock-icon">
          <Orbit size={17} />
        </span>
        <nav aria-label="Explorar secciones">
          {sections.map((s, i) => (
            <button
              key={s.id}
              className={active === s.id ? "active" : ""}
              onClick={() => navigate(s.id)}
              aria-label={`Ir a ${s.label}`}
              aria-current={active === s.id ? "location" : undefined}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <i />
            </button>
          ))}
        </nav>
        <button
          className="motion-control"
          onClick={() => setReducedMotion(!reducedMotion)}
          aria-pressed={reducedMotion}
          aria-label={
            reducedMotion ? "Activar animaciones" : "Reducir animaciones"
          }
          title={reducedMotion ? "Activar animaciones" : "Reducir animaciones"}
        >
          {reducedMotion ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
      <aside
        className="codex-companion"
        aria-label="Compañero Codex"
        onKeyDown={e => {
          if (e.key === "Escape") {
            setGuide(false);
            setTourStep(null);
          }
        }}
      >
        {guide && (
          <div
            className="guide-panel"
            id="codex-guide"
            ref={guidePanel}
            tabIndex={-1}
          >
            <div className="guide-heading">
              <span>
                <span className="status-dot" /> CODEX · TU GUÍA
              </span>
              <button
                onClick={() => {
                  setGuide(false);
                  setTourStep(null);
                }}
                className="icon-button"
                aria-label="Cerrar guía"
              >
                <X size={17} />
              </button>
            </div>
            <div aria-live="polite">
              <h3>{guideContent.title}</h3>
              <p>{guideContent.text}</p>
            </div>
            {tourStep === null ? (
              <button className="guide-start" onClick={() => goTour(0)}>
                Iniciar recorrido <ArrowRight size={16} />
              </button>
            ) : (
              <div className="tour-controls">
                <button
                  disabled={tourStep === 0}
                  onClick={() => goTour(tourStep - 1)}
                  aria-label="Paso anterior"
                >
                  <ChevronLeft size={17} />
                </button>
                <span>
                  {tourStep + 1} / {tour.length}
                </span>
                <button
                  onClick={() =>
                    tourStep < tour.length - 1
                      ? goTour(tourStep + 1)
                      : (setGuide(false), setTourStep(null))
                  }
                >
                  {tourStep < tour.length - 1 ? "Siguiente" : "Terminar"}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
        <button
          className="companion-launcher"
          onClick={() => {
            setGuide(!guide);
            setTourStep(null);
          }}
          aria-expanded={guide}
          aria-controls="codex-guide"
          aria-label={guide ? "Cerrar guía Codex" : "Abrir guía Codex"}
        >
          <MiniCodex />
          <span>
            Codex<small>{guide ? "Explorando contigo" : "¿Exploramos?"}</small>
          </span>
          <span className="status-dot" />
        </button>
      </aside>
      <dialog
        ref={dialog}
        className="project-dialog"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={e => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        aria-labelledby="project-dialog-title"
      >
        {selected && (
          <div className="dialog-content">
            <button
              className="dialog-close icon-button"
              onClick={() => setSelected(null)}
              aria-label="Cerrar detalles"
            >
              <X />
            </button>
            <p className="eyebrow">PROYECTO / {selected.number}</p>
            <h2 id="project-dialog-title">{selected.name}</h2>
            <p className="dialog-note">{selected.note}</p>
            <p>{selected.detail}</p>
            <div className="project-tags">
              {selected.tags.map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <h3>Dentro del proyecto</h3>
            <ul>
              {selected.features.map(f => (
                <li key={f}>
                  <Check size={16} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              className="button-primary"
              href={selected.repo}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} /> Explorar código <ArrowUpRight size={17} />
            </a>
          </div>
        )}
      </dialog>
    </div>
  );
}
