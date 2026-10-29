'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { HERITAGE_ITEMS } from '@/data/mockData';
import {
  TrendingUp,
  Award,
  Flame,
  Bookmark,
  CheckCircle2,
  Calendar,
  Compass,
  Download,
  Trash2,
  ArrowRight
} from 'lucide-react';

export const UserProgressView: React.FC = () => {
  const { user, savedItems, openHeritageDetail, toggleSaveItem } = useApp();

  const savedHeritage = HERITAGE_ITEMS.filter(h => savedItems.includes(h.id));

  const badges = [
    { name: 'Pioneer Explorer', desc: 'Initiated first global cultural journey', icon: '🌍', unlocked: true },
    { name: 'Seven Wonders Voyager', desc: 'Explored monuments across 4+ continents', icon: '🏛️', unlocked: true },
    { name: 'UNESCO Knowledge Guard', desc: 'Scored 100% on expert archaeological quiz', icon: '⭐', unlocked: true },
    { name: 'Artisan Patron', desc: 'Explored master indigenous craft profiles', icon: '🎨', unlocked: true },
    { name: 'Polyglot Enthusiast', desc: 'Studied indigenous scripts and dialects', icon: '📜', unlocked: false },
    { name: 'Global Ambassador', desc: 'Completed 15 consecutive daily cultural streaks', icon: '🔥', unlocked: false }
  ];

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'virasat_user_learning_profile.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-200">
            Explorer Learning Horizon
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personalized dashboard tracking streaks, cultural points, achievements, and saved collections.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportData}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-300 hover:bg-slate-800 flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          Export Learning Data (JSON)
        </button>
      </div>

      {/* User Stats Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-100">{user?.streakDays || 3} <span className="text-sm font-normal text-slate-400">Days</span></div>
          <span className="text-[10px] text-emerald-400 mt-1">Active daily streak</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Heritage Points</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 text-3xl font-bold text-amber-300">{user?.points || 250} <span className="text-sm font-normal text-slate-400">Pts</span></div>
          <span className="text-[10px] text-amber-400/80 mt-1">Rank: Cultural Guardian</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Saved Collections</span>
            <Bookmark className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-100">{savedHeritage.length} <span className="text-sm font-normal text-slate-400">Items</span></div>
          <span className="text-[10px] text-slate-400 mt-1">Bookmarked worldwide</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Learning Level</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-100">{user?.learningLevel || 'Beginner'}</div>
          <span className="text-[10px] text-slate-400 mt-1">Adaptive curriculum active</span>
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-slate-100">
          Earned Heritage Medals & Badges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                b.unlocked
                  ? 'bg-slate-900 border-amber-500/30 shadow-md'
                  : 'bg-slate-950 border-slate-800/80 opacity-50'
              }`}
            >
              <div className="text-3xl shrink-0 p-2 rounded-xl bg-slate-950 border border-slate-800">
                {b.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-100">{b.name}</h4>
                  {b.unlocked && <span className="text-[9px] px-1.5 rounded bg-emerald-500/20 text-emerald-300">Unlocked</span>}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bookmarked Collections Grid */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-slate-100">
            My Bookmarked Cultural Treasures ({savedHeritage.length})
          </h3>
        </div>

        {savedHeritage.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-800 rounded-2xl">
            You haven&apos;t saved any heritage items yet. Click the bookmark icon on any monument, traditional textile, or dance style!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedHeritage.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-36 rounded-xl object-cover mb-3"
                  />
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    {item.category} • {item.country}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.significance}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => openHeritageDetail(item.id)}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    Open Dossier →
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSaveItem(item.id)}
                    className="text-slate-500 hover:text-rose-400"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

