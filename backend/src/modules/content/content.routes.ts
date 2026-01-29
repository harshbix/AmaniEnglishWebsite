import { Router } from "express";
import * as contentController from "./content.controller.js";

const router = Router();

router.get("/events", contentController.getEvents);
router.get("/calendar", contentController.getCalendar);
router.get("/news", contentController.getNews);
router.get("/performance", contentController.getPerformance);
router.get("/gallery", contentController.getGallery);
router.get("/fees", contentController.getFees);

export default router;
