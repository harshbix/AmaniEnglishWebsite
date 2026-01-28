import type { NextFunction, Request, Response } from "express";
import { logger } from "../logger.js";

export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  logger.info(`${timestamp} ${req.method} ${req.originalUrl}`);
  next();
};

export default requestLogger;
