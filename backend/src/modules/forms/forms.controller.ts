import type { NextFunction, Request, Response } from "express";
import { sendError, sendSuccess } from "../../shared/response.js";
import { validateAdmissionInquiry, validateContactForm } from "./forms.validation.js";
import * as formsService from "./forms.service.js";

export const submitContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = validateContactForm(req.body);

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      sendError(res, messages, "Validation error", 400);
      return;
    }

    await formsService.submitContactForm(value);

    sendSuccess(res, { id: Date.now() }, "Contact form submitted successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const submitAdmission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = validateAdmissionInquiry(req.body);

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      sendError(res, messages, "Validation error", 400);
      return;
    }

    await formsService.submitAdmissionInquiry(value);

    sendSuccess(res, { id: Date.now() }, "Admission inquiry submitted successfully", 201);
  } catch (error) {
    next(error);
  }
};
