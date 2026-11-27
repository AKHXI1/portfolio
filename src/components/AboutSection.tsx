import React from 'react';
import { Download, GraduationCap, MapPin, Sparkles, MessageCircle, ArrowUpRight, Heart, Code2, Palette, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { GithubIcon } from './Icons';

export const AboutSection: React.FC = () => {
  const handleDownloadCV = () => {
    playSound('success');
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#a855f7', '#34d399', '#f59e0b']
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Identity & Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight mb-4">
            Who Am <span className="text-gradient">I?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            The story, core philosophy, and technical roots behind my software engineering journey.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Portrait & Quick Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Portrait Card */}
            <div className="spotlight-card p-6 bg-[#080b14] border border-white/10 shadow-glass-card relative overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#121626] to-[#070912] p-6 flex flex-col items-center text-center border border-white/5">
                
                {/* Background Ambient Aura */}
                <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Character Artwork */}
                <div className="relative w-48 sm:w-56 h-60 sm:h-72 overflow-hidden flex items-end justify-center">
                  <img
                    src={PERSONAL_INFO.avatarUrl}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(56,189,248,0.25)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Name & Academic Tag */}
                <div className="mt-4 space-y-1 relative z-10">
                  <h3 className="text-2xl font-display font-bold text-white">
                    {PERSONAL_INFO.name}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center justify-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>{PERSONAL_INFO.degree}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                {/* Action: Download Resume */}
                <div className="w-full pt-5 mt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2 relative z-10">
                  <button
                    onClick={handleDownloadCV}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-glow-cyan flex items-center justify-center gap-2 group/btn"
                  >
                    <Download className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
                    <span>Download CV (Resume)</span>
                  </button>

                  <a
                    href={PERSONAL_INFO.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playSound('click')}
                    className="py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                    title="Direct WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Institution Badge */}
            <div className="spotlight-card p-5 bg-[#080b14] border border-white/10 shadow-glass-card flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Alma Mater
                </div>
                <div className="text-sm font-bold text-white">
                  St. Joseph's College of Engineering and Technology
                </div>
                <div className="text-xs text-slate-400">Palai, Kottayam, Kerala</div>
              </div>
            </div>

          </div>

          {/* Right Column: Narrative Story & Engineering Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Story Card */}
            <div className="spotlight-card p-7 sm:p-8 bg-[#080b14] border border-white/10 shadow-glass-card space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Engineering Philosophy & Background
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                  Class of 2026
                </span>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  I am a passionate software engineer and dedicated frontend developer based in <strong className="text-white">Kerala, India</strong>, currently pursuing my B.Tech in Computer Science at <strong className="text-cyan-300">St. Joseph’s College of Engineering and Technology, Palai, Kottayam</strong>.
                </p>
                <p>
                  My journey began with deep curiosity for crafting elegant, efficient solutions to real-world problems. I specialize in building captivating, high-performance web and mobile applications that don’t just function reliably—they leave a lasting positive impression on users.
                </p>
                <p>
                  Beyond writing clean code, I believe in the power of <strong className="text-white">collaboration, continuous learning, and using technology as an instrument for social good</strong>—from accessible tools for the deaf community (SignSync) to AI extensions bridging cultural music lyrics (VerseLens).
                </p>
              </div>

              {/* Three Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs font-mono">
                    <Code2 className="w-4 h-4" />
                    <span>Systems & AI</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    C foundations, Python backend architectures, and Gemini LLM integration.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Accessibility</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Human-centric mobile applications and gesture translation engines.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs font-mono">
                    <Palette className="w-4 h-4" />
                    <span>Creative 3D</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Blender 3D modeling, Unity engine gameplay, and Adobe Photoshop art.
                  </p>
                </div>
              </div>

              {/* Social Connect Badges */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-slate-500">Connect with Akhil:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playSound('click')}
                    className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <a
                    href={PERSONAL_INFO.twitter}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playSound('click')}
                    className="p-2 rounded-xl bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20 transition-colors"
                    title="Twitter / X"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playSound('click')}
                    className="p-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
