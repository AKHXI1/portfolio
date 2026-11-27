import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TERMINAL_COMMANDS } from '../data/portfolioData';
import { playSound } from '../utils/sound';
import { usePortfolioMode } from '../context/ModeContext';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerMatrix: () => void;
}

interface HistoryItem {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
}

export const InteractiveTerminal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  onTriggerMatrix
}) => {
  const { setMode } = usePortfolioMode();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'welcome-1',
      type: 'output',
      content: `⚡ AKHIL'S SYSTEM TERMINAL [v3.0-dual-mode]
Type 'help' to see available commands, or try 'mode design' / 'mode dev'.`
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    playSound('terminal');
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const newHistory: HistoryItem[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', content: `$ ${cmd}` }
    ];

    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (lowerCmd === 'mode dev' || lowerCmd === 'mode developer') {
      setMode('dev');
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: 'Switched portfolio UI to 💻 Developer Mode (Dark Navy / Cyan-Emerald).'
      });
      setHistory(newHistory);
      setInput('');
      return;
    }

    if (lowerCmd === 'mode design' || lowerCmd === 'mode designer') {
      setMode('design');
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: 'Switched portfolio UI to 🎨 Designer Mode (Warm Editorial / Coral-Purple).'
      });
      setHistory(newHistory);
      setInput('');
      return;
    }

    if (lowerCmd === 'matrix') {
      onTriggerMatrix();
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: `Entering The Matrix... Digital rain sequence activated!`
      });
      setHistory(newHistory);
      setInput('');
      return;
    }

    if (lowerCmd === 'confetti' || lowerCmd === 'sudo hire' || lowerCmd === 'sudo hire akhil') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00f0ff', '#10b981', '#ff5c4d', '#8b5cf6']
      });
      playSound('success');
    }

    if (TERMINAL_COMMANDS[lowerCmd]) {
      const response =
        typeof TERMINAL_COMMANDS[lowerCmd] === 'function'
          ? (TERMINAL_COMMANDS[lowerCmd] as () => string)()
          : (TERMINAL_COMMANDS[lowerCmd] as string);

      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        content: response
      });
    } else {
      newHistory.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: `Command not recognized: "${cmd}". Type 'help' for valid commands.`
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  const quickCommands = ['help', 'mode design', 'mode dev', 'projects', 'skills', 'confetti', 'matrix', 'clear'];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
    >
      <div
        className={`relative w-full bg-[#080d1a] border border-cyan-500/25 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized ? 'h-[95vh] max-w-[95vw]' : 'h-[620px] max-w-3xl'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f1628] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors"
              title="Close"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors"
              title="Minimize/Expand"
            />
            <button
              onClick={() => {
                setHistory([]);
                playSound('click');
              }}
              className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
              title="Clear"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>akhil@system: ~ (zsh)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Suggestions */}
        <div className="px-4 py-2 bg-[#0b1120] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
          <span className="text-slate-500 shrink-0">Try:</span>
          {quickCommands.map((qc) => (
            <button
              key={qc}
              onClick={(e) => {
                e.stopPropagation();
                executeCommand(qc);
              }}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 shrink-0 transition-colors"
            >
              {qc}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 leading-relaxed text-slate-200">
          {history.map((item) => (
            <div key={item.id} className="whitespace-pre-wrap">
              {item.type === 'input' && <div className="text-cyan-400 font-semibold">{item.content}</div>}
              {item.type === 'output' && <div className="text-slate-300">{item.content}</div>}
              {item.type === 'error' && <div className="text-rose-400">{item.content}</div>}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0b1120] border-t border-white/10 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-xs sm:text-sm font-bold pl-1">
            akhil@system:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-slate-600"
            autoFocus
          />
          <button
            onClick={() => executeCommand(input)}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
