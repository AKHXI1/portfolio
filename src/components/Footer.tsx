import React from 'react';
import { ArrowUp, Heart, Code2, Sparkles, Terminal } from 'lucide-react';
import { playSound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#06080d] py-14 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Tagline */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-purple-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-md shadow-sky-500/20">
              A
            </div>
            <span className="font-bold text-base text-white">Akhil</span>
            <span className="font-mono text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
              {PERSONAL_INFO.handle}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-normal max-w-sm">
            Bridging engineering rigor with intuitive user experiences across AI systems, mobile applications, and interactive 3D.
          </p>
        </div>

        {/* Quick Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <a
            href="#projects"
            onClick={() => playSound('hover')}
            className="hover:text-sky-300 transition-colors"
          >
            Projects
          </a>
          <a
            href="#simulator"
            onClick={() => playSound('hover')}
            className="hover:text-sky-300 transition-colors"
          >
            Live Lab
          </a>
          <a
            href="#skills"
            onClick={() => playSound('hover')}
            className="hover:text-sky-300 transition-colors"
          >
            Skills
          </a>
          <a
            href="#journey"
            onClick={() => playSound('hover')}
            className="hover:text-sky-300 transition-colors"
          >
            Journey
          </a>
          <a
            href="#contact"
            onClick={() => playSound('hover')}
            className="hover:text-sky-300 transition-colors"
          >
            Contact
          </a>
          <button
            onClick={() => {
              playSound('terminal');
              onOpenTerminal();
            }}
            className="hover:text-sky-400 font-mono transition-colors flex items-center gap-1 text-slate-300"
          >
            <Terminal className="w-3.5 h-3.5" />
            CLI
          </button>
        </div>

        {/* Back to top & copyright */}
        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-500 font-mono text-center md:text-right">
            <div>© {new Date().getFullYear()} Akhil. All rights reserved.</div>
            <div className="text-[11px] text-slate-600">Built with React & Tailwind</div>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-white/5 hover:bg-sky-500/20 text-slate-400 hover:text-sky-300 border border-white/10 hover:border-sky-500/30 transition-all hover:-translate-y-1 shadow-lg"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
