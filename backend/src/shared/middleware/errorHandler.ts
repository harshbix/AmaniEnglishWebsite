import type { NextFunction, Request, Response } from "express";
import type { ValidationError as JoiValidationError } from "joi";
import { logger } from "../logger.js";
import { sendError } from "../response.js";
import { AppError } from "../errors/appError.js";

const isJoiValidationError = (error: unknown): error is JoiValidationError => {
  return Boolean(error) && typeof error === "object" && error !== null && "isJoi" in (error as JoiValidationError);
};

export const errorHandler = (err: Error | AppError | JoiValidationError, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error("Error occurred", err);

  if (err instanceof AppError) {
    sendError(res, err.message, err.message, err.statusCode);
    return;
  }

  if (isJoiValidationError(err)) {
    const messages = err.details.map((detail) => detail.message).join(", ");
    sendError(res, messages, "Validation error", 400);
    return;
  }

  sendError(res, err.message, "Internal server error", 500);
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  sendError(res, "Route not found", "Not Found", 404);
};

export default errorHandler;
