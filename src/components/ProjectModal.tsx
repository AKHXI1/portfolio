import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Wrench
} from 'lucide-react';
import { DevProject } from '../types';
import { playSound } from '../utils/sound';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: DevProject | null;
  onClose: () => void;
}

type WizardTab = 'overview' | 'architecture' | 'screenshots';

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<WizardTab>('overview');
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (project) {
      setActiveTab('overview');
      setSlideIndex(0);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const tabs: { id: WizardTab; label: string; step: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview & Implementation', step: '01', icon: Layers },
    { id: 'architecture', label: 'Tech Stack & Architecture', step: '02', icon: Cpu },
    { id: 'screenshots', label: 'Preview / Screenshots', step: '03', icon: ImageIcon }
  ];

  const totalSlides = project.screenshots.length;
  const currentSlide = project.screenshots[slideIndex] || project.screenshots[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#080e1c] border border-cyan-500/25 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 bg-[#0b1325] border-b border-white/10">
          <button
            type="button"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="pr-10 space-y-1.5">
            {project.badge && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {project.badge}
              </span>
            )}
            <h3 className="text-xl sm:text-2xl font-mono font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">{project.summary}</p>
          </div>

          {/* 3-Step Wizard Tabs */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center justify-center sm:justify-start gap-2 px-3 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-cyan-400/60 text-white font-bold shadow-glow-cyan'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`text-[10px] ${active ? 'text-cyan-300' : 'text-slate-500'}`}>
                    {tab.step}
                  </span>
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-cyan-300' : 'text-slate-500'}`} />
                  <span className="hidden sm:inline truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    What It Does
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{project.overview.whatItDoes}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Problem Solved</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{project.overview.problemSolved}</p>
                </div>

                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>What I Specifically Built</span>
                  </div>
                  <div className="space-y-2">
                    {project.overview.whatIBuilt.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div
                key="tab-arch"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    Complete Technology Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.fullTechStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-cyan-500/10 border border-cyan-500/25 text-cyan-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Architecture &amp; Engineering Highlights
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.architecture.map((arch, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#050811] border border-white/10 text-xs font-mono text-slate-200 leading-relaxed"
                      >
                        <span className="text-emerald-400 font-bold mr-2">0{idx + 1}.</span>
                        {arch}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'screenshots' && currentSlide && (
              <motion.div
                key="tab-screens"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#050811]">
                  {currentSlide.image ? (
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  ) : (
                    <div
                      className={`h-64 sm:h-72 w-full bg-gradient-to-br ${
                        currentSlide.accent || 'from-cyan-500/20 via-slate-900 to-emerald-500/20'
                      } p-6 flex flex-col justify-between relative`}
                    >
                      <div className="absolute inset-0 cyber-grid opacity-55 pointer-events-none" />
                      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                        <span>PREVIEW FRAME {slideIndex + 1} / {totalSlides}</span>
                        <span className="px-2 py-0.5 rounded bg-black/50 border border-white/10">
                          {project.primaryTags[0]}
                        </span>
                      </div>
                      <div className="relative z-10 space-y-2 max-w-lg">
                        <div className="font-mono font-bold text-lg sm:text-xl text-white">
                          {currentSlide.title}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {currentSlide.caption}
                        </p>
                      </div>
                      <div className="relative z-10 text-[10px] font-mono text-slate-400">
                        Tip: Add screenshot path in src/data/devProjects.ts to display full-res captures here.
                      </div>
                    </div>
                  )}

                  {/* Carousel Navigation */}
                  {totalSlides > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          playSound('click');
                          setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 border border-white/15 text-white hover:border-cyan-400"
                        aria-label="Previous preview"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playSound('click');
                          setSlideIndex((prev) => (prev + 1) % totalSlides);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 border border-white/15 text-white hover:border-cyan-400"
                        aria-label="Next preview"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Caption & Dots */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-300">
                    <span className="font-mono font-bold text-white mr-2">{currentSlide.title}:</span>
                    {currentSlide.caption}
                  </div>
                  {totalSlides > 1 && (
                    <div className="flex items-center gap-1.5">
                      {project.screenshots.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSlideIndex(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === slideIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Smart Footer CTA */}
        <div className="px-6 sm:px-8 py-4 bg-[#0b1325] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound('click')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-glow-cyan hover:scale-[1.02] transition-transform"
                >
                  <span>View Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound('click')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-mono transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
              </>
            ) : (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-glow-cyan hover:scale-[1.02] transition-transform"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-mono"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
