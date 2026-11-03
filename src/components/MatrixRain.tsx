import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { playSound } from '../utils/sound';

interface MatrixRainProps {
  isActive: boolean;
  onClose: () => void;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ isActive, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    playSound('matrix');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -height);
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 10, 15, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Random white highlight for head of stream
        if (Math.random() > 0.9) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = '#22c55e'; // emerald-500
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const timer = setTimeout(() => {
      onClose();
    }, 10000); // auto dismiss after 10s

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [isActive, onClose]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto bg-black/60 backdrop-blur-sm cursor-pointer animate-in fade-in duration-300"
      onClick={onClose}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
        <span className="font-mono text-xs text-emerald-400 bg-black/80 px-3 py-1.5 rounded-full border border-emerald-500/30">
          Click anywhere or press ESC to dismiss Matrix Mode
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-black/80 border border-emerald-500/40 text-emerald-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

