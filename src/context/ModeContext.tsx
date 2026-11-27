import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioMode } from '../types';

interface ModeContextValue {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
  isDev: boolean;
  isDesign: boolean;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<PortfolioMode>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('mode');
      if (urlMode === 'design' || urlMode === 'dev') return urlMode;
      const saved = localStorage.getItem('portfolio-mode');
      if (saved === 'design' || saved === 'dev') return saved;
    }
    return 'dev';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-mode', mode);
    if (mode === 'dev') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', mode === 'dev' ? '#05070e' : '#fbf7f2');
    }

    try {
      localStorage.setItem('portfolio-mode', mode);
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [mode]);

  const setMode = (nextMode: PortfolioMode) => {
    setModeState(nextMode);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === 'dev' ? 'design' : 'dev'));
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        isDev: mode === 'dev',
        isDesign: mode === 'design',
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const usePortfolioMode = () => {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error('usePortfolioMode must be used within a ModeProvider');
  }
  return ctx;
};
