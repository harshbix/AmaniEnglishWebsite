import apiClient from "@/services/apiClient";
import { ContactFormData, AdmissionFormData } from "@/types/api";

export interface SubmissionResponse {
  id: number;
  createdAt?: string;
}

export const formAPI = {
  submitContact: async (data: ContactFormData): Promise<SubmissionResponse> => {
    const response = await apiClient.post("/contact", data);
    return (response.data as SubmissionResponse) || { id: 0 };
  },

  submitAdmission: async (data: AdmissionFormData): Promise<SubmissionResponse> => {
    const response = await apiClient.post("/admissions", data);
    return (response.data as SubmissionResponse) || { id: 0 };
  },
};
