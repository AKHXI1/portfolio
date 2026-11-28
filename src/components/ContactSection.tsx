import React, { useState, useEffect, useRef } from 'react';
import { Mail, Copy, Check, Send, Sparkles, Clock, Globe, ArrowUpRight, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './Icons';
import { usePortfolioMode } from '../context/ModeContext';

export const ContactSection: React.FC = () => {
  const { isDev, mode } = usePortfolioMode();
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Odoo ERP Customization');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const devTopics = [
    'Odoo ERP Customization',
    'Django / FastAPI Web App',
    'AI / SignSync Integration',
    'Unity 3D Game Dev',
    'Full-Stack Role',
    'Just saying hi!'
  ];

  const designTopics = [
    'Branding & Visual Identity',
    'Packaging Dielines (Kovax-style)',
    'Wedding Invitation Suite',
    'Posters & Motion Graphics',
    '3D Character Modeling',
    'Figma UI/UX Design'
  ];

  const projectTopics = isDev ? devTopics : designTopics;

  useEffect(() => {
    setSelectedTopic(isDev ? devTopics[0] : designTopics[0]);
  }, [mode]);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        setLocalTime(
          now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })
        );
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    playSound('success');
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: isDev
        ? ['#00f0ff', '#10b981', '#38bdf8']
        : ['#ff5c4d', '#8b5cf6', '#f97316']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const buildFormattedMessage = () =>
    `Topic: ${selectedTopic}\nName: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;

  const triggerSuccessFeedback = () => {
    setIsSubmitting(false);
    setSubmitted(true);
    playSound('success');
    confetti({
      particleCount: 100,
      spread: 85,
      origin: { y: 0.6 },
      colors: isDev
        ? ['#00f0ff', '#10b981', '#38bdf8', '#34d399']
        : ['#ff5c4d', '#8b5cf6', '#f97316', '#ec4899']
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    playSound('click');

    const subject = `[Portfolio] ${selectedTopic} — ${formData.name}`;
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      buildFormattedMessage()
    )}`;

    window.location.href = mailtoUrl;
    triggerSuccessFeedback();
  };

  const handleWhatsAppSend = () => {
    if (formRef.current && !formRef.current.reportValidity()) return;

    playSound('click');
    const whatsappUrl = `${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent(buildFormattedMessage())}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    triggerSuccessFeedback();
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono mb-4 ${
              isDev
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                : 'bg-[#ff5c4d]/10 border-[#ff5c4d]/30 text-[#e64435]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isDev ? 'Initiate Direct Transmission' : 'Book a Creative Collaboration'}</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 ${
              isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'
            }`}
          >
            Let's Build Something <span className="text-gradient">Iconic</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
            {isDev
              ? 'Need an Odoo ERP customization, Django/FastAPI platform, or AI prototype? Reach out directly.'
              : 'Looking for bold brand identity, Kovax-level packaging dielines, bespoke wedding suites, or 3D artwork?'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="spotlight-card p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono uppercase tracking-wider ${isDev ? 'text-slate-400' : 'text-zinc-500'}`}>
                  {isDev ? 'Engineering Availability' : 'Studio Availability'}
                </span>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    isDev
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-[#ff5c4d]/10 text-[#e64435] border-[#ff5c4d]/30'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full animate-ping ${
                      isDev ? 'bg-emerald-400' : 'bg-[#ff5c4d]'
                    }`}
                  />
                  Available Now
                </span>
              </div>

              <h3
                className={`text-xl font-bold leading-snug ${
                  isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'
                }`}
              >
                {isDev
                  ? 'Open for high-impact software roles, Odoo ERP & custom full-stack builds'
                  : 'Open for branding retainers, packaging dielines, print commissions & 3D craft'}
              </h3>

              <div
                className={`pt-3 border-t space-y-3 text-xs font-mono ${
                  isDev ? 'border-white/5 text-slate-400' : 'border-zinc-900/10 text-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${isDev ? 'text-cyan-400' : 'text-[#ff5c4d]'}`} />
                    Local Time (India / IST):
                  </span>
                  <span className={`font-bold ${isDev ? 'text-white' : 'text-zinc-900'}`}>
                    {localTime || 'Calculating...'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Globe className={`w-4 h-4 ${isDev ? 'text-emerald-400' : 'text-purple-600'}`} />
                    Response Window:
                  </span>
                  <span className={`font-semibold ${isDev ? 'text-emerald-400' : 'text-purple-700'}`}>
                    &lt; 24 hours guaranteed
                  </span>
                </div>
              </div>
            </div>

            <div className="spotlight-card p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div
                  className={`p-3 rounded-2xl border shrink-0 ${
                    isDev
                      ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                      : 'bg-[#ff5c4d]/10 text-[#ff5c4d] border-[#ff5c4d]/25'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className={`text-[10px] font-mono uppercase tracking-wider ${isDev ? 'text-slate-500' : 'text-zinc-500'}`}>
                    Direct Channel
                  </div>
                  <div className={`text-sm font-mono font-bold truncate ${isDev ? 'text-white' : 'text-zinc-900'}`}>
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className={`p-3 rounded-2xl border text-xs transition-all duration-200 shrink-0 ${
                  copied
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-500'
                    : isDev
                    ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                    : 'bg-[#faf6f0] border-zinc-900/10 text-zinc-700 hover:bg-zinc-100'
                }`}
                title="Copy Email Address"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="spotlight-card p-4 sm:p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-bold text-xs">
                    WA
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isDev ? 'text-white' : 'text-zinc-900'}`}>WhatsApp</div>
                    <div className="text-[10px] font-mono text-emerald-500">Direct Chat</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="spotlight-card p-4 sm:p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-xs ${
                      isDev
                        ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
                        : 'bg-[#ff5c4d]/10 border-[#ff5c4d]/30 text-[#ff5c4d]'
                    }`}
                  >
                    𝕏
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isDev ? 'text-white' : 'text-zinc-900'}`}>Twitter / 𝕏</div>
                    <div className="text-[10px] font-mono text-slate-500">@Akhxi1S</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#ff5c4d] transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="spotlight-card p-4 sm:p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className={`w-5 h-5 ${isDev ? 'text-slate-300 group-hover:text-white' : 'text-zinc-700 group-hover:text-zinc-950'}`} />
                  <div>
                    <div className={`text-xs font-bold ${isDev ? 'text-white' : 'text-zinc-900'}`}>GitHub</div>
                    <div className="text-[10px] font-mono text-slate-500">@AKHXI1</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="spotlight-card p-4 sm:p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className={`text-xs font-bold ${isDev ? 'text-white' : 'text-zinc-900'}`}>LinkedIn</div>
                    <div className="text-[10px] font-mono text-slate-500">Connect</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-500 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="spotlight-card p-7 sm:p-9">
              {submitted ? (
                <div className="py-14 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDev ? 'font-mono text-white' : 'font-editorial text-zinc-900'}`}>
                    {isDev ? 'Draft Ready in Your App!' : 'Creative Brief Ready!'}
                  </h3>
                  <p className={`text-sm max-w-md mx-auto ${isDev ? 'text-slate-300' : 'text-zinc-600'}`}>
                    Thank you, <span className="font-semibold">{formData.name}</span>. Your message on{' '}
                    <span className="font-semibold">{selectedTopic}</span> has been pre-filled—just hit send in your email app or WhatsApp to deliver it.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className={`mt-4 px-6 py-3 rounded-2xl border text-xs font-semibold transition-all ${
                      isDev
                        ? 'bg-white/10 hover:bg-white/15 text-white border-white/15'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-900'
                    }`}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2.5">
                    <label className={`text-xs font-mono uppercase tracking-wider ${isDev ? 'text-slate-400' : 'text-zinc-500'}`}>
                      What is the primary topic of your message?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTopics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => {
                            playSound('click');
                            setSelectedTopic(topic);
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                            selectedTopic === topic
                              ? isDev
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-glow-cyan'
                                : 'bg-[#ff5c4d] border-[#ff5c4d] text-white shadow-glow-coral'
                              : isDev
                              ? 'bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                              : 'bg-[#faf6f0] border-zinc-900/10 text-zinc-700 hover:bg-zinc-100'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className={`text-xs font-mono ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isDev ? 'Ada Lovelace' : 'Dieter Rams'}
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          isDev
                            ? 'bg-white/[0.03] border-white/10 text-white focus:border-cyan-400'
                            : 'bg-[#faf6f0] border-zinc-900/15 text-zinc-900 focus:border-[#ff5c4d]'
                        }`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className={`text-xs font-mono ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="hello@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                          isDev
                            ? 'bg-white/[0.03] border-white/10 text-white focus:border-cyan-400'
                            : 'bg-[#faf6f0] border-zinc-900/15 text-zinc-900 focus:border-[#ff5c4d]'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-mono ${isDev ? 'text-slate-400' : 'text-zinc-600'}`}>
                      Project Details / Inquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isDev
                          ? 'Outline your architecture goals, Odoo requirements, or role specifications...'
                          : 'Share your brand vision, packaging dimensions, print timeline, or creative brief...'
                      }
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors resize-none ${
                        isDev
                          ? 'bg-white/[0.03] border-white/10 text-white focus:border-cyan-400'
                          : 'bg-[#faf6f0] border-zinc-900/15 text-zinc-900 focus:border-[#ff5c4d]'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 py-4 px-5 rounded-2xl font-bold text-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 ${
                        isDev
                          ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 shadow-glow-cyan'
                          : 'bg-gradient-to-r from-[#ff5c4d] via-rose-500 to-purple-600 text-white shadow-glow-coral'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="font-mono text-xs animate-pulse">
                          {isDev ? 'Opening Email App...' : 'Opening Email App...'}
                        </span>
                      ) : (
                        <>
                          <span>{isDev ? 'Send via Email' : 'Send Creative Brief'}</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className={`sm:w-auto py-4 px-6 rounded-2xl font-bold text-sm border hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${
                        isDev
                          ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-400/40 text-emerald-300'
                          : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-500/30 text-emerald-700'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
