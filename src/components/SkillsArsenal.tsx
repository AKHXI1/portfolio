import React, { useState } from 'react';
import { Terminal, Layers, Cpu, Palette, Sparkles, CheckCircle2, Flame } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { playSound } from '../utils/sound';

export const SkillsArsenal: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return Terminal;
      case 'Layers': return Layers;
      case 'Cpu': return Cpu;
      case 'Palette': return Palette;
      default: return Terminal;
    }
  };

  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical <span className="text-gradient">Arsenal</span> & Stack
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            A comprehensive, multi-paradigm skill matrix tested across real production-ready extensions, apps, engines, and server architectures.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = getIcon(cat.icon);
            const isActive = idx === activeCategoryIndex;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  playSound('click');
                  setActiveCategoryIndex(idx);
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/20 to-purple-500/20 border-sky-400/50 text-white shadow-lg shadow-sky-500/10 scale-105'
                    : 'bg-[#12141c]/60 border-white/5 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCategory.skills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => playSound('hover')}
              className="p-5 rounded-2xl bg-[#0d101a] border border-white/10 hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    {skill.category}
                  </span>
                </div>
                {skill.tag && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Flame className="w-3 h-3 text-amber-400" />
                    {skill.tag}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[36px]">
                {skill.description}
              </p>

              {/* Progress Bar & Rating */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-sky-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-[1px]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Interactive Capability Matrix Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950/20 via-purple-950/20 to-emerald-950/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Engineered for Modern End-to-End Production
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              From ideation and UI design in Figma, through high-performance code across mobile, web, and desktop, to AI model integration and 3D worlds.
            </p>
          </div>

          <a
            href="#contact"
            onClick={() => playSound('click')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs sm:text-sm font-semibold text-white transition-all shadow-md shrink-0 hover:scale-105"
          >
            Discuss a Project with Akhil
          </a>
        </div>

      </div>
    </section>
  );
};
