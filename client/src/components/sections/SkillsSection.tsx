import { useEffect, useRef, useState } from "react";

const mainSkills = [
  {
    name: "HTML",
    level: 85,
    color: "#f97316",
    icon: "🌐",
    strengths: ["Estructura", "Semántica", "Organización"],
    desc: "Creo estructuras HTML organizadas y claras para mis proyectos web.",
  },
  {
    name: "CSS",
    level: 80,
    color: "#3b82f6",
    icon: "🎨",
    strengths: ["Responsive", "Interfaces", "Estilos"],
    desc: "Utilizo CSS para construir interfaces atractivas, modernas y adaptables.",
  },
  {
    name: "JavaScript",
    level: 45,
    color: "#fbbf24",
    icon: "⚡",
    strengths: ["DOM", "Eventos", "APIs"],
    desc: "Estoy fortaleciendo JavaScript mediante proyectos de lógica, DOM y consumo de APIs.",
  },
];

const otherSkills = [
  { name: "n8n", level: 65, icon: "⚙️", note: "Automatización de flujos" },
  { name: "MySQL", level: 60, icon: "🗄️", note: "Bases de datos y consultas" },
  { name: "Python", level: 40, icon: "🐍", note: "Lógica y programación básica" },
  { name: "PSeInt", level: 50, icon: "🧩", note: "Pseudocódigo y lógica" },
  { name: "Git / GitHub", level: 60, icon: "🐙", note: "Control de versiones" },
  { name: "Node.js", level: 30, icon: "🟢", note: "En aprendizaje" },
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
    <section id="skills" ref={sectionRef} className="py-24 section-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="container">
        <div className="text-center mb-16 reveal">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Mi Stack</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Habilidades <span className="gradient-text-gold">Técnicas</span>
          </h2>
          <div className="section-divider" />
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Tecnologías que utilizo actualmente y continúo fortaleciendo con práctica y proyectos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {mainSkills.map((skill, i) => (
            <div key={skill.name} className="reveal card-3d glass-card rounded-2xl p-6 border border-white/5 hover:border-blue-500/20 group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30` }}>{skill.icon}</div>
                <div>
                  <h3 className="text-white font-black text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>{skill.name}</h3>
                  <span className="text-white/30 text-xs">{skill.level}% dominio</span>
                </div>
              </div>
              <div className="mb-5 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: animated ? `${skill.level}%` : "0%", background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`, boxShadow: `0 0 10px ${skill.color}60`, transitionDelay: `${i * 200 + 300}ms` }} />
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-4">{skill.desc}</p>
              <div className="flex flex-wrap gap-1.5">{skill.strengths.map((s) => <span key={s} className="tech-tag">{s}</span>)}</div>
            </div>
          ))}
        </div>

        <div className="reveal">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4 text-center">También trabajo con</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {otherSkills.map((skill, i) => (
              <div key={skill.name} className="glass-card rounded-xl p-5 border border-white/5 hover:border-blue-500/20 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{skill.icon}</span>
                    <div>
                      <span className="text-white/80 font-semibold text-sm" style={{ fontFamily: "'Orbitron', sans-serif" }}>{skill.name}</span>
                      <p className="text-white/30 text-xs">{skill.note}</p>
                    </div>
                  </div>
                  <span className="text-white/30 text-xs">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: animated ? `${skill.level}%` : "0%", background: "linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)", boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)", transitionDelay: `${i * 150 + 600}ms` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
