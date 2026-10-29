'use client';

import React, { useState } from 'react';
import { useApp, UserRole } from '@/context/AppContext';
import {
  Globe,
  Compass,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  BookOpen,
  Palette,
  GraduationCap,
  Microscope,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { login, register } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('learner');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('Global');
  const [language, setLanguage] = useState('English');
  const [learningLevel, setLearningLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Beginner');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Monuments & Architecture',
    'Indigenous Traditions'
  ]);

  const allInterests = [
    'Monuments & Architecture',
    'Temples & Sacred Sites',
    'Festivals & Traditions',
    'Traditional Arts & Crafts',
    'Music & Dance',
    'Food & Culinary Traditions',
    'Clothing & Textiles',
    'Indigenous & Living Heritage',
    'Languages & Literature',
    'Archaeological Wonders'
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, selectedRole);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;
    register({
      name: fullName,
      email,
      role: selectedRole,
      country,
      preferredLanguage: language,
      learningLevel,
      interests: selectedInterests
    });
  };

  const handleGuestExplore = () => {
    login('guest@virasatconnect.org', 'guest', true);
  };

  const roles = [
    { id: 'learner', label: 'Learner', icon: BookOpen, desc: 'Interactive lessons, quizzes & 360° virtual tours' },
    { id: 'artisan', label: 'Artisan', icon: Palette, desc: 'Showcase crafts, preserve ancestral techniques & sell' },
    { id: 'educator', label: 'Educator', icon: GraduationCap, desc: 'Curate classroom collections & lesson plans' },
    { id: 'researcher', label: 'Researcher', icon: Microscope, desc: 'Archive metadata, historical citations & datasets' },
    { id: 'admin', label: 'Administrator', icon: Shield, desc: 'Content verification, community moderation & analytics' }
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-slate-950 text-slate-100 overflow-hidden px-4 py-12">
      {/* Background World Heritage Ambient Collage */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 h-full scale-105 filter blur-xs">
          <img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80" alt="Taj Mahal" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80" alt="Pyramids" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80" alt="Machu Picchu" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" alt="Colosseum" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80" alt="Japan Tea" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80" alt="Kente Cloth" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Floating Cultural Motifs & Header */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4 backdrop-blur-md">
          <Globe className="w-5 h-5 animate-pulse text-amber-400" />
          <span className="text-xs uppercase tracking-widest font-semibold">Explore The World&apos;s Living Heritage</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-md">
          Virasat Connect Global
        </h1>
        <p className="mt-3 text-lg md:text-xl text-slate-300 font-light max-w-2xl">
          Discover the Heritage of Our World. Every culture has a story. Explore yours and discover others.
        </p>

        {/* Global Language Selector Before Login */}
        <div className="mt-4 flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1 text-sm backdrop-blur-md">
          <Compass className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">Portal Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-amber-300 focus:outline-none cursor-pointer font-medium"
          >
            <option value="English" className="bg-slate-900">English (Global)</option>
            <option value="Hindi" className="bg-slate-900">हिन्दी (Hindi)</option>
            <option value="Spanish" className="bg-slate-900">Español (Spanish)</option>
            <option value="Arabic" className="bg-slate-900">العربية (Arabic)</option>
            <option value="French" className="bg-slate-900">Français (French)</option>
            <option value="Mandarin" className="bg-slate-900">中文 (Mandarin)</option>
            <option value="Swahili" className="bg-slate-900">Kiswahili</option>
            <option value="Japanese" className="bg-slate-900">日本語 (Japanese)</option>
          </select>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="relative z-10 w-full max-w-2xl bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Role Selector */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider text-amber-400 font-medium mb-2.5">
            Select Your Primary Horizon:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id as UserRole)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm shadow-amber-500/20'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="font-medium text-center">{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Toggle: Login vs Register */}
        <div className="flex border-b border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all ${
              mode === 'login'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In to Virasat
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all ${
              mode === 'register'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Create New Account
          </button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Email or Username</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="explorer@virasatconnect.org"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs text-slate-300 font-medium">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset verification link sent to registered email.'); }} className="text-xs text-amber-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500 bg-slate-950 border-slate-800 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 text-xs text-slate-400 cursor-pointer">
                Remember me on this trusted terminal
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-medium text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              Enter Heritage Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Amara Sen"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amara@culture.org"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Country or Region</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. India, Egypt, Peru, Ghana..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Learning Level</label>
                <select
                  value={learningLevel}
                  onChange={(e) => setLearningLevel(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="Beginner">Beginner (Introductory & Visual)</option>
                  <option value="Intermediate">Intermediate (Timelines & Context)</option>
                  <option value="Advanced">Advanced (Deep Analysis)</option>
                  <option value="Expert">Expert / Academic (Source Citations)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1.5">
                Cultural Curiosities (Select at least 2):
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                {allInterests.map((interest) => {
                  const isChecked = selectedInterests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {isChecked && '✓ '}
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure passphrase"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-medium text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              Complete Registration & Start Exploring
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Separator */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative bg-slate-900 px-3 text-xs uppercase tracking-wider text-slate-500">
            Or connect with
          </span>
        </div>

        {/* Social Authentication & Guest Option */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => login('google.user@gmail.com', selectedRole)}
            className="flex items-center justify-center gap-2.5 py-2.5 px-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleGuestExplore}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-xs font-semibold text-amber-300 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Guest Exploration Mode
          </button>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-500">
          By accessing Virasat Connect Global, you agree to our{' '}
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Virasat Connect respects cultural copyright and international conventions.'); }} className="text-amber-400/80 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: No personal cultural identity data is monetized or shared.'); }} className="text-amber-400/80 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

