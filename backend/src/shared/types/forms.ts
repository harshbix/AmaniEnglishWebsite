export interface ContactFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface AdmissionInquiryPayload {
  childFirstName: string;
  childLastName: string;
  childDateOfBirth: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianRelationship: "parent" | "guardian";
  intendedClass: string;
  message?: string;
}
