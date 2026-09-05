import { useEffect, useRef } from "react";

const socialLinks = [
  {
    icon: "✉️",
    label: "Email",
    value: "juandavidperezanaya@gmail.com",
    href: "mailto:juandavidperezanaya@gmail.com",
    color: "#3b82f6",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/juandavidperezA",
    href: "https://github.com/juandavidperezA",
    color: "#ffffff",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/juan-perez-4b3851356",
    href: "https://www.linkedin.com/in/juan-perez-4b3851356/",
    color: "#0ea5e9",
  },
];

export default function ContactSection() {
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
    <section id="contact" ref={sectionRef} className="py-24 section-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="container">
        <div className="text-center mb-16 reveal">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Hablemos
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="gradient-text-gold">Contacto</span>
          </h2>
          <div className="section-divider" />
          <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Estoy abierto a oportunidades para seguir aprendiendo, colaborar en proyectos y crecer como desarrollador web.
          </p>
        </div>

        <div className="max-w-3xl mx-auto reveal">
          <h3 className="text-white font-bold text-lg mb-6 text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Encuéntrame en
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                className="glass-card rounded-xl p-5 border border-white/5 hover:border-blue-500/25 group transition-all duration-300 text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mx-auto mb-3"
                  style={{ background: `${link.color}15`, border: `1px solid ${link.color}30` }}
                >
                  {link.icon}
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {link.label}
                </p>
                <p className="text-white/80 text-xs font-medium group-hover:text-blue-300 transition-colors duration-200 break-all" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {link.value}
                </p>
              </a>
            ))}
          </div>

          <div className="glass-card-blue rounded-2xl p-6 border border-blue-500/20 mt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Disponible para oportunidades
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Actualmente estoy en formación y busco espacios donde pueda aportar, aprender y fortalecer mis habilidades en desarrollo web.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
