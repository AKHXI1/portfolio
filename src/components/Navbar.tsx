import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { playSound } from '../utils/sound';
import { usePortfolioMode } from '../context/ModeContext';
import { ModeToggle } from './ModeToggle';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDev } = usePortfolioMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: isDev ? 'Brio & Builds' : 'Dieline Lab', href: '#simulator' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Timeline', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-3xl transition-all duration-500 ${
            isDev
              ? scrolled
                ? 'bg-[#060913]/88 backdrop-blur-2xl border border-cyan-500/20 shadow-glass-card'
                : 'bg-[#080d1a]/65 backdrop-blur-xl border border-white/10'
              : scrolled
              ? 'bg-[#fffdf9]/92 backdrop-blur-2xl border border-zinc-900/12 shadow-editorial-card'
              : 'bg-[#fffdf9]/80 backdrop-blur-xl border border-zinc-900/10'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => playSound('hover')}
            className="group flex items-center gap-3 select-none"
          >
            <div
              className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl p-[1px] transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 ${
                isDev
                  ? 'bg-gradient-to-tr from-cyan-400 via-teal-400 to-emerald-500 shadow-glow-cyan'
                  : 'bg-gradient-to-tr from-[#ff5c4d] via-rose-500 to-purple-600 shadow-glow-coral'
              }`}
            >
              <div
                className={`w-full h-full rounded-[15px] flex items-center justify-center transition-colors duration-500 ${
                  isDev ? 'bg-[#05070e]' : 'bg-[#fffdf9]'
                }`}
              >
                <span
                  className={`font-black text-lg text-transparent bg-clip-text ${
                    isDev
                      ? 'font-mono bg-gradient-to-r from-cyan-400 to-emerald-400'
                      : 'font-editorial bg-gradient-to-r from-[#ff5c4d] to-purple-600'
                  }`}
                >
                  A
                </span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isDev ? 'bg-emerald-400' : 'bg-[#ff5c4d]'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    isDev ? 'bg-emerald-500' : 'bg-[#ff5c4d]'
                  }`}
                />
              </span>
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold text-sm sm:text-base tracking-tight transition-colors ${
                    isDev
                      ? 'font-mono text-white group-hover:text-cyan-300'
                      : 'font-editorial text-zinc-900 group-hover:text-[#ff5c4d]'
                  }`}
                >
                  Akhil
                </span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded border font-semibold ${
                    isDev
                      ? 'bg-white/5 border-white/10 text-slate-400'
                      : 'bg-zinc-900/5 border-zinc-900/10 text-zinc-600'
                  }`}
                >
                  AKHXI1
                </span>
              </div>
              <p className={`text-[10px] font-mono ${isDev ? 'text-cyan-400/70' : 'text-zinc-500'}`}>
                {isDev ? 'Developer Mode' : 'Designer Mode'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden lg:flex items-center gap-1 p-1 rounded-full border backdrop-blur-md transition-colors duration-500 ${
              isDev
                ? 'bg-white/[0.03] border-white/10'
                : 'bg-zinc-900/[0.04] border-zinc-900/10'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isDev
                    ? 'text-slate-300 hover:text-cyan-200 hover:bg-cyan-500/10'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Single Mode Switcher + Let's Talk */}
          <div className="flex items-center gap-2.5">
            <ModeToggle variant="navbar" />

            <a
              href="#contact"
              onClick={() => playSound('click')}
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white hover:scale-[1.03] active:scale-[0.98] transition-all ${
                isDev
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-glow-cyan'
                  : 'bg-gradient-to-r from-[#ff5c4d] to-purple-600 shadow-glow-coral'
              }`}
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
              className={`lg:hidden p-2 rounded-xl border ${
                isDev
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                  : 'bg-zinc-900/5 border-zinc-900/10 text-zinc-700 hover:text-zinc-950'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden mt-2 p-4 backdrop-blur-2xl border rounded-2xl space-y-2 shadow-2xl ${
              isDev
                ? 'bg-[#080d1a]/95 border-cyan-500/20'
                : 'bg-[#fffdf9]/95 border-zinc-900/10'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playSound('click');
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isDev
                    ? 'text-slate-200 hover:bg-white/10 hover:text-cyan-300'
                    : 'text-zinc-800 hover:bg-zinc-900/5 hover:text-[#ff5c4d]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2 border-t border-current/10">
              <button
                onClick={() => {
                  playSound('terminal');
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border font-mono text-xs ${
                  isDev
                    ? 'bg-white/5 border-white/10 text-cyan-300'
                    : 'bg-zinc-900 border-zinc-900 text-white'
                }`}
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
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white ${
                  isDev
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold'
                    : 'bg-gradient-to-r from-[#ff5c4d] to-purple-600'
                }`}
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
