/*
 * ABOUT SECTION — Aura Dusk Portfolio
 * Sección cálida pero profesional con cualidades personales y texto biográfico
 */
import { useEffect, useRef } from "react";

const qualities = [
  { icon: "🎯", label: "Atento", desc: "Cuido cada detalle del proyecto" },
  { icon: "🤝", label: "Comprometido", desc: "Doy el 100% en cada tarea" },
  { icon: "🙏", label: "Respetuoso", desc: "Valoro el trabajo en equipo" },
  { icon: "✅", label: "Responsable", desc: "Cumplo plazos y expectativas" },
];

const traits = [
  { icon: "⚡", label: "Disciplina" },
  { icon: "🔄", label: "Constancia" },
  { icon: "📚", label: "Ganas de aprender" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((r, i) => {
              setTimeout(() => r.classList.add("visible"), i * 100);
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
      id="about"
      ref={sectionRef}
      className="py-24 section-surface relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p
            className="text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Conóceme
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Sobre <span className="gradient-text-blue">Mí</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Bio text + traits */}
          <div className="space-y-8">
            <div className="reveal">
              <div className="glass-card rounded-2xl p-8 border border-blue-500/10 relative overflow-hidden">
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-3xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-3xl" />

                <p
                  className="text-white/70 leading-relaxed text-base relative z-10"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Soy una persona{" "}
                  <span className="text-blue-300 font-medium">comprometida</span>{" "}
                  con cada proyecto en el que participo. Me gusta trabajar con{" "}
                  <span className="text-amber-300 font-medium">responsabilidad</span>,{" "}
                  <span className="text-blue-300 font-medium">respeto</span> y{" "}
                  <span className="text-amber-300 font-medium">organización</span>. Busco
                  mejorar constantemente mis habilidades y crecer tanto personal como
                  profesionalmente dentro del desarrollo web.
                </p>
              </div>
            </div>

            {/* Traits */}
            <div className="reveal">
              <p
                className="text-white/40 text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Me caracterizo por
              </p>
              <div className="flex flex-wrap gap-3">
                {traits.map((trait) => (
                  <div
                    key={trait.label}
                    className="flex items-center gap-2 glass-card-blue px-4 py-2.5 rounded-xl border border-blue-500/20"
                  >
                    <span className="text-base">{trait.icon}</span>
                    <span
                      className="text-blue-200 text-sm font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {trait.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div className="reveal">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Rol", value: "Dev Web en Formación" },
                  { label: "Enfoque", value: "Frontend & Backend" },
                  { label: "Estado", value: "Aprendiendo activamente" },
                  { label: "Meta", value: "Desarrollador Full Stack" },
                ].map((item) => (
                  <div key={item.label} className="glass-card rounded-xl p-4 border border-white/5">
                    <p
                      className="text-white/30 text-xs uppercase tracking-wider mb-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-white/80 text-sm font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Qualities cards */}
          <div className="grid grid-cols-2 gap-4">
            {qualities.map((q, i) => (
              <div
                key={q.label}
                className="reveal card-3d glass-card rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {q.icon}
                </div>
                <h3
                  className="text-white font-bold text-base mb-1.5 group-hover:text-blue-300 transition-colors duration-200"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {q.label}
                </h3>
                <p
                  className="text-white/40 text-xs leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {q.desc}
                </p>
                {/* Bottom accent line */}
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-amber-500 transition-all duration-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
