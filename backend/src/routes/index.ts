import { Router } from "express";
import contentRoutes from "@/routes/contentRoutes";
import formRoutes from "@/routes/formRoutes";

const router = Router();

router.use(contentRoutes);
router.use(formRoutes);

router.get("/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
