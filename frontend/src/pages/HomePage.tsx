import type { FC } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Hero,
  Button,
  GallerySection,
  EventCard,
  NewsCard,
  MetricCard,
} from "@/components";
import { usePageMeta, useEvents, useNews, usePerformance } from "@/hooks";
import { SCHOOL_INFO } from "@/utils/constants";
import { Skeleton } from "@/components/Skeleton";
import { motion } from "framer-motion";

export const HomePage: FC = () => {
  usePageMeta({
    title: "Home",
    description: SCHOOL_INFO.description,
    keywords: [
      "school",
      "education",
      "Tanga",
      "Tanzania",
      "academic excellence",
    ],
  });

  const { data: events = [], isLoading: eventsLoading } = useEvents();
  const { data: news = { items: [] }, isLoading: newsLoading } = useNews(1, 3);
  const {
    data: performance = {
      summary: { passRate: 0, averageScore: 0, graduationRate: 0, studentSatisfaction: 0 },
    },
    isLoading: performanceLoading,
  } = usePerformance();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Empowering Academic Excellence Through Seamless Competence"
        subtitle="Nurturing brilliance, inspiring excellence. A world-class education in Tanga, Tanzania."
        ctaText="Apply Now"
        ctaLink="/admissions"
      />

      {/* School Mission Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We maintain the highest standards in academic instruction and
                student development.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                We foster a supportive environment where every student belongs
                and thrives.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Growth
              </h3>
              <p className="text-gray-600">
                We empower each student to reach their full potential and
                become leaders.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Our Performance
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {performanceLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))
            ) : (
              <>
                <motion.div variants={itemVariants}>
                  <MetricCard
                    label="Pass Rate"
                    value={performance.summary.passRate}
                    icon="📊"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <MetricCard
                    label="Average Score"
                    value={performance.summary.averageScore}
                    suffix=""
                    icon="✓"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <MetricCard
                    label="Graduation Rate"
                    value={performance.summary.graduationRate}
                    icon="🎓"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <MetricCard
                    label="Student Satisfaction"
                    value={performance.summary.studentSatisfaction}
                    icon="😊"
                  />
                </motion.div>
              </>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Upcoming Events
            </h2>
            <Link to="/calendar">
              <Button variant="outline">View Calendar</Button>
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {eventsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40" />
              ))
            ) : (
              events.slice(0, 4).map((event) => (
                <motion.div key={event.id} variants={itemVariants}>
                  <EventCard event={event} />
                </motion.div>
              ))
            )}
          </motion.div>
        </Container>
      </section>

      {/* Latest News */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Latest News
            </h2>
            <Link to="/news">
              <Button variant="outline">Read More</Button>
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {newsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))
            ) : (
              news.items.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <NewsCard news={article} />
                </motion.div>
              ))
            )}
          </motion.div>
        </Container>
      </section>

      <GallerySection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Amani School?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Start your journey with us today. We welcome students of all
              backgrounds and learning styles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions">
                <Button variant="primary">Apply Now</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};
