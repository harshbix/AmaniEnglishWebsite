import type { FC } from "react";
import { Container, Hero } from "@/components";
import { usePageMeta } from "@/hooks";
import { motion } from "framer-motion";

export const AboutPage: FC = () => {
  usePageMeta({
    title: "About Us",
    description: "Learn about Amani School's mission, vision, values, and leadership.",
    keywords: ["about", "mission", "vision", "school leadership"],
  });

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
        title="About Amani School"
        subtitle="Discover our mission to nurture excellence in every student."
        backgroundImage="/images/optimized/community-support"
        backgroundAlt="Community members supporting school initiatives"
      />

      {/* Mission, Vision, Values */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="p-8 border-2 border-brand-green rounded-lg">
              <h3 className="text-2xl font-bold text-brand-green mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To provide world-class English medium education that empowers
                students to achieve academic excellence, develop critical
                thinking skills, and become responsible global citizens who
                positively impact their communities.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 border-2 border-brand-brown rounded-lg">
              <h3 className="text-2xl font-bold text-brand-brown mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To be the leading educational institution in Tanzania,
                recognized for producing confident, compassionate, and competent
                individuals who excel academically and make meaningful
                contributions to society.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 border-2 border-brand-green rounded-lg">
              <h3 className="text-2xl font-bold text-brand-green mb-4">
                Core Values
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>✓ Integrity and Honesty</li>
                <li>✓ Academic Excellence</li>
                <li>✓ Respect and Inclusivity</li>
                <li>✓ Community Engagement</li>
                <li>✓ Continuous Improvement</li>
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* History & Milestones */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Our Journey
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="flex gap-6">
              <div className="flex-shrink-0 w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                2015
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-bold text-brand-dark mb-2">
                  School Established
                </h3>
                <p className="text-gray-600">
                  Amani School opened its doors with a commitment to academic
                  excellence and holistic student development.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6">
              <div className="flex-shrink-0 w-24 h-24 bg-brand-brown rounded-full flex items-center justify-center text-white font-bold text-xl">
                2018
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-bold text-brand-dark mb-2">
                  Accreditation Recognition
                </h3>
                <p className="text-gray-600">
                  Earned national accreditation for our curriculum and teaching
                  methodologies.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6">
              <div className="flex-shrink-0 w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                2020
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-bold text-brand-dark mb-2">
                  Digital Learning Initiative
                </h3>
                <p className="text-gray-600">
                  Launched comprehensive digital learning platform to enhance
                  educational delivery.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6">
              <div className="flex-shrink-0 w-24 h-24 bg-brand-brown rounded-full flex items-center justify-center text-white font-bold text-xl">
                2023
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-bold text-brand-dark mb-2">
                  State-of-the-Art Facilities
                </h3>
                <p className="text-gray-600">
                  Completed expansion of STEM laboratory and sports facilities
                  to support modern education.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Leadership Team
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              {
                name: "Dr. Joseph Mwangi",
                title: "Principal",
                bio: "15+ years in educational leadership",
              },
              {
                name: "Margaret Kipchoge",
                title: "Deputy Principal (Academic)",
                bio: "Specialist in curriculum development",
              },
              {
                name: "David Otieno",
                title: "Head of Administration",
                bio: "Expert in school operations",
              },
              {
                name: "Grace Mghalu",
                title: "Head of Student Affairs",
                bio: "Passionate about student welfare",
              },
            ].map((leader, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <div className="w-20 h-20 bg-brand-green rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-bold text-brand-dark mb-1">
                  {leader.name}
                </h3>
                <p className="text-brand-green font-semibold mb-2">
                  {leader.title}
                </p>
                <p className="text-sm text-gray-600">{leader.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Facilities */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">
            Our Facilities
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Modern Classrooms",
                description:
                  "Well-equipped learning spaces with interactive boards and technology.",
                icon: "🏫",
              },
              {
                title: "STEM Laboratory",
                description: "State-of-the-art facilities for science and technology learning.",
                icon: "🔬",
              },
              {
                title: "Library",
                description:
                  "Comprehensive collection of physical and digital learning resources.",
                icon: "📚",
              },
              {
                title: "Sports Complex",
                description: "Indoor and outdoor facilities for athletic development.",
                icon: "🏃",
              },
              {
                title: "Computer Lab",
                description: "Fully equipped with modern computers for digital learning.",
                icon: "💻",
              },
              {
                title: "Assembly Hall",
                description: "Multi-purpose venue for events and gatherings.",
                icon: "🎭",
              },
            ].map((facility, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">
                  {facility.title}
                </h3>
                <p className="text-gray-600">{facility.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
};
