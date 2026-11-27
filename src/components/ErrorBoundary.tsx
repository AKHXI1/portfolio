import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#05060a] flex items-center justify-center p-6 text-center text-white">
          <div className="max-w-md p-8 rounded-3xl bg-[#0c101d] border border-white/10 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-display">Interface Recovered</h2>
            <p className="text-sm text-slate-400">
              An unexpected display glitch occurred. The system has prevented a crash.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs shadow-glow-cyan hover:scale-105 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Portfolio</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
