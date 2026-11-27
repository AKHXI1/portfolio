import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Sparkles, Bot, Cpu, Gamepad2, Smartphone, Code2, Layers, Music, HandMetal, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onExploreProjects }) => {
  const roles = [
    'AI Systems & Web Extension Architect',
    'Cross-Platform Mobile Engineer (Flutter)',
    'Interactive 3D & Unity Game Developer',
    'Full-Stack Software Engineer',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(85);
  const [activePreview, setActivePreview] = useState<'verselens' | 'signsync' | 'unity'>('verselens');

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1900);
          setTypingSpeed(45);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(85);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  const triggerCelebration = () => {
    playSound('success');
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#a855f7', '#34d399', '#f59e0b', '#00f0ff']
    });
  };

  const techStack = [
    { name: 'Google Gemini AI', icon: Bot, color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
    { name: 'Chrome Extensions MV3', icon: Cpu, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { name: 'Flutter & Dart', icon: Smartphone, color: 'text-teal-400 border-teal-500/30 bg-teal-500/10' },
    { name: 'Unity 3D & C#', icon: Gamepad2, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { name: 'Python & Django', icon: Code2, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { name: 'React & TS', icon: Layers, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
  ];

  return (
    <section className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Radial Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-500/15 via-purple-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 hover:border-sky-400/50 transition-all duration-300 shadow-glass-card cursor-pointer group"
          onClick={triggerCelebration}
          title="Click to celebrate!"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">
            {PERSONAL_INFO.status}
          </span>
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" />
            Active
          </span>
        </div>

        {/* Hero Headline with Syne Luxury Display Font */}
        <div className="space-y-3 mb-8">
          <div className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-sky-400 font-semibold">
            Hello, World • I am Akhil Sabu (AKHXI1)
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
            Engineering <span className="text-gradient">Intelligent</span> Realities
          </h1>
          <div className="text-xl sm:text-3xl md:text-4xl font-semibold text-slate-300 flex items-center justify-center gap-3 flex-wrap">
            <span>Specialized in</span>
            <div className="inline-flex items-center px-4 py-1.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-inner">
              <span className="font-mono text-sky-300 font-bold min-w-[280px] sm:min-w-[420px] text-left">
                {displayText}
                <span className="animate-pulse text-sky-400">_</span>
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle / Bio summary */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-400 mb-10 leading-relaxed font-normal">
          Bridging deep technical architecture with futuristic aesthetic polish. Creating AI-driven browser extensions that decode music in real-time, cross-platform mobile accessibility tools, and atmospheric 3D simulations.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              playSound('click');
              onExploreProjects();
            }}
            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-glow-cyan hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span>Explore Engineering Showcase</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#simulator"
            onClick={() => playSound('click')}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-purple-500/15 border border-white/10 hover:border-purple-400/50 text-slate-200 hover:text-purple-300 font-semibold text-sm transition-all duration-200 hover:scale-[1.02] shadow-glass-card"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Launch Live AI Playground</span>
          </a>

          <button
            onClick={() => {
              playSound('terminal');
              onOpenTerminal();
            }}
            className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-[#090c15] border border-white/10 hover:border-sky-400/50 font-mono text-xs text-slate-300 hover:text-white transition-all shadow-inner"
          >
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>$ open_terminal</span>
          </button>
        </div>

        {/* Interactive Floating Project Preview Dock */}
        <div className="max-w-4xl mx-auto mb-16 p-2 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-glass-card">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 py-2 border-b border-white/5 flex items-center justify-between px-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              Interactive Work Showcase
            </span>
            <span className="text-slate-500">Click a card to inspect live telemetry</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-2">
            {/* Capsule 1: VerseLens */}
            <div
              onClick={() => {
                playSound('click');
                setActivePreview('verselens');
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activePreview === 'verselens'
                  ? 'bg-sky-500/15 border-sky-400/60 shadow-glow-cyan'
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                  <Music className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Gemini AI
                </span>
              </div>
              <div className="font-bold text-sm text-white">VerseLens</div>
              <div className="text-xs text-slate-400">Spotify Live Lyrics & AI Translation</div>
            </div>

            {/* Capsule 2: SignSync */}
            <div
              onClick={() => {
                playSound('click');
                setActivePreview('signsync');
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activePreview === 'signsync'
                  ? 'bg-emerald-500/15 border-emerald-400/60 shadow-lg shadow-emerald-500/20'
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <HandMetal className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Flutter / Dart
                </span>
              </div>
              <div className="font-bold text-sm text-white">SignSync</div>
              <div className="text-xs text-slate-400">Bidirectional Sign Accessibility</div>
            </div>

            {/* Capsule 3: Midnight Kallan */}
            <div
              onClick={() => {
                playSound('click');
                setActivePreview('unity');
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activePreview === 'unity'
                  ? 'bg-purple-500/15 border-purple-400/60 shadow-glow-violet'
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Unity + Blender
                </span>
              </div>
              <div className="font-bold text-sm text-white">Midnight Kallan</div>
              <div className="text-xs text-slate-400">3D Stealth Action Adventure</div>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills Carousel */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-16">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                onMouseEnter={() => playSound('hover')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-md text-xs font-mono font-medium transition-all duration-300 hover:scale-105 cursor-default ${tech.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {PERSONAL_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-5 rounded-2xl text-left border border-white/10 hover:border-sky-500/40 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/5 rounded-bl-full pointer-events-none" />
              <div className="font-mono text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium leading-tight group-hover:text-slate-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
