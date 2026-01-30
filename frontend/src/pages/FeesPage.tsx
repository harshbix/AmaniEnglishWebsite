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
        backgroundImage="/images/WhatsApp%20Image%202026-01-29%20at%2022.30.03%20%284%29.jpeg"
      />
      <FeesSection />
    </>
  );
};
