/*
 * SKILLS SECTION — Aura Dusk Portfolio
 * Barras animadas con glow, tarjetas de fortalezas por tecnología
 */
import { useEffect, useRef, useState } from "react";

const mainSkills = [
  {
    name: "HTML",
    level: 85,
    color: "#f97316",
    icon: "🌐",
    strengths: ["Excelente estructura", "Código limpio", "Orden y semántica"],
    desc: "Me destaco por crear estructuras HTML bien organizadas, claras y fáciles de mantener.",
  },
  {
    name: "CSS",
    level: 80,
    color: "#3b82f6",
    icon: "🎨",
    strengths: ["Diseños llamativos", "Interfaces modernas", "Buen gusto visual"],
    desc: "Disfruto diseñar interfaces atractivas y modernas enfocadas en una buena experiencia visual.",
  },
  {
    name: "JavaScript",
    level: 65,
    color: "#fbbf24",
    icon: "⚡",
    strengths: ["Interactividad", "Lógica funcional", "Experiencia dinámica"],
    desc: "Uso JavaScript para dar vida a las interfaces y crear experiencias más interactivas.",
  },
];

const otherSkills = [
  { name: "Node.js", level: 30, icon: "🟢", note: "Aprendiendo" },
  { name: "Git / GitHub", level: 60, icon: "🐙", note: "Control de versiones" },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            entry.target.querySelectorAll(".reveal").forEach((r, i) => {
              setTimeout(() => r.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 section-dark relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p
            className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Mi Stack
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Habilidades <span className="gradient-text-gold">Técnicas</span>
          </h2>
          <div className="section-divider" />
          <p
            className="text-white/40 text-sm mt-4 max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Tecnologías que domino y que sigo perfeccionando con cada proyecto
          </p>
        </div>

        {/* Main skills: cards with bars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {mainSkills.map((skill, i) => (
            <div
              key={skill.name}
              className="reveal card-3d glass-card rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30` }}
                >
                  {skill.icon}
                </div>
                <div>
                  <h3
                    className="text-white font-black text-lg"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {skill.name}
                  </h3>
                  <span
                    className="text-white/30 text-xs"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {skill.level}% dominio
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animated ? `${skill.level}%` : "0%",
                      background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                      boxShadow: `0 0 10px ${skill.color}60`,
                      transitionDelay: `${i * 200 + 300}ms`,
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <p
                className="text-white/50 text-xs leading-relaxed mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {skill.desc}
              </p>

              {/* Strengths */}
              <div className="flex flex-wrap gap-1.5">
                {skill.strengths.map((s) => (
                  <span key={s} className="tech-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other skills */}
        <div className="reveal">
          <p
            className="text-white/30 text-xs uppercase tracking-widest mb-4 text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            También trabajo con
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {otherSkills.map((skill, i) => (
              <div
                key={skill.name}
                className="glass-card rounded-xl p-5 border border-white/5 hover:border-blue-500/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{skill.icon}</span>
                    <div>
                      <span
                        className="text-white/80 font-semibold text-sm"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {skill.name}
                      </span>
                      <p
                        className="text-white/30 text-xs"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {skill.note}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-white/30 text-xs"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animated ? `${skill.level}%` : "0%",
                      background: "linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)",
                      boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                      transitionDelay: `${i * 200 + 600}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
