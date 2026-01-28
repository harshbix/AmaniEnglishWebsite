import apiClient from "@/services/apiClient";
import { ContactFormData, AdmissionFormData } from "@/types/api";

export interface SubmissionResponse {
  id: number;
}

export const formAPI = {
  submitContact: async (data: ContactFormData): Promise<SubmissionResponse> => {
    try {
      const response = await apiClient.post("/contact", data);
      return (response.data as SubmissionResponse) || { id: 0 };
    } catch {
      return { id: 0 };
    }
  },

  submitAdmission: async (data: AdmissionFormData): Promise<SubmissionResponse> => {
    try {
      const response = await apiClient.post("/admissions", data);
      return (response.data as SubmissionResponse) || { id: 0 };
    } catch {
      return { id: 0 };
    }
  },
};
