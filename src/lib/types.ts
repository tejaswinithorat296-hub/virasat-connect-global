// ============================================================
// VIRASAT CONNECT GLOBAL — Core Types
// ============================================================

export type UserRole = 'learner' | 'artisan' | 'educator' | 'researcher' | 'admin' | 'moderator' | 'guest';
export type LearningLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type Region = 'Asia' | 'Africa' | 'Europe' | 'North America' | 'South America' | 'Oceania' | 'Antarctica';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  country?: string;
  language: string;
  learningLevel: LearningLevel;
  interests: string[];
  savedTopics: string[];
  savedImages: string[];
  completedTours: string[];
  quizHistory: QuizResult[];
  achievements: Achievement[];
  streak: number;
  totalPoints: number;
  createdAt: Date;
}

export interface Country {
  id: string;
  name: string;
  code: string; // ISO 3166-1 alpha-2
  flag: string; // emoji
  region: Region;
  subregion: string;
  capital: string;
  languages: string[];
  population?: number;
  description: string;
  heritageHighlights: string[];
  featuredImage?: string;
  tags: string[];
}

export interface HeritageItem {
  id: string;
  title: string;
  description: string;
  category: HeritageCategory;
  country: string;
  region?: string;
  historicalPeriod?: string;
  imageUrl: string;
  imageAlt: string;
  significance: string;
  tags: string[];
  isUnescoListed?: boolean;
  createdAt: Date;
  lastVerified?: Date;
  sources: Source[];
}

export type HeritageCategory =
  | 'monuments'
  | 'temples'
  | 'traditional-clothing'
  | 'folk-art'
  | 'manuscripts'
  | 'festivals'
  | 'music-dance'
  | 'food'
  | 'indigenous'
  | 'architecture'
  | 'archaeological'
  | 'maritime'
  | 'paintings'
  | 'crafts'
  | 'nature-heritage';

export interface Source {
  name: string;
  url?: string;
  type: 'museum' | 'academic' | 'government' | 'community' | 'archive' | 'other';
}

export interface MonumentTopic extends HeritageItem {
  location: { lat: number; lng: number };
  address?: string;
  yearBuilt?: string;
  architecturalStyle?: string;
  materials?: string[];
  dimensions?: string;
  visitorInfo?: string;
  timeline?: TimelineEvent[];
  relatedTopics?: string[];
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  country?: string;
  difficulty: LearningLevel;
  questions: QuizQuestion[];
  timeLimit?: number; // seconds per question
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'image-id' | 'match' | 'order' | 'fill-blank' | 'short-answer';
  question: string;
  imageUrl?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  source?: string;
  points: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: Date;
  answers: { questionId: string; answer: string; correct: boolean }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  category: 'quiz' | 'exploration' | 'streak' | 'learning' | 'community';
  points: number;
}

export interface VirtualTour {
  id: string;
  title: string;
  heritageItemId: string;
  scenes: TourScene[];
  audioGuide?: string; // URL
  languages: string[];
  description: string;
}

export interface TourScene {
  id: string;
  title: string;
  imageUrl: string; // 360° or standard
  is360: boolean;
  pointsOfInterest: PointOfInterest[];
  nextScenes: string[];
}

export interface PointOfInterest {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ArtisanProduct {
  id: string;
  artisanId: string;
  title: string;
  description: string;
  category: string;
  country: string;
  price: number;
  currency: string;
  images: string[];
  materials: string[];
  technique: string;
  culturalBackground: string;
  isHandmade: boolean;
  stock: number;
  tags: string[];
  createdAt: Date;
}

export interface Artisan {
  id: string;
  userId: string;
  name: string;
  country: string;
  craft: string;
  bio: string;
  profileImage?: string;
  verified: boolean;
  products: ArtisanProduct[];
  rating?: number;
  totalSales?: number;
}

export interface CulturalEvent {
  id: string;
  title: string;
  description: string;
  country: string;
  eventType: 'festival' | 'exhibition' | 'workshop' | 'heritage-day' | 'museum' | 'online' | 'concert' | 'other';
  startDate: Date;
  endDate?: Date;
  isOnline: boolean;
  location?: string;
  url?: string;
  imageUrl?: string;
  languages: string[];
  tags: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
  relatedTopics?: string[];
}

export interface SearchResult {
  id: string;
  type: 'country' | 'monument' | 'festival' | 'artisan' | 'quiz' | 'tour' | 'language' | 'person' | 'event';
  title: string;
  description: string;
  imageUrl?: string;
  country?: string;
  url: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavigationItem[];
}

export interface DailyFact {
  id: string;
  title: string;
  content: string;
  country: string;
  imageUrl?: string;
  category: string;
  source?: string;
  date: string;
}

export interface CartItem {
  product: ArtisanProduct;
  quantity: number;
}

