'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HERITAGE_ITEMS, CulturalHeritageItem } from '@/data/mockData';
import {
  Image as ImageIcon,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Share2,
  Bot,
  Gamepad2,
  MapPin,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const ImageLibraryView: React.FC = () => {
  const { openHeritageDetail, toggleSaveItem, isItemSaved, setCurrentView, speakText } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItemForModal, setSelectedItemForModal] = useState<CulturalHeritageItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Monuments & Architecture',
    'Temples & Sacred Sites',
    'Clothing & Textiles',
    'Traditional Arts & Crafts',
    'Music & Dance',
    'Festivals & Celebrations',
    'Indigenous & Living Heritage',
    'Archaeological Wonders'
  ];

  const filteredItems = HERITAGE_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-200">
            Global Heritage Visual Archive
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Curated high-resolution imagery with verified provenance, licensing, and cultural stories.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search archival images..."
            className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isSaved = isItemSaved(item.id);
          return (
            <div
              key={item.id}
              onClick={() => setSelectedItemForModal(item)}
              className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer hover:border-amber-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-60 bg-slate-950 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-950/80 text-amber-300 border border-slate-800 backdrop-blur-md">
                  {item.category}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveItem(item.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800 backdrop-blur-md"
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                </button>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[11px] text-amber-400 font-medium">
                    {item.country} • {item.period}
                  </span>
                  <h3 className="text-base font-serif font-bold text-slate-100 group-hover:text-amber-200 truncate">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-slate-900 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                <span className="truncate max-w-[200px]">
                  Attribution: {item.sources[0]?.name || 'National Archives'}
                </span>
                <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Inspect Dossier →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Image Information Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              type="button"
              onClick={() => setSelectedItemForModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image & Gallery */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-96 relative">
              <img
                src={selectedItemForModal.imageUrl}
                alt={selectedItemForModal.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Titles & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {selectedItemForModal.category} • {selectedItemForModal.country}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 mt-1">
                  {selectedItemForModal.title}
                </h2>
                {selectedItemForModal.localName && (
                  <span className="text-xs text-slate-400 font-medium">Native title: {selectedItemForModal.localName}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleSaveItem(selectedItemForModal.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-amber-400 flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  {isItemSaved(selectedItemForModal.id) ? 'Saved' : 'Save to Favorites'}
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Shared URL for ${selectedItemForModal.title} copied to clipboard!`)}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cultural Significance & Provenance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-200">Historical & Cultural Significance</h4>
                <p className="leading-relaxed font-light">{selectedItemForModal.significance}</p>
                <h4 className="text-sm font-bold text-amber-200 pt-2">Oral Traditions & Living Stories</h4>
                <p className="leading-relaxed font-light">{selectedItemForModal.culturalStories}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Archival Provenance & License
                </h4>
                <div><strong>Period / Era:</strong> {selectedItemForModal.period}</div>
                <div><strong>Materials / Techniques:</strong> {selectedItemForModal.materialsUsed?.join(', ') || 'Traditional living practice'}</div>
                <div><strong>Primary Institutional Source:</strong> {selectedItemForModal.sources[0]?.name}</div>
                <div><strong>Usage License:</strong> {selectedItemForModal.sources[0]?.license}</div>
                <div><strong>Coordinates:</strong> {selectedItemForModal.latitude.toFixed(4)}° N, {selectedItemForModal.longitude.toFixed(4)}° E</div>
              </div>
            </div>

            {/* Action Buttons in Modal */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  openHeritageDetail(selectedItemForModal.id);
                  setSelectedItemForModal(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
              >
                Go to Dedicated Heritage Page
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('ai-guide');
                    setSelectedItemForModal(null);
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5" />
                  Ask Virasat AI About This
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('quiz');
                    setSelectedItemForModal(null);
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-orange-300 hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Take Related Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

