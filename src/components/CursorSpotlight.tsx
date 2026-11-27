import React, { useEffect, useRef } from 'react';

export const CursorSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let rafId: number;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMoving) return;
      isMoving = true;
      rafId = requestAnimationFrame(() => {
        if (spotlight) {
          spotlight.style.opacity = '1';
          spotlight.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        }
        isMoving = false;
      });
    };

    const handleMouseLeave = () => {
      if (spotlight) {
        spotlight.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="mouse-spotlight hidden lg:block opacity-0 transition-opacity duration-300 pointer-events-none"
      style={{
        left: 0,
        top: 0,
        willChange: 'transform',
      }}
    />
  );
};
