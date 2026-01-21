import apiClient from "@/services/apiClient";
import { Event, NewsResponse, PerformanceData, Calendar } from "@/types/api";

export const contentAPI = {
  getEvents: async (month?: number, year?: number): Promise<Event[]> => {
    try {
      const response = await apiClient.get<Event[]>("/events", {
        params: { month, year },
      });
      return (response as unknown as Event[]) || [];
    } catch {
      return [];
    }
  },

  getCalendar: async (): Promise<Calendar> => {
    try {
      const response = await apiClient.get<Calendar>("/calendar");
      return (response as unknown as Calendar) || { year: new Date().getFullYear(), events: [] };
    } catch {
      return { year: new Date().getFullYear(), events: [] };
    }
  },

  getNews: async (page = 1, limit = 10): Promise<NewsResponse> => {
    try {
      const response = await apiClient.get<NewsResponse>("/news", {
        params: { page, limit },
      });
      return (response as unknown as NewsResponse) || { items: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
    } catch {
      return { items: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
    }
  },

  getPerformance: async (): Promise<PerformanceData> => {
    try {
      const response = await apiClient.get<PerformanceData>("/performance");
      return (response as unknown as PerformanceData) || {
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
};
