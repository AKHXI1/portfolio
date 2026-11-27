import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Sparkles, Terminal, Mail, Layers, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';
import { GithubIcon } from './Icons';

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
      id: 'resume',
      label: 'Download Akhil\'s Resume (PDF)',
      category: 'Documents',
      icon: Mail,
      action: () => {
        window.open('/resume.pdf', '_blank');
        onClose();
      }
    },
    {
      id: 'whatsapp',
      label: 'Direct WhatsApp Transmission (+91 8138902941)',
      category: 'Links',
      icon: Mail,
      action: () => {
        window.open('https://wa.me/8138902941', '_blank');
        onClose();
      }
    },
    {
      id: 'proj',
      label: 'Explore Featured Projects',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'sim',
      label: 'Open Live Interactive Lab (VerseLens & SignSync)',
      category: 'Interactive',
      icon: Sparkles,
      action: () => {
        window.location.hash = '#simulator';
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
      id: 'skills',
      label: 'View Technical Arsenal & Skills',
      category: 'Navigation',
      icon: Cpu,
      action: () => {
        window.location.hash = '#skills';
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
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
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

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      playSound('hover');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      playSound('hover');
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#0d101a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#121522]">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-400 border border-white/10">
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
                      ? 'bg-sky-500/20 text-white border border-sky-500/30'
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-sky-500/30 text-sky-300' : 'bg-white/5 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-sky-400' : 'text-slate-600'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-[#090b12] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate: ↑ ↓</span>
          <span>Select: ↵ Enter</span>
          <span>Close: Esc</span>
        </div>

      </div>
    </div>
  );
};
