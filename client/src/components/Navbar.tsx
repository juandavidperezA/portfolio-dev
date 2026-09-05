/*
 * NAVBAR — Aura Dusk Portfolio
 * Sticky nav con blur al hacer scroll, logo tipográfico y navegación responsive
 */
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Filosofía", href: "#philosophy" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-blue-500/10 shadow-lg shadow-blue-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16" aria-label="Navegación principal">
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2.5 group"
            aria-label="Ir al inicio"
          >
            <div className="w-9 h-9 rounded-xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-300 font-black text-xs tracking-tight group-hover:border-amber-400/50 group-hover:text-amber-300 transition-colors duration-200">
              JD
            </div>
            <span
              className="font-orbitron font-bold text-sm tracking-widest text-white/90 group-hover:text-blue-400 transition-colors duration-200"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              DEV<span className="text-amber-400">.</span>
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`nav-link text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-blue-400 active" : "text-white/60 hover:text-white/90"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:flex btn-gold px-4 py-2 rounded-lg text-sm"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Contactar
          </button>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-white/80 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white/80 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white/80 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-blue-500/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-left text-sm font-medium transition-colors duration-200 ${isActive ? "text-blue-400" : "text-white/60"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-gold px-4 py-2 rounded-lg text-sm w-fit"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Contactar
          </button>
        </div>
      </div>
    </header>
  );
}
