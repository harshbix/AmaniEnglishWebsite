import type { CalendarData, SchoolEvent } from "../../shared/types/content.js";
import { mockEvents, mockNews, mockPerformance, generateCalendarData } from "./content.seed.js";

export interface NewsPagination {
  items: typeof mockNews;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const findEvents = async (): Promise<SchoolEvent[]> => {
  return mockEvents;
};

export const findCalendar = async (): Promise<CalendarData> => {
  return generateCalendarData();
};

export const findNews = async (page: number, limit: number): Promise<NewsPagination> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const total = mockNews.length;
  const items = mockNews.slice(startIndex, endIndex);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const findPerformance = async () => {
  return mockPerformance;
};
