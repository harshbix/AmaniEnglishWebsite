import { Router } from "express";
import * as formController from "@/controllers/formController";

const router = Router();

/**
 * POST /api/contact
 * Submit a contact form
 * Body: { firstName, lastName, email, phone?, subject, message }
 */
router.post("/contact", formController.submitContact);

/**
 * POST /api/admissions
 * Submit an admission inquiry
 * Body: { childFirstName, childLastName, childDateOfBirth, guardianFirstName, guardianLastName, guardianEmail, guardianPhone, guardianRelationship, intendedClass, message? }
 */
router.post("/admissions", formController.submitAdmission);

export default router;
