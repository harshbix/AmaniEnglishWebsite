import { Router } from "express";
import contentRoutes from "./contentRoutes";
import formRoutes from "./formRoutes";

const router = Router();

router.use(contentRoutes);
router.use(formRoutes);

router.get("/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
