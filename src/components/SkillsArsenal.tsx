import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Layers,
  Cpu,
  Palette,
  Box,
  Sparkles,
  CheckCircle2,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { DEV_SKILL_CATEGORIES, DESIGN_SKILL_CATEGORIES } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { usePortfolioMode } from '../context/ModeContext';

export const SkillsArsenal: React.FC = () => {
  const { isDev, mode } = usePortfolioMode();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useEffect(() => {
    setActiveCategoryIndex(0);
  }, [mode]);

  const categories = isDev ? DEV_SKILL_CATEGORIES : DESIGN_SKILL_CATEGORIES;
  const activeCategory = categories[activeCategoryIndex] || categories[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return Terminal;
      case 'Layers':
        return Layers;
      case 'Cpu':
        return Cpu;
      case 'Palette':
        return Palette;
      case 'Box':
        return Box;
      default:
        return Terminal;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono mb-4 ${
              isDev
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-purple-500/10 border-purple-500/30 text-purple-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isDev ? 'Developer Stack & Tools' : 'Creative Suite & Craft'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 ${
              isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'
            }`}
          >
            {isDev ? (
              <>
                Technical <span className="text-gradient">Arsenal</span>
              </>
            ) : (
              <>
                Creative <span className="text-gradient">Toolkit</span>
              </>
            )}
          </h2>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
            {isDev
              ? 'Python, Odoo ERP, Django/FastAPI, JavaScript, SQL, Unity 3D, and Git workflows engineered for reliability.'
              : 'Photoshop, Illustrator, InDesign, After Effects, Blender 3D, and Figma wielded for brand, print, and motion.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {categories.map((cat, idx) => {
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
                    ? isDev
                      ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-cyan-400/60 text-white shadow-glow-cyan scale-[1.03]'
                      : 'bg-gradient-to-r from-[#ff5c4d] to-purple-600 border-transparent text-white shadow-glow-coral scale-[1.03]'
                    : isDev
                    ? 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                    : 'bg-white border-zinc-900/10 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? isDev
                        ? 'text-cyan-400'
                        : 'text-white'
                      : isDev
                      ? 'text-slate-500'
                      : 'text-zinc-500'
                  }`}
                />
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? isDev
                        ? 'bg-white/10 text-cyan-200'
                        : 'bg-white/20 text-white'
                      : isDev
                      ? 'bg-white/10 text-slate-300'
                      : 'bg-zinc-100 text-zinc-600'
                  }`}
                >
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${activeCategory.name}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {activeCategory.skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => playSound('hover')}
                className="spotlight-card p-6 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4
                      className={`text-lg font-bold transition-colors ${
                        isDev
                          ? 'font-mono text-white group-hover:text-cyan-300'
                          : 'font-editorial text-zinc-900 group-hover:text-[#ff5c4d]'
                      }`}
                    >
                      {skill.name}
                    </h4>
                    <span className={`text-xs font-mono ${isDev ? 'text-slate-400' : 'text-zinc-500'}`}>
                      {skill.category}
                    </span>
                  </div>
                  {skill.tag && (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        isDev
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                          : 'bg-[#ff5c4d]/10 text-[#e64435] border-[#ff5c4d]/30'
                      }`}
                    >
                      <Flame className={`w-3 h-3 ${isDev ? 'text-emerald-400' : 'text-amber-500'}`} />
                      {skill.tag}
                    </span>
                  )}
                </div>

                <p className={`text-xs leading-relaxed mb-5 min-h-[38px] ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
                  {skill.description}
                </p>

                {/* Proficiency Bar */}
                <div className="space-y-1.5">
                  <div className={`flex justify-between text-xs font-mono ${isDev ? 'text-slate-400' : 'text-zinc-500'}`}>
                    <span>Proficiency</span>
                    <span className={`font-bold ${isDev ? 'text-cyan-400' : 'text-[#e64435]'}`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden p-[1px] relative ${
                      isDev ? 'bg-white/5' : 'bg-zinc-200/80'
                    }`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        isDev
                          ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400'
                          : 'bg-gradient-to-r from-[#ff5c4d] via-rose-500 to-purple-600'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Banner */}
        <div
          className={`mt-14 p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-2xl ${
            isDev
              ? 'bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-emerald-950/25 border-cyan-500/15 shadow-glass-card'
              : 'bg-gradient-to-r from-[#fff3ec] via-white to-purple-50 border-zinc-900/10 shadow-editorial-card'
          }`}
        >
          <div className="space-y-1.5 text-center md:text-left">
            <h4
              className={`text-xl font-bold flex items-center justify-center md:justify-start gap-2.5 ${
                isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'
              }`}
            >
              <CheckCircle2 className={`w-6 h-6 ${isDev ? 'text-emerald-400' : 'text-[#ff5c4d]'}`} />
              {isDev ? 'Full Lifecycle Engineering Craft' : 'Print-to-Pixel Creative Direction'}
            </h4>
            <p className={`text-xs sm:text-sm max-w-xl ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
              {isDev
                ? 'From Odoo ERP models and FastAPI backends to Chrome MV3 extensions, Flutter accessibility apps, and Unity 3D gameplay.'
                : 'From CMYK packaging dielines and luxury wedding stationery to expressive posters, 3D characters, and Figma UI systems.'}
            </p>
          </div>

          <a
            href="#contact"
            onClick={() => playSound('click')}
            className={`px-6 py-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all shrink-0 hover:scale-105 inline-flex items-center gap-2 ${
              isDev
                ? 'bg-white/[0.06] hover:bg-white/15 border-white/20 text-white'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-900 text-white shadow-md'
            }`}
          >
            <span>Start a Project</span>
            <ArrowUpRight className={`w-4 h-4 ${isDev ? 'text-cyan-400' : 'text-[#ff5c4d]'}`} />
          </a>
        </div>
      </div>
    </section>
  );
};
