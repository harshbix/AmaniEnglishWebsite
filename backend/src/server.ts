import type { Server } from "http";
import { config } from "./config/environment.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { createApp } from "./app/app.js";
import { logger } from "./shared/logger.js";

const app = createApp();

const PORT = config.port;
let httpServer: Server | null = null;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    httpServer = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

const shutdown = async (signal: string): Promise<void> => {
  logger.info(`${signal} signal received: closing HTTP server`);

  if (httpServer) {
    await new Promise<void>((resolve) => {
      httpServer?.close(() => {
        logger.info("HTTP server closed");
        resolve();
      });
    });
    httpServer = null;
  }

  await disconnectDatabase().catch((error) => {
    logger.error("Error while closing MongoDB connection", error);
  });

  process.exit(0);
};

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

void startServer();

export default app;
