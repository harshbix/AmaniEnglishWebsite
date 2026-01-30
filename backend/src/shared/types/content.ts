export type EventType = "academic" | "meeting" | "activity" | "exam";

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  type: EventType;
  description: string;
}

export interface CalendarData {
  year: number;
  events: SchoolEvent[];
}

export type NewsCategory = "achievement" | "facilities" | "student-life" | "community" | "innovation";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: NewsCategory;
  imageUrl: string;
}

export interface NewsPagination {
  items: NewsArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PerformanceSummary {
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

export interface YearOverYearPerformance {
  year: number;
  passRate: number;
}

export interface PerformanceData {
  summary: PerformanceSummary;
  bySubject: SubjectPerformance[];
  achievements: string[];
  yearOverYear: YearOverYearPerformance[];
}

export type GalleryCategory = "sports" | "graduation" | "science-lab" | "campus-life" | "leadership" | "community";

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  alt: string;
  categories: GalleryCategory[];
  thumbnailUrl: string;
  fullUrl: string;
  orientation?: "portrait" | "landscape";
}

export interface GalleryResponse {
  categories: Array<{ label: string; value: "all" | GalleryCategory }>;
  items: GalleryItem[];
}

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
