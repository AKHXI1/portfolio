import React from 'react';
import { ArrowUp } from 'lucide-react';
import { playSound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolioMode } from '../context/ModeContext';

export const Footer: React.FC = () => {
  const { isDev } = usePortfolioMode();

  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative border-t py-14 px-4 sm:px-6 lg:px-8 z-10 transition-colors duration-500 ${
        isDev
          ? 'border-white/10 bg-[#05070e]'
          : 'border-zinc-900/10 bg-[#f5efe6]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-white text-sm shadow-md ${
                isDev
                  ? 'bg-gradient-to-tr from-cyan-500 to-emerald-500 text-slate-950'
                  : 'bg-gradient-to-tr from-[#ff5c4d] to-purple-600'
              }`}
            >
              A
            </div>
            <span className={`font-bold text-base ${isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'}`}>
              Akhil Sabu
            </span>
            <span
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                isDev
                  ? 'text-slate-400 bg-white/5 border-white/10'
                  : 'text-zinc-600 bg-white border-zinc-900/10'
              }`}
            >
              {PERSONAL_INFO.handle}
            </span>
          </div>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-6 text-xs font-medium ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
          <a href="#about" onClick={() => playSound('hover')} className="hover:text-[#ff5c4d] transition-colors">
            About
          </a>
          <a href="#projects" onClick={() => playSound('hover')} className="hover:text-[#ff5c4d] transition-colors">
            Projects
          </a>
          <a href="#simulator" onClick={() => playSound('hover')} className="hover:text-[#ff5c4d] transition-colors">
            {isDev ? 'Live Lab' : 'Studio Lab'}
          </a>
          <a href="#skills" onClick={() => playSound('hover')} className="hover:text-[#ff5c4d] transition-colors">
            Skills
          </a>
          <a href="#journey" onClick={() => playSound('hover')} className="hover:text-[#ff5c4d] transition-colors">
            Timeline
          </a>
          <a href="#contact" onClick={() => playSound('hover')} className="hover:text-[#ff5c4d] transition-colors">
            Contact
          </a>
          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => playSound('click')}
            className={`transition-colors ${isDev ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-900'}`}
          >
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className={`text-xs font-mono text-center md:text-right ${isDev ? 'text-slate-500' : 'text-zinc-500'}`}>
            <div>© {new Date().getFullYear()} Akhil Sabu. All rights reserved.</div>
          </div>

          <button
            onClick={scrollToTop}
            className={`p-3 rounded-2xl border transition-all hover:-translate-y-1 shadow-lg ${
              isDev
                ? 'bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border-white/10 hover:border-cyan-500/30'
                : 'bg-white hover:bg-[#ff5c4d] text-zinc-700 hover:text-white border-zinc-900/10'
            }`}
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
