import { Router } from "express";
import contentRoutes from "./content/content.routes.js";
import formsRoutes from "./forms/forms.routes.js";

const router = Router();

router.use(contentRoutes);
router.use(formsRoutes);

router.get("/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
