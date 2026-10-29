'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { HERITAGE_ITEMS, COUNTRIES, DAILY_FACTS, CULTURAL_EVENTS, ARTISAN_PRODUCTS } from '@/data/mockData';
import {
  Sparkles,
  Compass,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Flame,
  Award,
  Calendar,
  Globe2,
  Volume2,
  Share2,
  PlayCircle
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const {
    openHeritageDetail,
    setCurrentView,
    toggleSaveItem,
    isItemSaved,
    speakText,
    user,
    selectedRegion
  } = useApp();

  const dailyFact = DAILY_FACTS[0];

  const filteredHeritage = selectedRegion === 'All'
    ? HERITAGE_ITEMS
    : HERITAGE_ITEMS.filter(item => item.region === selectedRegion);

  const heroItem = HERITAGE_ITEMS[0]; // Taj Mahal

  return (
    <div className="space-y-8 pb-12">
      {/* Featured Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src={heroItem.imageUrl}
            alt={heroItem.title}
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transition-transform duration-1000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-3xl flex flex-col justify-end min-h-[360px]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 uppercase tracking-wider">
              Featured Global Monument
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 border border-slate-700 text-slate-200 backdrop-blur-md">
              {heroItem.country} • {heroItem.region}
            </span>
            {heroItem.isUnesco && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 border border-blue-400 text-blue-300 backdrop-blur-md">
                UNESCO World Heritage Site
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-100 drop-shadow-md">
            {heroItem.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 font-light line-clamp-3">
            {heroItem.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openHeritageDetail(heroItem.id)}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
            >
              Discover Full Heritage Profile
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('tours')}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-md flex items-center gap-2 transition-all"
            >
              <PlayCircle className="w-4 h-4 text-amber-400" />
              Launch 360° Virtual Tour
            </button>

            <button
              type="button"
              onClick={() => speakText(heroItem.description)}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 backdrop-blur-md"
              title="Listen to Description"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Daily Cultural Fact & Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Cultural Fact */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/20 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              Daily Cultural Revelation
            </div>
            <span className="text-[11px] text-slate-500">{dailyFact.category} • {dailyFact.country}</span>
          </div>

          <h3 className="text-lg font-serif font-bold text-amber-200">
            {dailyFact.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {dailyFact.content}
          </p>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => speakText(dailyFact.content)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-medium"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Listen to Narration
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('quiz')}
              className="text-xs text-slate-300 hover:text-amber-300 flex items-center gap-1"
            >
              Challenge This Topic in Quiz →
            </button>
          </div>
        </div>

        {/* Quick Quiz & Exploration Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4" />
              Daily Heritage Challenge
            </div>
            <h4 className="text-base font-serif font-bold text-slate-100">
              Test Your World Knowledge
            </h4>
            <p className="mt-1 text-xs text-slate-400">
              Answer 5 questions from UNESCO archives and earn up to 75 points toward your global rank.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={() => setCurrentView('quiz')}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20"
            >
              Start Quick Quiz Challenge
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('ai-guide')}
              className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 border border-slate-800 font-medium text-xs flex items-center justify-center gap-2 transition-all"
            >
              Ask Virasat AI Guide
            </button>
          </div>
        </div>
      </div>

      {/* Curated Heritage Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-100">
              Explore Living Traditions & Monuments
            </h2>
            <p className="text-xs text-slate-400">
              {selectedRegion === 'All' ? 'Showing master heritage worldwide' : `Showing heritage from ${selectedRegion}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCurrentView('explore')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto"
          >
            Open Interactive Globe Map →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHeritage.map((item) => {
            const isSaved = isItemSaved(item.id);
            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 overflow-hidden flex flex-col shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveItem(item.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-700/80 backdrop-blur-md transition-colors"
                    title={isSaved ? 'Remove from Saved' : 'Save Collection'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                  </button>

                  {/* Category Pill */}
                  <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-950/90 text-amber-300 border border-slate-800 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>{item.country}</span>
                      <span>{item.period}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">
                      {item.isUnesco ? '⭐ UNESCO Listed' : '🏛️ National Heritage'}
                    </span>
                    <button
                      type="button"
                      onClick={() => openHeritageDetail(item.id)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      Explore Details →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Countries Horizon */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-bold text-slate-100">
            Featured Cultural Territories
          </h2>
          <button
            type="button"
            onClick={() => setCurrentView('countries')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            View All Countries Directory →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {COUNTRIES.slice(0, 4).map((country) => (
            <div
              key={country.code}
              onClick={() => setCurrentView('countries')}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all hover:bg-slate-800/60 group"
            >
              <div className="text-3xl mb-2">{country.flag}</div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                {country.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{country.region} • {country.capital}</p>
              <div className="mt-2 text-[10px] text-amber-400/90 font-medium">
                {country.unescoSitesCount} World Heritage Sites
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Cultural Calendar & Events */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-serif font-bold text-slate-100">
              Global Cultural Calendar
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCurrentView('community')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            Open Full Community & Events Hub →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CULTURAL_EVENTS.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {event.type}
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-2">
                  {event.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {event.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>📍 {event.cityOrRegion}, {event.country}</span>
                <span className="text-amber-400/90 font-medium">{event.dateRange}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

