'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HERITAGE_ITEMS } from '@/data/mockData';
import {
  Bookmark,
  BookmarkCheck,
  Share2,
  Volume2,
  Calendar,
  MapPin,
  Bot,
  Gamepad2,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';

export const TopicDetailView: React.FC = () => {
  const {
    selectedHeritageId,
    setCurrentView,
    toggleSaveItem,
    isItemSaved,
    speakText,
    addPoints
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'architecture' | 'timeline' | 'sources'>('overview');
  const [userQuestion, setUserQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const item = HERITAGE_ITEMS.find(h => h.id === selectedHeritageId) || HERITAGE_ITEMS[0];
  const isSaved = isItemSaved(item.id);

  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setAiAnswer(
      `According to verified UNESCO and institutional archives, ${item.title} (${item.period}) reflects key historical developments in ${item.country}. Specifically regarding "${userQuestion}": The monument exhibits unique engineering principles, utilizing ${item.materialsUsed?.join(', ') || 'ancestral methods'} and carrying deep spiritual resonance for local communities.`
    );
    addPoints(10);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Global Dashboard
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSaveItem(item.id)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-all"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            {isSaved ? 'Saved in Collections' : 'Save to Collections'}
          </button>
          <button
            type="button"
            onClick={() => speakText(`${item.title}. ${item.description}`)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
            title="Read Aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="h-96 relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                {item.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900/90 text-slate-200 border border-slate-700">
                {item.country} • {item.region}
              </span>
              {item.isUnesco && (
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-blue-500/20 text-blue-300 border border-blue-400">
                  UNESCO Inscribed ({item.unescoYear})
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-100 drop-shadow-md">
              {item.title}
            </h1>
            {item.localName && (
              <span className="text-sm text-amber-300 font-medium">{item.localName}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('tours')}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 self-start sm:self-auto shrink-0"
          >
            <Eye className="w-4 h-4" />
            Launch 360° Walkthrough
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Detailed Content */}
      <div className="flex border-b border-slate-800 space-x-4">
        {[
          { id: 'overview', label: 'Overview & Significance' },
          { id: 'history', label: 'History & People' },
          { id: 'architecture', label: 'Architecture & Materials' },
          { id: 'timeline', label: 'Chronological Timeline' },
          { id: 'sources', label: 'Verified Sources & Citations' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-lg font-serif font-bold text-amber-200">
                Introduction & Cultural Significance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {item.description}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {item.significance}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-lg font-serif font-bold text-amber-200">
                Living Traditions & Oral Narratives
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {item.culturalStories}
              </p>
            </div>

            {/* Gallery Images */}
            {item.galleryImages && item.galleryImages.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-slate-100">
                  Archival Visual Gallery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {item.galleryImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${item.title} gallery ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-xl border border-slate-800 hover:opacity-90 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side Specifications Panel */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-serif font-bold text-slate-100 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2">
                Heritage Specification
              </h4>
              <div><strong className="text-slate-400">Country:</strong> <span className="text-slate-200">{item.country}</span></div>
              <div><strong className="text-slate-400">Historical Period:</strong> <span className="text-slate-200">{item.period}</span></div>
              <div><strong className="text-slate-400">Year Established:</strong> <span className="text-slate-200">{item.yearEstablished || 'Ancient Origins'}</span></div>
              <div><strong className="text-slate-400">Style:</strong> <span className="text-slate-200">{item.architecturalStyle || 'Living Intangible Art'}</span></div>
              <div><strong className="text-slate-400">Coordinates:</strong> <span className="text-slate-200">{item.latitude}° N, {item.longitude}° E</span></div>
              <div><strong className="text-slate-400">Protection Status:</strong> <span className="text-amber-300">{item.isUnesco ? 'International UNESCO Treaty' : 'State Antiquities Act'}</span></div>
            </div>

            {/* Quick Quiz on this Topic */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-3">
              <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                Topic Quiz Challenge
              </h4>
              <p className="text-slate-300">
                Test your mastery on {item.title}&apos;s construction, cultural symbolism, and architectural secrets.
              </p>
              <button
                type="button"
                onClick={() => setCurrentView('quiz')}
                className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all"
              >
                Launch Topic Quiz (15 Pts)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: History & People */}
      {activeTab === 'history' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h3 className="text-lg font-serif font-bold text-amber-200">
            Historical Backdrop & Key Figures
          </h3>
          <p>
            The creation and evolution of {item.title} reflects the sociopolitical, economic, and spiritual currents of its era ({item.period}).
            Master builders, visionaries, artisan guilds, and community custodians sustained this tradition across changing dynasties and empires.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-amber-300/90 font-medium">
            💡 Educational Note: Virasat Connect Global strictly distinguishes between verified archaeological evidence, liturgical traditions, and popular folktales.
          </div>
        </div>
      )}

      {/* Tab 3: Architecture & Materials */}
      {activeTab === 'architecture' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300">
          <h3 className="text-lg font-serif font-bold text-amber-200">
            Materials, Engineering & Architectural Synthesis
          </h3>
          <p>
            Style Classification: <span className="text-amber-300 font-semibold">{item.architecturalStyle || 'Vernacular / Traditional'}</span>
          </p>
          <div>
            <h4 className="text-sm font-bold text-slate-100 mb-2">Authentic Materials Employed:</h4>
            <div className="flex flex-wrap gap-2">
              {item.materialsUsed?.map((mat, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                  {mat}
                </span>
              )) || <span>Natural regional materials and living craftsmanship</span>}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Chronological Timeline */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-lg font-serif font-bold text-amber-200">
            Development Timeline
          </h3>
          <div className="relative border-l-2 border-amber-500/40 ml-4 pl-6 space-y-6 text-xs sm:text-sm">
            {item.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-400" />
                <span className="font-mono text-xs font-bold text-amber-400">{step.year}</span>
                <p className="text-slate-200 mt-0.5">{step.event}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Sources & Citations */}
      {activeTab === 'sources' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-lg font-serif font-bold text-amber-200">
            Verified Archives, Citations & Open Licenses
          </h3>
          <p className="text-slate-400">
            Every datum on Virasat Connect Global is attributed to recognized public institutions, open-data registries, and community protocols:
          </p>
          <div className="space-y-2">
            {item.sources.map((s, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">{s.name}</div>
                  <div className="text-[10px] text-slate-400">License: {s.license}</div>
                </div>
                {s.url && (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    View Source <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrated AI Cultural Q&A for this Monument */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border border-indigo-500/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
          <Bot className="w-4 h-4" />
          Interactive AI Consultation — Ask Virasat Guide About {item.title}
        </div>

        <form onSubmit={handleAskAi} className="flex gap-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder={`Ask anything about ${item.title} (e.g. "Why are the minarets tilted?" or "Who were the artisans?")...`}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs"
          >
            Consult AI
          </button>
        </form>

        {aiAnswer && (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/20 text-xs text-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-indigo-300">
              <span>Virasat Guide Response:</span>
              <button
                type="button"
                onClick={() => speakText(aiAnswer)}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3" /> Read Aloud
              </button>
            </div>
            <p className="leading-relaxed font-light">{aiAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

