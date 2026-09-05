const socialLinks = [
  { icon: "🐙", label: "GitHub", href: "https://github.com/juandavidperezA" },
  { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/juan-perez-4b3851356/" },
  { icon: "✉️", label: "Email", href: "mailto:juandavidperezanaya@gmail.com" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070b14] border-t border-blue-500/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="container py-12 relative z-10">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center text-blue-300 font-black text-xs">
              JD
            </div>
            <span className="font-black text-lg tracking-widest text-white/80" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              DEV<span className="text-amber-400">.</span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Navegación del pie de página">
            {[
              { label: "Inicio", id: "hero" },
              { label: "Sobre mí", id: "about" },
              { label: "Habilidades", id: "skills" },
              { label: "Proyectos", id: "projects" },
              { label: "Contacto", id: "contact" },
            ].map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-white/30 hover:text-white/70 text-xs transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif" }}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                className="w-10 h-10 rounded-xl glass-card border border-white/5 hover:border-blue-500/30 flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/10"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="text-center">
            <p className="text-white/40 text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              Gracias por visitar mi portafolio.
            </p>
            <p className="text-white/20 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              Juan David Pérez · Desarrollador web en formación · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
