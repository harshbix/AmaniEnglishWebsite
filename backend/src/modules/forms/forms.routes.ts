import { Router } from "express";
import * as formsController from "./forms.controller.js";

const router = Router();

router.post("/contact", formsController.submitContact);
router.post("/admissions", formsController.submitAdmission);

export default router;
