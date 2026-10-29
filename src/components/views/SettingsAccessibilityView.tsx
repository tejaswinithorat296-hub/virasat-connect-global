'use client';

import React, { useState } from 'react';
import { useApp, UserRole } from '@/context/AppContext';
import { HERITAGE_ITEMS } from '@/data/mockData';
import {
  Settings,
  Shield,
  SlidersHorizontal,
  Volume2,
  Wifi,
  Eye,
  CheckCircle2,
  FileText,
  AlertTriangle,
  BarChart3,
  PlusCircle,
  Database
} from 'lucide-react';

export const SettingsAccessibilityView: React.FC = () => {
  const {
    user,
    login,
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    lowBandwidth,
    setLowBandwidth,
    simplifiedMode,
    setSimplifiedMode,
    speechEnabled,
    setSpeechEnabled
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'content' | 'moderation' | 'analytics'>('content');
  const [newTitle, setNewTitle] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newCategory, setNewCategory] = useState('Monuments & Architecture');
  const [newDesc, setNewDesc] = useState('');
  const [itemsList, setItemsList] = useState(HERITAGE_ITEMS);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleRoleChange = (role: UserRole) => {
    if (user) {
      login(user.email, role);
      setActionNotice(`Switched role to ${role.toUpperCase()}`);
      setTimeout(() => setActionNotice(null), 2500);
    }
  };

  const handleAddHeritageArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCountry) return;

    const newItem = {
      id: 'custom-' + Date.now(),
      title: newTitle,
      country: newCountry,
      region: 'Asia' as const,
      subregion: 'Global',
      category: newCategory as any,
      period: 'Living Heritage Era',
      description: newDesc || 'Verified cultural asset inscribed via administrative node.',
      significance: 'Protected under administrative registry protocols.',
      culturalStories: 'Archived via administrative portal.',
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      galleryImages: [],
      isUnesco: false,
      latitude: 0,
      longitude: 0,
      tags: ['Admin Inscribed', newCountry],
      sources: [{ name: 'Virasat Editorial Board', license: 'CC-BY-SA 4.0' }],
      timeline: [{ year: '2026', event: 'Inscribed into global digital register.' }]
    };

    setItemsList([newItem, ...itemsList]);
    setNewTitle('');
    setNewCountry('');
    setNewDesc('');
    setActionNotice('New cultural article published and verified!');
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-3xl font-serif font-bold text-amber-200">
          Settings, Accessibility & Governance
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize sensory adaptability, learning preferences, and administrative controls.
        </p>
      </div>

      {actionNotice && (
        <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {actionNotice}
        </div>
      )}

      {/* Accessibility & Adaptability Matrix */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-serif font-bold text-slate-100 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-400" />
          Universal Accessibility & Sensory Comfort
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {/* Contrast */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block">High Contrast Interface</span>
              <span className="text-slate-500">Increases WCAG AAA luminance ratio</span>
            </div>
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                highContrast ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {highContrast ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Text Size */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block">Relative Text Scale</span>
              <span className="text-slate-500">Normal / Large / Extra Large</span>
            </div>
            <div className="flex items-center gap-1">
              {(['normal', 'large', 'extra'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setFontSize(sz)}
                  className={`px-2.5 py-1 rounded-lg uppercase text-[11px] font-bold ${
                    fontSize === sz ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {sz === 'normal' ? 'Std' : sz === 'large' ? '125%' : '150%'}
                </button>
              ))}
            </div>
          </div>

          {/* Low Bandwidth */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block">Lite Bandwidth Mode</span>
              <span className="text-slate-500">Compresses heavy assets for remote areas</span>
            </div>
            <button
              type="button"
              onClick={() => setLowBandwidth(!lowBandwidth)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                lowBandwidth ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {lowBandwidth ? 'Lite Active' : 'Full HD'}
            </button>
          </div>

          {/* Voice Narrator */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-200 block">Auditory Narration Engine</span>
              <span className="text-slate-500">Read cultural dossiers aloud automatically</span>
            </div>
            <button
              type="button"
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all ${
                speechEnabled ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {speechEnabled ? 'Active' : 'Muted'}
            </button>
          </div>
        </div>
      </div>

      {/* Role Horizon Switcher (For Pair Programming / Evaluation) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-lg font-serif font-bold text-slate-100 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Switch Role Profile Interface
        </h3>
        <p className="text-xs text-slate-400">
          Current Active Role: <strong className="text-amber-300 capitalize">{user?.role || 'Learner'}</strong>. Switch to examine role-specific layouts:
        </p>

        <div className="flex flex-wrap gap-2">
          {(['learner', 'artisan', 'educator', 'researcher', 'admin'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleChange(r)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                user?.role === r
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {r} Interface
            </button>
          ))}
        </div>
      </div>

      {/* Administrator & Content Manager Dashboard (Section 14 of Master Prompt) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Shield className="w-4 h-4" />
              Administrative Governance & Content Management (CMS)
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-100 mt-1">
              Curatorial Verification Board
            </h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveAdminTab('content')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                activeAdminTab === 'content' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
              }`}
            >
              Article Management
            </button>
            <button
              type="button"
              onClick={() => setActiveAdminTab('moderation')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                activeAdminTab === 'moderation' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
              }`}
            >
              Takedowns & Citations
            </button>
            <button
              type="button"
              onClick={() => setActiveAdminTab('analytics')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                activeAdminTab === 'analytics' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
              }`}
            >
              Audit Analytics
            </button>
          </div>
        </div>

        {activeAdminTab === 'content' && (
          <div className="space-y-6">
            {/* Add New Heritage Record Form */}
            <form onSubmit={handleAddHeritageArticle} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4" /> Add & Publish New Heritage Record
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Monument or Tradition Title"
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  required
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  placeholder="Country / Territory"
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="Monuments & Architecture">Monuments & Architecture</option>
                  <option value="Temples & Sacred Sites">Temples & Sacred Sites</option>
                  <option value="Festivals & Celebrations">Festivals & Celebrations</option>
                  <option value="Clothing & Textiles">Clothing & Textiles</option>
                  <option value="Indigenous & Living Heritage">Indigenous & Living Heritage</option>
                </select>
              </div>
              <textarea
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Verified historical background and cultural significance..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
              >
                Inscribe Article & Assign DOI Citation
              </button>
            </form>

            {/* Existing Records Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="py-2 px-3">Title</th>
                    <th className="py-2 px-3">Country</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {itemsList.slice(0, 6).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-950/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-200">{item.title}</td>
                      <td className="py-2.5 px-3">{item.country}</td>
                      <td className="py-2.5 px-3 text-slate-400">{item.category}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400">
                          Verified
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Reviewing citation metadata for ${item.title}`)}
                          className="text-amber-400 hover:underline mr-3"
                        >
                          Audit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeAdminTab === 'moderation' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300">
            <h4 className="text-sm font-bold text-amber-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Community Sensitive Material & Correction Queue
            </h4>
            <p className="text-slate-400">
              Zero pending cultural takedown notices. All community requests for respectful restriction of sacred imagery are honored under indigenous protocol.
            </p>
          </div>
        )}

        {activeAdminTab === 'analytics' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500">Active Heritage Learners</span>
              <div className="text-2xl font-bold text-slate-100 mt-1">124,580</div>
              <span className="text-emerald-400 text-[10px]">+14% this month</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500">Quizzes Completed</span>
              <div className="text-2xl font-bold text-amber-300 mt-1">382,910</div>
              <span className="text-amber-400 text-[10px]">96.4% satisfaction</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500">Artisan Fair-Trade Payouts</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1">$482,100</div>
              <span className="text-slate-400 text-[10px]">Direct community benefit</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

