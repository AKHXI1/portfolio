import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, Send, Sparkles, Clock, Globe, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Build an AI / Web App');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
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
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    playSound('click');

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSound('success');
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#a855f7', '#34d399', '#f59e0b']
      });
    }, 1200);
  };

  const projectTopics = [
    'Build an AI / Web App',
    'Flutter Mobile Development',
    'Full-Stack Architecture',
    'Unity 3D / Creative Dev',
    'Just saying hi!'
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Have a bold project, an innovative startup idea, or an engineering role? My inbox is always open.
          </p>
        </div>

        {/* Contact Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Availability status */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="p-6 rounded-3xl bg-[#0d101a] border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Current Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Available Now
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">
                Open for high-impact software engineering roles & technical consulting
              </h3>

              <div className="pt-2 border-t border-white/5 space-y-2.5 text-xs font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    Local Time (IST):
                  </span>
                  <span className="text-white font-bold">{localTime || 'Calculating...'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-purple-400" />
                    Response Window:
                  </span>
                  <span className="text-emerald-400">&lt; 24 hours</span>
                </div>
              </div>
            </div>

            {/* Email Quick Copy Box */}
            <div className="p-5 rounded-2xl bg-[#0d101a] border border-white/10 flex items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    Direct Email
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-white truncate">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl border text-xs transition-all duration-200 shrink-0 ${
                  copied
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Copy Email Address"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Network Badges */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="p-4 rounded-2xl bg-[#0d101a] border border-white/10 hover:border-sky-500/40 hover:bg-white/[0.04] transition-all flex items-center justify-between group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-slate-300 group-hover:text-white" />
                  <div>
                    <div className="text-xs font-bold text-white">GitHub</div>
                    <div className="text-[10px] font-mono text-slate-500">@AKHXI1</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="p-4 rounded-2xl bg-[#0d101a] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all flex items-center justify-between group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  <div>
                    <div className="text-xs font-bold text-white">LinkedIn</div>
                    <div className="text-[10px] font-mono text-slate-500">Connect</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="gradient-border-card p-6 sm:p-8 rounded-3xl bg-[#0d101a] border border-white/10 shadow-2xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Transmission Received!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, <span className="text-sky-300 font-semibold">{formData.name}</span>. I have received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/15 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Topic Select */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      What are you interested in discussing?
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
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            selectedTopic === topic
                              ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm shadow-sky-500/20'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      Project Details / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your goals, timelines, or role details..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="font-mono text-xs animate-pulse">
                        Encrypting & Dispatching Transmission...
                      </span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
