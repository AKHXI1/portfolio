import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Sparkles, Terminal, Mail, Layers, Cpu, Palette, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';
import { GithubIcon } from './Icons';
import { usePortfolioMode } from '../context/ModeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onTriggerMatrix: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onTriggerMatrix
}) => {
  const { isDev, setMode } = usePortfolioMode();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const items = [
    {
      id: 'switch-design',
      label: 'Switch to 🎨 Designer Mode (Warm Editorial / Packaging / 3D)',
      category: 'Mode',
      icon: Palette,
      action: () => {
        setMode('design');
        onClose();
      }
    },
    {
      id: 'switch-dev',
      label: 'Switch to 💻 Developer Mode (Dark Terminal / Odoo / Python / AI)',
      category: 'Mode',
      icon: Code2,
      action: () => {
        setMode('dev');
        onClose();
      }
    },
    {
      id: 'about',
      label: 'About Akhil Sabu & SJCET Background',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        window.location.hash = '#about';
        onClose();
      }
    },
    {
      id: 'proj',
      label: 'Explore Featured Projects & Works',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'sim',
      label: isDev ? 'Open All GitHub Repositories (@AKHXI1)' : 'Open Studio Lab (Kovax Dieline & Color Morph)',
      category: 'Interactive',
      icon: Sparkles,
      action: () => {
        window.location.hash = '#simulator';
        onClose();
      }
    },
    {
      id: 'skills',
      label: 'View Technical & Creative Stack',
      category: 'Navigation',
      icon: Cpu,
      action: () => {
        window.location.hash = '#skills';
        onClose();
      }
    },
    {
      id: 'term',
      label: 'Launch System Terminal Console',
      category: 'Tools',
      icon: Terminal,
      action: () => {
        onClose();
        onOpenTerminal();
      }
    },
    {
      id: 'resume',
      label: "Download Akhil's Resume (PDF)",
      category: 'Documents',
      icon: Mail,
      action: () => {
        window.open('/resume.pdf', '_blank');
        onClose();
      }
    },
    {
      id: 'matrix',
      label: 'Activate Matrix Digital Rain',
      category: 'Easter Egg',
      icon: Sparkles,
      action: () => {
        onClose();
        onTriggerMatrix();
      }
    },
    {
      id: 'confetti',
      label: 'Launch Celebratory Confetti',
      category: 'Fun',
      icon: Sparkles,
      action: () => {
        playSound('success');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        onClose();
      }
    },
    {
      id: 'github',
      label: 'Visit Akhil on GitHub (@AKHXI1)',
      category: 'Links',
      icon: GithubIcon,
      action: () => {
        window.open('https://github.com/AKHXI1', '_blank');
        onClose();
      }
    },
    {
      id: 'contact',
      label: 'Contact & Hire Akhil',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      }
    }
  ];

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
        playSound('hover');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        playSound('hover');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        playSound('click');
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-xl"
    >
      <div
        className={`w-full max-w-xl border rounded-2xl shadow-2xl overflow-hidden ${
          isDev
            ? 'bg-[#080e1c] border-cyan-500/25 text-slate-200'
            : 'bg-[#fffdf9] border-zinc-900/15 text-zinc-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          className={`flex items-center gap-3 px-4 py-3.5 border-b ${
            isDev ? 'border-white/10 bg-[#0d1528]' : 'border-zinc-900/10 bg-[#faf6f0]'
          }`}
        >
          <Search className={`w-5 h-5 ${isDev ? 'text-cyan-400' : 'text-[#ff5c4d]'}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, switch mode, or jump to section..."
            className={`flex-1 bg-transparent text-sm focus:outline-none ${
              isDev ? 'text-white placeholder:text-slate-500' : 'text-zinc-900 placeholder:text-zinc-400'
            }`}
          />
          <kbd
            className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border ${
              isDev
                ? 'bg-white/10 text-slate-400 border-white/10'
                : 'bg-white text-zinc-500 border-zinc-900/10'
            }`}
          >
            ESC to close
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No matching commands or destinations found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playSound('click');
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                    isSelected
                      ? isDev
                        ? 'bg-cyan-500/20 text-white border border-cyan-500/30'
                        : 'bg-[#ff5c4d]/10 text-zinc-950 border border-[#ff5c4d]/30'
                      : isDev
                      ? 'hover:bg-white/5 text-slate-300'
                      : 'hover:bg-zinc-100 text-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? isDev
                            ? 'bg-cyan-500/30 text-cyan-300'
                            : 'bg-[#ff5c4d]/20 text-[#e64435]'
                          : isDev
                          ? 'bg-white/5 text-slate-400'
                          : 'bg-zinc-100 text-zinc-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected
                        ? isDev
                          ? 'translate-x-0.5 text-cyan-400'
                          : 'translate-x-0.5 text-[#ff5c4d]'
                        : 'text-slate-500'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          className={`px-4 py-2 border-t flex items-center justify-between text-[11px] font-mono ${
            isDev ? 'bg-[#060a14] border-white/5 text-slate-500' : 'bg-[#faf6f0] border-zinc-900/10 text-zinc-500'
          }`}
        >
          <span>Navigate: ↑ ↓</span>
          <span>Select: ↵ Enter</span>
          <span>Close: Esc</span>
        </div>
      </div>
    </div>
  );
};
