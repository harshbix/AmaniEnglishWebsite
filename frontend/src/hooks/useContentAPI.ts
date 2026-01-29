import { useQuery } from "@tanstack/react-query";
import { contentAPI } from "@/services/contentAPI";
import {
  type Calendar,
  type Event,
  type FeeResponse,
  type GalleryResponse,
  type NewsResponse,
  type PerformanceData,
} from "@/types/api";

export const useEvents = (month?: number, year?: number) => {
  return useQuery<Event[], Error>({
    queryKey: ["events", month, year],
    queryFn: () => contentAPI.getEvents(month, year),
  });
};

export const useCalendar = () => {
  return useQuery<Calendar, Error>({
    queryKey: ["calendar"],
    queryFn: contentAPI.getCalendar,
  });
};

export const useNews = (page = 1, limit = 10) => {
  return useQuery<NewsResponse, Error>({
    queryKey: ["news", page, limit],
    queryFn: () => contentAPI.getNews(page, limit),
  });
};

export const usePerformance = () => {
  return useQuery<PerformanceData, Error>({
    queryKey: ["performance"],
    queryFn: contentAPI.getPerformance,
  });
};

export const useGallery = () => {
  return useQuery<GalleryResponse, Error>({
    queryKey: ["gallery"],
    queryFn: contentAPI.getGallery,
  });
};

export const useFees = () => {
  return useQuery<FeeResponse, Error>({
    queryKey: ["fees"],
    queryFn: contentAPI.getFees,
  });
};
