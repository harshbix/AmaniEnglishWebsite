import { getDatabase } from "../config/database.js";
import { logger } from "../shared/logger.js";
import {
  mockEvents,
  mockNews,
  mockPerformance,
  mockGallery,
  mockFees,
} from "../modules/content/content.seed.js";
import type {
  FeeItem,
  GalleryItem,
  NewsArticle,
  PerformanceData,
  SchoolEvent,
} from "../shared/types/content.js";

type SeedableDocument<T> = T & { _id?: string };

const collectionWithId = <T extends { id: string }>(documents: T[]): Array<SeedableDocument<T>> => {
  return documents.map((document) => ({
    _id: document.id,
    ...document,
  }));
};

export const seedDatabase = async (): Promise<void> => {
  const db = getDatabase();

  const eventsCollection = db.collection<SeedableDocument<SchoolEvent>>("events");
  const eventsCount = await eventsCollection.countDocuments();
  if (eventsCount === 0) {
    await eventsCollection.insertMany(collectionWithId(mockEvents));
    logger.info("Seeded events collection with sample data");
  }

  const newsCollection = db.collection<SeedableDocument<NewsArticle>>("news");
  const newsCount = await newsCollection.countDocuments();
  if (newsCount === 0) {
    await newsCollection.insertMany(collectionWithId(mockNews));
    logger.info("Seeded news collection with sample data");
  } else {
    const outdatedNewsCount = await newsCollection.countDocuments({
      imageUrl: { $not: /^\/images\/optimized\// },
    });
    if (outdatedNewsCount > 0) {
      await newsCollection.deleteMany({});
      await newsCollection.insertMany(collectionWithId(mockNews));
      logger.info("Refreshed news collection with optimized images");
    }
  }

  const galleryCollection = db.collection<SeedableDocument<GalleryItem>>("gallery");
  const galleryCount = await galleryCollection.countDocuments();
  if (galleryCount === 0) {
    await galleryCollection.insertMany(collectionWithId(mockGallery));
    logger.info("Seeded gallery collection with sample data");
  } else {
    const requiresRefresh = galleryCount !== mockGallery.length;
    const externalGalleryCount = await galleryCollection.countDocuments({
      thumbnailUrl: { $regex: "^https?://" },
    });
    if (requiresRefresh || externalGalleryCount > 0) {
      await galleryCollection.deleteMany({});
      await galleryCollection.insertMany(collectionWithId(mockGallery));
      logger.info("Refreshed gallery collection with local images");
    }
  }

  const feesCollection = db.collection<SeedableDocument<FeeItem>>("fees");
  const feesCount = await feesCollection.countDocuments();
  if (feesCount === 0) {
    await feesCollection.insertMany(collectionWithId(mockFees));
    logger.info("Seeded fees collection with sample data");
  }

  const performanceCollection = db.collection<SeedableDocument<PerformanceData>>("performance");
  const performanceDocument = await performanceCollection.findOne({ _id: "performance-summary" });
  if (!performanceDocument) {
    await performanceCollection.insertOne({ _id: "performance-summary", ...mockPerformance });
    logger.info("Seeded performance collection with baseline metrics");
  }
};

export default seedDatabase;
