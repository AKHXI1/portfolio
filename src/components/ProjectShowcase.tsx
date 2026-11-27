import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowUpRight } from 'lucide-react';
import { devProjects } from '../data/devProjects';
import { DevProject } from '../types';
import { ProjectModal } from './ProjectModal';
import { playSound } from '../utils/sound';
import { usePortfolioMode } from '../context/ModeContext';
import { GitHubRepoDrawer } from './GitHubRepoDrawer';
import { DesignGallery } from './DesignGallery';

export const ProjectShowcase: React.FC = () => {
  const { isDev } = usePortfolioMode();
  const [activeDevProject, setActiveDevProject] = useState<DevProject | null>(null);

  if (!isDev) {
    return <DesignGallery />;
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Minimalist Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
              <Code2 className="w-3.5 h-3.5" />
              <span>GitHub Projects • @AKHXI1</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient">Builds</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Click any project to inspect implementation details, full stack architecture, and previews inside the wizard modal.
            </p>
          </div>
        </div>

        {/* Ultra-Minimalist GitHub Projects Grid (Title + 1-line Summary + 2-3 Primary Tags) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {devProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => playSound('hover')}
              onClick={() => {
                playSound('modal');
                setActiveDevProject(project);
              }}
              className="spotlight-card p-6 cursor-pointer group flex flex-col justify-between gap-6"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono font-bold text-lg text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <span className="p-1.5 rounded-full border border-white/10 text-slate-400 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Strictly 1-line summary */}
                <p className="text-xs sm:text-sm text-slate-400 line-clamp-1">
                  {project.summary}
                </p>
              </div>

              {/* 2–3 Primary Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.primaryTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.03] border border-cyan-500/20 text-cyan-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Optional Expandable Live GitHub Repos Fetcher */}
        <GitHubRepoDrawer />
      </div>

      {/* 3-Tab Wizard Modal */}
      <ProjectModal
        project={activeDevProject}
        onClose={() => setActiveDevProject(null)}
      />
    </section>
  );
};
