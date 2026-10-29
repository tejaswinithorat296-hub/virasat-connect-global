'use client';

import React, { useState } from 'react';
import { useApp, ViewTab } from '@/context/AppContext';
import {
  Home,
  Globe,
  Flag,
  Image as ImageIcon,
  Landmark,
  Eye,
  Columns,
  Sparkles,
  Music,
  BookOpen,
  Utensils,
  Footprints,
  Gamepad2,
  Bot,
  ShoppingBag,
  Bookmark,
  TrendingUp,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldAlert
} from 'lucide-react';

interface NavItem {
  id: ViewTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  category?: string;
}

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, user, logout, savedItems, cart } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: '1. Home Dashboard', icon: Home, category: 'Core' },
    { id: 'explore', label: '2. Explore the World', icon: Globe, badge: 'Interactive', category: 'Discovery' },
    { id: 'countries', label: '3. Countries & Cultures', icon: Flag, category: 'Discovery' },
    { id: 'images', label: '4. Heritage Images', icon: ImageIcon, category: 'Visual Library' },
    { id: 'monuments', label: '5. Monuments & Sites', icon: Landmark, category: 'Heritage Topics' },
    { id: 'tours', label: '6. Virtual 360° Tours', icon: Eye, badge: '360°', category: 'Immersive' },
    { id: 'architecture', label: '7. Art & Architecture', icon: Columns, category: 'Heritage Topics' },
    { id: 'festivals', label: '8. Festivals & Traditions', icon: Sparkles, category: 'Living Heritage' },
    { id: 'music-dance', label: '9. Music & Dance', icon: Music, category: 'Living Heritage' },
    { id: 'languages', label: '10. Languages & Literature', icon: BookOpen, category: 'Living Heritage' },
    { id: 'food', label: '11. Food & Traditional Attire', icon: Utensils, category: 'Living Heritage' },
    { id: 'indigenous', label: '12. Indigenous Heritage', icon: Footprints, badge: 'Ancestral', category: 'Living Heritage' },
    { id: 'quiz', label: '13. Learn & Play (Quizzes)', icon: Gamepad2, badge: 'Quizzes', category: 'Education' },
    { id: 'ai-guide', label: '14. AI Cultural Guide', icon: Bot, badge: 'Virasat AI', category: 'Education' },
    { id: 'marketplace', label: '15. Artisan Marketplace', icon: ShoppingBag, badge: cart.length > 0 ? `${cart.length}` : undefined, category: 'Commerce' },
    { id: 'saved', label: '16. Saved Collections', icon: Bookmark, badge: savedItems.length > 0 ? `${savedItems.length}` : undefined, category: 'Personal' },
    { id: 'progress', label: '17. My Learning Progress', icon: TrendingUp, category: 'Personal' },
    { id: 'community', label: '18. Community & Calendar', icon: Users, category: 'Network' },
    { id: 'settings', label: '19. Settings & Accessibility', icon: Settings, category: 'System' }
  ];

  return (
    <aside
      className={`relative z-20 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out select-none ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16">
        {!collapsed ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold font-serif shadow-md shadow-amber-500/20 shrink-0">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-amber-300 text-sm tracking-wide leading-tight truncate">
                Virasat Connect
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase truncate">
                Global Living Heritage
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold font-serif shadow-md">
            V
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* User Quick Info */}
      {user && !collapsed && (
        <div className="p-3 mx-3 my-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xs font-bold text-amber-300">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-slate-200 truncate">{user.name}</span>
            <span className="text-[10px] text-amber-400 capitalize flex items-center gap-1 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Role: {user.role}
            </span>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-xs shadow-amber-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />

              {!collapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold tracking-tight uppercase ${
                    isActive
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Role Indicator & Sign Out */}
      <div className="p-3 border-t border-slate-800 flex items-center justify-between">
        {!collapsed ? (
          <>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Global UNESCO Node</span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 font-medium px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Exit
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={logout}
            className="mx-auto p-2 rounded-lg text-rose-400 hover:bg-rose-500/10"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};

