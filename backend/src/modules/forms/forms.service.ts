import type { AdmissionInquiryPayload, ContactFormPayload } from "../../shared/types/forms.js";
import { saveAdmissionInquiry, saveContactSubmission } from "./forms.repository.js";
import { logger } from "../../shared/logger.js";

export const submitContactForm = async (data: ContactFormPayload): Promise<void> => {
  const submission = await saveContactSubmission(data);
  logger.info("Contact form submitted", submission);
};

export const submitAdmissionInquiry = async (data: AdmissionInquiryPayload): Promise<void> => {
  const inquiry = await saveAdmissionInquiry(data);
  logger.info("Admission inquiry submitted", inquiry);
};
