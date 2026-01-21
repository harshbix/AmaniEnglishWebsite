import Joi from "joi";
import type { AdmissionInquiryPayload } from "../types";

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

export const validateAdmissionInquiry = (data: unknown): Joi.ValidationResult<AdmissionInquiryPayload> => {
  return admissionInquirySchema.validate(data, { abortEarly: false });
};
