import React, { useState, useEffect } from 'react';
import { BackgroundMesh } from './components/BackgroundMesh';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { ProjectShowcase } from './components/ProjectShowcase';
import { SkillsArsenal } from './components/SkillsArsenal';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { CommandPalette } from './components/CommandPalette';
import { MatrixRain } from './components/MatrixRain';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      // Press `~` or backtick to toggle terminal
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      // Escape closes modals
      if (e.key === 'Escape') {
        setTerminalOpen(false);
        setCommandPaletteOpen(false);
        setMatrixActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05060a] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient dynamic cursor spotlight */}
      <CursorSpotlight />

      {/* Dynamic Canvas Particles & Ambient Gradients */}
      <BackgroundMesh />

      {/* Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onExploreProjects={handleExploreProjects}
        />

        {/* Identity & Academic Foundation */}
        <AboutSection />

        {/* Interactive Lab */}
        <InteractiveSimulator />

        {/* Project Showcase */}
        <ProjectShowcase />

        {/* Technical Skills & Stack */}
        <SkillsArsenal />

        {/* Journey & Milestones */}
        <JourneyTimeline />

        {/* Contact & Transmission */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Modals & Overlays */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onTriggerMatrix={() => setMatrixActive(true)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onTriggerMatrix={() => setMatrixActive(true)}
      />

      <MatrixRain
        isActive={matrixActive}
        onClose={() => setMatrixActive(false)}
      />
    </div>
  );
};

export default App;
