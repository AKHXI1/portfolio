import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles, Music, HandMetal, ArrowRight, Bot, Globe, ShieldCheck, Camera, Activity, Volume2, Eye, Disc3 } from 'lucide-react';
import { playSound } from '../utils/sound';

export const InteractiveSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'verselens' | 'signsync'>('verselens');

  // VerseLens state
  const sampleTracks = [
    {
      id: 'suzume',
      title: 'Suzume (すずめ)',
      artist: 'RADWIMPS feat. Toaka',
      language: 'Japanese',
      originalLyric: '君の中に何があるのか知りたくて、僕は空を見上げていた。',
      transliteration: 'Kimi no naka ni nani ga aru no ka shiritakute, boku wa sora wo miageteita.',
      englishTranslation: 'Wanting to know what lies within you, I found myself looking up at the sky.',
      aiMeaning: 'A poignant motif exploring human yearning and cosmic fate. The sky serves as an expansive mirror to the unknown emotional depths inside the beloved.',
      culturalContext: 'In Japanese Shinto and poetic tradition, the sky (Sora) connects the terrestrial self with the spirit realm (Tokoyo), symbolizing unbounded longing.',
      duration: '0:34',
      accentColor: 'from-sky-500 to-indigo-600'
    },
    {
      id: 'ditto',
      title: 'Ditto',
      artist: 'NewJeans',
      language: 'Korean',
      originalLyric: '내 하드는 이미 너로 가득 찼어, 기억해 날.',
      transliteration: 'Nae hadeuneun imi neoro gadeuk chasseo, gieokhae nal.',
      englishTranslation: 'My heart and mind are already filled with you, remember me.',
      aiMeaning: 'The play on "hard drive / heart" represents youthful digital nostalgia and the vulnerability of longing to remain etched in someone’s memory forever.',
      culturalContext: 'Embodies early 2000s Y2K retro-nostalgia, turning cold computing metaphors into tender expressions of warmth.',
      duration: '0:42',
      accentColor: 'from-purple-500 to-pink-600'
    },
    {
      id: 'kesariya',
      title: 'Kesariya',
      artist: 'Arijit Singh',
      language: 'Hindi',
      originalLyric: 'केसरिया तेरा इश्क़ है पिया, रंग जाऊं जो मैं हाथ लगाऊं।',
      transliteration: 'Kesariya tera ishq hai piya, rang jaaun jo main haath lagaaun.',
      englishTranslation: 'Your love is like saffron, my beloved; if I even touch it, I become colored in it.',
      aiMeaning: 'Saffron (Kesariya) represents auspiciousness, passionate devotion, and sacred royalty in Indian cultural poetics.',
      culturalContext: 'In Indian classical and folk traditions, saffron dye signifies eternal commitment and spiritual surrender.',
      duration: '0:39',
      accentColor: 'from-amber-500 to-orange-600'
    }
  ];

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'poetic' | 'cultural' | 'phonetics'>('poetic');
  const currentTrack = sampleTracks[selectedTrackIndex];

  // Canvas visualizer for VerseLens audio wave
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (activeTab !== 'verselens') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const renderWave = () => {
      if (!canvas || !canvas.parentElement) return;
      const w = (canvas.width = canvas.parentElement.clientWidth || 300);
      const h = (canvas.height = 70);

      ctx.clearRect(0, 0, w, h);

      if (isPlaying) {
        phase += 0.08;
      }

      // Draw active equalizer bars
      const barCount = 36;
      const barWidth = Math.max((w / barCount) - 3, 2);

      for (let i = 0; i < barCount; i++) {
        const heightMultiplier = isPlaying 
          ? (Math.sin(phase + i * 0.35) * 0.5 + 0.5) * 0.7 + (Math.cos(phase * 0.7 + i * 0.2) * 0.3)
          : 0.12;

        const barHeight = Math.max(h * heightMultiplier, 4);
        const x = i * (barWidth + 3);
        const y = h - barHeight;

        const grad = ctx.createLinearGradient(0, y, 0, h);
        grad.addColorStop(0, '#38bdf8');
        grad.addColorStop(0.5, '#818cf8');
        grad.addColorStop(1, '#a855f7');

        ctx.fillStyle = grad;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, barWidth, barHeight, 3);
        } else {
          ctx.rect(x, y, barWidth, barHeight);
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => cancelAnimationFrame(animId);
  }, [activeTab, isPlaying]);

  // SignSync state
  const [inputWord, setInputWord] = useState('HELLO');
  const [cameraMode, setCameraMode] = useState(true);
  const [signResult, setSignResult] = useState<{
    word: string;
    gestureDesc: string;
    handShape: string;
    motion: string;
    confidence: string;
    activeNodes: number[];
  }>({
    word: 'HELLO',
    gestureDesc: 'Right open hand touching forehead/temple with palm outward, then moving gently outward in a salute-like greeting.',
    handShape: 'Open 5-hand / Flat B palm',
    motion: 'Smooth outward diagonal wave (Salute gesture)',
    confidence: '99.4%',
    activeNodes: [0, 1, 2, 3, 4, 5, 8, 12, 16, 20]
  });

  const gestureDictionary: Record<string, { gestureDesc: string; handShape: string; motion: string; confidence: string; activeNodes: number[] }> = {
    HELLO: {
      gestureDesc: 'Right open hand touches near temple with palm outward, then moves forward and away in a friendly salute.',
      handShape: 'Flat-B / Open 5',
      motion: 'Outward salute wave',
      confidence: '99.4%',
      activeNodes: [0, 4, 8, 12, 16, 20]
    },
    THANKYOU: {
      gestureDesc: 'Fingertips of flat right hand touch chin/lips, then extend outward and downward toward the recipient with a nod.',
      handShape: 'Flat hand, fingers together',
      motion: 'From chin extending forward',
      confidence: '98.8%',
      activeNodes: [0, 5, 8, 12, 16, 20]
    },
    'THANK YOU': {
      gestureDesc: 'Fingertips of flat right hand touch chin/lips, then extend outward and downward toward the recipient with a nod.',
      handShape: 'Flat hand, fingers together',
      motion: 'From chin extending forward',
      confidence: '98.8%',
      activeNodes: [0, 5, 8, 12, 16, 20]
    },
    FRIEND: {
      gestureDesc: 'Index fingers of both hands crook and interlock with each other, then reverse positions in mutual bond.',
      handShape: 'Bent X index fingers',
      motion: 'Interlocking clasp & flip',
      confidence: '97.9%',
      activeNodes: [0, 6, 8]
    },
    LOVE: {
      gestureDesc: 'Both fists crossed over the chest over the heart, hugging close to the body in deep affection.',
      handShape: 'S-fists or flat hands crossed',
      motion: 'Cross over heart & squeeze',
      confidence: '99.1%',
      activeNodes: [0, 2, 4, 8, 12]
    },
    YES: {
      gestureDesc: 'Right fist (S-hand) bobs up and down at wrist level, mimicking a nodding head agreement.',
      handShape: 'S-hand (fist)',
      motion: 'Vertical nodding tilt',
      confidence: '98.5%',
      activeNodes: [0, 4, 8]
    },
    NO: {
      gestureDesc: 'Thumb, index, and middle finger snap together firmly like a closing mouth.',
      handShape: '3-hand to pinched fingers',
      motion: 'Rapid downward snap',
      confidence: '99.0%',
      activeNodes: [0, 4, 8, 12]
    },
    HELP: {
      gestureDesc: 'Right thumbs-up fist placed onto flat upward palm of left hand, lifting upward together.',
      handShape: 'Right A-hand on Left flat palm',
      motion: 'Coordinated upward lift',
      confidence: '98.2%',
      activeNodes: [0, 4, 8, 12, 16, 20]
    }
  };

  const handleTranslateSign = (w: string) => {
    playSound('click');
    const normalized = w.trim().toUpperCase();
    setInputWord(w);
    if (gestureDictionary[normalized]) {
      setSignResult({
        word: normalized,
        ...gestureDictionary[normalized]
      });
    } else {
      setSignResult({
        word: normalized || 'WORD',
        gestureDesc: `Fingerspelled sequence for "${normalized}": Translating individual alphanumeric alphabet hand poses sequentially across frames.`,
        handShape: 'Dynamic Fingerspelling Mode',
        motion: 'Sequential phoneme articulation',
        confidence: '96.2%',
        activeNodes: [0, 2, 4, 8, 12, 16, 20]
      });
    }
  };

  return (
    <section id="simulator" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Test <span className="text-gradient">Akhil's Engineering</span> in Real-Time
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Live interactive sandboxes showing the exact mechanics behind VerseLens (AI Music Intelligence) and SignSync (Computer Vision Accessibility).
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 mt-8 backdrop-blur-xl shadow-glass-card">
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('verselens');
              }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === 'verselens'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>VerseLens (Spotify AI Lyrics)</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                setActiveTab('signsync');
              }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeTab === 'signsync'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <HandMetal className="w-4 h-4" />
              <span>SignSync (Accessibility Engine)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: VerseLens Simulator */}
        {activeTab === 'verselens' && (
          <div className="spotlight-card p-6 sm:p-8 rounded-3xl bg-[#080b14] border border-white/10 shadow-2xl">
            
            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-slate-400 flex items-center gap-2">
                  <Disc3 className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
                  VerseLens Spicetify / Chrome MV3 HUD [Live Telemetry]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Gemini 1.5 Flash Connected
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Simulated Spotify Player */}
              <div className="lg:col-span-5 bg-[#05070d] p-5 rounded-2xl border border-white/10 space-y-5">
                
                {/* Track Selector Buttons */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                    Choose Music Telemetry Source:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {sampleTracks.map((t, idx) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          playSound('click');
                          setSelectedTrackIndex(idx);
                        }}
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                          selectedTrackIndex === idx
                            ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-sm shadow-sky-500/30'
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="font-bold truncate">{t.title}</div>
                        <div className="text-[10px] text-slate-500">{t.language}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Track Header Card */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${currentTrack.accentColor} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <Music className="w-7 h-7" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <div className="font-bold text-white text-base truncate">{currentTrack.title}</div>
                    <div className="text-xs text-slate-400 truncate">{currentTrack.artist}</div>
                    <div className="text-[10px] font-mono text-sky-400 mt-0.5">Spotify Web Player Hooked</div>
                  </div>
                </div>

                {/* Active Audio Visualizer Wave Canvas */}
                <div className="space-y-1.5 bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5 text-sky-400">
                      <Activity className="w-3 h-3 animate-pulse" />
                      Frequency Spectrum
                    </span>
                    <span>44.1 kHz • Stereo</span>
                  </div>
                  <canvas ref={canvasRef} className="w-full h-16 block rounded-lg" />
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] font-mono text-slate-400">
                    Sync: <span className="text-emerald-400 font-bold">LRC #08 (0:14)</span>
                  </div>
                  <button
                    onClick={() => {
                      playSound('click');
                      setIsPlaying(!isPlaying);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all active:scale-95 shadow-md shadow-emerald-500/20"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlaying ? 'Pause Sync' : 'Resume Playback'}</span>
                  </button>
                </div>

              </div>

              {/* Right Column: VerseLens AI Overlay & Explanations */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Active Lyric Display Card */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      Original Lyrics ({currentTrack.language})
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      Line #8 of 24
                    </span>
                  </div>

                  <p className="text-xl sm:text-2xl font-bold text-sky-200 leading-snug">
                    "{currentTrack.originalLyric}"
                  </p>

                  {/* Transliteration Guide */}
                  <div className="pt-3 border-t border-white/5 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                      Phonetic Romanization (Sing-Along Mode)
                    </span>
                    <p className="text-sm font-mono text-purple-200 italic">
                      {currentTrack.transliteration}
                    </p>
                  </div>

                  {/* English Translation */}
                  <div className="pt-3 border-t border-white/5 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      Direct English Translation
                    </span>
                    <p className="text-sm text-slate-200">
                      {currentTrack.englishTranslation}
                    </p>
                  </div>
                </div>

                {/* Gemini AI Deep Dive Multi-Tab Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c0f1d] to-[#121626] border border-sky-500/20 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-bold font-mono text-white">
                        Google Gemini 1.5 Flash Analysis
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          playSound('click');
                          setActiveAnalysisTab('poetic');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium border transition-colors ${
                          activeAnalysisTab === 'poetic'
                            ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                            : 'bg-white/5 border-white/5 text-slate-400'
                        }`}
                      >
                        Poetic Meaning
                      </button>
                      <button
                        onClick={() => {
                          playSound('click');
                          setActiveAnalysisTab('cultural');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium border transition-colors ${
                          activeAnalysisTab === 'cultural'
                            ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                            : 'bg-white/5 border-white/5 text-slate-400'
                        }`}
                      >
                        Cultural Context
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{activeAnalysisTab === 'poetic' ? currentTrack.aiMeaning : currentTrack.culturalContext}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
                  <span>⚡ Sub-50ms Translation Latency</span>
                  <span>🔒 Sandboxed MV3 Worker</span>
                  <a
                    href="#projects"
                    onClick={() => playSound('click')}
                    className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-semibold"
                  >
                    Inspect Extension Architecture <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 2: SignSync Simulator */}
        {activeTab === 'signsync' && (
          <div className="spotlight-card p-6 sm:p-8 rounded-3xl bg-[#080b14] border border-white/10 shadow-2xl">
            
            {/* Topbar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 animate-ping" />
                <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider">
                  SIGNSYNC CROSS-PLATFORM MOBILE ENGINE (FLUTTER)
                </span>
              </div>
              <button
                onClick={() => {
                  playSound('click');
                  setCameraMode(!cameraMode);
                }}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>{cameraMode ? 'Vision Mesh ON' : 'Vision Mesh OFF'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Word Presets & Input */}
              <div className="lg:col-span-5 bg-[#05070d] p-5 rounded-2xl border border-white/10 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white">
                    Translate Word to Sign Kinematics:
                  </label>
                  <input
                    type="text"
                    value={inputWord}
                    onChange={(e) => handleTranslateSign(e.target.value)}
                    placeholder="Type a word..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                {/* Preset Chips */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Quick Vocabulary Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['HELLO', 'THANK YOU', 'FRIEND', 'LOVE', 'HELP', 'YES', 'NO'].map((w) => (
                      <button
                        key={w}
                        onClick={() => handleTranslateSign(w)}
                        className={`px-3 py-1 rounded-xl text-xs font-mono border transition-all ${
                          inputWord.toUpperCase() === w
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm shadow-emerald-500/20'
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Vision Confidence:</span>
                    <span className="text-emerald-400 font-bold">{signResult.confidence}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Frame Rate:</span>
                    <span className="text-sky-400">60 FPS Native Stream</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Target Language:</span>
                    <span className="text-slate-200">ASL / ISL Standard</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Skeletal Hand Visualizer */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Visualizer Stage */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0a0e1a] to-[#060810] border border-white/10 text-center relative overflow-hidden">
                  
                  {/* Subtle Grid backdrop */}
                  <div className="absolute inset-0 cyber-dots opacity-30 pointer-events-none" />

                  {/* Simulated Vision Tracking Mesh Canvas / SVG */}
                  <div className="relative z-10 flex flex-col items-center py-6">
                    <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                      {/* Radar sweep */}
                      <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-25" />
                      <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/40 animate-spin-slow" />
                      
                      <div className="w-24 h-24 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                        <HandMetal className="w-12 h-12" />
                      </div>
                    </div>

                    <div className="font-display font-bold text-2xl text-white">
                      "{signResult.word}"
                    </div>
                    <div className="text-xs font-mono text-emerald-400 mt-1">
                      Hand Shape: {signResult.handShape}
                    </div>
                  </div>

                  {/* Motion Vector Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2 border-t border-white/5">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                        Motion Trajectory
                      </span>
                      <p className="text-xs font-medium text-slate-200">
                        {signResult.motion}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                        Kinematics Breakdown
                      </span>
                      <p className="text-xs font-medium text-emerald-300">
                        High Contrast Tactile Landmark Mapping
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-left">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Gesture Kinematics
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {signResult.gestureDesc}
                    </p>
                  </div>

                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
                  <span>Flutter 3.x • Provider State</span>
                  <a
                    href="#projects"
                    onClick={() => playSound('click')}
                    className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                  >
                    Inspect Mobile Architecture <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
