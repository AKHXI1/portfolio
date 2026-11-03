import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Sparkles, Bot, Cpu, Gamepad2, Smartphone, Code2, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onExploreProjects }) => {
  const roles = [
    'AI Systems & Extension Architect',
    'Mobile & Flutter Developer',
    'Full-Stack Software Engineer',
    '3D Game & Unity Creator',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
          setTypingSpeed(50);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(90);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  const triggerCelebration = () => {
    playSound('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#a855f7', '#34d399', '#f59e0b']
    });
  };

  const techBadges = [
    { name: 'Google Gemini AI', icon: Bot, color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
    { name: 'Chrome Extensions MV3', icon: Cpu, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { name: 'Flutter & Dart', icon: Smartphone, color: 'text-teal-400 border-teal-500/30 bg-teal-500/10' },
    { name: 'Unity 3D & C#', icon: Gamepad2, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { name: 'Python & Django', icon: Code2, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { name: 'React & TS', icon: Layers, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-sky-400/50 transition-all duration-300 shadow-sm cursor-pointer"
          onClick={triggerCelebration}
          title="Click for celebratory fireworks!"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-slate-300">
            {PERSONAL_INFO.status}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Hire Me
          </span>
        </div>

        {/* Main Title / Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          Hi, I'm <span className="text-gradient">Akhil</span>.
          <br />
          <span className="text-2xl sm:text-4xl md:text-5xl font-semibold text-slate-300 block mt-2">
            I build{' '}
            <span className="font-mono text-sky-400 border-b-2 border-sky-400/50 pb-0.5 inline-block min-w-[260px] sm:min-w-[420px] text-left">
              {displayText}
              <span className="animate-pulse text-white">|</span>
            </span>
          </span>
        </h1>

        {/* Tagline Paragraph */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-10 leading-relaxed font-normal">
          Crafting cutting-edge digital experiences where engineering meets imagination.
          Specialized in AI-driven extensions, cross-platform mobile apps, and interactive 3D worlds.
        </p>

        {/* Interactive Floating Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto mb-10">
          {techBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.name}
                onMouseEnter={() => playSound('hover')}
                style={{ animationDelay: `${idx * 0.2}s` }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-xs font-medium cursor-default transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${badge.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{badge.name}</span>
              </div>
            );
          })}
        </div>

        {/* Call to Actions (CTA) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              playSound('click');
              onExploreProjects();
            }}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#simulator"
            onClick={() => playSound('click')}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 hover:border-purple-400 font-semibold text-sm transition-all hover:scale-[1.02] shadow-sm shadow-purple-500/10"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Try Live AI Simulator</span>
          </a>

          <button
            onClick={() => {
              playSound('terminal');
              onOpenTerminal();
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400/50 hover:bg-white/10 font-mono text-xs text-slate-300 hover:text-white transition-all shadow-inner"
          >
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>$ open_terminal</span>
          </button>
        </div>

        {/* Stats Strip Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {PERSONAL_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              onMouseEnter={() => playSound('hover')}
              className="glass-panel p-4 rounded-2xl text-left border border-white/10 hover:border-sky-500/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-1">
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
