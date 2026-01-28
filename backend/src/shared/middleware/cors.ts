import type { NextFunction, Request, Response } from "express";
import config from "../../config/environment.js";

const defaultAllowList = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://amanischool.tz",
];

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const allowedOrigins = config.corsOrigin?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? defaultAllowList;

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

export default corsMiddleware;
