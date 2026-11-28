import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, Eye } from 'lucide-react';
import { playSound } from '../utils/sound';
import { usePortfolioMode } from '../context/ModeContext';
import { BrioShowcase } from './BrioShowcase';
import { devProjects } from '../data/devProjects';
import { ProjectModal } from './ProjectModal';
import { DevProject } from '../types';

export const InteractiveSimulator: React.FC = () => {
  const { isDev, mode } = usePortfolioMode();
  const [brioModalOpen, setBrioModalOpen] = useState(false);

  // Designer Mode Dieline Inspector State
  const [showCutLines, setShowCutLines] = useState(true);
  const [showCreaseLines, setShowCreaseLines] = useState(true);
  const [showBleed, setShowBleed] = useState(true);

  const brioProject: DevProject = devProjects[0];

  return (
    <section id="simulator" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {isDev ? (
            <motion.div
              key="dev-featured-showcase"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <BrioShowcase onOpenBrioModal={() => setBrioModalOpen(true)} />
            </motion.div>
          ) : (
            <motion.div
              key={`sim-design-${mode}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {/* Packaging Dieline Showcase Header */}
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5c4d]/10 border border-[#ff5c4d]/30 text-[#e64435] text-xs font-mono mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Packaging Showcase</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-editorial font-extrabold text-zinc-900 tracking-tight mb-4">
                  Kovax <span className="text-gradient">Dieline</span> Inspector
                </h2>
                <p className="max-w-2xl mx-auto text-zinc-600 text-sm sm:text-base">
                  Toggle structural print layers on the Kovax packaging blueprint.
                </p>
              </div>

              <div className="spotlight-card p-6 sm:p-8 rounded-3xl">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-zinc-900/10">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-700 font-semibold">
                      <Layers className="w-4 h-4 text-[#ff5c4d]" />
                      <span>KOVAX_BOX_DIELINE_V3.AI — 1:1 STRUCTURAL PRE-PRESS</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#ff5c4d]/10 text-[#e64435] border border-[#ff5c4d]/25 font-bold">
                      300 DPI • CMYK + SPOT UV
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4 space-y-4">
                      <div className="p-4 rounded-2xl bg-[#faf6f0] border border-zinc-900/10 space-y-3">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                          Toggle Vector Print Plates
                        </div>

                        <button
                          onClick={() => {
                            playSound('click');
                            setShowCutLines(!showCutLines);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                            showCutLines
                              ? 'bg-[#ff5c4d]/10 border-[#ff5c4d]/50 text-[#e64435] font-bold'
                              : 'bg-white border-zinc-200 text-zinc-500'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-3 h-0.5 bg-[#ff5c4d]" />
                            Cut Die (Solid)
                          </span>
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            playSound('click');
                            setShowCreaseLines(!showCreaseLines);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                            showCreaseLines
                              ? 'bg-purple-500/10 border-purple-500/50 text-purple-700 font-bold'
                              : 'bg-white border-zinc-200 text-zinc-500'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-3 h-0.5 border-b-2 border-dashed border-purple-600" />
                            Crease / Fold (Dashed)
                          </span>
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            playSound('click');
                            setShowBleed(!showBleed);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                            showBleed
                              ? 'bg-amber-500/10 border-amber-500/50 text-amber-800 font-bold'
                              : 'bg-white border-zinc-200 text-zinc-500'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm border border-amber-500 bg-amber-400/20" />
                            3mm Print Bleed Margin
                          </span>
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-zinc-900/10 text-xs space-y-1.5">
                        <div className="font-mono text-[10px] uppercase text-zinc-400">Packaging Specs</div>
                        <div className="flex justify-between font-mono text-zinc-700">
                          <span>Dimensions:</span>
                          <span className="font-bold">140 × 90 × 45 mm</span>
                        </div>
                        <div className="flex justify-between font-mono text-zinc-700">
                          <span>Stock:</span>
                          <span className="font-bold">350gsm Matte SBS</span>
                        </div>
                        <div className="flex justify-between font-mono text-zinc-700">
                          <span>Finish:</span>
                          <span className="font-bold text-[#ff5c4d]">Spot UV Logo</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8 p-6 rounded-2xl bg-[#fbf7f2] border border-zinc-900/10 relative overflow-hidden">
                      <div className="absolute inset-0 artistic-grid opacity-80 pointer-events-none" />
                      <svg
                        viewBox="0 0 640 340"
                        className="w-full h-auto relative z-10 drop-shadow-sm"
                        aria-label="Kovax Structural Packaging Dieline Blueprint"
                      >
                        {showBleed && (
                          <rect
                            x="60"
                            y="30"
                            width="520"
                            height="280"
                            rx="6"
                            fill="rgba(245, 158, 11, 0.08)"
                            stroke="#f59e0b"
                            strokeWidth="1.2"
                            strokeDasharray="3 3"
                          />
                        )}

                        <g>
                          <path
                            d="M 190 95 L 195 50 Q 197 42 205 42 L 315 42 Q 323 42 325 50 L 330 95"
                            fill="rgba(255,92,77,0.06)"
                            stroke={showCutLines ? '#ff5c4d' : 'transparent'}
                            strokeWidth="2"
                          />
                          <path
                            d="M 85 95 L 100 58 L 180 58 L 190 95"
                            fill="rgba(139,92,246,0.05)"
                            stroke={showCutLines ? '#ff5c4d' : 'transparent'}
                            strokeWidth="2"
                          />
                          <path
                            d="M 330 95 L 340 58 L 420 58 L 435 95"
                            fill="rgba(139,92,246,0.05)"
                            stroke={showCutLines ? '#ff5c4d' : 'transparent'}
                            strokeWidth="2"
                          />
                          <rect
                            x="85"
                            y="95"
                            width="470"
                            height="150"
                            fill="rgba(255,255,255,0.75)"
                            stroke={showCutLines ? '#ff5c4d' : 'transparent'}
                            strokeWidth="2"
                          />
                          <path
                            d="M 555 95 L 580 110 L 580 230 L 555 245"
                            fill="rgba(255,92,77,0.08)"
                            stroke={showCutLines ? '#ff5c4d' : 'transparent'}
                            strokeWidth="2"
                          />
                          <path
                            d="M 190 245 L 198 295 L 322 295 L 330 245"
                            fill="rgba(255,92,77,0.06)"
                            stroke={showCutLines ? '#ff5c4d' : 'transparent'}
                            strokeWidth="2"
                          />
                        </g>

                        {showCreaseLines && (
                          <g stroke="#7c3aed" strokeWidth="1.8" strokeDasharray="6 4">
                            <line x1="190" y1="95" x2="190" y2="245" />
                            <line x1="330" y1="95" x2="330" y2="245" />
                            <line x1="435" y1="95" x2="435" y2="245" />
                            <line x1="555" y1="95" x2="555" y2="245" />
                            <line x1="85" y1="95" x2="555" y2="95" />
                            <line x1="85" y1="245" x2="555" y2="245" />
                          </g>
                        )}

                        <g transform="translate(205, 130)">
                          <rect x="0" y="0" width="110" height="80" rx="10" fill="#18181b" />
                          <text x="55" y="42" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="Syne, sans-serif">
                            KOVAX
                          </text>
                          <text x="55" y="60" textAnchor="middle" fill="#ff5c4d" fontSize="8" fontFamily="JetBrains Mono, monospace">
                            SERIES 01 • PRO
                          </text>
                        </g>

                        <text x="137" y="175" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">
                          SIDE A (45mm)
                        </text>
                        <text x="382" y="175" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">
                          SIDE B (45mm)
                        </text>
                        <text x="495" y="175" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="JetBrains Mono, monospace">
                          BACK (90mm)
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brio 3-Tab Wizard Modal */}
      <ProjectModal
        project={brioModalOpen ? brioProject : null}
        onClose={() => setBrioModalOpen(false)}
      />
    </section>
  );
};
