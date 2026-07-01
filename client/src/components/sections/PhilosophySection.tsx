/*
 * PHILOSOPHY SECTION — Aura Dusk Portfolio
 * Sección inspiradora con quote destacada, mentalidad de aprendizaje
 */
import { useEffect, useRef } from "react";

const pillars = [
  {
    icon: "🔬",
    title: "Investigar",
    desc: "Exploro nuevas tecnologías y tendencias constantemente.",
  },
  {
    icon: "💪",
    title: "Practicar",
    desc: "Cada concepto aprendido se convierte en código real.",
  },
  {
    icon: "🧩",
    title: "Resolver",
    desc: "Los desafíos son oportunidades de crecer como desarrollador.",
  },
  {
    icon: "🚀",
    title: "Mejorar",
    desc: "Cada proyecto me lleva un paso más cerca de la excelencia.",
  },
];

export default function PhilosophySection() {
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
      id="philosophy"
      ref={sectionRef}
      className="py-24 section-dark relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Large background quote mark */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-[20rem] font-black text-blue-500/3 leading-none select-none pointer-events-none"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        "
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p
            className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Mi mentalidad
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Filosofía de <span className="gradient-text-gold">Aprendizaje</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Main quote */}
        <div className="max-w-3xl mx-auto mb-16 reveal">
          <div className="relative glass-card rounded-3xl p-10 border border-blue-500/15 text-center overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-amber-500/5 rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

            <div
              className="text-5xl text-amber-400/60 font-black leading-none mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              "
            </div>
            <blockquote
              className="text-xl sm:text-2xl font-bold text-white/90 leading-relaxed mb-4 relative z-10"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Cada línea de código representa una{" "}
              <span className="shimmer-text">nueva oportunidad</span> de aprender.
            </blockquote>
            <div
              className="text-5xl text-blue-400/40 font-black leading-none mt-2"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              "
            </div>
          </div>
        </div>

        {/* Bio text */}
        <div className="max-w-2xl mx-auto text-center mb-16 reveal">
          <p
            className="text-white/60 text-base leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Me gusta estar en constante aprendizaje. Disfruto investigar nuevas tecnologías,
            practicar y resolver desafíos.{" "}
            <span className="text-blue-300 font-medium">
              Cada proyecto representa una oportunidad para mejorar.
            </span>
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="reveal text-center group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-amber-500/20 transition-all duration-300 h-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {pillar.icon}
                </div>
                <h3
                  className="text-white font-bold text-base mb-2 group-hover:text-amber-300 transition-colors duration-200"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-white/40 text-xs leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {pillar.desc}
                </p>
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-amber-500 transition-all duration-500 rounded-full mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
