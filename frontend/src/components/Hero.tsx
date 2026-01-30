import type { FC } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero: FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundAlt,
  ctaText,
  ctaLink,
}) => {
  return (
    <section
      className="relative py-20 md:py-32 bg-brand-dark text-white overflow-hidden"
    >
      {backgroundImage && (
        <div className="absolute inset-0">
          <picture className="absolute inset-0 h-full w-full">
            <source
              type="image/avif"
              srcSet={`${backgroundImage}-480.avif 480w, ${backgroundImage}-768.avif 768w, ${backgroundImage}-1200.avif 1200w, ${backgroundImage}-1600.avif 1600w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${backgroundImage}-480.webp 480w, ${backgroundImage}-768.webp 768w, ${backgroundImage}-1200.webp 1200w, ${backgroundImage}-1600.webp 1600w`}
              sizes="100vw"
            />
            <img
              src={`${backgroundImage}-1600.jpg`}
              srcSet={`${backgroundImage}-480.jpg 480w, ${backgroundImage}-768.jpg 768w, ${backgroundImage}-1200.jpg 1200w, ${backgroundImage}-1600.jpg 1600w`}
              sizes="100vw"
              alt={backgroundAlt || ""}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/85 via-brand-dark/65 to-brand-green/60" />
        </div>
      )}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}
          {ctaText && ctaLink && (
            <motion.a
              href={ctaLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3.5 bg-brand-green text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors"
            >
              {ctaText}
            </motion.a>
          )}
        </motion.div>
      </Container>

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green opacity-10 rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-brown opacity-10 rounded-full -ml-36 -mb-36" />
    </section>
  );
};
