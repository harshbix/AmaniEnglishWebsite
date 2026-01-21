import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  logger.info(`${timestamp} ${req.method} ${req.path}`);
  next();
};

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://amanischool.tz",
  ];

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }

  next();
};
