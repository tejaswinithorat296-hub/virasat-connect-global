'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COUNTRIES, HERITAGE_ITEMS } from '@/data/mockData';
import { Search, Flag, Globe, Landmark, Languages, ArrowRight } from 'lucide-react';

export const CountriesView: React.FC = () => {
  const { openHeritageDetail, setCurrentView } = useApp();
  const [filterRegion, setFilterRegion] = useState('All');
  const [searchCountry, setSearchCountry] = useState('');

  const filteredCountries = COUNTRIES.filter(c => {
    const matchesRegion = filterRegion === 'All' || c.region === filterRegion;
    const matchesSearch = c.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
                          c.languages.some(l => l.toLowerCase().includes(searchCountry.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-200">
            Countries & Territories Cultural Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse sovereign nations and autonomous cultural territories worldwide.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              placeholder="Search by country or language..."
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 focus:outline-none focus:border-amber-400"
          >
            <option value="All">All Continents</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => {
          const countryHeritageItems = HERITAGE_ITEMS.filter(h => h.country.toLowerCase().includes(country.name.toLowerCase()));

          return (
            <div
              key={country.code}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl">{country.flag}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800">
                    {country.code}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                  {country.name}
                </h3>
                <span className="text-xs text-slate-500 font-medium">{country.nativeName}</span>

                <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>{country.region} • Capital: {country.capital}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Languages className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">{country.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>{country.unescoSitesCount} UNESCO Inscribed Sites</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-300 font-light line-clamp-3">
                  {country.culturalSummary}
                </p>

                {/* Cultural Highlights Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {country.keyTraditions.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                {countryHeritageItems.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => openHeritageDetail(countryHeritageItems[0].id)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    Explore Sites ({countryHeritageItems.length}) →
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500">Expansions in progress</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

