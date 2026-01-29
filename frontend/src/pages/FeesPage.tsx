import type { FC } from "react";
import { Hero, FeesSection } from "@/components";
import { usePageMeta } from "@/hooks";

export const FeesPage: FC = () => {
  usePageMeta({
    title: "School Fees",
    description: "Explore Amani School's transparent fee structure and payment guidelines.",
    keywords: ["school fees", "tuition", "Amani School"],
  });

  return (
    <>
      <Hero
        title="School Fees"
        subtitle="Plan confidently with our detailed fee structure and payment steps."
      />
      <FeesSection />
    </>
  );
};
