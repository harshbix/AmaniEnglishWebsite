import logger from "@/utils/logger";

interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string;
}

interface AdmissionInquiry {
  childFirstName: string;
  childLastName: string;
  childDateOfBirth: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianRelationship: string;
  intendedClass: string;
  message?: string;
  timestamp: string;
}

// Store submissions in memory (in production, use a database)
const contactSubmissions: ContactSubmission[] = [];
const admissionInquiries: AdmissionInquiry[] = [];

export const submitContactForm = async (data: Omit<ContactSubmission, "timestamp">): Promise<void> => {
  const submission: ContactSubmission = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  contactSubmissions.push(submission);
  logger.info("Contact form submitted:", submission);

  // In production, send email notification here
  // await sendEmailNotification(submission);
};

export const submitAdmissionInquiry = async (data: Omit<AdmissionInquiry, "timestamp">): Promise<void> => {
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
