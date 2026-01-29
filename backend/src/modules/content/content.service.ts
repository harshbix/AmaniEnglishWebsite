import {
  findCalendar,
  findEvents,
  findFees,
  findGallery,
  findNews,
  findPerformance,
} from "./content.repository.js";
import type {
  CalendarData,
  FeeResponse,
  GalleryResponse,
  PerformanceData,
  SchoolEvent,
} from "../../shared/types/content.js";

export const getEvents = async (month?: number, year?: number): Promise<SchoolEvent[]> => {
  const events = await findEvents();

  if (!month || !year) {
    return events;
  }

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === month - 1 && eventDate.getFullYear() === year;
  });
};

export const getCalendar = async (): Promise<CalendarData> => {
  return findCalendar();
};

export const getNews = async (page: number, limit: number) => {
  return findNews(page, limit);
};

export const getPerformance = async (): Promise<PerformanceData> => {
  const performance = await findPerformance();

  if (performance) {
    return performance;
  }

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
};

export const getGallery = async (): Promise<GalleryResponse> => {
  return findGallery();
};

export const getFees = async (): Promise<FeeResponse> => {
  return findFees();
};
