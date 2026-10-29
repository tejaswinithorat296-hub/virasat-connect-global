'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { HERITAGE_ITEMS } from '@/data/mockData';
import { Bookmark, BookmarkCheck, ArrowRight, Sparkles } from 'lucide-react';

interface CategoryListViewProps {
  categoryTitle: string;
  categoryFilter?: string;
  description: string;
}

export const CategoryListView: React.FC<CategoryListViewProps> = ({
  categoryTitle,
  categoryFilter,
  description
}) => {
  const { openHeritageDetail, toggleSaveItem, isItemSaved } = useApp();

  const items = categoryFilter
    ? HERITAGE_ITEMS.filter(h => h.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    : HERITAGE_ITEMS;

  const displayItems = items.length > 0 ? items : HERITAGE_ITEMS;

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          Dedicated Cultural Domain
        </div>
        <h1 className="text-3xl font-serif font-bold text-amber-200">
          {categoryTitle}
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => {
          const isSaved = isItemSaved(item.id);
          return (
            <div
              key={item.id}
              className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 overflow-hidden flex flex-col shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  type="button"
                  onClick={() => toggleSaveItem(item.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800 backdrop-blur-md"
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-950/90 text-amber-300 border border-slate-800">
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
                    {item.significance}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {item.isUnesco ? '⭐ UNESCO Listed' : '🏛️ Living Heritage'}
                  </span>
                  <button
                    type="button"
                    onClick={() => openHeritageDetail(item.id)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    Dossier Details →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

