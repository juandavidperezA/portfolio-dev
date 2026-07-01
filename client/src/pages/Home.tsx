/*
 * HOME PAGE — Aura Dusk Portfolio
 * Ensambla todas las secciones del portafolio
 * Tema: Neofuturista Premium — Lucario Blue + Cinderace White + Gold Accents
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import HobbiesSection from "@/components/sections/HobbiesSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <PhilosophySection />
        <HobbiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
