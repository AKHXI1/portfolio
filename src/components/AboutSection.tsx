import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  GraduationCap,
  MapPin,
  Sparkles,
  MessageCircle,
  Award,
  Code2,
  Palette,
  Cpu,
  Package,
  Users,
  Layers,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './Icons';
import { usePortfolioMode } from '../context/ModeContext';

export const AboutSection: React.FC = () => {
  const { isDev, mode } = usePortfolioMode();

  const handleDownloadCV = () => {
    playSound('success');
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: isDev
        ? ['#00f0ff', '#10b981', '#38bdf8']
        : ['#ff5c4d', '#8b5cf6', '#f97316']
    });
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumeUrl;
    link.download = 'Akhil_Sabu_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono mb-4 transition-colors duration-500 ${isDev
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
              : 'bg-[#ff5c4d]/10 border-[#ff5c4d]/30 text-[#e64435]'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isDev ? 'Experience, Studies & Achievements' : 'Design Background & Leadership'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 transition-colors ${isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'
              }`}
          >
            About <span className="text-gradient">Me</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
            {isDev
              ? 'Computer Science Engineering graduate from Kottayam working as an Odoo Developer at EMPIRE AE, Kochi.'
              : 'Freelance Graphic Designer at Kovax Freelance and former NSS & IEEE Design Head crafting print dielines, creatives, and Figma UI/UX.'}
          </p>
        </div>

        {/* Standard Two-Column About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Experience, Studies & Achievements */}
          <div className="lg:col-span-5 flex">
            <div className="spotlight-card p-6 sm:p-7 w-full flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className={`text-2xl font-bold ${isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'
                        }`}
                    >
                      {PERSONAL_INFO.name}
                    </h3>
                    <p
                      className={`text-xs font-mono font-semibold mt-1 ${isDev ? 'text-cyan-400' : 'text-[#ff5c4d]'
                        }`}
                    >
                      {isDev ? 'Odoo Developer @ EMPIRE AE' : 'Graphic Designer @ Kovax Freelance'}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border shrink-0 ${isDev
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-[#ff5c4d]/10 text-[#e64435] border-[#ff5c4d]/25'
                      }`}
                  >
                    @{PERSONAL_INFO.handle}
                  </span>
                </div>

                {/* Structured Experience Timeline */}
                <div
                  className={`pt-4 border-t space-y-3 ${isDev ? 'border-white/10' : 'border-zinc-900/10'
                    }`}
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold opacity-80">
                    <Briefcase className={`w-3.5 h-3.5 ${isDev ? 'text-emerald-400' : 'text-[#ff5c4d]'}`} />
                    <span className={isDev ? 'text-emerald-300' : 'text-[#e64435]'}>Experience</span>
                  </div>

                  <div
                    className={`relative ml-1.5 pl-4 border-l space-y-3 ${isDev ? 'border-cyan-500/25' : 'border-zinc-900/15'
                      }`}
                  >
                    {(isDev
                      ? [
                        {
                          role: 'Odoo Developer',
                          company: 'EMPIRE AE • Infopark Phase 2, Kochi',
                          period: 'Jun 2026 – Present',
                          current: true
                        },
                        {
                          role: 'Python Developer',
                          company: 'Altos Technologies',
                          period: 'Oct 2025 – Apr 2026',
                          current: false
                        },
                        {
                          role: 'Business Development Associate',
                          company: 'Techmaghi LLP',
                          period: 'Jun 2025 – Oct 2025',
                          current: false
                        }
                      ]
                      : [
                        {
                          role: 'Freelance Graphic Designer',
                          company: 'Kovax Freelance',
                          period: 'Present',
                          current: true
                        },
                        {
                          role: 'Design Head',
                          company: 'NSS & IEEE Communities • SJCET Palai',
                          period: '2023 – 2025',
                          current: false
                        }
                      ]
                    ).map((exp) => (
                      <div key={exp.role} className="relative">
                        <span
                          className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${exp.current
                            ? isDev
                              ? 'bg-emerald-400 border-[#080d1a] shadow-[0_0_10px_#34d399]'
                              : 'bg-[#ff5c4d] border-[#fffdf9] shadow-[0_0_8px_#ff5c4d]'
                            : isDev
                              ? 'bg-slate-600 border-[#080d1a]'
                              : 'bg-zinc-400 border-[#fffdf9]'
                            }`}
                        />
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className={`text-xs font-bold ${isDev ? 'text-white' : 'text-zinc-950'}`}>
                            {exp.role}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${exp.current
                              ? isDev
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : 'bg-[#ff5c4d]/10 text-[#e64435] border-[#ff5c4d]/25'
                              : isDev
                                ? 'bg-white/5 text-slate-400 border-white/10'
                                : 'bg-[#faf6f0] text-zinc-600 border-zinc-900/10'
                              }`}
                          >
                            {exp.period}
                          </span>
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
                          {exp.company}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structured Studies Timeline */}
                <div
                  className={`pt-4 border-t space-y-3 ${isDev ? 'border-white/10' : 'border-zinc-900/10'
                    }`}
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold opacity-80">
                    <GraduationCap className={`w-3.5 h-3.5 ${isDev ? 'text-cyan-400' : 'text-purple-600'}`} />
                    <span className={isDev ? 'text-cyan-300' : 'text-purple-700'}>Studies</span>
                  </div>

                  <div
                    className={`relative ml-1.5 pl-4 border-l space-y-3 ${isDev ? 'border-cyan-500/25' : 'border-zinc-900/15'
                      }`}
                  >
                    {[
                      {
                        title: 'B.Tech in Computer Science Engineering',
                        institution: "St. Joseph's College of Engineering, Palai, Kottayam",
                        period: '2021 – 2025',
                        highlight: true
                      },
                      {
                        title: 'High School (Class X – XII)',
                        institution: "St. Ann's Senior Secondary School, Muttikulangara, Palakkad",
                        period: '2019 – 2021',
                        highlight: false
                      }
                    ].map((edu) => (
                      <div key={edu.title} className="relative">
                        <span
                          className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${edu.highlight
                              ? isDev
                                ? 'bg-cyan-400 border-[#080d1a] shadow-[0_0_10px_#22d3ee]'
                                : 'bg-purple-500 border-[#fffdf9] shadow-[0_0_8px_#a855f7]'
                              : isDev
                                ? 'bg-slate-600 border-[#080d1a]'
                                : 'bg-zinc-400 border-[#fffdf9]'
                            }`}
                        />
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className={`text-xs font-bold ${isDev ? 'text-white' : 'text-zinc-950'}`}>
                            {edu.title}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${edu.highlight
                                ? isDev
                                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                                  : 'bg-purple-500/10 text-purple-700 border-purple-500/25'
                                : isDev
                                  ? 'bg-white/5 text-slate-400 border-white/10'
                                  : 'bg-[#faf6f0] text-zinc-600 border-zinc-900/10'
                              }`}
                          >
                            {edu.period}
                          </span>
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
                          {edu.institution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements & Location */}
                <div
                  className={`space-y-3 pt-4 border-t text-xs ${isDev ? 'border-white/10 text-slate-300' : 'border-zinc-900/10 text-zinc-700'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <Award className={`w-4 h-4 shrink-0 mt-0.5 ${isDev ? 'text-amber-400' : 'text-amber-600'}`} />
                    <span>
                      Mulearn Campus Lead (#1 Kerala state leaderboard) &amp; YIP Educator (23 schools, 11 colleges, 300+ students)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`pt-4 border-t flex flex-col sm:flex-row gap-2.5 ${isDev ? 'border-white/10' : 'border-zinc-900/10'
                  }`}
              >
                <button
                  onClick={handleDownloadCV}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn ${isDev
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-glow-cyan'
                    : 'bg-gradient-to-r from-[#ff5c4d] to-purple-600 text-white shadow-glow-coral'
                    }`}
                >
                  <Download className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
                  <span>Download Resume</span>
                </button>

                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound('click')}
                  className={`py-3 px-4 rounded-xl border font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${isDev
                    ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-emerald-300'
                    : 'bg-white hover:bg-zinc-50 border-zinc-900/15 text-zinc-800'
                    }`}
                >
                  <MessageCircle className={`w-4 h-4 ${isDev ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Summary & Core Pillars */}
          <div className="lg:col-span-7 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="spotlight-card p-6 sm:p-8 space-y-6 w-full flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div
                    className={`flex items-center justify-between border-b pb-4 ${isDev ? 'border-white/10' : 'border-zinc-900/10'
                      }`}
                  >
                    <span
                      className={`text-xs font-mono uppercase tracking-widest flex items-center gap-2 ${isDev ? 'text-slate-400' : 'text-zinc-500'
                        }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isDev ? 'bg-cyan-400' : 'bg-[#ff5c4d]'}`} />
                      {isDev ? 'Engineering Summary' : 'Creative Summary'}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded border ${isDev
                        ? 'bg-white/5 text-cyan-300 border-white/10'
                        : 'bg-[#ff5c4d]/10 text-[#e64435] border-[#ff5c4d]/20'
                        }`}
                    >
                      {isDev ? 'B.TECH CSE • 2021–2025' : 'KOVAX • NSS & IEEE'}
                    </span>
                  </div>

                  {isDev ? (
                    <div className="space-y-3.5 text-sm text-slate-300 leading-relaxed">
                      <p>
                        I am a Computer Science Engineering graduate from <strong className="text-white">Kottayam, Kerala</strong>, currently working as an{' '}
                        <strong className="text-emerald-300">Odoo Developer at EMPIRE AE (Infopark Phase 2, Kochi)</strong>. I build custom enterprise ERP modules—including <strong className="text-cyan-300">jewellery management workflows</strong> and an <strong className="text-cyan-300">ERP system for a construction company in Saudi Arabia</strong>.
                      </p>
                      <p>
                        Previously, I worked as a <strong className="text-white">Python Developer at Altos Technologies India</strong> (Oct 2025 – Apr 2026), developing Django RESTful APIs and optimizing SQL queries, and as a <strong className="text-white">Business Development Associate at Techmaghi LLP</strong> (Jun 2025 – Oct 2025).
                      </p>
                      <p>
                        In college, I progressed from Department Coordinator to <strong className="text-white">Mulearn Campus Lead</strong>, leading St. Joseph's College of Engineering, Palai to the <strong className="text-emerald-300">#1 position on the Kerala state leaderboard</strong>, and taught innovation sessions for the <strong className="text-white">Young Innovators Program (YIP)</strong> across 23 schools and 11 colleges (300+ students).
                      </p>
                      <p>
                        My major project, <strong className="text-cyan-300">Sign Sync</strong>, combines TensorFlow, LSTM, and MediaPipe with a Flutter 3D avatar and FastAPI WebSocket backend.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5 text-sm text-zinc-700 leading-relaxed">
                      <p>
                        Alongside software engineering, I work as a <strong className="text-[#e64435]">Freelance Graphic Designer at Kovax Freelance</strong>, crafting print-ready product packaging dielines, precise creasing layouts, and digital marketing creatives using <strong className="text-zinc-950">Adobe Illustrator and Photoshop</strong>.
                      </p>
                      <p>
                        During my B.Tech at <strong className="text-zinc-950">St. Joseph's College of Engineering, Palai, Kottayam</strong>, I served as <strong className="text-purple-700">Design Head for NSS &amp; IEEE communities</strong>, leading the design team in producing visual campaigns, event identities, and interactive UI/UX prototypes in <strong className="text-zinc-950">Figma</strong>.
                      </p>
                      <p>
                        My visual toolkit spans Adobe Illustrator, Photoshop, Premiere Pro, After Effects, Canva, and Blender 3D—bridging structural print geometry with modern digital motion.
                      </p>
                    </div>
                  )}

                  {/* Three Pillars */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t ${isDev ? 'border-white/10' : 'border-zinc-900/10'
                      }`}
                  >
                    {isDev ? (
                      <>
                        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs font-mono">
                            <Layers className="w-4 h-4" />
                            <span>Odoo ERP</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-normal">
                            Jewellery workflows &amp; Saudi construction company ERP modules.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs font-mono">
                            <Cpu className="w-4 h-4" />
                            <span>Python &amp; AI</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-normal">
                            Django REST APIs, FastAPI WebSockets, TensorFlow, LSTM &amp; MediaPipe.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs font-mono">
                            <Users className="w-4 h-4" />
                            <span>Leadership</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-normal">
                            #1 Kerala Mulearn Campus Lead &amp; YIP educator (300+ students).
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3.5 rounded-xl bg-[#faf6f0] border border-zinc-900/10 space-y-1">
                          <div className="flex items-center gap-2 text-[#e64435] font-semibold text-xs font-mono">
                            <Package className="w-4 h-4" />
                            <span>Kovax Dielines</span>
                          </div>
                          <p className="text-[11px] text-zinc-600 leading-normal">
                            Print-ready packaging dielines, creasing layouts &amp; pre-press prep.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#faf6f0] border border-zinc-900/10 space-y-1">
                          <div className="flex items-center gap-2 text-purple-600 font-semibold text-xs font-mono">
                            <Palette className="w-4 h-4" />
                            <span>NSS &amp; IEEE Head</span>
                          </div>
                          <p className="text-[11px] text-zinc-600 leading-normal">
                            Led campus design team creating visual assets &amp; Figma UI/UX.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#faf6f0] border border-zinc-900/10 space-y-1">
                          <div className="flex items-center gap-2 text-amber-700 font-semibold text-xs font-mono">
                            <Code2 className="w-4 h-4" />
                            <span>Adobe &amp; Motion</span>
                          </div>
                          <p className="text-[11px] text-zinc-600 leading-normal">
                            Illustrator, Photoshop, Premiere Pro, After Effects &amp; Canva.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Social Links Footer Row */}
                <div
                  className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${isDev ? 'border-white/10' : 'border-zinc-900/10'
                    }`}
                >
                  <span className={isDev ? 'text-slate-500' : 'text-zinc-500'}>
                    {PERSONAL_INFO.email} • {PERSONAL_INFO.whatsappDisplay}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playSound('click')}
                      className={`p-2 rounded-xl border transition-colors ${isDev
                        ? 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10'
                        : 'bg-zinc-900/5 text-zinc-700 hover:bg-zinc-900/10 border-zinc-900/10'
                        }`}
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>

                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playSound('click')}
                      className={`p-2 rounded-xl border transition-colors ${isDev
                        ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border-cyan-500/20'
                        : 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-purple-500/20'
                        }`}
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
