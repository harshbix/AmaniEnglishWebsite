import { useQuery } from "@tanstack/react-query";
import { contentAPI } from "@/services/contentAPI";
export const useEvents = (month, year) => {
    return useQuery({
        queryKey: ["events", month, year],
        queryFn: () => contentAPI.getEvents(month, year),
    });
};
export const useCalendar = () => {
    return useQuery({
        queryKey: ["calendar"],
        queryFn: contentAPI.getCalendar,
    });
};
export const useNews = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["news", page, limit],
        queryFn: () => contentAPI.getNews(page, limit),
    });
};
export const usePerformance = () => {
    return useQuery({
        queryKey: ["performance"],
        queryFn: contentAPI.getPerformance,
    });
};
