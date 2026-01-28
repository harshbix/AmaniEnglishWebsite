import express from "express";
import apiRoutes from "../modules/index.js";
import { requestLogger } from "../shared/middleware/requestLogger.js";
import { corsMiddleware } from "../shared/middleware/cors.js";
import { errorHandler, notFoundHandler } from "../shared/middleware/errorHandler.js";

export const createApp = () => {
  const app = express();

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(corsMiddleware);
  app.use(requestLogger);

  app.use("/api", apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export type AppInstance = ReturnType<typeof createApp>;

export default createApp;
