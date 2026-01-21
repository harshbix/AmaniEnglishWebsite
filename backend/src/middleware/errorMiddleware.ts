import { Request, Response, NextFunction } from "express";
import logger from "@/utils/logger";
import { sendError } from "@/utils/response";
import { AppError } from "@/utils/errorHandler";

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error("Error occurred:", err);

  if (err instanceof AppError) {
    sendError(res, err.message, err.message, err.statusCode);
    return;
  }

  // Handle Joi validation errors
  if ("details" in err) {
    const details = (err as any).details;
    const messages = details.map((d: any) => d.message).join(", ");
    sendError(res, messages, "Validation error", 400);
    return;
  }

  sendError(res, err.message, "Internal server error", 500);
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  sendError(res, "Route not found", "Not Found", 404);
};
