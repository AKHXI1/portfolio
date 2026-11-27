import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, FileText, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { designWorks, designCatalogs } from '../data/designWorks';
import {
  CollegeSubCategory,
  DesignWorkCategory,
  DesignWorkItem,
  KovaxSubCategory
} from '../types';
import { playSound } from '../utils/sound';
import { DesignMockupVisual, DesignLightboxModal, PdfViewerModal } from './DesignModals';

export const DesignGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<DesignWorkCategory>('all');
  const [kovaxSubTab, setKovaxSubTab] = useState<KovaxSubCategory>('products');
  const [collegeSubTab, setCollegeSubTab] = useState<CollegeSubCategory>('ieee');
  const [showAllInAllTab, setShowAllInAllTab] = useState(false);
  const [showAllSubTab, setShowAllSubTab] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<DesignWorkItem | null>(null);
  const [activeCatalogPdf, setActiveCatalogPdf] = useState<DesignWorkItem | null>(null);

  const filterTabs: { label: string; value: DesignWorkCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Kovax', value: 'kovax' },
    { label: 'Dr Plus', value: 'drplus' },
    { label: 'College & Events', value: 'college-events' },
    { label: 'Personal & Wedding', value: 'personal-wedding' },
    { label: 'Print & PDFs', value: 'catalogs-pdfs' }
  ];

  const kovaxSubTabs: { label: string; value: KovaxSubCategory; count: number }[] = [
    {
      label: 'Products & Tools',
      value: 'products',
      count: designWorks.filter((item) => item.category === 'kovax' && item.subCategory === 'products').length
    },
    {
      label: 'Assilex & Buflex',
      value: 'assilex-buflex',
      count: designWorks.filter((item) => item.category === 'kovax' && item.subCategory === 'assilex-buflex').length
    },
    {
      label: 'Campaigns & Banners',
      value: 'campaigns',
      count: designWorks.filter((item) => item.category === 'kovax' && item.subCategory === 'campaigns').length
    }
  ];

  const collegeSubTabs: { label: string; value: CollegeSubCategory; count: number }[] = [
    {
      label: 'IEEE',
      value: 'ieee',
      count: designWorks.filter((item) => item.category === 'college-events' && item.subCategory === 'ieee').length
    },
    {
      label: 'NSS',
      value: 'nss',
      count: designWorks.filter((item) => item.category === 'college-events' && item.subCategory === 'nss').length
    }
  ];

  const showGalleryItems = selectedCategory !== 'catalogs-pdfs';
  const showCatalogsStrip = selectedCategory === 'all' || selectedCategory === 'catalogs-pdfs';
  const hasSubTabs = selectedCategory === 'kovax' || selectedCategory === 'college-events';
  const activeSubTabs = selectedCategory === 'kovax' ? kovaxSubTabs : selectedCategory === 'college-events' ? collegeSubTabs : [];
  const activeSubValue = selectedCategory === 'kovax' ? kovaxSubTab : collegeSubTab;
  const activeSubLabel = activeSubTabs.find((s) => s.value === activeSubValue)?.label ?? '';

  const filteredGallery =
    selectedCategory === 'all'
      ? designWorks
      : hasSubTabs
        ? designWorks.filter(
            (item) => item.category === selectedCategory && item.subCategory === activeSubValue
          )
        : designWorks.filter((item) => item.category === selectedCategory);

  const visibleGallery =
    selectedCategory === 'all' && !showAllInAllTab
      ? filteredGallery.slice(0, 9)
      : hasSubTabs && !showAllSubTab
        ? filteredGallery.slice(0, 6)
        : filteredGallery;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header + Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5c4d]/10 border border-[#ff5c4d]/30 text-[#e64435] text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Client &amp; Studio Works ({designWorks.length} Artworks • {designCatalogs.length} PDFs)</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-extrabold text-zinc-900 tracking-tight">
              Design <span className="text-gradient">Showcase</span>
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-3 max-w-xl">
              Kovax retail packaging &amp; campaigns, Dr Plus ad &amp; clinical graphics, IEEE &amp; NSS college posters, Anju &amp; Joe wedding stationery, and Angel Gardens branding.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/90 border border-zinc-900/10 shadow-editorial-card">
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setSelectedCategory(tab.value);
                    setShowAllSubTab(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#ff5c4d] to-purple-600 text-white shadow-glow-coral'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Gallery Grid */}
        {showGalleryItems && (
          <div className="space-y-8">
            {hasSubTabs && (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/90 border border-zinc-900/10 shadow-sm">
                  {activeSubTabs.map((sub) => {
                    const active = activeSubValue === sub.value;
                    return (
                      <button
                        key={sub.value}
                        type="button"
                        onClick={() => {
                          playSound('click');
                          if (selectedCategory === 'kovax') {
                            setKovaxSubTab(sub.value as KovaxSubCategory);
                          } else {
                            setCollegeSubTab(sub.value as CollegeSubCategory);
                          }
                          setShowAllSubTab(false);
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          active
                            ? 'bg-zinc-900 text-white shadow-sm'
                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                        }`}
                      >
                        <span>{sub.label}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                            active ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'
                          }`}
                        >
                          {sub.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  Showing {visibleGallery.length} of {filteredGallery.length} selected {activeSubLabel} works
                </span>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={hasSubTabs ? `${selectedCategory}-${activeSubValue}` : selectedCategory}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleGallery.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.03, 0.25) }}
                    whileHover={{ y: -6 }}
                    onClick={() => {
                      playSound('modal');
                      setLightboxItem(item);
                    }}
                    className="spotlight-card group cursor-pointer overflow-hidden relative"
                  >
                    <div className="h-72 w-full overflow-hidden relative bg-[#faf6f0]">
                      <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                        <DesignMockupVisual item={item} />
                      </div>

                      {/* Title & Category Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff7a6b] font-bold mb-1">
                          {item.categoryLabel}
                        </span>
                        <div className="flex items-end justify-between gap-3">
                          <h3 className="font-editorial font-bold text-base sm:text-lg leading-snug">
                            {item.title}
                          </h3>
                          <span className="p-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shrink-0 group-hover:bg-[#ff5c4d] transition-colors">
                            <Eye className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {hasSubTabs && filteredGallery.length > 6 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setShowAllSubTab((prev) => !prev);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-[#faf6f0] border border-zinc-900/15 hover:border-[#ff5c4d] text-xs font-mono font-semibold text-zinc-800 shadow-sm transition-all"
                >
                  {showAllSubTab ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="w-4 h-4 text-[#ff5c4d]" />
                    </>
                  ) : (
                    <>
                      <span>View More ({filteredGallery.length - 6} more)</span>
                      <ChevronDown className="w-4 h-4 text-[#ff5c4d]" />
                    </>
                  )}
                </button>
              </div>
            )}

            {selectedCategory === 'all' && filteredGallery.length > 9 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setShowAllInAllTab((prev) => !prev);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-[#faf6f0] border border-zinc-900/15 hover:border-[#ff5c4d] text-xs font-mono font-semibold text-zinc-800 shadow-sm transition-all"
                >
                  {showAllInAllTab ? (
                    <>
                      <span>Show Fewer Artworks</span>
                      <ChevronUp className="w-4 h-4 text-[#ff5c4d]" />
                    </>
                  ) : (
                    <>
                      <span>View All {filteredGallery.length} Artworks</span>
                      <ChevronDown className="w-4 h-4 text-[#ff5c4d]" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dedicated "Catalogs & Print Publications" PDF Showcase Strip */}
        {showCatalogsStrip && (
          <div className="space-y-6 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900/10 pb-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-purple-700 font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Catalogs, Dielines &amp; Print Publications</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-zinc-900 mt-1">
                  Print-Ready Multi-Page PDFs
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Click Preview PDF to inspect inside interactive viewer
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designCatalogs.map((catalog) => (
                <motion.div
                  key={catalog.id}
                  whileHover={{ y: -6 }}
                  className="spotlight-card p-6 flex flex-col justify-between gap-5"
                >
                  <div className="flex items-start gap-4">
                    {catalog.image ? (
                      <div className="w-24 h-32 rounded-xl overflow-hidden bg-zinc-900 shadow-[10px_12px_25px_-8px_rgba(24,24,27,0.38)] border border-zinc-900/15 relative shrink-0">
                        <img
                          src={catalog.image}
                          alt={catalog.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-zinc-950/80 text-[8px] font-mono font-bold text-white">
                          PDF
                        </span>
                      </div>
                    ) : (
                      <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-[#18181b] via-[#2b1d35] to-[#ff5c4d] p-3 flex flex-col justify-between text-white shadow-[10px_12px_25px_-8px_rgba(24,24,27,0.38)] border-l-4 border-[#ff5c4d] shrink-0">
                        <span className="text-[8px] font-mono tracking-widest uppercase text-white/75">
                          PRINT PDF
                        </span>
                        <span className="font-editorial font-bold text-xs leading-tight line-clamp-3">
                          {catalog.title}
                        </span>
                        <span className="text-[9px] font-mono text-[#ff7a6b]">
                          {catalog.pageCount}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2 min-w-0">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-700 border border-purple-500/20">
                        {catalog.formatTag}
                      </span>
                      <h4 className="font-editorial font-bold text-base sm:text-lg text-zinc-900 leading-snug">
                        {catalog.title}
                      </h4>
                      <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                        {catalog.designNote}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-900/10 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-zinc-500 truncate">
                      {catalog.tools.slice(0, 2).join(' • ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playSound('modal');
                        setActiveCatalogPdf(catalog);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff5c4d] to-purple-600 text-white text-xs font-semibold shadow-sm hover:scale-[1.03] transition-transform shrink-0"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Preview PDF</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <DesignLightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
      <PdfViewerModal catalog={activeCatalogPdf} onClose={() => setActiveCatalogPdf(null)} />
    </section>
  );
};
