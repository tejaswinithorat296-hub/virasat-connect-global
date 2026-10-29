'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HERITAGE_ITEMS, COUNTRIES } from '@/data/mockData';
import {
  Globe2,
  MapPin,
  Clock,
  Compass,
  Navigation,
  Shuffle,
  Search,
  Filter,
  CheckCircle,
  Eye,
  ArrowRight
} from 'lucide-react';

export const ExploreWorldView: React.FC = () => {
  const { openHeritageDetail, speakText } = useApp();
  const [activeTab, setActiveTab] = useState<'map' | 'region' | 'culture' | 'timeline' | 'nearby'>('map');
  const [selectedPinId, setSelectedPinId] = useState<string>('taj-mahal');
  const [selectedTimelineCentury, setSelectedTimelineCentury] = useState('All');
  const [userLocationState, setUserLocationState] = useState<{ city: string; country: string } | null>({
    city: 'New Delhi',
    country: 'India'
  });

  const selectedPin = HERITAGE_ITEMS.find(item => item.id === selectedPinId) || HERITAGE_ITEMS[0];

  // Nearby heritage mock calculation
  const nearbyHeritage = HERITAGE_ITEMS.slice(0, 3);

  const timelineEras = [
    { era: 'Ancient (Pre-500 CE)', periodDesc: 'Old Kingdom, Classical Greece, Rome, Indus, Maurya' },
    { era: 'Medieval (500–1500 CE)', periodDesc: 'Byzantine, Islamic Golden Age, Angkor, Zagwe Lalibela, Inca, Maya' },
    { era: 'Early Modern (1500–1800 CE)', periodDesc: 'Mughal Architecture, Renaissance, Edo Japan, Ashanti Empire' },
    { era: 'Modern & Living (1800–Present)', periodDesc: 'Heroic Age Expeditions, Indigenous Custody, Global UNESCO Treaties' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Exploration Header & Mode Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-200">
            Worldwide Heritage Discovery
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore 195+ countries and living traditions with zero geographic or cultural limitations.
          </p>
        </div>

        {/* Discovery Sub-Mode Toggle */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          {[
            { id: 'map', label: 'Interactive Map', icon: Globe2 },
            { id: 'region', label: 'Region Explorer', icon: Compass },
            { id: 'culture', label: 'Culture Explorer', icon: Filter },
            { id: 'timeline', label: 'Timeline View', icon: Clock },
            { id: 'nearby', label: 'Nearby Heritage', icon: MapPin }
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = activeTab === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveTab(mode.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. INTERACTIVE MAP MODE */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simulated Interactive World Vector / Canvas Map with Real Pins */}
          <div className="lg:col-span-2 relative min-h-[460px] bg-slate-900/90 border border-slate-800 rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                Interactive World Projection
              </span>
              <span className="text-[11px] text-slate-400">
                Click any monument pin to preview
              </span>
            </div>

            {/* Stylized Map Backdrop with coordinates */}
            <div className="relative w-full h-80 my-4 bg-radial from-slate-850 to-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-center overflow-hidden">
              {/* World Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-15 pointer-events-none border border-slate-700">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-slate-600" />
                ))}
              </div>

              {/* Equator & Prime Meridian Labels */}
              <div className="absolute top-2 left-4 text-[9px] text-slate-600 font-mono">
                WGS 84 • Mercator / Equirectangular Projection
              </div>

              {/* Plotted Monument Pins across continents */}
              {HERITAGE_ITEMS.map((item) => {
                // Map lat (-90 to 90) to Y% (100% to 0%) and lng (-180 to 180) to X% (0% to 100%)
                const left = ((item.longitude + 180) / 360) * 88 + 6;
                const top = ((90 - item.latitude) / 180) * 78 + 11;
                const isSelected = selectedPinId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedPinId(item.id);
                      speakText(`${item.title}, situated in ${item.country}.`);
                    }}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all group z-20 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-125'
                        : 'bg-slate-900/90 text-amber-300 border border-amber-500/50 hover:scale-110'
                    }`}
                    title={`${item.title} (${item.country})`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-950 text-slate-100 text-[10px] px-2 py-0.5 rounded shadow-lg border border-slate-800 whitespace-nowrap">
                      {item.title} ({item.country})
                    </span>
                  </button>
                );
              })}

              {/* Continents Labels on Canvas */}
              <span className="absolute top-[28%] left-[22%] text-xs font-serif font-semibold text-slate-700 pointer-events-none">
                North America
              </span>
              <span className="absolute top-[60%] left-[28%] text-xs font-serif font-semibold text-slate-700 pointer-events-none">
                South America
              </span>
              <span className="absolute top-[25%] left-[50%] text-xs font-serif font-semibold text-slate-700 pointer-events-none">
                Europe
              </span>
              <span className="absolute top-[48%] left-[50%] text-xs font-serif font-semibold text-slate-700 pointer-events-none">
                Africa
              </span>
              <span className="absolute top-[28%] left-[72%] text-xs font-serif font-semibold text-slate-700 pointer-events-none">
                Asia
              </span>
              <span className="absolute top-[68%] left-[82%] text-xs font-serif font-semibold text-slate-700 pointer-events-none">
                Oceania
              </span>
              <span className="absolute bottom-[3%] left-[50%] text-xs font-serif font-semibold text-slate-700 pointer-events-none">
                Antarctica
              </span>
            </div>

            {/* Quick Map Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Selected Pin
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> Active Heritage Site
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                100% Comprehensive Coverage across 7 Continents
              </span>
            </div>
          </div>

          {/* Pin Detail Card Side Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-slate-800">
                <img
                  src={selectedPin.imageUrl}
                  alt={selectedPin.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-amber-300 border border-slate-800">
                  {selectedPin.category}
                </span>
              </div>

              <span className="text-xs font-semibold text-amber-400">
                {selectedPin.country} • {selectedPin.region}
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-100 mt-1">
                {selectedPin.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 font-light line-clamp-4">
                {selectedPin.description}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div><strong className="text-slate-300">Period:</strong> {selectedPin.period}</div>
                <div><strong className="text-slate-300">Style:</strong> {selectedPin.architecturalStyle || 'Living Cultural Custody'}</div>
                <div><strong className="text-slate-300">Coordinates:</strong> {selectedPin.latitude.toFixed(4)}° N, {selectedPin.longitude.toFixed(4)}° E</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => openHeritageDetail(selectedPin.id)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                Open Heritage Dossier
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. REGION EXPLORER MODE */}
      {activeTab === 'region' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica'] as const).map((reg) => {
              const count = HERITAGE_ITEMS.filter(h => h.region === reg).length;
              return (
                <div
                  key={reg}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-100">{reg}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {count} Documented Major Traditions & Monuments
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-amber-400 font-medium">Explore All →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CULTURE-BASED EXPLORER MODE */}
      {activeTab === 'culture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {HERITAGE_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => openHeritageDetail(item.id)}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {item.category}
                  </span>
                  <h4 className="text-base font-serif font-bold text-slate-100 mt-2 group-hover:text-amber-300">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{item.country} • {item.period}</p>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">{item.significance}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800 text-xs font-semibold text-amber-400 flex items-center justify-between">
                  <span>View Cultural Lineage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TIMELINE EXPLORER */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-lg font-serif font-bold text-amber-200 mb-2">
              Chronological Heritage Timeline
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Traversing 65,000+ years of human creative expression and architectural innovation.
            </p>

            <div className="relative border-l-2 border-amber-500/30 ml-4 pl-6 space-y-8">
              {timelineEras.map((t, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:bg-amber-400 transition-colors" />
                  <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-300">
                    {t.era}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{t.periodDesc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. NEARBY HERITAGE */}
      {activeTab === 'nearby' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-200">
                Heritage Sites Near Your Coordinates
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Detected Region: <span className="text-amber-300 font-semibold">{userLocationState?.city}, {userLocationState?.country}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Location permission refreshed. Calibrated to nearest UNESCO clusters.')}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-amber-300 flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                Refresh GPS
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nearbyHeritage.map((item) => (
              <div
                key={item.id}
                onClick={() => openHeritageDetail(item.id)}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-32 rounded-xl object-cover mb-3"
                />
                <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{item.country} • {item.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

