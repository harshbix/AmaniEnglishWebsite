import { Request, Response, NextFunction } from "express";
import { sendSuccess, sendError } from "@/utils/response";
import * as dataService from "@/services/dataService";

export const getEvents = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const month = _req.query.month ? parseInt(_req.query.month as string) : undefined;
    const year = _req.query.year ? parseInt(_req.query.year as string) : undefined;

    const events = dataService.mockEvents;

    let filtered = events;

    if (month && year) {
      filtered = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === month - 1 && eventDate.getFullYear() === year;
      });
    }

    sendSuccess(res, filtered, "Events retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getCalendar = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const calendar = dataService.generateCalendarData();
    sendSuccess(res, calendar, "Calendar data retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getNews = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(_req.query.page as string) || 1;
    const limit = parseInt(_req.query.limit as string) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const news = dataService.mockNews;
    const total = news.length;
    const items = news.slice(startIndex, endIndex);

    sendSuccess(
      res,
      {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      "News retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

export const getPerformance = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const performance = dataService.mockPerformance;
    sendSuccess(res, performance, "Performance data retrieved successfully");
  } catch (error) {
    next(error);
  }
};
