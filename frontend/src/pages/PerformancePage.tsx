import type { FC } from "react";
import { Container, Hero, MetricCard } from "@/components";
import { usePageMeta, usePerformance } from "@/hooks";
import { Skeleton } from "@/components/Skeleton";
import { motion } from "framer-motion";

export const PerformancePage: FC = () => {
  usePageMeta({
    title: "School Performance",
    description:
      "Review our academic performance metrics, achievements, and statistics.",
    keywords: ["performance", "results", "achievements", "metrics"],
  });

  const { data: performance, isLoading } = usePerformance();

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
      <Hero
        title="School Performance"
        subtitle="Excellence through measurable results and continuous improvement."
        backgroundImage="/images/optimized/hero-performance-achievement"
        backgroundAlt="Students celebrating academic achievements"
      />

      {/* Summary Metrics */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Key Performance Indicators
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <motion.div variants={itemVariants}>
                <MetricCard
                  label="Pass Rate"
                  value={performance?.summary.passRate || 0}
                  icon="📊"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <MetricCard
                  label="Average Score"
                  value={performance?.summary.averageScore || 0}
                  suffix=""
                  icon="✓"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <MetricCard
                  label="Graduation Rate"
                  value={performance?.summary.graduationRate || 0}
                  icon="🎓"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <MetricCard
                  label="Student Satisfaction"
                  value={performance?.summary.studentSatisfaction || 0}
                  icon="😊"
                />
              </motion.div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Performance by Subject */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Performance by Subject
          </h2>

          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 mb-4" />
            ))
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {performance?.bySubject.map((subject, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-brand-dark">
                      {subject.subject}
                    </h3>
                    <span className="text-2xl font-bold text-brand-green">
                      {subject.passRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${subject.passRate}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-brand-green to-brand-brown"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Average Score: {subject.averageScore}/100
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>

      {/* Achievements */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Achievements & Recognition
          </h2>

          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 mb-4" />
            ))
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {performance?.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg border-l-4 border-brand-green shadow-md"
                >
                  <div className="flex gap-4">
                    <span className="text-2xl">⭐</span>
                    <p className="text-gray-700 font-medium">{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>

      {/* Year over Year */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Growth Trajectory
          </h2>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 mb-4" />
            ))
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {performance?.yearOverYear.map((year, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-brand-green to-brand-green bg-opacity-10 p-8 rounded-lg text-center"
                >
                  <div className="text-4xl font-bold text-brand-green mb-2">
                    {year.passRate}%
                  </div>
                  <p className="text-gray-600 text-lg font-medium">{year.year}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </>
  );
};
