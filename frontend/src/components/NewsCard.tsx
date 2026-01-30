import type { FC } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/Card";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { NewsArticle } from "@/types/api";
import { formatDate, truncateText } from "@/utils/helpers";

interface NewsCardProps {
  news: NewsArticle;
  onClick?: () => void;
}

export const NewsCard: FC<NewsCardProps> = ({ news, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        hoverable
        onClick={onClick}
        className="h-full cursor-pointer overflow-hidden"
      >
        {news.imageUrl && (
          <div className="w-full overflow-hidden rounded-lg mb-4 bg-gray-200" style={{ aspectRatio: "3 / 2" }}>
            <ResponsiveImage
              src={news.imageUrl}
              alt={news.title}
              widths={[480, 768, 1200]}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-green uppercase">
              {news.category}
            </span>
            <span className="text-xs text-gray-500">{formatDate(news.date)}</span>
          </div>
          <h3 className="font-bold text-lg text-brand-dark hover:text-brand-green transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {truncateText(news.excerpt, 100)}
          </p>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">By {news.author}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
