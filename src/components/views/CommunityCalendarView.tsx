'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CULTURAL_EVENTS, CulturalEventItem } from '@/data/mockData';
import {
  Calendar,
  Users,
  MessageSquare,
  Send,
  UploadCloud,
  CheckCircle2,
  Shield,
  MapPin,
  Sparkles
} from 'lucide-react';

export const CommunityCalendarView: React.FC = () => {
  const { user, addPoints } = useApp();
  const [activeTab, setActiveTab] = useState<'calendar' | 'community' | 'submit'>('calendar');

  // Community discussion state
  const [posts, setPosts] = useState([
    {
      id: 'p1',
      author: 'Aarav Patel',
      role: 'Learner',
      country: 'India',
      title: 'Preserving the hand-carved jali stone lattice techniques of Fatehpur Sikri',
      body: 'During my virtual tour and discussions with local stone carvers in Agra, I observed how light and air circulation were mathematically calculated without air conditioning.',
      likes: 24,
      comments: 6
    },
    {
      id: 'p2',
      author: 'Fatima Al-Mansoor',
      role: 'Researcher',
      country: 'Egypt',
      title: 'Ancient bread fermentation and culinary sourdough lineages in Nubia',
      body: 'Examining tomb reliefs that show identical micro-bakery steps to the solar sourdoughs still baked in Upper Egypt today. Intangible heritage lives on through food!',
      likes: 38,
      comments: 11
    }
  ]);

  // Submit story form
  const [storyTitle, setStoryTitle] = useState('');
  const [storyCountry, setStoryCountry] = useState('');
  const [storyCategory, setStoryCategory] = useState('Festivals & Traditions');
  const [storyContent, setStoryContent] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle || !storyContent) return;

    setPosts([
      {
        id: 'post-' + Date.now(),
        author: user?.name || 'Cultural Contributor',
        role: user?.role || 'Learner',
        country: storyCountry || 'Global',
        title: storyTitle,
        body: storyContent,
        likes: 1,
        comments: 0
      },
      ...posts
    ]);

    setSubmittedSuccess(true);
    addPoints(30);
    setTimeout(() => {
      setStoryTitle('');
      setStoryCountry('');
      setStoryContent('');
      setSubmittedSuccess(false);
      setActiveTab('community');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-200">
            Cultural Calendar & Community Exchange
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global festival dates, community-submitted oral histories, and peer discussions.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'calendar'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Cultural Calendar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('community')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'community'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Community Forum
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'submit'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Contribute Story
          </button>
        </div>
      </div>

      {/* 1. CALENDAR TAB */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CULTURAL_EVENTS.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {event.type}
                    </span>
                    <span className="text-[11px] text-amber-300 font-semibold">{event.dateRange}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-slate-100 mt-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {event.cityOrRegion}, {event.country}
                  </p>
                  <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 font-light">
                    {event.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{event.isOnline ? '🌐 Worldwide Virtual Hub' : '📍 In-Person Pilgrimage'}</span>
                  <button
                    type="button"
                    onClick={() => alert(`RSVP recorded for ${event.title}! Reminder scheduled.`)}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    RSVP / Save Date
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. COMMUNITY FORUM TAB */}
      {activeTab === 'community' && (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[11px]">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-200">{post.author}</span>
                    <span className="text-slate-500 text-[10px] ml-2">({post.role} • {post.country})</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">Peer Reviewed</span>
              </div>

              <h4 className="text-base font-serif font-bold text-amber-200">{post.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">{post.body}</p>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => alert('Appreciated cultural insight!')}
                  className="hover:text-amber-400 flex items-center gap-1 font-medium"
                >
                  ❤️ {post.likes} Appreciations
                </button>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> {post.comments} Responses
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. SUBMIT STORY TAB */}
      {activeTab === 'submit' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xl font-serif font-bold text-amber-200">
              Submit Cultural Story or Living Photograph
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Community submissions are reviewed by cultural custodians and preserved with fair attribution under Open Cultural Licensing.
            </p>
          </div>

          <form onSubmit={handleSubmitStory} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Story or Tradition Title</label>
              <input
                type="text"
                required
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="e.g. The forgotten natural indigo dyers of Chettinad"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Associated Country or Community</label>
                <input
                  type="text"
                  required
                  value={storyCountry}
                  onChange={(e) => setStoryCountry(e.target.value)}
                  placeholder="e.g. India, Peru, Morocco..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Domain</label>
                <select
                  value={storyCategory}
                  onChange={(e) => setStoryCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="Festivals & Traditions">Festivals & Traditions</option>
                  <option value="Traditional Crafts">Traditional Crafts</option>
                  <option value="Indigenous Custody">Indigenous Custody</option>
                  <option value="Music & Oral Epics">Music & Oral Epics</option>
                  <option value="Culinary Lineage">Culinary Lineage</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Oral Narrative or Contextual Details</label>
              <textarea
                required
                rows={5}
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
                placeholder="Describe the significance, materials, generational history, and local names..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            {submittedSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Submitted to Moderation Board! Earned +30 Cultural Guardian Points.
              </div>
            ) : (
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <UploadCloud className="w-4 h-4" />
                Submit for Archival Review (+30 Pts)
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

