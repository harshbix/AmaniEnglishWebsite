import type { AdmissionInquiryPayload, ContactFormPayload } from "../../shared/types/forms.js";

interface ContactSubmission extends ContactFormPayload {
  timestamp: string;
}

interface AdmissionInquiry extends AdmissionInquiryPayload {
  timestamp: string;
}

const contactSubmissions: ContactSubmission[] = [];
const admissionInquiries: AdmissionInquiry[] = [];

export const saveContactSubmission = async (data: ContactFormPayload): Promise<ContactSubmission> => {
  const submission: ContactSubmission = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  contactSubmissions.push(submission);
  return submission;
};

export const saveAdmissionInquiry = async (data: AdmissionInquiryPayload): Promise<AdmissionInquiry> => {
  const inquiry: AdmissionInquiry = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  admissionInquiries.push(inquiry);
  return inquiry;
};

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  return contactSubmissions;
};

export const getAdmissionInquiries = async (): Promise<AdmissionInquiry[]> => {
  return admissionInquiries;
};
