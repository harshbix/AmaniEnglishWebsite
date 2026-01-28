import Joi from "joi";
import type { AdmissionInquiryPayload, ContactFormPayload } from "../../shared/types/forms.js";

export const contactFormSchema: Joi.ObjectSchema<ContactFormPayload> = Joi.object<ContactFormPayload>({
  firstName: Joi.string().min(2).max(50).required().trim(),
  lastName: Joi.string().min(2).max(50).required().trim(),
  email: Joi.string().email().required().trim().lowercase(),
  phone: Joi.string().optional().allow("").trim(),
  subject: Joi.string().min(5).max(100).required().trim(),
  message: Joi.string().min(10).max(1000).required().trim(),
}).options({ stripUnknown: true });

export const admissionInquirySchema: Joi.ObjectSchema<AdmissionInquiryPayload> =
  Joi.object<AdmissionInquiryPayload>({
    childFirstName: Joi.string().min(2).max(50).required().trim(),
    childLastName: Joi.string().min(2).max(50).required().trim(),
    childDateOfBirth: Joi.string().isoDate().required(),
    guardianFirstName: Joi.string().min(2).max(50).required().trim(),
    guardianLastName: Joi.string().min(2).max(50).required().trim(),
    guardianEmail: Joi.string().email().required().trim().lowercase(),
    guardianPhone: Joi.string().required().trim(),
    guardianRelationship: Joi.string().valid("parent", "guardian").required(),
    intendedClass: Joi.string().required(),
    message: Joi.string().optional().allow("").max(500).trim(),
  }).options({ stripUnknown: true });

export const validateContactForm = (data: unknown): Joi.ValidationResult<ContactFormPayload> => {
  return contactFormSchema.validate(data, { abortEarly: false });
};

export const validateAdmissionInquiry = (data: unknown): Joi.ValidationResult<AdmissionInquiryPayload> => {
  return admissionInquirySchema.validate(data, { abortEarly: false });
};
