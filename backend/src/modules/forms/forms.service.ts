import type { AdmissionInquiryPayload, ContactFormPayload } from "../../shared/types/forms.js";
import {
  type AdmissionInquiry,
  type ContactSubmission,
  saveAdmissionInquiry,
  saveContactSubmission,
} from "./forms.repository.js";
import { logger } from "../../shared/logger.js";

export const submitContactForm = async (data: ContactFormPayload): Promise<ContactSubmission> => {
  const submission = await saveContactSubmission(data);
  logger.info("Contact form submitted", submission);
  return submission;
};

export const submitAdmissionInquiry = async (data: AdmissionInquiryPayload): Promise<AdmissionInquiry> => {
  const inquiry = await saveAdmissionInquiry(data);
  logger.info("Admission inquiry submitted", inquiry);
  return inquiry;
};
