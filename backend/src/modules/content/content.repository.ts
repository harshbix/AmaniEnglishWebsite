import { getDatabase } from "../../config/database.js";
import type {
  CalendarData,
  FeeItem,
  FeeResponse,
  GalleryItem,
  GalleryResponse,
  NewsArticle,
  NewsPagination,
  PerformanceData,
  SchoolEvent,
} from "../../shared/types/content.js";

const COLLECTION_EVENTS = "events";
const COLLECTION_NEWS = "news";
const COLLECTION_PERFORMANCE = "performance";
const COLLECTION_GALLERY = "gallery";
const COLLECTION_FEES = "fees";

type WithMongoId<T> = T & { _id?: string };

const stripMongoId = <T>(document: WithMongoId<T>): T => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...rest } = document;
  return rest as T;
};

export const findEvents = async (): Promise<SchoolEvent[]> => {
  const db = getDatabase();
  const documents = await db
    .collection<WithMongoId<SchoolEvent>>(COLLECTION_EVENTS)
    .find()
    .sort({ date: 1 })
    .toArray();

  return documents.map(stripMongoId);
};

export const findCalendar = async (): Promise<CalendarData> => {
  const events = await findEvents();

  const referenceEvent = events[0];
  const year = referenceEvent ? new Date(referenceEvent.date).getFullYear() : new Date().getFullYear();

  return {
    year,
    events,
  };
};

export const findNews = async (page: number, limit: number): Promise<NewsPagination> => {
  const db = getDatabase();
  const collection = db.collection<WithMongoId<NewsArticle>>(COLLECTION_NEWS);

  const total = await collection.countDocuments();
  const items = await collection
    .find()
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return {
    items: items.map(stripMongoId),
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  };
};

export const findPerformance = async (): Promise<PerformanceData | null> => {
  const db = getDatabase();
  const document = await db
    .collection<WithMongoId<PerformanceData>>(COLLECTION_PERFORMANCE)
    .findOne({ _id: "performance-summary" });

  return document ? stripMongoId(document) : null;
};

export const findGallery = async (): Promise<GalleryResponse> => {
  const db = getDatabase();
  const documents = await db
    .collection<WithMongoId<GalleryItem>>(COLLECTION_GALLERY)
    .find()
    .sort({ title: 1 })
    .toArray();

  const items = documents.map(stripMongoId);
  const uniqueCategories = new Set(items.flatMap((item) => item.categories));

  const categories: GalleryResponse["categories"] = [
    { label: "All", value: "all" },
    ...Array.from(uniqueCategories).map((category) => ({
      label: category
        .split("-")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" "),
      value: category,
    })),
  ];

  return { categories, items };
};

export const findFees = async (): Promise<FeeResponse> => {
  const db = getDatabase();
  const documents = await db
    .collection<WithMongoId<FeeItem>>(COLLECTION_FEES)
    .find()
    .sort({ category: 1, grade: 1 })
    .toArray();

  const items = documents.map(stripMongoId);
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return {
    categories,
    items,
  };
};
