'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CulturalHeritageItem, HERITAGE_ITEMS, ARTISAN_PRODUCTS, ArtisanProductItem } from '@/data/mockData';

export type UserRole = 'learner' | 'artisan' | 'educator' | 'researcher' | 'admin' | 'guest';
export type ViewTab =
  | 'home'
  | 'explore'
  | 'countries'
  | 'images'
  | 'monuments'
  | 'tours'
  | 'architecture'
  | 'festivals'
  | 'music-dance'
  | 'languages'
  | 'food'
  | 'indigenous'
  | 'quiz'
  | 'ai-guide'
  | 'marketplace'
  | 'saved'
  | 'progress'
  | 'community'
  | 'settings'
  | 'topic-detail';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  country: string;
  preferredLanguage: string;
  learningLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  interests: string[];
  points: number;
  streakDays: number;
  completedQuizzes: number;
  badges: string[];
}

export interface CartItem {
  product: ArtisanProductItem;
  quantity: number;
}

interface AppContextType {
  // Auth
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole, guest?: boolean) => void;
  logout: () => void;
  register: (details: Partial<UserProfile>) => void;
  
  // Navigation & Views
  currentView: ViewTab;
  setCurrentView: (view: ViewTab) => void;
  selectedHeritageId: string | null;
  openHeritageDetail: (id: string) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  
  // Bookmarks
  savedItems: string[];
  toggleSaveItem: (id: string) => void;
  isItemSaved: (id: string) => boolean;
  
  // Marketplace Cart
  cart: CartItem[];
  addToCart: (product: ArtisanProductItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  // Accessibility
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  fontSize: 'normal' | 'large' | 'extra';
  setFontSize: (size: 'normal' | 'large' | 'extra') => void;
  lowBandwidth: boolean;
  setLowBandwidth: (val: boolean) => void;
  simplifiedMode: boolean;
  setSimplifiedMode: (val: boolean) => void;
  speechEnabled: boolean;
  setSpeechEnabled: (val: boolean) => void;
  speakText: (text: string) => void;
  
  // Gamification
  addPoints: (pts: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<ViewTab>('home');
  const [selectedHeritageId, setSelectedHeritageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedItems, setSavedItems] = useState<string[]>(['taj-mahal', 'machu-picchu']);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Accessibility
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra'>('normal');
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [simplifiedMode, setSimplifiedMode] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  // Default guest session so user can jump in or use auth screen
  const login = (email: string, role: UserRole, guest = false) => {
    setUser({
      id: guest ? 'guest-001' : 'user-' + Date.now(),
      name: guest ? 'Global Explorer (Guest)' : email.split('@')[0],
      email: guest ? 'guest@virasatconnect.org' : email,
      role: role,
      country: 'Global',
      preferredLanguage: 'English',
      learningLevel: 'Beginner',
      interests: ['Architecture', 'Ancient Civilizations', 'Textiles'],
      points: guest ? 50 : 250,
      streakDays: 3,
      completedQuizzes: 2,
      badges: ['First Step Explorer', 'World Heritage Novice', 'Cultural Preserver']
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = (details: Partial<UserProfile>) => {
    setUser({
      id: 'user-' + Date.now(),
      name: details.name || 'Heritage Enthusiast',
      email: details.email || 'user@virasat.org',
      role: details.role || 'learner',
      country: details.country || 'Global',
      preferredLanguage: details.preferredLanguage || 'English',
      learningLevel: details.learningLevel || 'Beginner',
      interests: details.interests || ['Monuments', 'Music'],
      points: 100,
      streakDays: 1,
      completedQuizzes: 0,
      badges: ['Pioneer Explorer']
    });
  };

  const openHeritageDetail = (id: string) => {
    setSelectedHeritageId(id);
    setCurrentView('topic-detail');
  };

  const toggleSaveItem = (id: string) => {
    setSavedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isItemSaved = (id: string) => savedItems.includes(id);

  const addToCart = (product: ArtisanProductItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addPoints = (pts: number) => {
    if (user) {
      setUser({ ...user, points: user.points + pts });
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && speechEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        currentView,
        setCurrentView,
        selectedHeritageId,
        openHeritageDetail,
        searchQuery,
        setSearchQuery,
        selectedRegion,
        setSelectedRegion,
        selectedCategory,
        setSelectedCategory,
        savedItems,
        toggleSaveItem,
        isItemSaved,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        lowBandwidth,
        setLowBandwidth,
        simplifiedMode,
        setSimplifiedMode,
        speechEnabled,
        setSpeechEnabled,
        speakText,
        addPoints
      }}
    >
      <div
        className={`min-h-screen ${
          highContrast ? 'contrast-125 bg-black text-amber-300' : 'bg-slate-950 text-slate-100'
        } ${
          fontSize === 'large' ? 'text-lg' : fontSize === 'extra' ? 'text-xl' : 'text-base'
        }`}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

