import type { Request, Response } from "express";
import type { ValidationError } from "joi";
import logger from "../utils/logger";
import { sendError } from "../utils/response";
import { AppError } from "../utils/errorHandler";

const isValidationError = (error: unknown): error is ValidationError => {
  return Boolean(error) && typeof error === "object" && error !== null && "isJoi" in (error as ValidationError);
};

export const errorHandler = (err: Error | AppError | ValidationError, _req: Request, res: Response): void => {
  logger.error("Error occurred", err);

  if (err instanceof AppError) {
    sendError(res, err.message, err.message, err.statusCode);
    return;
  }

  if (isValidationError(err)) {
    const messages = err.details.map((detail) => detail.message).join(", ");
    sendError(res, messages, "Validation error", 400);
    return;
  }

  sendError(res, err.message, "Internal server error", 500);
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  sendError(res, "Route not found", "Not Found", 404);
};
