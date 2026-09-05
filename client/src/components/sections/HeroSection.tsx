import { useEffect, useState } from "react";

const particles = Array.from({ length: 20 }, (_, i) => ({ id: i, size: Math.random() * 4 + 2, left: Math.random() * 100, delay: Math.random() * 8, duration: Math.random() * 10 + 8 }));

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Desarrollador Web en Formación";

  useEffect(() => { const timer = setTimeout(() => setVisible(true), 100); return () => clearTimeout(timer); }, []);
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) { setTypedText(fullText.slice(0, i)); i++; } else clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [visible]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden hero-bg grid-bg">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => <div key={p.id} className="particle" style={{ width: p.size, height: p.size, left: `${p.left}%`, bottom: "-10px", animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }} />)}
      </div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="container relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-blue mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-medium tracking-widest uppercase">Disponible para proyectos</span>
            </div>
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-4 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-white/60 text-2xl sm:text-3xl font-medium block mb-1">Hola, soy</span>
              <span className="gradient-text-mixed text-glow-blue block">Juan David</span>
            </h1>
            <div className="h-8 mb-6"><p className="text-lg sm:text-xl text-blue-300 font-medium tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>{typedText}<span className="cursor-blink text-amber-400 ml-0.5">|</span></p></div>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">"Transformo ideas en experiencias web <span className="text-amber-400 font-medium">atractivas</span>, <span className="text-blue-400 font-medium">funcionales</span> e <span className="text-white/90 font-medium">interactivas</span>."</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => scrollTo("projects")} className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold">Ver proyectos</button>
              <button onClick={() => scrollTo("contact")} className="btn-blue-outline px-8 py-3.5 rounded-xl text-sm">Contactarme</button>
            </div>
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[{ value: "4", label: "Proyectos" }, { value: "7+", label: "Tecnologías" }, { value: "100%", label: "Compromiso" }].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left"><div className="text-2xl font-black gradient-text-gold" style={{ fontFamily: "'Orbitron', sans-serif" }}>{stat.value}</div><div className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</div></div>
              ))}
            </div>
          </div>

          <div className={`flex-shrink-0 relative w-full max-w-xl transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="absolute inset-0 bg-blue-500/15 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl overflow-hidden border border-blue-500/25 bg-[#0b1020]/95 shadow-2xl shadow-blue-500/10 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111827]">
                <div className="flex gap-2"><span className="w-3 h-3 rounded-full bg-red-400"/><span className="w-3 h-3 rounded-full bg-amber-400"/><span className="w-3 h-3 rounded-full bg-green-400"/></div>
                <span className="text-white/40 text-xs">portfolio.ts</span><span className="text-white/20">⌘</span>
              </div>
              <div className="p-6 sm:p-8 leading-7 text-left overflow-hidden">
                <p><span className="text-pink-400">const</span> <span className="text-blue-300">developer</span> <span className="text-white/60">=</span> <span className="text-amber-300">&#123;</span></p>
                <p className="pl-5"><span className="text-cyan-300">name</span>: <span className="text-green-300">"Juan David"</span>,</p>
                <p className="pl-5"><span className="text-cyan-300">role</span>: <span className="text-green-300">"Web Developer"</span>,</p>
                <p className="pl-5"><span className="text-cyan-300">skills</span>: <span className="text-purple-300">[</span></p>
                <p className="pl-10"><span className="text-green-300">"HTML"</span>, <span className="text-green-300">"CSS"</span>, <span className="text-green-300">"JavaScript"</span>,</p>
                <p className="pl-10"><span className="text-green-300">"MySQL"</span>, <span className="text-green-300">"n8n"</span>, <span className="text-green-300">"Git"</span></p>
                <p className="pl-5"><span className="text-purple-300">]</span>,</p>
                <p className="pl-5"><span className="text-cyan-300">learning</span>: <span className="text-green-300">"everyDay"</span>,</p>
                <p className="pl-5"><span className="text-cyan-300">available</span>: <span className="text-orange-300">true</span></p>
                <p><span className="text-amber-300">&#125;</span>;</p>
                <p className="mt-4 text-white/30">// Building ideas, one commit at a time.</p>
                <p><span className="text-pink-400">export default</span> <span className="text-blue-300">developer</span>;</p>
              </div>
              <div className="px-4 py-2 border-t border-white/10 bg-blue-600/20 flex justify-between text-[10px] text-blue-200/60"><span>main*</span><span>Prettier · UTF-8 · TypeScript</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
