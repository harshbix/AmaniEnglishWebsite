import apiClient from "@/services/apiClient";
import {
  type Calendar,
  type Event,
  type FeeResponse,
  type GalleryResponse,
  type NewsResponse,
  type PerformanceData,
} from "@/types/api";

export const contentAPI = {
  getEvents: async (month?: number, year?: number): Promise<Event[]> => {
    try {
      const response = await apiClient.get("/events", {
        params: { month, year },
      });
      return (response.data as Event[]) || [];
    } catch {
      return [];
    }
  },

  getCalendar: async (): Promise<Calendar> => {
    try {
      const response = await apiClient.get("/calendar");
      return (response.data as Calendar) || { year: new Date().getFullYear(), events: [] };
    } catch {
      return { year: new Date().getFullYear(), events: [] };
    }
  },

  getNews: async (page = 1, limit = 10): Promise<NewsResponse> => {
    try {
      const response = await apiClient.get("/news", {
        params: { page, limit },
      });
      return (response.data as NewsResponse) || { items: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
    } catch {
      return { items: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
    }
  },

  getPerformance: async (): Promise<PerformanceData> => {
    try {
      const response = await apiClient.get("/performance");
      return (response.data as PerformanceData) || {
        summary: {
          passRate: 0,
          averageScore: 0,
          graduationRate: 0,
          studentSatisfaction: 0,
        },
        bySubject: [],
        achievements: [],
        yearOverYear: [],
      };
    } catch {
      return {
        summary: {
          passRate: 0,
          averageScore: 0,
          graduationRate: 0,
          studentSatisfaction: 0,
        },
        bySubject: [],
        achievements: [],
        yearOverYear: [],
      };
    }
  },

  getGallery: async (): Promise<GalleryResponse> => {
    try {
      const response = await apiClient.get("/gallery");
      return (response.data as GalleryResponse) || { categories: [], items: [] };
    } catch {
      return { categories: [], items: [] };
    }
  },

  getFees: async (): Promise<FeeResponse> => {
    try {
      const response = await apiClient.get("/fees");
      return (response.data as FeeResponse) || { categories: [], items: [] };
    } catch {
      return { categories: [], items: [] };
    }
  },
};
