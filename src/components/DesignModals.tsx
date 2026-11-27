import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink, Palette, FileText } from 'lucide-react';
import { DesignWorkItem } from '../types';
import { playSound } from '../utils/sound';

export const DesignMockupVisual: React.FC<{ item: DesignWorkItem; large?: boolean }> = ({
  item,
  large = false
}) => {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className={`w-full h-full ${large ? 'max-h-[70vh] object-contain bg-[#faf6f0] p-3' : 'object-cover'}`}
      />
    );
  }

  switch (item.mockupVariant) {
    case 'kovax-microfiber':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#3f2021] p-6 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#ff5c4d]/30 blur-2xl" />
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#ff7a6b]">
            <span>KOVAX PACKAGING</span>
            <span>380 / 400 GSM</span>
          </div>
          <div className="my-auto py-4 space-y-2">
            <div className="inline-block px-2.5 py-0.5 rounded bg-[#ff5c4d] text-[10px] font-mono font-bold">
              MICROFIBER CARTON
            </div>
            <div className="font-editorial text-2xl sm:text-3xl font-bold leading-tight">
              ULTRA PLUSH
            </div>
            <div className="flex gap-2 pt-1 text-[10px] font-mono text-zinc-300">
              <span className="px-2 py-0.5 rounded border border-white/20">380 GSM</span>
              <span className="px-2 py-0.5 rounded border border-[#ff5c4d]/50 text-[#ff7a6b]">400 GSM PRO</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-400">CMYK RETAIL DIE • 3MM BLEED</div>
        </div>
      );

    case 'kovax-kn90':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#fdfaf6] to-[#f1e9df] p-6 flex flex-col justify-between text-zinc-900 border border-zinc-900/5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#e64435]">
            <span>KOVAX SAFETY</span>
            <span>GB2626-2019</span>
          </div>
          <div className="my-auto py-3 space-y-1.5">
            <div className="font-editorial text-3xl font-extrabold tracking-tight">KN90</div>
            <div className="text-xs font-mono text-zinc-600">Particulate Respirator Carton</div>
            <div className="h-1.5 w-20 bg-gradient-to-r from-[#ff5c4d] to-purple-600 rounded-full mt-2" />
          </div>
          <div className="text-[10px] font-mono text-zinc-500">BOX DIELINE + BARCODE SPEC</div>
        </div>
      );

    case 'kovax-poster':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#ff5c4d] via-rose-500 to-purple-700 p-6 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="text-[10px] font-mono tracking-widest uppercase opacity-85">
            PROMO KEY ART &amp; ICONS
          </div>
          <div className="my-auto font-editorial text-2xl sm:text-3xl font-extrabold leading-none">
            KOVAX
            <br />
            CAMPAIGN
          </div>
          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-md bg-white/20 border border-white/30" />
            <span className="w-5 h-5 rounded-full bg-white/20 border border-white/30" />
            <span className="w-5 h-5 rounded-md bg-white/20 border border-white/30 rotate-45" />
          </div>
        </div>
      );

    case 'college-mulearn':
      return (
        <div className="w-full h-full bg-gradient-to-br from-purple-700 via-indigo-700 to-fuchsia-600 p-6 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
            µLEARN SJCET PALAI
          </div>
          <div className="my-auto space-y-1">
            <div className="font-editorial text-4xl font-extrabold">#1</div>
            <div className="text-xs font-mono text-purple-100">Kerala State Leaderboard</div>
          </div>
          <div className="text-[10px] font-mono opacity-80">SOCIAL &amp; CAMPUS VISUALS</div>
        </div>
      );

    case 'wedding-ja':
      return (
        <div className="w-full h-full bg-[#faf4eb] p-6 flex flex-col items-center justify-center text-center text-[#2e201b] relative overflow-hidden border border-amber-900/10">
          <div className="absolute inset-3 border border-amber-700/25 rounded-xl pointer-events-none" />
          <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-amber-800/80 mb-2">
            BESPOKE MONOGRAM
          </div>
          <div className="font-serif italic text-5xl sm:text-6xl text-[#8a5a2b] leading-none">
            J&amp;A
          </div>
          <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-600 mt-3">
            INVITATION SUITE • GOLD FOIL
          </div>
        </div>
      );

    case 'wedding-foil':
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#fff9f2] via-[#f9ede0] to-[#f4e1d2] p-6 flex flex-col justify-between text-zinc-900 relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rose-700">
            EDITORIAL STATIONERY
          </div>
          <div className="my-auto text-center space-y-1">
            <div className="font-serif italic text-3xl text-zinc-900">Save the Date</div>
            <div className="text-[11px] font-mono text-zinc-500">350gsm Cotton • Motion Reel</div>
          </div>
          <div className="text-[10px] font-mono text-zinc-500 text-right">INDESIGN + AE</div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-[#ff5c4d]/20 p-6 flex flex-col justify-between text-zinc-900">
          <span className="text-[10px] font-mono uppercase">{item.categoryLabel}</span>
          <div className="font-editorial text-xl font-bold">{item.title}</div>
          <span className="text-[10px] font-mono text-zinc-600">{item.tools.join(' • ')}</span>
        </div>
      );
  }
};

export const DesignLightboxModal: React.FC<{
  item: DesignWorkItem | null;
  onClose: () => void;
}> = ({ item, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#fffdf9] border border-zinc-900/15 rounded-3xl shadow-2xl text-zinc-900"
      >
        <button
          type="button"
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 border border-zinc-900/10 text-zinc-700 hover:text-zinc-950 shadow-sm"
          aria-label="Close lightbox"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Artwork Stage */}
          <div className="md:col-span-7 min-h-[280px] sm:min-h-[380px] bg-[#faf6f0] border-b md:border-b-0 md:border-r border-zinc-900/10 overflow-hidden">
            <DesignMockupVisual item={item} large />
          </div>

          {/* Design Notes & Tools */}
          <div className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#ff5c4d]/10 text-[#e64435] border border-[#ff5c4d]/25">
                {item.categoryLabel}
              </span>
              <h3 className="text-2xl font-editorial font-bold text-zinc-900 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{item.designNote}</p>

              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#ff5c4d]" />
                  <span>Tools Used</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#faf6f0] border border-zinc-900/10 text-zinc-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors"
            >
              Close Artwork
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const PdfViewerModal: React.FC<{
  catalog: DesignWorkItem | null;
  onClose: () => void;
}> = ({ catalog, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (catalog) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
  }, [catalog, onClose]);

  if (!catalog || !catalog.pdfUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-[#fffdf9] border border-zinc-900/15 rounded-3xl shadow-2xl overflow-hidden text-zinc-900"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#faf6f0] border-b border-zinc-900/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-[#ff5c4d]/15 text-[#e64435]">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-editorial font-bold text-base sm:text-lg text-zinc-900 truncate">
                {catalog.title}
              </h3>
              <p className="text-[11px] font-mono text-zinc-500">
                {catalog.pageCount} • {catalog.formatTag}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={catalog.pdfUrl}
              download
              onClick={() => playSound('click')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff5c4d] to-purple-600 text-white text-xs font-semibold shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <a
              href={catalog.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-zinc-900/10 text-zinc-700 text-xs font-medium hover:border-[#ff5c4d]"
            >
              <span>New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white border border-zinc-900/10 text-zinc-700 hover:text-zinc-950"
              aria-label="Close PDF viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-zinc-200/70">
          <iframe
            src={catalog.pdfUrl}
            title={catalog.title}
            className="w-full h-full border-0"
          />
        </div>
      </motion.div>
    </div>
  );
};
