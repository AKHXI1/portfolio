import React, { useState } from 'react';
import { Terminal, Layers, Cpu, Palette, Sparkles, CheckCircle2, Flame, Code2, ArrowUpRight } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capability Index</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight mb-4">
            Technical <span className="text-gradient">Arsenal</span> & Mastery
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Multi-disciplinary software engineering competence proven across production browser extensions, mobile apps, 3D simulations, and relational backends.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
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
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 border-sky-400/60 text-white shadow-glow-cyan scale-[1.03]'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
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
              className="spotlight-card p-6 bg-[#080b14] border border-white/10 hover:border-sky-500/40 transition-all duration-300 group shadow-glass-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold font-display text-white group-hover:text-sky-300 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-xs font-mono text-slate-400">
                    {skill.category}
                  </span>
                </div>
                {skill.tag && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    <Flame className="w-3 h-3 text-amber-400" />
                    {skill.tag}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed mb-5 min-h-[38px]">
                {skill.description}
              </p>

              {/* Glowing Proficiency Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span className="text-slate-500">Proficiency</span>
                  <span className="text-sky-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-[1px] relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-sky-950/30 via-purple-950/20 to-emerald-950/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-2xl shadow-glass-card">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-xl font-bold font-display text-white flex items-center justify-center md:justify-start gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              Full Lifecycle Engineering Craft
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              From mathematical data structures and memory optimization to user ergonomics, cloud databases, and cutting-edge generative AI integrations.
            </p>
          </div>

          <a
            href="#contact"
            onClick={() => playSound('click')}
            className="px-6 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/15 border border-white/20 text-xs sm:text-sm font-semibold text-white transition-all shadow-md shrink-0 hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 text-sky-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
