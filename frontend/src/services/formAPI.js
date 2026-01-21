import apiClient from "@/services/apiClient";
export const formAPI = {
    submitContact: async (data) => {
        try {
            const response = await apiClient.post("/contact", data);
            return response || { id: 0 };
        }
        catch {
            return { id: 0 };
        }
    },
    submitAdmission: async (data) => {
        try {
            const response = await apiClient.post("/admissions", data);
            return response || { id: 0 };
        }
        catch {
            return { id: 0 };
        }
    },
};
