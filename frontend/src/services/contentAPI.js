import apiClient from "@/services/apiClient";
export const contentAPI = {
    getEvents: async (month, year) => {
        try {
            const response = await apiClient.get("/events", {
                params: { month, year },
            });
            return response || [];
        }
        catch {
            return [];
        }
    },
    getCalendar: async () => {
        try {
            const response = await apiClient.get("/calendar");
            return response || { year: new Date().getFullYear(), events: [] };
        }
        catch {
            return { year: new Date().getFullYear(), events: [] };
        }
    },
    getNews: async (page = 1, limit = 10) => {
        try {
            const response = await apiClient.get("/news", {
                params: { page, limit },
            });
            return response || { items: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
        }
        catch {
            return { items: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } };
        }
    },
    getPerformance: async () => {
        try {
            const response = await apiClient.get("/performance");
            return response || {
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
        catch {
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
