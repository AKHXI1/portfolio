import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioMode } from '../context/ModeContext';
import { playSound } from '../utils/sound';

interface ModeToggleProps {
  variant?: 'hero' | 'navbar';
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ variant = 'hero' }) => {
  const { mode, setMode, isDev } = usePortfolioMode();

  const handleSelect = (nextMode: 'dev' | 'design') => {
    if (mode === nextMode) return;
    playSound('modal');
    setMode(nextMode);
  };

  if (variant === 'navbar') {
    return (
      <div
        role="group"
        aria-label="Portfolio Mode Switcher"
        className={`relative inline-flex items-center p-1 rounded-full border transition-colors duration-500 ${
          isDev
            ? 'bg-[#0b1120]/90 border-cyan-500/25 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
            : 'bg-white/90 border-zinc-900/10 shadow-sm'
        }`}
      >
        {(['dev', 'design'] as const).map((item) => {
          const active = mode === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors duration-300 select-none ${
                active
                  ? 'text-white'
                  : isDev
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="mode-pill-navbar"
                  transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    item === 'dev'
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_18px_rgba(0,240,255,0.4)]'
                      : 'bg-gradient-to-r from-[#ff5c4d] to-purple-600 shadow-[0_6px_18px_rgba(255,92,77,0.35)]'
                  }`}
                />
              )}
              <span aria-hidden="true">{item === 'dev' ? '💻' : '🎨'}</span>
              <span className="hidden sm:inline font-mono">
                {item === 'dev' ? 'Dev' : 'Design'}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center gap-2.5">
      <div
        role="group"
        aria-label="Choose Portfolio Perspective"
        className={`relative inline-flex items-center p-1.5 rounded-full border backdrop-blur-2xl transition-all duration-500 ${
          isDev
            ? 'bg-[#070d1b]/90 border-cyan-400/30 shadow-[0_0_40px_-8px_rgba(0,240,255,0.3)]'
            : 'bg-white/95 border-zinc-900/12 shadow-[0_18px_45px_-12px_rgba(255,92,77,0.28)]'
        }`}
      >
        {(['dev', 'design'] as const).map((item) => {
          const active = mode === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className={`relative z-10 flex items-center gap-2.5 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-colors duration-300 select-none ${
                active
                  ? 'text-white'
                  : isDev
                  ? 'text-slate-400 hover:text-cyan-200'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="mode-pill-hero"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    item === 'dev'
                      ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 shadow-[0_0_28px_rgba(0,240,255,0.45)]'
                      : 'bg-gradient-to-r from-[#ff5c4d] via-rose-500 to-purple-600 shadow-[0_10px_28px_rgba(255,92,77,0.4)]'
                  }`}
                />
              )}
              <span className="text-base leading-none" aria-hidden="true">
                {item === 'dev' ? '💻' : '🎨'}
              </span>
              <span className={item === 'dev' ? 'font-mono' : 'font-editorial'}>
                {item === 'dev' ? 'Developer' : 'Designer'}
              </span>
            </button>
          );
        })}
      </div>

      <span
        className={`text-[11px] font-mono tracking-wide transition-colors duration-500 ${
          isDev ? 'text-cyan-300/75' : 'text-zinc-500'
        }`}
      >
        {isDev
          ? 'Dark Terminal Theme • Code, Odoo ERP, AI & Systems'
          : 'Warm Editorial Theme • Branding, Dielines, Print & 3D'}
      </span>
    </div>
  );
};
