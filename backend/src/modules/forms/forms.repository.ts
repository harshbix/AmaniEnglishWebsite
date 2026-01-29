import type { Collection, ObjectId } from "mongodb";
import { getDatabase } from "../../config/database.js";
import type { AdmissionInquiryPayload, ContactFormPayload } from "../../shared/types/forms.js";

export interface ContactSubmission extends ContactFormPayload {
  id: string;
  createdAt: string;
}

export interface AdmissionInquiry extends AdmissionInquiryPayload {
  id: string;
  createdAt: string;
}

type ContactSubmissionDocument = ContactFormPayload & {
  _id?: ObjectId;
  createdAt: Date;
};

type AdmissionInquiryDocument = AdmissionInquiryPayload & {
  _id?: ObjectId;
  createdAt: Date;
};

const getContactCollection = (): Collection<ContactSubmissionDocument> => {
  return getDatabase().collection<ContactSubmissionDocument>("contact_submissions");
};

const getAdmissionCollection = (): Collection<AdmissionInquiryDocument> => {
  return getDatabase().collection<AdmissionInquiryDocument>("admission_inquiries");
};

const toContactSubmission = (document: ContactSubmissionDocument): ContactSubmission => {
  return {
    id: document._id?.toString() ?? "",
    createdAt: document.createdAt.toISOString(),
    firstName: document.firstName,
    lastName: document.lastName,
    email: document.email,
    phone: document.phone,
    subject: document.subject,
    message: document.message,
  };
};

const toAdmissionInquiry = (document: AdmissionInquiryDocument): AdmissionInquiry => {
  return {
    id: document._id?.toString() ?? "",
    createdAt: document.createdAt.toISOString(),
    childFirstName: document.childFirstName,
    childLastName: document.childLastName,
    childDateOfBirth: document.childDateOfBirth,
    guardianFirstName: document.guardianFirstName,
    guardianLastName: document.guardianLastName,
    guardianEmail: document.guardianEmail,
    guardianPhone: document.guardianPhone,
    guardianRelationship: document.guardianRelationship,
    intendedClass: document.intendedClass,
    message: document.message,
  };
};

export const saveContactSubmission = async (data: ContactFormPayload): Promise<ContactSubmission> => {
  const collection = getContactCollection();
  const document: ContactSubmissionDocument = {
    ...data,
    createdAt: new Date(),
  };

  const { insertedId } = await collection.insertOne(document);
  document._id = insertedId;
  return toContactSubmission(document);
};

export const saveAdmissionInquiry = async (data: AdmissionInquiryPayload): Promise<AdmissionInquiry> => {
  const collection = getAdmissionCollection();
  const document: AdmissionInquiryDocument = {
    ...data,
    createdAt: new Date(),
  };

  const { insertedId } = await collection.insertOne(document);
  document._id = insertedId;
  return toAdmissionInquiry(document);
};

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  const collection = getContactCollection();
  const documents = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return documents.map(toContactSubmission);
};

export const getAdmissionInquiries = async (): Promise<AdmissionInquiry[]> => {
  const collection = getAdmissionCollection();
  const documents = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return documents.map(toAdmissionInquiry);
};
