import type { FC } from "react";
import { Link } from "react-router-dom";
import { Hero, Container, GallerySection, Button } from "@/components";
import { usePageMeta } from "@/hooks";

export const GalleryPage: FC = () => {
  usePageMeta({
    title: "Gallery",
    description: "Step into everyday life at Amani School through curated highlights across academics, sports, leadership, and community moments.",
    keywords: ["gallery", "campus life", "student activities"],
  });

  return (
    <>
      <Hero
        title="Experience Life At Amani"
        subtitle="Discover the vibrant energy of our classrooms, labs, playgrounds, and community celebrations."
        backgroundImage="/images/WhatsApp%20Image%202026-01-29%20at%2022.30.02%20%2815%29.jpeg"
        ctaText="Plan A Visit"
        ctaLink="/contact"
      />

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[2fr,1fr] lg:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-brand-dark md:text-4xl">
              Stories Behind Every Snapshot
            </h2>
            <p className="text-base text-gray-600">
              Each photograph represents a milestone, achievement, or joyful moment shared by our learners and educators. Use the filters below to focus on the experiences that matter most to your family, from championship wins to collaborative STEAM projects.
            </p>
            <p className="text-base text-gray-600">
              We refresh the gallery throughout the year to include highlights from new terms, competitions, and community outreach initiatives.
            </p>
          </div>
          <div className="rounded-xl border border-brand-green/30 bg-brand-light p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-brand-dark">
              Visit Us In Person
            </h3>
            <p className="text-sm text-gray-600">
              Ready to see the Amani difference for yourself? Schedule a campus tour with our admissions team and experience our facilities firsthand.
            </p>
            <Link to="/contact" className="inline-flex">
              <Button variant="primary">
                Book A Tour
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <GallerySection />
    </>
  );
};
