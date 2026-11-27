import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code, Smartphone, Bot, Gamepad2, Package, Palette, BookOpen, Box } from 'lucide-react';
import { DEV_TIMELINE, DESIGN_TIMELINE } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { usePortfolioMode } from '../context/ModeContext';

export const JourneyTimeline: React.FC = () => {
  const { isDev, mode } = usePortfolioMode();
  const items = isDev ? DEV_TIMELINE : DESIGN_TIMELINE;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai':
        return Bot;
      case 'game':
        return Gamepad2;
      case 'mobile':
        return Smartphone;
      case 'packaging':
        return Package;
      case 'print':
        return BookOpen;
      case '3d':
        return Box;
      case 'branding':
        return Palette;
      default:
        return Code;
    }
  };

  const getCategoryColor = (category: string) => {
    if (isDev) {
      switch (category) {
        case 'ai':
          return 'text-cyan-400 bg-cyan-500/15 border-cyan-400/50 shadow-glow-cyan';
        case 'game':
          return 'text-sky-400 bg-sky-500/15 border-sky-400/50 shadow-glow-cyan';
        case 'mobile':
          return 'text-emerald-400 bg-emerald-500/15 border-emerald-400/50 shadow-glow-emerald';
        default:
          return 'text-teal-300 bg-teal-500/15 border-teal-400/50';
      }
    }
    switch (category) {
      case 'packaging':
        return 'text-[#ff5c4d] bg-[#ff5c4d]/15 border-[#ff5c4d]/50 shadow-glow-coral';
      case '3d':
        return 'text-purple-600 bg-purple-500/15 border-purple-500/40';
      case 'print':
        return 'text-rose-600 bg-rose-500/15 border-rose-500/40';
      default:
        return 'text-amber-600 bg-amber-500/15 border-amber-500/40';
    }
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono mb-4 ${
              isDev
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                : 'bg-[#ff5c4d]/10 border-[#ff5c4d]/30 text-[#e64435]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isDev ? 'Engineering Milestones' : 'Creative Evolution'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 ${
              isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'
            }`}
          >
            {isDev ? (
              <>
                The Engineering <span className="text-gradient">Timeline</span>
              </>
            ) : (
              <>
                The Creative <span className="text-gradient">Journey</span>
              </>
            )}
          </h2>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
            {isDev
              ? 'From systems foundations in C & SQL to Odoo ERP customizations, Gemini AI extensions, and Unity 3D.'
              : 'From Photoshop poster art and wedding stationery to Kovax structural dielines and Blender 3D characters.'}
          </p>
        </div>

        {/* Timeline Trail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className={`relative border-l-2 ml-4 sm:ml-32 space-y-12 ${
              isDev ? 'border-cyan-500/20' : 'border-zinc-900/15'
            }`}
          >
            {items.map((item, idx) => {
              const Icon = getCategoryIcon(item.category);
              const colorClass = getCategoryColor(item.category);

              return (
                <motion.div
                  key={`${mode}-${item.title}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  onMouseEnter={() => playSound('hover')}
                  className="relative pl-6 sm:pl-10 group"
                >
                  {/* Node Dot */}
                  <div
                    className={`absolute -left-[19px] top-1.5 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125 ${
                      isDev ? 'border-[#05070e]' : 'border-[#fbf7f2]'
                    } ${colorClass}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Left Year Label */}
                  <div className="hidden sm:block absolute -left-32 top-1 text-right w-24">
                    <span
                      className={`text-lg font-bold ${
                        isDev ? 'font-mono text-cyan-400' : 'font-editorial text-[#ff5c4d]'
                      }`}
                    >
                      {item.year}
                    </span>
                    <div
                      className={`text-[10px] font-mono uppercase tracking-wider ${
                        isDev ? 'text-slate-500' : 'text-zinc-500'
                      }`}
                    >
                      {item.category}
                    </div>
                  </div>

                  {/* Timeline Card */}
                  <div className="spotlight-card p-6 sm:p-7 group-hover:-translate-y-1">
                    {/* Mobile Year Badge */}
                    <div className="sm:hidden flex items-center gap-2 mb-2">
                      <span
                        className={`text-sm font-bold px-2.5 py-0.5 rounded border ${
                          isDev
                            ? 'font-mono text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
                            : 'font-editorial text-[#e64435] bg-[#ff5c4d]/10 border-[#ff5c4d]/25'
                        }`}
                      >
                        {item.year}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                      <h3
                        className={`text-xl font-bold transition-colors ${
                          isDev
                            ? 'font-mono text-white group-hover:text-cyan-300'
                            : 'font-editorial text-zinc-900 group-hover:text-[#ff5c4d]'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className={`text-xs font-mono font-medium ${isDev ? 'text-emerald-300' : 'text-purple-600'}`}>
                        {item.role}
                      </span>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDev ? 'text-slate-300' : 'text-zinc-600'}`}>
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-mono border ${
                            isDev
                              ? 'bg-white/[0.03] border-white/5 text-slate-400'
                              : 'bg-[#faf6f0] border-zinc-900/10 text-zinc-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
