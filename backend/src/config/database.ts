import { MongoClient, type Db } from "mongodb";
import config from "./environment.js";
import { logger } from "../shared/logger.js";

let client: MongoClient | null = null;
let database: Db | null = null;

export const connectDatabase = async (): Promise<Db> => {
  if (database) {
    return database;
  }

  const mongoClient = new MongoClient(config.databaseUrl, {
    serverSelectionTimeoutMS: 5_000,
    tls: true,
    tlsAllowInvalidCertificates: false,
    retryWrites: true,
    w: 'majority',
  });

  try {
    await mongoClient.connect();
    database = mongoClient.db(config.databaseName);
    client = mongoClient;
    logger.info(`Connected to MongoDB database: ${config.databaseName}`);
    return database;
  } catch (error) {
    await mongoClient.close().catch(() => {
      // ignore close error to surface original failure
    });
    logger.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

export const getDatabase = (): Db => {
  if (!database) {
    throw new Error("Database connection has not been established");
  }
  return database;
};

export const disconnectDatabase = async (): Promise<void> => {
  if (!client) {
    return;
  }

  await client.close();
  logger.info("MongoDB connection closed");
  client = null;
  database = null;
};

export default {
  connectDatabase,
  getDatabase,
  disconnectDatabase,
};
