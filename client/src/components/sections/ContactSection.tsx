/*
 * CONTACT SECTION — Aura Dusk Portfolio
 * Formulario con animación de confirmación, links sociales, diseño premium
 */
import { useState, useRef, useEffect } from "react";

const socialLinks = [
  {
    icon: "✉️",
    label: "Email",
    value: "dev@ejemplo.com",
    href: "mailto:dev@ejemplo.com",
    color: "#3b82f6",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/dev",
    href: "https://github.com",
    color: "#ffffff",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/dev",
    href: "https://linkedin.com",
    color: "#0ea5e9",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 section-dark relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p
            className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Hablemos
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="gradient-text-gold">Contacto</span>
          </h2>
          <div className="section-divider" />
          <p
            className="text-white/40 text-sm mt-4 max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ¿Tienes un proyecto en mente? Me encantaría escucharte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Social links */}
          <div className="space-y-6 reveal">
            <div>
              <h3
                className="text-white font-bold text-lg mb-6"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Encuéntrame en
              </h3>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 glass-card rounded-xl p-4 border border-white/5 hover:border-blue-500/25 group transition-all duration-300"
                    style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateX(6px)";
                      el.style.boxShadow = `0 4px 20px rgba(59, 130, 246, 0.15)`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateX(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{
                        background: `${link.color}15`,
                        border: `1px solid ${link.color}30`,
                      }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <p
                        className="text-white/40 text-xs uppercase tracking-wider mb-0.5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {link.label}
                      </p>
                      <p
                        className="text-white/80 text-sm font-medium group-hover:text-blue-300 transition-colors duration-200"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {link.value}
                      </p>
                    </div>
                    <div className="ml-auto text-white/20 group-hover:text-blue-400 transition-colors duration-200">
                      →
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass-card-blue rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span
                  className="text-green-300 text-sm font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Disponible para proyectos
                </span>
              </div>
              <p
                className="text-white/50 text-xs leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Actualmente en búsqueda de oportunidades para colaborar en proyectos web. ¡No dudes en contactarme!
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            {submitted ? (
              // Success state
              <div className="glass-card rounded-2xl p-10 border border-green-500/20 text-center h-full flex flex-col items-center justify-center gap-6 animate-pulse-glow">
                <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-4xl">
                  ✅
                </div>
                <div>
                  <h3
                    className="text-white font-bold text-xl mb-2"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    ¡Mensaje enviado!
                  </h3>
                  <p
                    className="text-white/50 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Gracias por escribirme. Te responderé pronto.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="btn-blue-outline px-6 py-2.5 rounded-xl text-sm"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              // Form
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 border border-white/5 space-y-5"
              >
                <div>
                  <label
                    className="block text-white/50 text-xs uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre completo"
                    className="form-input-aura w-full px-4 py-3 rounded-xl text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-white/50 text-xs uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="form-input-aura w-full px-4 py-3 rounded-xl text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-white/50 text-xs uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    rows={5}
                    className="form-input-aura w-full px-4 py-3 rounded-xl text-sm resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0a0e1a]/40 border-t-[#0a0e1a] rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
