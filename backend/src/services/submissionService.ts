import logger from "../utils/logger";
import type { AdmissionInquiryPayload, ContactFormPayload } from "../types";

interface ContactSubmission extends ContactFormPayload {
  timestamp: string;
}

interface AdmissionInquiry extends AdmissionInquiryPayload {
  timestamp: string;
}

// Store submissions in memory (in production, use a database)
const contactSubmissions: ContactSubmission[] = [];
const admissionInquiries: AdmissionInquiry[] = [];

export const submitContactForm = async (data: ContactFormPayload): Promise<void> => {
  const submission: ContactSubmission = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  contactSubmissions.push(submission);
  logger.info("Contact form submitted:", submission);

  // In production, send email notification here
  // await sendEmailNotification(submission);
};

export const submitAdmissionInquiry = async (data: AdmissionInquiryPayload): Promise<void> => {
  const inquiry: AdmissionInquiry = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  admissionInquiries.push(inquiry);
  logger.info("Admission inquiry submitted:", inquiry);

  // In production, send email notification here
  // await sendEmailNotification(inquiry);
};

export const getContactSubmissions = (): ContactSubmission[] => {
  return contactSubmissions;
};

export const getAdmissionInquiries = (): AdmissionInquiry[] => {
  return admissionInquiries;
};
