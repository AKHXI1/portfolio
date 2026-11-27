import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Droplets,
  Eye,
  Activity,
  Sparkles,
  HandMetal,
  Music,
  Play,
  Pause,
  ExternalLink,
  Maximize2
} from 'lucide-react';
import { playSound } from '../utils/sound';
import { GithubIcon } from './Icons';

interface BrioShowcaseProps {
  onOpenBrioModal: () => void;
}

type BrioState = 'idle' | 'posture' | 'hydrate' | 'eyerest';

const BRIO_STATES: Record<
  BrioState,
  {
    label: string;
    toastTitle: string;
    toastBody: string;
    accent: string;
    glow: string;
    badge: string;
  }
> = {
  idle: {
    label: 'Idle Focus',
    toastTitle: 'Brio Active • Deep Focus',
    toastBody: 'Monitoring desk session (42m). Next posture & eye check in 8m.',
    accent: '#00f0ff',
    glow: 'rgba(0, 240, 255, 0.35)',
    badge: 'SYSTEM TRAY • IDLE'
  },
  posture: {
    label: 'Posture Check',
    toastTitle: 'Posture Reminder • Roll Shoulders Back',
    toastBody: 'Sit tall, align neck over shoulders, and relax your wrists for 15s.',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    badge: 'ALERT • POSTURE'
  },
  hydrate: {
    label: 'Hydrate',
    toastTitle: 'Hydration Break • Drink Water',
    toastBody: 'Take 3 sips of water to keep focus sharp during long coding sprints.',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)',
    badge: 'ALERT • HYDRATE'
  },
  eyerest: {
    label: 'Eye Rest (20-20-20)',
    toastTitle: '20-20-20 Rule • Look 20ft Away',
    toastBody: 'Focus on a distant object for 20 seconds to relieve screen fatigue.',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.38)',
    badge: 'ALERT • EYE REST'
  }
};

const MINI_SIGNS: Record<string, { pose: string; conf: string }> = {
  HELLO: { pose: 'Open 5-hand outward salute wave', conf: '99.4%' },
  'THANK YOU': { pose: 'Flat hand extending forward from chin', conf: '98.9%' },
  HELP: { pose: 'Closed A-hand lifted on flat palm', conf: '98.5%' },
  FRIEND: { pose: 'Interlocking bent index fingers', conf: '97.8%' }
};

const MINI_TRACKS = [
  {
    title: 'Suzume (すずめ)',
    lang: 'Japanese',
    lyric: '君の中に何があるのか知りたくて',
    romanized: 'Kimi no naka ni nani ga aru no ka shiritakute',
    meaning: 'Wanting to know what lies inside you...'
  },
  {
    title: 'Ditto — NewJeans',
    lang: 'Korean',
    lyric: '내 하드는 이미 너로 가득 찼어',
    romanized: 'Nae hadeuneun imi neoro gadeuk chasseo',
    meaning: 'My heart is already filled with you...'
  },
  {
    title: 'Kesariya',
    lang: 'Hindi',
    lyric: 'केसरिया तेरा इश्क़ है पिया',
    romanized: 'Kesariya tera ishq hai piya',
    meaning: 'Your love is saffron-hued, my beloved...'
  }
];

export const BrioShowcase: React.FC<BrioShowcaseProps> = ({ onOpenBrioModal }) => {
  const [brioState, setBrioState] = useState<BrioState>('idle');
  const [autoCycle, setAutoCycle] = useState(true);

  // Secondary Mini-Widget 1: Sign Sync
  const [selectedSign, setSelectedSign] = useState<string>('HELLO');

  // Secondary Mini-Widget 2: Spotify Live Translator
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!autoCycle) return;
    const order: BrioState[] = ['idle', 'posture', 'hydrate', 'eyerest'];
    const interval = setInterval(() => {
      setBrioState((prev) => order[(order.indexOf(prev) + 1) % order.length]);
    }, 3800);
    return () => clearInterval(interval);
  }, [autoCycle]);

  const activeBrio = BRIO_STATES[brioState];
  const activeTrack = MINI_TRACKS[trackIdx];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Featured Interactive Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-white tracking-tight mb-3">
          Brio &amp; <span className="text-gradient">Live Utility Builds</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
          An interactive web preview of my native Windows desktop wellness companion <strong className="text-white">Brio</strong>, alongside live mini-widgets of my AI &amp; browser builds.
        </p>
      </div>

      {/* ===================================================================
          PRIMARY CENTERPIECE: BRIO DESKTOP WELLNESS COMPANION WIDGET
         =================================================================== */}
      <div className="spotlight-card p-5 sm:p-8 rounded-3xl">
        {/* Windows App Frame Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-xs text-slate-300 flex items-center gap-2 ml-2">
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              Brio.exe — Native Windows Desktop Companion (3D GLB Simulation)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setAutoCycle((prev) => !prev);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                autoCycle
                  ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              {autoCycle ? '● Auto-Cycle ON' : '○ Manual Mode'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Simulated Transparent Windows Desktop Companion Canvas */}
          <div className="lg:col-span-7 relative rounded-2xl bg-[#040711] border border-cyan-500/20 p-5 sm:p-7 overflow-hidden min-h-[320px] flex flex-col justify-between">
            <div className="absolute inset-0 cyber-grid opacity-55 pointer-events-none" />

            {/* Top Simulated Desktop Status Strip */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
              <span
                className="px-2.5 py-1 rounded-full border font-bold"
                style={{
                  color: activeBrio.accent,
                  borderColor: `${activeBrio.accent}55`,
                  backgroundColor: `${activeBrio.accent}18`
                }}
              >
                {activeBrio.badge}
              </span>
              <span className="text-slate-500">Always-on-Top • 18 MB RAM</span>
            </div>

            {/* Animated 3D/Cartoon Companion Character (Brio Mascot) */}
            <div className="relative z-10 flex flex-col items-center justify-center my-4">
              <motion.div
                animate={{
                  y: brioState === 'posture' ? [0, -14, 0] : brioState === 'hydrate' ? [0, -6, 0] : [0, -8, 0],
                  rotate: brioState === 'posture' ? [0, -4, 4, 0] : brioState === 'eyerest' ? [0, 2, -2, 0] : 0,
                  scale: brioState === 'idle' ? [1, 1.02, 1] : [1, 1.06, 1]
                }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Radial Glow Behind Companion */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-70 transition-colors duration-500"
                  style={{ backgroundColor: activeBrio.glow }}
                />

                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 160 160"
                  className="relative z-10 drop-shadow-2xl"
                  aria-label="Brio animated companion character"
                >
                  <defs>
                    <linearGradient id="brioBody" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="brioVisor" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#020617" />
                      <stop offset="100%" stopColor="#0b1326" />
                    </linearGradient>
                  </defs>

                  {/* Antenna */}
                  <line x1="80" y1="22" x2="80" y2="38" stroke={activeBrio.accent} strokeWidth="3" strokeLinecap="round" />
                  <circle cx="80" cy="19" r="5.5" fill={activeBrio.accent} />

                  {/* Head Shell */}
                  <rect
                    x="34"
                    y="38"
                    width="92"
                    height="72"
                    rx="28"
                    fill="url(#brioBody)"
                    stroke={activeBrio.accent}
                    strokeWidth="2.5"
                  />

                  {/* Face Visor */}
                  <rect x="44" y="48" width="72" height="48" rx="18" fill="url(#brioVisor)" />

                  {/* Expressive Eyes */}
                  {brioState === 'eyerest' ? (
                    <>
                      <path d="M 56 70 Q 64 64 72 70" stroke={activeBrio.accent} strokeWidth="3.5" fill="none" strokeLinecap="round" />
                      <path d="M 88 70 Q 96 64 104 70" stroke={activeBrio.accent} strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      <ellipse cx="64" cy="69" rx="6.5" ry="8" fill={activeBrio.accent} />
                      <ellipse cx="96" cy="69" rx="6.5" ry="8" fill={activeBrio.accent} />
                      <circle cx="62" cy="66" r="2.2" fill="#ffffff" />
                      <circle cx="94" cy="66" r="2.2" fill="#ffffff" />
                    </>
                  )}

                  {/* Smile */}
                  <path
                    d={brioState === 'hydrate' ? 'M 72 82 Q 80 90 88 82' : 'M 70 82 Q 80 88 90 82'}
                    stroke="#e2e8f0"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Torso & Desk Arms */}
                  <rect x="50" y="114" width="60" height="30" rx="14" fill="url(#brioBody)" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
                  <circle cx="80" cy="129" r="5" fill={activeBrio.accent} opacity="0.85" />
                  <rect
                    x="32"
                    y={brioState === 'posture' ? '106' : '116'}
                    width="14"
                    height="24"
                    rx="7"
                    fill="#1e293b"
                    stroke={activeBrio.accent}
                    strokeWidth="1.5"
                  />
                  <rect
                    x="114"
                    y={brioState === 'posture' ? '106' : '116'}
                    width="14"
                    height="24"
                    rx="7"
                    fill="#1e293b"
                    stroke={activeBrio.accent}
                    strokeWidth="1.5"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Simulated Native Windows Notification Toast */}
            <AnimatePresence mode="wait">
              <motion.div
                key={brioState}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 p-3.5 rounded-xl bg-[#0b1326]/95 border backdrop-blur-md flex items-start gap-3 shadow-lg"
                style={{ borderColor: `${activeBrio.accent}55` }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${activeBrio.accent}22`, color: activeBrio.accent }}
                >
                  {brioState === 'hydrate' ? (
                    <Droplets className="w-4 h-4" />
                  ) : brioState === 'eyerest' ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <Activity className="w-4 h-4" />
                  )}
                </div>
                <div className="text-left min-w-0">
                  <div className="font-mono font-bold text-xs text-white">{activeBrio.toastTitle}</div>
                  <div className="text-[11px] text-slate-300 leading-snug mt-0.5">{activeBrio.toastBody}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Brio Controls, Overview & Actions */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Native Windows Desktop App
              </span>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white">
                Brio Wellness Companion
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Brio runs natively on Windows as a lightweight 3D GLB desktop companion—delivering smart posture checks, hydration nudges, and 20-20-20 eye-rest popups without interrupting your workflow.
              </p>
            </div>

            {/* Interactive Companion State Triggers */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Trigger Companion State Preview:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(BRIO_STATES) as BrioState[]).map((key) => {
                  const item = BRIO_STATES[key];
                  const active = brioState === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setAutoCycle(false);
                        setBrioState(key);
                      }}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-mono text-left transition-all ${
                        active
                          ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold shadow-glow-cyan'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => {
                  playSound('modal');
                  onOpenBrioModal();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-glow-cyan hover:scale-[1.02] transition-transform"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Details &amp; Screenshots</span>
              </button>
              <a
                href="https://github.com/AKHXI1"
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-slate-200 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          SECONDARY MINIATURE WIDGETS (SIGN SYNC & SPOTIFY TRANSLATOR)
         =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mini-Widget 1: Sign Sync Live Translator Preview */}
        <div className="spotlight-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <HandMetal className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono font-bold text-sm text-white">Sign Sync Mini-Translator</div>
                <div className="text-[10px] font-mono text-emerald-400">TensorFlow • LSTM • MediaPipe • Flutter 3D</div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {MINI_SIGNS[selectedSign].conf}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Object.keys(MINI_SIGNS).map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => {
                  playSound('click');
                  setSelectedSign(word);
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono border transition-colors ${
                  selectedSign === word
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {word}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#050811] border border-white/10 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase text-slate-500">3D Avatar Gesture Output</div>
              <div className="text-xs font-medium text-slate-200">{MINI_SIGNS[selectedSign].pose}</div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">"{selectedSign}"</span>
          </div>
        </div>

        {/* Mini-Widget 2: Now Coding / Spotify Live Lyric Translator */}
        <div className="spotlight-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono font-bold text-sm text-white">Spotify Live Lyric Translator</div>
                <div className="text-[10px] font-mono text-cyan-400">Chrome MV3 • LRCLIB • Gemini AI</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                setIsPlaying((prev) => !prev);
              }}
              className="p-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300"
              aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {MINI_TRACKS.map((t, idx) => (
              <button
                key={t.title}
                type="button"
                onClick={() => {
                  playSound('click');
                  setTrackIdx(idx);
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono border transition-colors ${
                  trackIdx === idx
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#050811] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
              <span>{activeTrack.lang} • Live Sync</span>
              <span className={isPlaying ? 'animate-pulse text-emerald-400' : 'text-slate-500'}>
                {isPlaying ? '● Playing' : 'Paused'}
              </span>
            </div>
            <div className="text-xs font-bold text-white truncate">{activeTrack.lyric}</div>
            <div className="text-[11px] font-mono text-slate-400 italic truncate">{activeTrack.romanized}</div>
            <div className="text-[11px] text-emerald-300 truncate">{activeTrack.meaning}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
