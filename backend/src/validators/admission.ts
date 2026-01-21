import Joi from "joi";

export const admissionInquirySchema = Joi.object({
  childFirstName: Joi.string().min(2).max(50).required().trim(),
  childLastName: Joi.string().min(2).max(50).required().trim(),
  childDateOfBirth: Joi.date().required(),
  guardianFirstName: Joi.string().min(2).max(50).required().trim(),
  guardianLastName: Joi.string().min(2).max(50).required().trim(),
  guardianEmail: Joi.string().email().required().trim().lowercase(),
  guardianPhone: Joi.string().required().trim(),
  guardianRelationship: Joi.string().valid("parent", "guardian").required(),
  intendedClass: Joi.string().required(),
  message: Joi.string().optional().allow("").max(500).trim(),
});

export const validateAdmissionInquiry = (data: unknown): { error?: Joi.ValidationError; value?: unknown } => {
  return admissionInquirySchema.validate(data, { abortEarly: false });
};
