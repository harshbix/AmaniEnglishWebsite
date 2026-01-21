import { Router } from "express";
import * as contentController from "@/controllers/contentController";

const router = Router();

/**
 * GET /api/events
 * Retrieve school events, optionally filtered by month and year
 * Query params: month (1-12), year (YYYY)
 */
router.get("/events", contentController.getEvents);

/**
 * GET /api/calendar
 * Retrieve full calendar with all events
 */
router.get("/calendar", contentController.getCalendar);

/**
 * GET /api/news
 * Retrieve news articles with pagination
 * Query params: page (default: 1), limit (default: 10)
 */
router.get("/news", contentController.getNews);

/**
 * GET /api/performance
 * Retrieve school performance metrics and achievements
 */
router.get("/performance", contentController.getPerformance);

export default router;
