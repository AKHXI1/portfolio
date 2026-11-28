import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ModeProvider, usePortfolioMode } from './context/ModeContext';
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
import { ErrorBoundary } from './components/ErrorBoundary';

const PortfolioContent: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const { isDev } = usePortfolioMode();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
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
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-700 ${
        isDev
          ? 'bg-[#05070e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
          : 'bg-[#fbf7f2] text-zinc-900 selection:bg-[#ff5c4d]/25 selection:text-zinc-950'
      }`}
    >
      <CursorSpotlight />
      <BackgroundMesh />

      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <main className="relative z-10">
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onExploreProjects={handleExploreProjects}
        />
        <AboutSection />
        <InteractiveSimulator />
        <ProjectShowcase />
        <SkillsArsenal />
        <JourneyTimeline />
        <ContactSection />
      </main>

      <Footer />

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

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <ModeProvider>
          <PortfolioContent />
        </ModeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
};

export default App;
