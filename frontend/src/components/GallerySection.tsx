import { useEffect, useMemo, useRef, useState, type FC, type MouseEvent } from "react";
import { Container } from "@/components/Container";
import { Skeleton } from "@/components/Skeleton";
import { useGallery } from "@/hooks";
import type { GalleryCategory, GalleryItem as GalleryItemType } from "@/types/api";

type GalleryFilterValue = "all" | GalleryCategory;

export const GallerySection: FC = () => {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterValue>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItemType | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef<string | null>(null);

  const { data, isLoading } = useGallery();

  const filters = useMemo(() => {
    const apiFilters = data?.categories ?? [];
    if (apiFilters.length > 0) {
      return apiFilters;
    }

    const derivedCategories = Array.from(
      new Set((data?.items ?? []).flatMap((item) => item.categories))
    ) as GalleryCategory[];

    if (derivedCategories.length > 0) {
      return [
        { label: "All", value: "all" as const },
        ...derivedCategories.map((category) => ({
          label: category
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" "),
          value: category,
        })),
      ];
    }

    return [{ label: "All", value: "all" as const }];
  }, [data]);

  useEffect(() => {
    const availableValues = filters.map((filter) => filter.value);
    if (availableValues.includes(activeFilter)) {
      return;
    }

    if (availableValues.includes("all")) {
      setActiveFilter("all");
    } else if (availableValues.length > 0) {
      setActiveFilter(availableValues[0] as GalleryFilterValue);
    } else if (activeFilter !== "all") {
      setActiveFilter("all");
    }
  }, [filters, activeFilter]);

  const galleryItems = data?.items ?? [];

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return galleryItems;
    }

    return galleryItems.filter((item) =>
      item.categories.some((category) => category === activeFilter)
    );
  }, [galleryItems, activeFilter]);

  useEffect(() => {
    if (lightboxItem) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      previousOverflowRef.current = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          setLightboxItem(null);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      const timer = window.setTimeout(() => {
        closeButtonRef.current?.focus({ preventScroll: true });
      }, 50);

      return () => {
        window.clearTimeout(timer);
        document.removeEventListener("keydown", handleKeyDown);
        if (previousOverflowRef.current !== null) {
          document.documentElement.style.overflow = previousOverflowRef.current;
          previousOverflowRef.current = null;
        }
        if (previouslyFocusedRef.current) {
          previouslyFocusedRef.current.focus({ preventScroll: true });
          previouslyFocusedRef.current = null;
        }
      };
    }

    return undefined;
  }, [lightboxItem]);

  const handleFilterClick = (value: GalleryFilterValue) => {
    setActiveFilter(value);
  };

  const handleTriggerClick = (
    event: MouseEvent<HTMLButtonElement>,
    item: GalleryItemType
  ) => {
    previouslyFocusedRef.current = event.currentTarget;
    setLightboxItem(item);
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setLightboxItem(null);
    }
  };

  return (
    <section className="gallery-module bg-white py-16 md:py-24">
      <Container className="space-y-10">
        <header className="space-y-4 md:flex md:items-end md:justify-between md:space-y-0">
          <div className="space-y-3 md:max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
              Campus Gallery
            </span>
            <h2 className="text-3xl font-bold text-brand-dark md:text-4xl">
              A Glimpse Into Amani School Life
            </h2>
            <p className="text-base text-gray-600">
              Explore moments from sports, academic milestones, scientific discovery, and our vibrant campus community.
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Select a category to filter highlights instantly.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleFilterClick(filter.value)}
                className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 ${
                  isActive
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-brand-green bg-white text-brand-dark hover:bg-brand-green/10"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={`gallery-skeleton-${index}`}
                  className="h-60 w-full rounded-lg"
                />
              ))
            : filteredItems.length > 0
            ? filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-base transition hover:-translate-y-1"
                >
                  <button
                    type="button"
                    onClick={(event) => handleTriggerClick(event, item)}
                    className="block w-full focus:outline-none"
                  >
                    <figure className="relative">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.alt}
                        loading="lazy"
                        className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 py-3 text-sm font-semibold text-white">
                        {item.title}
                      </figcaption>
                    </figure>
                  </button>
                </article>
              ))
            : (
                <p className="col-span-full text-center text-sm font-medium text-gray-500">
                  No gallery items available at the moment.
                </p>
              )}
        </div>
      </Container>

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={lightboxItem ? "false" : "true"}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6 transition-opacity duration-300 ${
          lightboxItem ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      >
        <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setLightboxItem(null)}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark/80 text-white transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
            aria-label="Close gallery"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          {lightboxItem ? (
            <>
              <img
                src={lightboxItem.fullUrl}
                alt={lightboxItem.alt}
                className="h-auto w-full bg-brand-light object-contain"
              />
              <p className="px-6 py-4 text-sm font-medium text-brand-dark">
                {lightboxItem.caption}
              </p>
            </>
          ) : (
            <div className="h-72 w-full bg-brand-light" />
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
