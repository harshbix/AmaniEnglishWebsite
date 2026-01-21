import apiClient from "@/services/apiClient";
import { ContactFormData, AdmissionFormData } from "@/types/api";

export interface SubmissionResponse {
  id: number;
}

export const formAPI = {
  submitContact: async (data: ContactFormData): Promise<SubmissionResponse> => {
    try {
      const response = await apiClient.post<SubmissionResponse>("/contact", data);
      return (response as unknown as SubmissionResponse) || { id: 0 };
    } catch {
      return { id: 0 };
    }
  },

  submitAdmission: async (data: AdmissionFormData): Promise<SubmissionResponse> => {
    try {
      const response = await apiClient.post<SubmissionResponse>("/admissions", data);
      return (response as unknown as SubmissionResponse) || { id: 0 };
    } catch {
      return { id: 0 };
    }
  },
};
