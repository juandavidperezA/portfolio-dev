/*
 * HOBBIES SECTION — Aura Dusk Portfolio
 * Hobbies con iconos animados, cards con hover glow
 */
import { useEffect, useRef } from "react";

const hobbies = [
  {
    icon: "🎮",
    title: "Videojuegos",
    desc: "Explorar mundos virtuales y aprender de la narrativa interactiva.",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.3)",
  },
  {
    icon: "🎵",
    title: "Música",
    desc: "La música es mi compañera de código. Ritmo y concentración.",
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.3)",
  },
  {
    icon: "📖",
    title: "Aprender",
    desc: "Siempre hay algo nuevo que descubrir. El conocimiento no tiene límites.",
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.3)",
  },
  {
    icon: "💻",
    title: "Tecnología",
    desc: "Explorar gadgets, tendencias tech y el futuro digital.",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.3)",
  },
];

export default function HobbiesSection() {
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
      id="hobbies"
      ref={sectionRef}
      className="py-24 section-surface relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p
            className="text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Fuera del código
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Mis <span className="gradient-text-blue">Hobbies</span>
          </h2>
          <div className="section-divider" />
          <p
            className="text-white/40 text-sm mt-4 max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Lo que me inspira y me mantiene creativo más allá del desarrollo web
          </p>
        </div>

        {/* Hobbies grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, i) => (
            <div
              key={hobby.title}
              className="reveal group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="glass-card rounded-2xl p-8 border border-white/5 text-center h-full transition-all duration-300 cursor-default"
                style={{ transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-8px)";
                  el.style.boxShadow = `0 20px 50px ${hobby.glow}, 0 8px 20px rgba(0,0,0,0.3)`;
                  el.style.borderColor = `${hobby.color}40`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  el.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                {/* Icon with animated glow */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${hobby.color}15`,
                    border: `1px solid ${hobby.color}30`,
                  }}
                >
                  {hobby.icon}
                </div>

                <h3
                  className="text-white font-bold text-base mb-2 transition-colors duration-200"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = hobby.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                >
                  {hobby.title}
                </h3>
                <p
                  className="text-white/40 text-xs leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {hobby.desc}
                </p>

                {/* Bottom accent */}
                <div
                  className="mt-5 h-0.5 w-0 group-hover:w-3/4 rounded-full mx-auto transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${hobby.color}, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
