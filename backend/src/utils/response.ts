import { Response } from "express";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | object;
  timestamp: string;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  message: string = "Success",
  statusCode: number = 200
): Response {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  error: string | object,
  message: string = "Error occurred",
  statusCode: number = 500
): Response {
  const response: ApiResponse = {
    success: false,
    message,
    error,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
}
