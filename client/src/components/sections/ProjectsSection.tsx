/*
 * PROJECTS SECTION — Aura Dusk Portfolio
 * Cards con glassmorphism, hover 3D, imágenes de preview, badges de tecnologías
 */
import { useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    name: "CineColombia Platform",
    desc: "Plataforma de streaming de películas colombianas con catálogo dinámico, reproductor integrado y sistema de categorías por género.",
    image: "/manus-storage/project-cinema_5c39bacf.png",
    techs: ["HTML", "CSS", "JavaScript"],
    demo: "#",
    code: "#",
    featured: true,
    color: "#f97316",
  },
  {
    id: 2,
    name: "Auth System",
    desc: "Sistema de autenticación seguro con registro, login, validación de formularios y manejo de sesiones de usuario.",
    image: "/manus-storage/project-auth_e2bb4788.png",
    techs: ["HTML", "CSS", "JavaScript", "Node.js"],
    demo: "#",
    code: "#",
    featured: false,
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Pokémon ExamPro",
    desc: "Aplicación web interactiva temática Pokémon con sistema de exámenes, puntuaciones y diseño holográfico premium.",
    image: "/manus-storage/project-pokemon_f0be8d3c.png",
    techs: ["HTML", "CSS", "JavaScript"],
    demo: "#",
    code: "#",
    featured: false,
    color: "#fbbf24",
  },
  {
    id: 4,
    name: "Landing Pages",
    desc: "Colección de landing pages modernas con animaciones CSS, diseño responsive y enfoque en conversión y UX.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    techs: ["HTML", "CSS", "JavaScript"],
    demo: "#",
    code: "#",
    featured: false,
    color: "#8b5cf6",
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
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 section-surface relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p
            className="text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Mi trabajo
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Proyectos <span className="gradient-text-blue">Destacados</span>
          </h2>
          <div className="section-divider" />
          <p
            className="text-white/40 text-sm mt-4 max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Cada proyecto es una oportunidad de aprender y demostrar mis habilidades
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="reveal group relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/25 transition-all duration-400 h-full"
                style={{
                  transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(59, 130, 246, 0.2), 0 8px 20px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/40 to-transparent" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-[#0a0e1a]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      Destacado
                    </div>
                  )}

                  {/* Color accent top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors duration-200"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-white/50 text-sm leading-relaxed mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.desc}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techs.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <a
                      href={project.demo}
                      className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold btn-gold"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                      onClick={(e) => e.preventDefault()}
                    >
                      Ver demo
                    </a>
                    <a
                      href={project.code}
                      className="flex-1 text-center py-2.5 rounded-xl text-xs btn-blue-outline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Ver código
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 reveal">
          <p
            className="text-white/30 text-sm mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Más proyectos próximamente...
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card-blue border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span
              className="text-blue-300 text-xs font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              En constante construcción
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
