/*
 * FOOTER — Aura Dusk Portfolio
 * Footer elegante con nombre, redes sociales y mensaje final
 */

const socialLinks = [
  { icon: "🐙", label: "GitHub", href: "https://github.com" },
  { icon: "💼", label: "LinkedIn", href: "https://linkedin.com" },
  { icon: "✉️", label: "Email", href: "mailto:dev@ejemplo.com" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070b14] border-t border-blue-500/10 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="container py-12 relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/logo-icon_72e96d52.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span
              className="font-black text-lg tracking-widest text-white/80"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              DEV<span className="text-amber-400">.</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Inicio", id: "hero" },
              { label: "Sobre mí", id: "about" },
              { label: "Habilidades", id: "skills" },
              { label: "Proyectos", id: "projects" },
              { label: "Contacto", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-white/30 hover:text-white/70 text-xs transition-colors duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card border border-white/5 hover:border-blue-500/30 flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/10"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

          {/* Final message */}
          <div className="text-center">
            <p
              className="text-white/40 text-sm mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              "Gracias por visitar mi portafolio."
            </p>
            <p
              className="text-white/20 text-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Diseñado y desarrollado con{" "}
              <span className="text-blue-400/60">código</span> y{" "}
              <span className="text-amber-400/60">pasión</span> · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
