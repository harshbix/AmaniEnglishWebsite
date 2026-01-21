import express from "express";
import { config } from "./config/environment";
import { requestLogger, corsMiddleware } from "./middleware";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";
import apiRoutes from "./routes";
import logger from "./utils/logger";

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(corsMiddleware);
app.use(requestLogger);

// Routes
app.use("/api", apiRoutes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler (must be last)
app.use(errorHandler);

const PORT = config.port;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
});

export default app;
