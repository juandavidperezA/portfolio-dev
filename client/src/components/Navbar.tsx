/*
 * NAVBAR — Aura Dusk Portfolio
 * Sticky nav con blur al hacer scroll, logo hexagonal, links con underline animado
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

      // Detect active section
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-9 h-9">
              <img
                src="/manus-storage/logo-icon_72e96d52.png"
                alt="Logo"
                className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <span
              className="font-orbitron font-bold text-sm tracking-widest text-white/90 group-hover:text-blue-400 transition-colors duration-200"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              DEV
              <span className="text-amber-400">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`nav-link text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-400 active"
                        : "text-white/60 hover:text-white/90"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:flex btn-gold px-4 py-2 rounded-lg text-sm"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Contactar
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span
              className={`block w-5 h-0.5 bg-white/80 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white/80 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white/80 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-blue-500/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-left text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-blue-400" : "text-white/60"
                }`}
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
