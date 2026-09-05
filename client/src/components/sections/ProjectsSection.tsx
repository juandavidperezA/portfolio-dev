import { useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    name: "Actividad n8n",
    desc: "Proyecto de automatización desarrollado con n8n para practicar flujos de trabajo, integración de servicios y lógica de procesos.",
    techs: ["n8n", "Automatización", "APIs"],
    icon: "⚙️",
    status: "Automatización",
    featured: true,
    color: "#f97316",
    code: "https://github.com/juandavidperezA/actividad_n8n",
  },
  {
    id: 2,
    name: "Cine Colombia",
    desc: "Proyecto web inspirado en una plataforma de cine, creado para fortalecer maquetación, estilos, interacción y organización del frontend.",
    techs: ["HTML", "CSS", "JavaScript"],
    icon: "🎬",
    status: "Frontend",
    featured: false,
    color: "#3b82f6",
    code: "https://github.com/juandavidperezA/cinecolombiapropio",
  },
  {
    id: 3,
    name: "Proyecto Final JavaScript",
    desc: "Proyecto final enfocado en aplicar lógica con JavaScript, manipulación del DOM, eventos y construcción de una experiencia web interactiva.",
    techs: ["HTML", "CSS", "JavaScript"],
    icon: "🟨",
    status: "JavaScript",
    featured: false,
    color: "#fbbf24",
    code: "https://github.com/juandavidperezA/proyectofinaljs",
  },
  {
    id: 4,
    name: "PokeAPI",
    desc: "Proyecto de consumo de API temática Pokémon para practicar peticiones, manejo de datos y renderizado dinámico en una interfaz web.",
    techs: ["JavaScript", "API", "HTML", "CSS"],
    icon: "⚡",
    status: "Consumo de API",
    featured: false,
    color: "#8b5cf6",
    code: "https://github.com/juandavidperezA/apipoke",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((r, i) => {
              setTimeout(() => r.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 section-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="container">
        <div className="text-center mb-16 reveal">
          <p className="text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Mi trabajo
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Proyectos <span className="gradient-text-blue">Destacados</span>
          </h2>
          <div className="section-divider" />
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Algunos proyectos reales disponibles en mi perfil de GitHub.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <article key={project.id} className="reveal group relative" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/25 transition-all duration-300 h-full">
                <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-[#0d1424] to-[#080c16] overflow-hidden">
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border border-white/10 bg-white/5 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-[#0a0e1a]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Destacado
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors duration-200" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {project.name}
                    </h3>
                    <span className="text-[10px] text-white/40 border border-white/10 rounded-full px-2 py-1 whitespace-nowrap">{project.status}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techs.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}
                  </div>
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 rounded-xl text-xs btn-blue-outline"
                  >
                    Ver código en GitHub →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
