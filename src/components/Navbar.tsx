import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Menu, X, Sparkles, ArrowUpRight, Activity } from 'lucide-react';
import { playSound, toggleSound, isSoundEnabled } from '../utils/sound';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    setAudioOn(isSoundEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setAudioOn(nextState);
    if (nextState) {
      playSound('success');
    }
  };

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Live Lab', href: '#simulator' },
    { name: 'Skills', href: '#skills' },
    { name: 'Timeline', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
            scrolled
              ? 'bg-[#060810]/85 backdrop-blur-2xl border border-white/10 shadow-glass-card'
              : 'bg-[#080b14]/60 backdrop-blur-xl border border-white/5'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => playSound('hover')}
            className="group flex items-center gap-3 select-none"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-purple-600 p-[1px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 shadow-glow-cyan">
              <div className="w-full h-full bg-[#05060a] rounded-[15px] flex items-center justify-center">
                <span className="font-display font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  A
                </span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Akhil
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 font-semibold">
                  AKHXI1
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono hidden sm:block">Creative Engineer</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio FX Toggle */}
            <button
              onClick={handleSoundToggle}
              aria-label="Toggle Sound Effects"
              title={audioOn ? 'Sound FX Active (Click to Mute)' : 'Sound FX Muted (Click to Enable)'}
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                audioOn
                  ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300 shadow-glow-cyan'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                playSound('click');
                onOpenCommandPalette();
              }}
              title="Command Palette (Ctrl+K)"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Search</span>
              <kbd className="font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Interactive Terminal Button */}
            <button
              onClick={() => {
                playSound('terminal');
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-500/15 border border-sky-400/40 text-xs font-mono text-sky-300 hover:bg-sky-500/25 transition-all duration-200 shadow-sm shadow-sky-500/10 group"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400 transition-transform group-hover:scale-110" />
              <span className="font-semibold">Terminal</span>
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={() => playSound('click')}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-xs font-semibold text-white shadow-glow-cyan hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                playSound('click');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-[#080b14]/95 backdrop-blur-2xl border border-white/10 rounded-2xl space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playSound('click');
                  setMobileMenuOpen(false);
                }}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-sky-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2 border-t border-white/10">
              <button
                onClick={() => {
                  playSound('terminal');
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-sky-300"
              >
                <Terminal className="w-4 h-4" />
                Launch Terminal Console
              </button>
              <a
                href="#contact"
                onClick={() => {
                  playSound('click');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-xs font-semibold text-white"
              >
                Connect with Akhil
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
