'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { AuthScreen } from '@/components/AuthScreen';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

// Views
import { HomeDashboard } from '@/components/views/HomeDashboard';
import { ExploreWorldView } from '@/components/views/ExploreWorldView';
import { CountriesView } from '@/components/views/CountriesView';
import { ImageLibraryView } from '@/components/views/ImageLibraryView';
import { TopicDetailView } from '@/components/views/TopicDetailView';
import { VirtualToursView } from '@/components/views/VirtualToursView';
import { QuizView } from '@/components/views/QuizView';
import { AIGuideView } from '@/components/views/AIGuideView';
import { MarketplaceView } from '@/components/views/MarketplaceView';
import { CommunityCalendarView } from '@/components/views/CommunityCalendarView';
import { UserProgressView } from '@/components/views/UserProgressView';
import { SettingsAccessibilityView } from '@/components/views/SettingsAccessibilityView';
import { CategoryListView } from '@/components/views/CategoryListView';

const MainAppContent: React.FC = () => {
  const { user, currentView } = useApp();

  // If no authenticated user or guest, show the rich first-screen Auth Interface
  if (!user) {
    return <AuthScreen />;
  }

  // Active view router
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeDashboard />;
      case 'explore':
        return <ExploreWorldView />;
      case 'countries':
        return <CountriesView />;
      case 'images':
        return <ImageLibraryView />;
      case 'monuments':
        return (
          <CategoryListView
            categoryTitle="Monuments & Historical Sites"
            categoryFilter="Monuments"
            description="Explore historical fortifications, monolithic structures, palaces, and archaeological complexes spanning every continent."
          />
        );
      case 'tours':
        return <VirtualToursView />;
      case 'architecture':
        return (
          <CategoryListView
            categoryTitle="Art & Monumental Architecture"
            categoryFilter="Architecture"
            description="Examine structural engineering marvels, vaulted arches, stone carvings, and sacred geometry."
          />
        );
      case 'festivals':
        return (
          <CategoryListView
            categoryTitle="Festivals & Living Traditions"
            categoryFilter="Festivals"
            description="Celebrate communal gatherings, seasonal solstices, and rites honoring ancestral memory."
          />
        );
      case 'music-dance':
        return (
          <CategoryListView
            categoryTitle="Music & Dance Heritage"
            categoryFilter="Music"
            description="From flamenco compás and classical ragas to West African talking drums and Andean panpipes."
          />
        );
      case 'languages':
        return (
          <CategoryListView
            categoryTitle="Languages, Literature & Scripts"
            categoryFilter="Languages"
            description="Indigenous oral epics, ancient hieroglyphic scripts, and endangered mother tongues."
          />
        );
      case 'food':
        return (
          <CategoryListView
            categoryTitle="Traditional Attire & Culinary Heritage"
            categoryFilter="Clothing"
            description="Centuries-old weaving techniques, royal regalia, natural pigments, and heritage food preparation."
          />
        );
      case 'indigenous':
        return (
          <CategoryListView
            categoryTitle="Indigenous Traditions & Custodianship"
            categoryFilter="Indigenous"
            description="Centuries-old living cultures, ancestral Dreamtime songlines, and traditional ecological knowledge."
          />
        );
      case 'quiz':
        return <QuizView />;
      case 'ai-guide':
        return <AIGuideView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'saved':
      case 'progress':
        return <UserProgressView />;
      case 'community':
        return <CommunityCalendarView />;
      case 'settings':
        return <SettingsAccessibilityView />;
      case 'topic-detail':
        return <TopicDetailView />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* 19-item Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Global Search & Accessibility Header */}
        <Header />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 custom-scrollbar">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
