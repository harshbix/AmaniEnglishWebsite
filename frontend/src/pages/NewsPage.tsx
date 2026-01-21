import { useState, type FC } from "react";
import { Container, Hero } from "@/components";
import { usePageMeta, useNews } from "@/hooks";
import { Skeleton } from "@/components/Skeleton";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";

export const NewsPage: FC = () => {
  usePageMeta({
    title: "News & Announcements",
    description: "Latest news, announcements, and updates from Amani School.",
    keywords: ["news", "announcements", "updates"],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const { data: newsData, isLoading } = useNews(currentPage, limit);

  const news = newsData?.items || [];
  const pagination = newsData?.pagination || { page: 1, pages: 1, total: 0 };

  return (
    <>
      <Hero
        title="News & Announcements"
        subtitle="Stay informed with the latest updates from our school community."
      />

      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {isLoading ? (
              Array.from({ length: limit }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))
            ) : news.length > 0 ? (
              news.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NewsCard news={article} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No news available at the moment.</p>
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="text-gray-600 font-medium">
                Page {currentPage} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === pagination.pages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
