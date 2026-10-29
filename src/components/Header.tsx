'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HERITAGE_ITEMS, COUNTRIES } from '@/data/mockData';
import {
  Search,
  Flame,
  Award,
  Volume2,
  VolumeX,
  Shuffle,
  Sun,
  Moon,
  Type,
  Wifi,
  WifiOff,
  SlidersHorizontal,
  X,
  Compass
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    user,
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
    openHeritageDetail,
    setCurrentView,
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    lowBandwidth,
    setLowBandwidth,
    speechEnabled,
    setSpeechEnabled,
    speakText
  } = useApp();

  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);

  const regions = ['All', 'Asia', 'Africa', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica'];

  // Search matches
  const filteredSuggestions = searchQuery.trim() === ''
    ? []
    : HERITAGE_ITEMS.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);

  const handleRandomExplore = () => {
    const randomItem = HERITAGE_ITEMS[Math.floor(Math.random() * HERITAGE_ITEMS.length)];
    openHeritageDetail(randomItem.id);
    speakText(`Now exploring ${randomItem.title} from ${randomItem.country}`);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md">
      {/* Search Bar with Autocomplete */}
      <div className="relative flex-1 max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Search 195+ countries, monuments, art, festivals, indigenous crafts..."
            className="w-full bg-slate-950 border border-slate-800 rounded-full pl-10 pr-9 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Suggestions Dropdown */}
        {showSearchDropdown && filteredSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 py-1">
              Heritage Matches
            </div>
            {filteredSuggestions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  openHeritageDetail(item.id);
                  setShowSearchDropdown(false);
                }}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 text-left transition-all group"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {item.country} • {item.category}
                  </div>
                </div>
                {item.isUnesco && (
                  <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded">
                    UNESCO
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Region Selector Pills */}
      <div className="hidden lg:flex items-center gap-1 mx-4">
        {regions.slice(0, 5).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setSelectedRegion(r)}
            className={`px-2.5 py-1 rounded-full text-xs transition-all ${
              selectedRegion === r
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Right Controls: Random Discovery, Gamification, Accessibility */}
      <div className="flex items-center gap-3">
        {/* Random Discovery Button */}
        <button
          type="button"
          onClick={handleRandomExplore}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all shadow-xs"
          title="Explore Something New (Randomized Discovery)"
        >
          <Shuffle className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span className="hidden sm:inline">Surprise Me</span>
        </button>

        {/* Learning Streak & Points */}
        {user && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-full text-xs">
            <span className="flex items-center gap-1 text-orange-400 font-semibold" title="Current Daily Streak">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              {user.streakDays}d
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-amber-300 font-semibold" title="Virasat Heritage Points">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              {user.points} pts
            </span>
          </div>
        )}

        {/* Accessibility Quick Panel Toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAccessMenu(!showAccessMenu)}
            className="p-2 rounded-full bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-400/50 transition-all"
            title="Accessibility & Adaptability Hub"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {showAccessMenu && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl z-50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Adaptive Experience
                </span>
                <button
                  type="button"
                  onClick={() => setShowAccessMenu(false)}
                  className="text-slate-500 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">High Contrast Mode</span>
                <button
                  type="button"
                  onClick={() => setHighContrast(!highContrast)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold border ${
                    highContrast
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {highContrast ? 'Active' : 'Standard'}
                </button>
              </div>

              {/* Text Sizing */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Text Size</span>
                <div className="flex items-center gap-1">
                  {(['normal', 'large', 'extra'] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setFontSize(sz)}
                      className={`px-2 py-0.5 rounded text-[11px] uppercase ${
                        fontSize === sz
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {sz === 'normal' ? 'A' : sz === 'large' ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Low Bandwidth Mode */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col">
                  <span className="text-slate-300">Bandwidth Mode</span>
                  <span className="text-[10px] text-slate-500">Optimizes media consumption</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLowBandwidth(!lowBandwidth)}
                  className={`px-2 py-1 rounded-md text-[11px] font-semibold border ${
                    lowBandwidth
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {lowBandwidth ? 'Lite (Low)' : 'Full (HD)'}
                </button>
              </div>

              {/* Text-To-Speech */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col">
                  <span className="text-slate-300">Audio Narrator</span>
                  <span className="text-[10px] text-slate-500">Speaks cultural guides</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  className={`p-1.5 rounded-md border ${
                    speechEnabled
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

