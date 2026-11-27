import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate
} from 'framer-motion';
import {
  Bot,
  Cpu,
  Code2,
  Database,
  GitBranch,
  Layers,
  PenTool,
  Box,
  Film,
  BookOpen,
  Package,
  Sparkles,
  Palette,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal
} from 'lucide-react';
import { playSound } from '../utils/sound';
import { usePortfolioMode } from '../context/ModeContext';

interface HeroProps {
  onOpenTerminal: () => void;
  onExploreProjects: () => void;
}

const DEV_ROLES = [
  'Odoo Developer @ EMPIRE AE',
  'Python & Django Developer',
  'Sign Sync (TensorFlow / FastAPI)',
  'Enterprise ERP Customizations',
];

const REST_DEV = 96;
const REST_DESIGN = 4;

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onExploreProjects }) => {
  const { mode, setMode } = usePortfolioMode();
  const stageRef = useRef<HTMLDivElement | null>(null);

  const splitMV = useMotionValue<number>(mode === 'dev' ? REST_DEV : REST_DESIGN);
  const clipPathRight = useTransform(splitMV, (v) => `inset(0 ${Math.max(0, Math.min(100, 100 - v))}% 0 0)`);
  const dividerLeft = useTransform(splitMV, (v) => `${Math.max(2, Math.min(98, v))}%`);

  const [isDragging, setIsDragging] = useState(false);
  const [liveDragSide, setLiveDragSide] = useState<'dev' | 'design'>(mode);
  const [liveSplitDisplay, setLiveSplitDisplay] = useState<number>(mode === 'dev' ? REST_DEV : REST_DESIGN);

  const dragStartRef = useRef<{ x: number; moved: boolean }>({ x: 0, moved: false });

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(75);

  useEffect(() => {
    const currentRole = DEV_ROLES[currentRoleIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1700);
          setTypingSpeed(38);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % DEV_ROLES.length);
          setTypingSpeed(75);
        }
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  useEffect(() => {
    if (isDragging) return;
    const target = mode === 'dev' ? REST_DEV : REST_DESIGN;
    setLiveDragSide(mode);
    animate(splitMV, target, {
      type: 'spring',
      stiffness: 240,
      damping: 28,
    });
  }, [mode, isDragging, splitMV]);

  useEffect(() => {
    const unsubscribe = splitMV.on('change', (latest) => {
      const rounded = Math.round(latest);
      setLiveSplitDisplay(rounded);
      setLiveDragSide(latest >= 50 ? 'dev' : 'design');
    });
    return () => unsubscribe();
  }, [splitMV]);

  const computePercentFromClientX = (clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return splitMV.get();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(2, Math.min(98, raw));
  };

  const handlePointerDownDivider = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragStartRef.current = { x: e.clientX, moved: false };
    setIsDragging(true);
    playSound('click');
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (Math.abs(e.clientX - dragStartRef.current.x) > 5) {
        dragStartRef.current.moved = true;
      }
      const next = computePercentFromClientX(e.clientX);
      splitMV.set(next);
    };

    const handlePointerUp = () => {
      setIsDragging(false);

      if (!dragStartRef.current.moved) {
        const nextMode = mode === 'dev' ? 'design' : 'dev';
        playSound('modal');
        setMode(nextMode);
        return;
      }

      const current = splitMV.get();
      const targetMode = current >= 50 ? 'dev' : 'design';
      const targetPos = targetMode === 'dev' ? REST_DEV : REST_DESIGN;

      if (targetMode !== mode) {
        playSound('modal');
        setMode(targetMode);
      }
      animate(splitMV, targetPos, {
        type: 'spring',
        stiffness: 240,
        damping: 28,
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, mode, setMode, splitMV]);

  const handleSliderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      playSound('modal');
      setMode('design');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      playSound('modal');
      setMode('dev');
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      playSound('modal');
      setMode(mode === 'dev' ? 'design' : 'dev');
    }
  };

  const devStack = [
    { name: 'Python', icon: Code2, color: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10' },
    { name: 'Odoo ERP', icon: Layers, color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10' },
    { name: 'JavaScript', icon: Cpu, color: 'text-sky-300 border-sky-500/30 bg-sky-500/10' },
    { name: 'SQL', icon: Database, color: 'text-teal-300 border-teal-500/30 bg-teal-500/10' },
    { name: 'Git', icon: GitBranch, color: 'text-emerald-200 border-emerald-400/30 bg-emerald-400/10' },
  ];

  const designStack = [
    { name: 'Photoshop', icon: Palette, color: 'text-[#e64435] border-[#ff5c4d]/30 bg-[#ff5c4d]/10' },
    { name: 'Illustrator', icon: PenTool, color: 'text-orange-700 border-orange-500/30 bg-orange-500/10' },
    { name: 'InDesign', icon: BookOpen, color: 'text-rose-700 border-rose-500/30 bg-rose-500/10' },
    { name: 'After Effects', icon: Film, color: 'text-purple-700 border-purple-500/30 bg-purple-500/10' },
    { name: 'Blender 3D', icon: Box, color: 'text-amber-700 border-amber-500/30 bg-amber-500/10' },
    { name: 'Figma', icon: Sparkles, color: 'text-fuchsia-700 border-fuchsia-500/30 bg-fuchsia-500/10' },
  ];

  return (
    <section
      ref={stageRef}
      className="relative w-full min-h-screen overflow-hidden select-none"
    >
      {/* BASE LAYER (RIGHT): FULL-BLEED DESIGNER WORLD */}
      <div className="relative w-full min-h-screen bg-[#fbf7f2] text-zinc-900 pt-28 sm:pt-32 pb-16 px-4 sm:px-8 flex items-center overflow-hidden">
        <div className="absolute inset-0 artistic-grid opacity-85 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#ff5c4d]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-500/15 blur-[120px] pointer-events-none" />

        <div className="hidden sm:flex absolute right-0 top-0 bottom-0 w-[4%] min-w-[44px] items-center justify-center pointer-events-none z-20">
          <span className="font-mono text-[10px] font-bold tracking-[0.28em] uppercase text-[#ff5c4d] [writing-mode:vertical-rl] rotate-180 opacity-85">
            🎨 DESIGNER STUDIO
          </span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
          <div className="space-y-2 mb-8 max-w-3xl">
            <p className="text-xs font-mono tracking-[0.22em] uppercase text-[#ff5c4d] font-semibold">
              Akhil Sabu • Graphic &amp; Brand Designer
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-bold tracking-tight text-zinc-900 leading-[1.06]">
              Crafting{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c4d] via-rose-500 to-purple-600">
                Expressive
              </span>{' '}
              Visuals
            </h1>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
            <div className="lg:col-span-4 space-y-3 text-left order-2 lg:order-1">
              <div className="p-5 rounded-2xl bg-white/90 border border-zinc-900/10 shadow-editorial-card space-y-2 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff5c4d] font-bold">
                    Creative Direction
                  </span>
                  <Palette className="w-4 h-4 text-purple-600" />
                </div>
                <div className="font-editorial font-bold text-lg text-zinc-900">
                  Brand, Dielines &amp; 3D Craft
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Kovax structural packaging, bespoke wedding invitation suites, high-contrast posters, and stylized Blender 3D character art.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-2xl bg-white/85 border border-zinc-900/10">
                  <div className="font-editorial text-xl font-bold text-[#ff5c4d]">25+</div>
                  <div className="text-[11px] text-zinc-600">Brand &amp; Print Suites</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/85 border border-zinc-900/10">
                  <div className="font-editorial text-xl font-bold text-purple-600">3D + Print</div>
                  <div className="text-[11px] text-zinc-600">Kovax to Blender</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(255,92,77,0.35)] border border-zinc-900/10 bg-[#fbf7f2]">
                <img
                  src="/assets/character-design.jpg"
                  alt="Akhil 3D Designer Character"
                  draggable={false}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-zinc-900/10 shadow-sm flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#ff5c4d]" />
                  <span className="text-[10px] font-mono font-bold text-zinc-900 uppercase tracking-wider">
                    🎨 Designer Mode
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3 text-left order-3">
              <div className="p-5 rounded-2xl bg-white/90 border border-zinc-900/10 shadow-editorial-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 font-bold">
                    Featured Disciplines
                  </span>
                  <Package className="w-4 h-4 text-[#ff5c4d]" />
                </div>
                <div className="space-y-2 text-xs text-zinc-700">
                  <div className="flex items-center justify-between py-1 border-b border-zinc-900/8">
                    <span className="font-semibold">Kovax Freelance</span>
                    <span className="font-mono text-[10px] text-[#e64435]">Packaging Dielines</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-zinc-900/8">
                    <span className="font-semibold">NSS &amp; IEEE Design Head</span>
                    <span className="font-mono text-[10px] text-purple-600">Figma UI/UX</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="font-semibold">Motion &amp; Print Suites</span>
                    <span className="font-mono text-[10px] text-amber-700">Illustrator / AE</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {designStack.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <span
                      key={tool.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-medium ${tool.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      {tool.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP CLIPPED LAYER (LEFT): FULL-BLEED DEVELOPER WORLD */}
      <motion.div
        style={{ clipPath: clipPathRight }}
        className="absolute inset-0 z-10 w-full min-h-screen bg-[#05070e] text-slate-100 pt-28 sm:pt-32 pb-16 px-4 sm:px-8 flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 cyber-grid opacity-80 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-[110px] pointer-events-none" />

        <div className="hidden sm:flex absolute left-0 top-0 bottom-0 w-[4%] min-w-[44px] items-center justify-center pointer-events-none z-20">
          <span className="font-mono text-[10px] font-bold tracking-[0.28em] uppercase text-cyan-400 [writing-mode:vertical-rl] rotate-180 opacity-85">
            💻 DEVELOPER MODE
          </span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
          <div className="space-y-2 mb-8 max-w-3xl">
            <p className="text-xs font-mono tracking-[0.22em] uppercase text-cyan-400 font-semibold">
              Akhil Sabu • Odoo &amp; Full-Stack Developer
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-extrabold tracking-tight text-white leading-[1.06] glitch-hover">
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-emerald-400">
                Scalable
              </span>{' '}
              Systems
            </h1>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
            <div className="lg:col-span-4 space-y-3 text-left order-2 lg:order-1">
              <div className="p-5 rounded-2xl bg-[#08101f]/90 border border-cyan-500/20 shadow-glass-card space-y-2 transition-all duration-300 hover:border-cyan-400/65 hover:shadow-[0_0_38px_-8px_rgba(0,240,255,0.45)] hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    $ active_focus.py
                  </span>
                  <Code2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-mono font-bold text-sm sm:text-base text-emerald-300 min-h-[44px] flex items-center">
                  <span>
                    {displayText}
                    <span className="animate-pulse text-cyan-400">_</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enterprise Odoo ERP modules (jewellery &amp; Saudi construction workflows) at EMPIRE AE, Django REST APIs, and Sign Sync AI.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-2xl bg-[#08101f]/85 border border-cyan-500/15 hover:border-cyan-400/40 transition-colors">
                  <div className="font-mono text-xl font-bold text-cyan-300">EMPIRE AE</div>
                  <div className="text-[11px] text-slate-400">Odoo Developer (Kochi)</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#08101f]/85 border border-emerald-500/15 hover:border-emerald-400/40 transition-colors">
                  <div className="font-mono text-xl font-bold text-emerald-300">#1 Kerala</div>
                  <div className="text-[11px] text-slate-400">Mulearn Campus Lead</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-cyan-500/25 shadow-[0_24px_60px_-15px_rgba(0,240,255,0.3)] bg-[#05070e]">
                <img
                  src="/assets/character-dev.jpg"
                  alt="Akhil 3D Developer Character"
                  draggable={false}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#05070e]/85 backdrop-blur-md border border-cyan-400/35 shadow-sm flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-cyan-200 uppercase tracking-wider">
                    💻 Developer Mode
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3 text-left order-3">
              <div className="p-5 rounded-2xl bg-[#08101f]/90 border border-cyan-500/20 shadow-glass-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Core Builds
                  </span>
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="space-y-2 text-xs text-slate-200">
                  <div className="flex items-center justify-between py-1 border-b border-white/10">
                    <span className="font-mono font-semibold">Odoo ERP Systems</span>
                    <span className="font-mono text-[10px] text-emerald-400">EMPIRE AE</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/10">
                    <span className="font-mono font-semibold">Sign Sync (Major)</span>
                    <span className="font-mono text-[10px] text-cyan-400">TensorFlow / Flutter</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="font-mono font-semibold">Altos Django &amp; Journey Sync</span>
                    <span className="font-mono text-[10px] text-sky-400">Python / MongoDB</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {devStack.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <span
                      key={tool.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-medium ${tool.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      {tool.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STEADY DRAGGABLE VERTICAL DIVIDER LINE */}
      <motion.div
        role="slider"
        tabIndex={0}
        aria-label="Drag left or right to morph between Developer and Designer modes"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={liveSplitDisplay}
        onKeyDown={handleSliderKeyDown}
        onPointerDown={handlePointerDownDivider}
        style={{ left: dividerLeft }}
        className="absolute top-0 bottom-0 z-30 -translate-x-1/2 w-10 flex items-center justify-center cursor-ew-resize touch-none group focus:outline-none"
      >
        <div
          className={`w-[3px] h-full transition-colors duration-300 ${
            liveDragSide === 'dev'
              ? 'bg-gradient-to-b from-cyan-400 via-emerald-400 to-cyan-400 shadow-[0_0_24px_rgba(0,240,255,0.85)]'
              : 'bg-gradient-to-b from-[#ff5c4d] via-purple-500 to-[#ff5c4d] shadow-[0_0_24px_rgba(255,92,77,0.85)]'
          }`}
        />

        <div
          className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-2xl backdrop-blur-xl transition-transform duration-200 group-hover:scale-110 group-active:scale-95 ${
            liveDragSide === 'dev'
              ? 'bg-[#071122]/95 border-cyan-300 text-cyan-200 shadow-[0_0_30px_rgba(0,240,255,0.65)]'
              : 'bg-white/95 border-[#ff5c4d] text-[#ff5c4d] shadow-[0_10px_30px_rgba(255,92,77,0.45)]'
          }`}
        >
          <div className="flex items-center gap-0.5 font-mono text-xs font-bold">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="w-[1.5px] h-3.5 bg-current opacity-60 rounded-full" />
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          className={`absolute bottom-8 whitespace-nowrap px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold border shadow-lg pointer-events-none transition-opacity duration-200 ${
            liveSplitDisplay > 65
              ? 'right-7'
              : liveSplitDisplay < 35
              ? 'left-7'
              : 'left-1/2 -translate-x-1/2'
          } ${
            isDragging ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
          } ${
            liveDragSide === 'dev'
              ? 'bg-[#071122]/95 border-cyan-400/50 text-cyan-200'
              : 'bg-white/95 border-[#ff5c4d]/40 text-zinc-900'
          }`}
        >
          {isDragging ? (
            <span>
              {liveDragSide === 'design' ? '← Release for Designer Mode' : 'Release for Developer Mode →'}
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <MoveHorizontal className="w-3 h-3" />
              {mode === 'dev' ? 'Drag Left for Designer' : 'Drag Right for Developer'}
            </span>
          )}
        </div>
      </motion.div>
    </section>
  );
};
