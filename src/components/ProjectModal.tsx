import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { playSound } from '../utils/sound';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d101a] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Header Banner */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wide">
              {project.category}
            </span>
            {project.metrics && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {project.metrics}
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-sky-300 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Deep Dive Description */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            Project Overview & Impact
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Key Engineering Highlights */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Key Technical Innovations
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-emerald-400 font-bold shrink-0">▸</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Pillars */}
        {project.architecture && project.architecture.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              Architecture & Stack Design
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.architecture.map((arch, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 font-mono">
                  {arch}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Technologies Applied
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-xs font-semibold text-cyan-300 border border-cyan-500/40 transition-all"
              >
                <span>Open Live Project</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-semibold transition-all"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
};
