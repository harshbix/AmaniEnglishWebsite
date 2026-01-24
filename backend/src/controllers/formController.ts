import { Request, Response, NextFunction } from "express";
import { sendSuccess, sendError } from "../utils/response.js";
import { validateContactForm } from "../validators/contact.js";
import { validateAdmissionInquiry } from "../validators/admission.js";
import * as submissionService from "../services/submissionService.js";

export const submitContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = validateContactForm(req.body);

    if (error) {
      const messages = error.details.map((d) => d.message).join(", ");
      sendError(res, messages, "Validation error", 400);
      return;
    }

    await submissionService.submitContactForm(value);

    sendSuccess(res, { id: Date.now() }, "Contact form submitted successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const submitAdmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = validateAdmissionInquiry(req.body);

    if (error) {
      const messages = error.details.map((d) => d.message).join(", ");
      sendError(res, messages, "Validation error", 400);
      return;
    }

    await submissionService.submitAdmissionInquiry(value);

    sendSuccess(res, { id: Date.now() }, "Admission inquiry submitted successfully", 201);
  } catch (error) {
    next(error);
  }
};
