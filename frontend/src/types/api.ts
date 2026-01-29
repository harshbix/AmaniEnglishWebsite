// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | object;
  timestamp: string;
}

// Event types
export interface Event {
  id: string;
  title: string;
  date: string;
  type: "academic" | "meeting" | "activity" | "exam";
  description: string;
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: "achievement" | "facilities" | "student-life";
  imageUrl: string;
}

export interface NewsResponse {
  items: NewsArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Performance types
export interface PerformanceMetrics {
  passRate: number;
  averageScore: number;
  graduationRate: number;
  studentSatisfaction: number;
}

export interface SubjectPerformance {
  subject: string;
  passRate: number;
  averageScore: number;
}

export interface PerformanceData {
  summary: PerformanceMetrics;
  bySubject: SubjectPerformance[];
  achievements: string[];
  yearOverYear: Array<{ year: number; passRate: number }>;
}

// Calendar types
export type CalendarEvent = Event;

export interface Calendar {
  year: number;
  events: CalendarEvent[];
}

// Gallery types
export type GalleryCategory =
  | "sports"
  | "graduation"
  | "science-lab"
  | "campus-life"
  | "leadership"
  | "community";

export interface GalleryFilterOption {
  label: string;
  value: "all" | GalleryCategory;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  alt: string;
  categories: GalleryCategory[];
  thumbnailUrl: string;
  fullUrl: string;
}

export interface GalleryResponse {
  categories: GalleryFilterOption[];
  items: GalleryItem[];
}

// Fee types
export type FeeCategory = "Nursery" | "Primary" | "Secondary";

export interface FeeOptionalCost {
  label: string;
  amount: number;
}

export interface FeeItem {
  id: string;
  category: FeeCategory;
  grade: string;
  tuitionFee: number;
  administrationFee: number;
  optionalCosts: FeeOptionalCost[];
  totalPerTerm: number;
}

export interface FeeResponse {
  categories: FeeCategory[];
  items: FeeItem[];
}

// Form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface AdmissionFormData {
  childFirstName: string;
  childLastName: string;
  childDateOfBirth: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianRelationship: "parent" | "guardian";
  intendedClass: string;
  message?: string;
}

// School info
export interface SchoolInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  description: string;
}
