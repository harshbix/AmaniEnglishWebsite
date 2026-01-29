import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../shared/response.js";
import * as contentService from "./content.service.js";

export const getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const month = req.query.month ? parseInt(req.query.month as string, 10) : undefined;
    const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;

    const events = await contentService.getEvents(month, year);

    sendSuccess(res, events, "Events retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getCalendar = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const calendar = await contentService.getCalendar();
    sendSuccess(res, calendar, "Calendar data retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

    const news = await contentService.getNews(page, limit);

    sendSuccess(res, news, "News retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getPerformance = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const performance = await contentService.getPerformance();
    sendSuccess(res, performance, "Performance data retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getGallery = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const gallery = await contentService.getGallery();
    sendSuccess(res, gallery, "Gallery retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getFees = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const fees = await contentService.getFees();
    sendSuccess(res, fees, "Fee structure retrieved successfully");
  } catch (error) {
    next(error);
  }
};
