import React, { useState } from 'react';
import { Play, Pause, Sparkles, Music, HandMetal, ArrowRight, Bot, RefreshCw, Volume2, Globe, ShieldCheck } from 'lucide-react';
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
      aiMeaning: 'A poignant motif exploring human yearning and destiny. The sky serves as an expansive mirror to the unknown emotional depths inside the beloved.',
      duration: '0:34',
      albumCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80'
    },
    {
      id: 'ditto',
      title: 'Ditto',
      artist: 'NewJeans',
      language: 'Korean',
      originalLyric: '내 하드는 이미 너로 가득 찼어, 기억해 날.',
      transliteration: 'Nae hadeuneun imi neoro gadeuk chasseo, gieokhae nal.',
      englishTranslation: 'My heart/mind is already filled with you, remember me.',
      aiMeaning: 'The play on "hard drive / heart" represents youthful digital nostalgia and the vulnerability of longing to be remembered by someone dear.',
      duration: '0:42',
      albumCover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80'
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
      duration: '0:39',
      albumCover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80'
    }
  ];

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const currentTrack = sampleTracks[selectedTrackIndex];

  // SignSync state
  const [inputWord, setInputWord] = useState('HELLO');
  const [signResult, setSignResult] = useState<{
    word: string;
    gestureDesc: string;
    handShape: string;
    motion: string;
  }>({
    word: 'HELLO',
    gestureDesc: 'Right open hand touching forehead/temple with palm outward, then moving gently outward in a salute-like greeting.',
    handShape: 'Open 5-hand / Flat B palm',
    motion: 'Smooth outward diagonal wave (Salute gesture)'
  });

  const gestureDictionary: Record<string, { gestureDesc: string; handShape: string; motion: string }> = {
    HELLO: {
      gestureDesc: 'Right open hand touches near temple with palm outward, then moves forward and away in a friendly salute.',
      handShape: 'Flat-B / Open 5',
      motion: 'Outward salute wave'
    },
    THANKYOU: {
      gestureDesc: 'Fingertips of flat right hand touch chin/lips, then extend outward and downward toward the recipient with a nod.',
      handShape: 'Flat hand, fingers together',
      motion: 'From chin extending forward'
    },
    'THANK YOU': {
      gestureDesc: 'Fingertips of flat right hand touch chin/lips, then extend outward and downward toward the recipient with a nod.',
      handShape: 'Flat hand, fingers together',
      motion: 'From chin extending forward'
    },
    FRIEND: {
      gestureDesc: 'Index fingers of both hands crook and interlock with each other, then reverse positions in mutual bond.',
      handShape: 'Bent X index fingers',
      motion: 'Interlocking clasp & flip'
    },
    LOVE: {
      gestureDesc: 'Both fists crossed over the chest over the heart, hugging close to the body in deep affection.',
      handShape: 'S-fists or flat hands crossed',
      motion: 'Cross over heart & squeeze'
    },
    YES: {
      gestureDesc: 'Right fist (S-hand) bobs up and down at wrist level, mimicking a nodding head agreement.',
      handShape: 'S-hand (fist)',
      motion: 'Vertical nodding tilt'
    },
    NO: {
      gestureDesc: 'Thumb, index, and middle finger snap together firmly like a closing mouth.',
      handShape: '3-hand to pinched fingers',
      motion: 'Rapid downward snap'
    },
    HELP: {
      gestureDesc: 'Right thumbs-up fist placed onto flat upward palm of left hand, lifting upward together.',
      handShape: 'Right A-hand on Left flat palm',
      motion: 'Coordinated upward lift'
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
        motion: 'Sequential phoneme articulation'
      });
    }
  };

  return (
    <section id="simulator" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tech Playground</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Try <span className="text-gradient">Akhil's Innovations</span> Live
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Don't just read about code — experience it. Interact with functional simulations of VerseLens (AI Music Intelligence) and SignSync (Inclusive Mobile Accessibility).
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 mt-8 backdrop-blur-md">
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('verselens');
              }}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'verselens'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25'
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
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'signsync'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
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
          <div className="gradient-border-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0d101a] backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Column: Spotify Player Mockup */}
              <div className="w-full lg:w-5/12 bg-[#090b12] p-5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wide">
                      SPOTIFY INTEGRATION ACTIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                    VerseLens v1.0
                  </span>
                </div>

                {/* Track Selector */}
                <div className="space-y-2 mb-5">
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Select Test Song:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {sampleTracks.map((t, idx) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          playSound('click');
                          setSelectedTrackIndex(idx);
                        }}
                        className={`p-2 rounded-xl text-left border text-xs transition-all ${
                          selectedTrackIndex === idx
                            ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-semibold truncate">{t.title}</div>
                        <div className="text-[10px] text-slate-500">{t.language}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Song Card */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-purple-500 to-sky-500 flex items-center justify-center text-white shadow-md">
                      <Music className="w-6 h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-sm text-white truncate">{currentTrack.title}</div>
                      <div className="text-xs text-slate-400 truncate">{currentTrack.artist}</div>
                    </div>
                  </div>

                  {/* Playback bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'}`} />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>0:14</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-3">
                    <button
                      onClick={() => {
                        playSound('click');
                        setIsPlaying(!isPlaying);
                      }}
                      className="p-2.5 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-transform active:scale-95 shadow-md shadow-emerald-500/20"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-2 bg-sky-950/30 p-2.5 rounded-lg border border-sky-800/30">
                  <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Real-time lyric sync via LRCLIB + Chrome Manifest V3 Content Script</span>
                </div>
              </div>

              {/* Right Column: VerseLens AI Overlay output */}
              <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span className="text-sm font-bold text-white tracking-wide">
                        VerseLens Live HUD Display
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                      Line Sync: #08
                    </span>
                  </div>

                  {/* Synchronized Lyric Layer */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                        1. Original Lyrics ({currentTrack.language})
                      </span>
                      <p className="text-lg sm:text-xl font-bold text-sky-200 mt-1 leading-snug">
                        "{currentTrack.originalLyric}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400">
                        2. Romanized Phonetics (Sing-Along Mode)
                      </span>
                      <p className="text-sm font-mono text-purple-200 mt-0.5 italic">
                        {currentTrack.transliteration}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                        3. English Translation
                      </span>
                      <p className="text-sm text-slate-200 mt-0.5">
                        {currentTrack.englishTranslation}
                      </p>
                    </div>
                  </div>

                  {/* Gemini AI Poetic Meaning Card */}
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-purple-950/30 to-indigo-950/40 border border-sky-500/20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Bot className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-bold text-sky-300 font-mono">
                        Google Gemini 1.5 Flash Poetic Analysis
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{currentTrack.aiMeaning}"
                    </p>
                  </div>
                </div>

                {/* Tech Highlights Footer */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
                  <span>⚡ Sub-50ms Translation Latency</span>
                  <span>🔒 Manifest V3 Sandboxed</span>
                  <a
                    href="#projects"
                    onClick={() => playSound('click')}
                    className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1"
                  >
                    View Project Architecture <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 2: SignSync Simulator */}
        {activeTab === 'signsync' && (
          <div className="gradient-border-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0d101a] backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Column: Sign Input & Quick Words */}
              <div className="w-full lg:w-5/12 bg-[#090b12] p-5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wide">
                      SIGNSYNC MOBILE ENGINE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Flutter / Dart
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  <label className="text-xs font-medium text-slate-300">
                    Type a Word or Phrase to Translate:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputWord}
                      onChange={(e) => handleTranslateSign(e.target.value)}
                      placeholder="e.g. HELLO, LOVE, FRIEND..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Quick Word Badges */}
                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Quick Accessibility Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['HELLO', 'THANK YOU', 'FRIEND', 'LOVE', 'HELP', 'YES', 'NO'].map((w) => (
                      <button
                        key={w}
                        onClick={() => handleTranslateSign(w)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-all ${
                          inputWord.toUpperCase() === w
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1.5 font-mono">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bidirectional Pipeline</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Supports Sign-to-Text via camera vision models and Text-to-Sign animated visual guidance.
                  </p>
                </div>
              </div>

              {/* Right Column: Sign Visualization Display */}
              <div className="w-full lg:w-7/12 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HandMetal className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold text-white tracking-wide">
                      Sign Translation Representation
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    Token: "{signResult.word}"
                  </span>
                </div>

                {/* Gesture Visual Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#121624] to-[#0c0f18] border border-white/10 space-y-4">
                  {/* Visual Hand Indicator */}
                  <div className="flex items-center justify-center p-8 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <div className="space-y-2">
                      <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/15 animate-bounce">
                        <HandMetal className="w-10 h-10" />
                      </div>
                      <div className="font-mono text-base font-bold text-white">
                        Gesture: {signResult.word}
                      </div>
                      <div className="text-xs text-emerald-400 font-mono">
                        Hand Shape: {signResult.handShape}
                      </div>
                    </div>
                  </div>

                  {/* Motion Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Motion Vector
                      </span>
                      <p className="text-xs text-slate-200 font-medium">
                        {signResult.motion}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Accessibility Rating
                      </span>
                      <p className="text-xs text-emerald-300 font-medium">
                        Universal Standard Gesture (ASL / ISL)
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      Sign Kinematics Explanation
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {signResult.gestureDesc}
                    </p>
                  </div>
                </div>

                {/* Bottom link */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Flutter 3.x Mobile Architecture</span>
                  <a
                    href="#projects"
                    onClick={() => playSound('click')}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                  >
                    Inspect Full App Specs <ArrowRight className="w-3 h-3" />
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
