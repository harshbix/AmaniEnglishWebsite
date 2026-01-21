import Joi from "joi";
import type { ContactFormPayload } from "../types";

export const contactFormSchema: Joi.ObjectSchema<ContactFormPayload> = Joi.object<ContactFormPayload>({
  firstName: Joi.string().min(2).max(50).required().trim(),
  lastName: Joi.string().min(2).max(50).required().trim(),
  email: Joi.string().email().required().trim().lowercase(),
  phone: Joi.string().optional().allow("").trim(),
  subject: Joi.string().min(5).max(100).required().trim(),
  message: Joi.string().min(10).max(1000).required().trim(),
}).options({ stripUnknown: true });

export const validateContactForm = (data: unknown): Joi.ValidationResult<ContactFormPayload> => {
  return contactFormSchema.validate(data, { abortEarly: false });
};
