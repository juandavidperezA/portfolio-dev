/*
 * HERO SECTION — Aura Dusk Portfolio
 * Fondo con gradiente radial azul, partículas flotantes, avatar animado
 * Animación de entrada escalonada: fade + slide-up
 */
import { useEffect, useRef, useState } from "react";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 8,
}));

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Desarrollador Web en Formación";

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [visible]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-bg grid-bg"
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: "-10px",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-blue mb-6 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span
                className="text-blue-300 text-xs font-medium tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Disponible para proyectos
              </span>
            </div>

            {/* Name */}
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-4 transition-all duration-700 delay-150 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <span className="text-white/60 text-2xl sm:text-3xl font-medium block mb-1">Hola, soy</span>
              <span className="gradient-text-mixed text-glow-blue block">
                Juan David
              </span>
            </h1>

            {/* Typed title */}
            <div
              className={`h-8 mb-6 transition-all duration-700 delay-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p
                className="text-lg sm:text-xl text-blue-300 font-medium tracking-wide"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {typedText}
                <span className="cursor-blink text-amber-400 ml-0.5">|</span>
              </p>
            </div>

            {/* Tagline */}
            <p
              className={`text-base sm:text-lg text-white/60 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 transition-all duration-700 delay-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              "Transformo ideas en experiencias web{" "}
              <span className="text-amber-400 font-medium">atractivas</span>,{" "}
              <span className="text-blue-400 font-medium">funcionales</span> e{" "}
              <span className="text-white/90 font-medium">interactivas</span>."
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <button
                onClick={() => scrollTo("projects")}
                className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Ver proyectos
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="btn-blue-outline px-8 py-3.5 rounded-xl text-sm"
              >
                Contactarme
              </button>
            </div>

            {/* Stats row */}
            <div
              className={`flex gap-8 mt-12 justify-center lg:justify-start transition-all duration-700 delay-1000 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {[
                { value: "4+", label: "Proyectos" },
                { value: "3+", label: "Tecnologías" },
                { value: "100%", label: "Compromiso" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div
                    className="text-2xl font-black gradient-text-gold"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs text-white/40 uppercase tracking-widest mt-0.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Avatar */}
          <div
            className={`flex-shrink-0 relative transition-all duration-1000 delay-300 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl scale-110 animate-pulse-glow" />

            {/* Hexagon frame */}
            <div
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 animate-float"
              style={{
                clipPath:
                  "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(29,78,216,0.2))",
                padding: "3px",
              }}
            >
              <div
                style={{
                  clipPath:
                    "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
                  background: "rgba(10, 14, 26, 0.8)",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/manus-storage/hero-avatar_91114773.png"
                  alt="Desarrollador Web"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass-card-blue px-3 py-2 rounded-xl border border-blue-500/30 animate-float" style={{ animationDelay: "1s" }}>
              <span className="text-xs font-bold text-blue-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>HTML</span>
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-xl border border-amber-500/30 animate-float" style={{ animationDelay: "2s" }}>
              <span className="text-xs font-bold text-amber-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>CSS</span>
            </div>
            <div className="absolute top-1/2 -right-8 glass-card px-3 py-2 rounded-xl border border-blue-400/20 animate-float" style={{ animationDelay: "0.5s" }}>
              <span className="text-xs font-bold text-white/70" style={{ fontFamily: "'Orbitron', sans-serif" }}>JS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-white/30 tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-blue-500/60 to-transparent" />
      </div>
    </section>
  );
}
