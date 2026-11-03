import React from 'react';
import { Sparkles, Code, Smartphone, Bot, Gamepad2 } from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export const JourneyTimeline: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return Bot;
      case 'game': return Gamepad2;
      case 'mobile': return Smartphone;
      default: return Code;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ai': return 'text-sky-400 bg-sky-500/15 border-sky-400/50 shadow-glow-cyan';
      case 'game': return 'text-purple-400 bg-purple-500/15 border-purple-400/50 shadow-glow-violet';
      case 'mobile': return 'text-emerald-400 bg-emerald-500/15 border-emerald-400/50 shadow-lg shadow-emerald-500/20';
      default: return 'text-amber-400 bg-amber-500/15 border-amber-400/50';
    }
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evolution & History</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight mb-4">
            The Engineering <span className="text-gradient">Timeline</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            From algorithmic foundations in C to generative AI integration, cross-platform mobile apps, and interactive 3D game engines.
          </p>
        </div>

        {/* Timeline Trail */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-32 space-y-12">
          {TIMELINE.map((item, idx) => {
            const Icon = getCategoryIcon(item.category);
            const colorClass = getCategoryColor(item.category);

            return (
              <div
                key={idx}
                onMouseEnter={() => playSound('hover')}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Glowing Node Dot */}
                <div className={`absolute -left-[19px] top-1.5 w-9 h-9 rounded-full border-2 border-[#05060a] flex items-center justify-center transition-all duration-300 group-hover:scale-125 ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Left Year Label (Visible on desktop) */}
                <div className="hidden sm:block absolute -left-32 top-1 text-right w-20">
                  <span className="font-display text-xl font-bold text-sky-400">
                    {item.year}
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="spotlight-card p-6 sm:p-7 bg-[#080b14] border border-white/10 group-hover:border-sky-500/40 transition-all duration-300 shadow-glass-card group-hover:-translate-y-1">
                  
                  {/* Mobile Year Badge */}
                  <div className="sm:hidden flex items-center gap-2 mb-2">
                    <span className="font-display text-sm font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                      {item.year}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono font-medium text-purple-300">
                      {item.role}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.03] border border-white/5 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
