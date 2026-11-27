import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioMode } from '../context/ModeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseAlpha: number;
}

const FLOATING_CODE_SNIPPETS = [
  { text: 'def customize_odoo(self):', top: '16%', left: '6%', delay: 0 },
  { text: '@app.get("/api/v1/sync")', top: '26%', right: '7%', delay: 1.4 },
  { text: 'await gemini.explain(lyrics)', top: '62%', left: '5%', delay: 0.7 },
  { text: 'git commit -m "ship build"', top: '74%', right: '8%', delay: 2.1 },
];

export const BackgroundMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDev, mode } = usePortfolioMode();
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({
    x: -1000,
    y: -1000,
    radius: 150
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = isDev
      ? [
          'rgba(0, 240, 255, ',
          'rgba(16, 185, 129, ',
          'rgba(56, 189, 248, ',
        ]
      : [
          'rgba(255, 92, 77, ',
          'rgba(139, 92, 246, ',
          'rgba(249, 115, 22, ',
        ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 16000), 75);
      for (let i = 0; i < count; i++) {
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isDev ? 0.65 : 0.45),
          vy: (Math.random() - 0.5) * (isDev ? 0.65 : 0.45),
          size: isDev ? Math.random() * 2 + 1 : Math.random() * 3 + 1.5,
          color: colorBase,
          baseAlpha: isDev ? Math.random() * 0.4 + 0.2 : Math.random() * 0.25 + 0.12
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0 && dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.4;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.baseAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 125) {
            const alpha = (1 - cdist / 125) * (isDev ? 0.16 : 0.08);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDev
              ? `rgba(0, 240, 255, ${alpha})`
              : `rgba(255, 92, 77, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDev]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={{
          backgroundColor: isDev ? 'rgba(0, 240, 255, 0.13)' : 'rgba(255, 92, 77, 0.18)',
        }}
        transition={{ duration: 0.9 }}
        className="absolute -top-40 -left-40 w-[26rem] h-[26rem] rounded-full blur-[130px] animate-pulse-glow"
      />
      <motion.div
        animate={{
          backgroundColor: isDev ? 'rgba(16, 185, 129, 0.12)' : 'rgba(139, 92, 246, 0.16)',
        }}
        transition={{ duration: 0.9 }}
        className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full blur-[140px] animate-pulse-glow"
        style={{ animationDelay: '2s' }}
      />
      <motion.div
        animate={{
          backgroundColor: isDev ? 'rgba(56, 189, 248, 0.1)' : 'rgba(245, 158, 11, 0.14)',
        }}
        transition={{ duration: 0.9 }}
        className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full blur-[120px] animate-pulse-glow"
        style={{ animationDelay: '4s' }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: isDev ? 0.75 : 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${isDev ? 'cyber-grid' : 'artistic-grid'}`}
        />
      </AnimatePresence>

      <AnimatePresence>
        {isDev && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden xl:block absolute inset-0"
          >
            {FLOATING_CODE_SNIPPETS.map((snippet) => (
              <motion.div
                key={snippet.text}
                animate={{ y: [0, -10, 0], opacity: [0.18, 0.34, 0.18] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: snippet.delay,
                  ease: 'easeInOut'
                }}
                style={{
                  top: snippet.top,
                  left: snippet.left,
                  right: snippet.right,
                }}
                className="absolute font-mono text-[11px] px-3 py-1.5 rounded-lg bg-[#091224]/70 border border-cyan-500/15 text-cyan-300/60 backdrop-blur-sm"
              >
                {snippet.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isDev && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden xl:block absolute inset-0"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
              className="absolute top-[18%] left-[7%] w-16 h-16 rounded-full border border-dashed border-[#ff5c4d]/30"
            />
            <motion.div
              animate={{ y: [0, 14, 0], rotate: [12, 18, 12] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[28%] right-[8%] px-3 py-1.5 rounded-full bg-white/75 border border-zinc-900/10 text-[10px] font-mono text-zinc-500 shadow-sm"
            >
              CMYK • 300 DPI • BLEED 3MM
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[20%] left-[6%] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/75 border border-zinc-900/10 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c4d]" />
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-[10px] font-mono text-zinc-500 ml-1">Palette #02</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
