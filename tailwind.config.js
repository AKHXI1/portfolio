/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#05060a',
        surface: {
          50: '#0a0d16',
          100: '#101524',
          200: '#171e33',
          300: '#222c4a'
        },
        cyan: {
          glow: '#00f0ff'
        },
        coral: {
          400: '#ff7a6b',
          500: '#ff5c4d',
          600: '#e64435'
        },
        cream: {
          50: '#fdfaf6',
          100: '#f8f2ea',
          200: '#efe5d8'
        }
      },
      fontFamily: {
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif'],
        editorial: ['"Clash Display"', 'Syne', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        tech: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 50px -10px rgba(0, 240, 255, 0.32)',
        'glow-emerald': '0 0 45px -10px rgba(16, 185, 129, 0.32)',
        'glow-violet': '0 0 50px -10px rgba(168, 85, 247, 0.3)',
        'glow-coral': '0 20px 50px -12px rgba(255, 92, 77, 0.28)',
        'editorial-card': '0 18px 45px -18px rgba(24, 24, 27, 0.12), 0 2px 10px -2px rgba(24, 24, 27, 0.05)',
        'glass-card': '0 20px 50px -20px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.1)',
        'neon-border': '0 0 20px rgba(56, 189, 248, 0.25)'
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'radar': 'radar 4s linear infinite',
        'equalizer': 'equalizer 1.2s ease-in-out infinite alternate',
        'glitch': 'glitchSkew 4s infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        equalizer: {
          '0%': { height: '15%' },
          '100%': { height: '100%' }
        },
        glitchSkew: {
          '0%, 92%, 100%': { transform: 'skew(0deg)' },
          '93%': { transform: 'skew(-3deg) translateX(2px)' },
          '95%': { transform: 'skew(2deg) translateX(-2px)' },
          '97%': { transform: 'skew(0deg)' }
        }
      }
    },
  },
  plugins: [],
}
