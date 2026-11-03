import React, { useState } from 'react';
import { Sparkles, Layers, Cpu, Smartphone, Gamepad2, Code2, Eye } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';
import { playSound } from '../utils/sound';
import { GithubIcon } from './Icons';

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories: { label: string; value: ProjectCategory; icon: React.ElementType }[] = [
    { label: 'All Projects', value: 'all', icon: Layers },
    { label: 'AI & Extensions', value: 'ai-extension', icon: Cpu },
    { label: 'Mobile & Accessibility', value: 'mobile', icon: Smartphone },
    { label: '3D & Games', value: 'game', icon: Gamepad2 },
    { label: 'Full Stack & Systems', value: 'fullstack', icon: Code2 },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Works & Engineering Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient">Creations</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              From low-latency AI browser augmentations to inclusive mobile applications and immersive 3D simulations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#12141c]/80 border border-white/10 backdrop-blur-md">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    playSound('click');
                    setSelectedCategory(cat.value);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isSpotlight = idx === 0 && selectedCategory === 'all';
            return (
              <div
                key={project.id}
                onMouseEnter={() => playSound('hover')}
                className={`group relative rounded-3xl bg-[#0e111b] border border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1.5 ${
                  isSpotlight ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Top Subtle Ambient Glow Header */}
                <div className={`h-36 sm:h-44 w-full bg-gradient-to-br ${project.imageGradient} relative overflow-hidden flex items-center justify-center p-6 border-b border-white/5`}>
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 cyber-dots opacity-40" />

                  {/* Icon badge centerpiece */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-sky-400 transition-all duration-300">
                      {project.category === 'ai-extension' && <Cpu className="w-7 h-7 text-sky-400" />}
                      {project.category === 'mobile' && <Smartphone className="w-7 h-7 text-teal-400" />}
                      {project.category === 'game' && <Gamepad2 className="w-7 h-7 text-purple-400" />}
                      {project.category === 'fullstack' && <Code2 className="w-7 h-7 text-emerald-400" />}
                    </div>
                    <span className="mt-2 text-[11px] font-mono font-semibold tracking-wider uppercase text-slate-300 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {project.metrics && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-sky-300 border border-white/10">
                        {project.metrics}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-sky-400 font-medium font-mono">
                      {project.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-500">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        playSound('modal');
                        setActiveModalProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-sky-500/20 text-xs font-semibold text-slate-200 hover:text-sky-300 border border-white/10 hover:border-sky-500/30 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.demoType && (
                        <a
                          href="#simulator"
                          onClick={() => playSound('click')}
                          className="px-2.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-mono font-medium transition-all"
                          title="Try live interactive demo"
                        >
                          Live Sim
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => playSound('click')}
                          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
                          title="View on GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
