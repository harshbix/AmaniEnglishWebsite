import { useEffect, useMemo, useRef, useState, type FC, type MouseEvent } from "react";
import { Container } from "@/components/Container";

type GalleryCategory = "sports" | "graduation" | "science-lab" | "campus-life";

type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  alt: string;
  category: GalleryCategory[];
  thumbnailUrl: string;
  fullUrl: string;
};

const GALLERY_FILTERS: Array<{ label: string; value: "all" | GalleryCategory }> = [
  { label: "All", value: "all" },
  { label: "Sports", value: "sports" },
  { label: "Graduation", value: "graduation" },
  { label: "Science Lab", value: "science-lab" },
  { label: "Campus Life", value: "campus-life" },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "sports-1",
    title: "Sports Day Triumph",
    caption: "Athletics team celebrating a relay victory under the evening lights.",
    alt: "Students celebrating on the athletics track holding school flags.",
    category: ["sports"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    fullUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "graduation-1",
    title: "Graduation Joy",
    caption: "Graduates tossing caps outside the auditorium after the closing address.",
    alt: "Graduating students tossing caps in front of the school auditorium.",
    category: ["graduation"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80",
    fullUrl:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "science-1",
    title: "Science in Action",
    caption: "Upper school chemistry session focusing on safe experimentation and discovery.",
    alt: "Students observing a chemistry experiment with protective goggles in the science lab.",
    category: ["science-lab"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    fullUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "campus-1",
    title: "Campus Walkway",
    caption: "Students heading to class across the landscaped quad on a sunny morning.",
    alt: "Learners walking across the campus quad towards modern classrooms.",
    category: ["campus-life"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=800&q=80",
    fullUrl:
      "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sports-2",
    title: "Basketball Training",
    caption: "Junior basketball practice emphasising teamwork and precision.",
    alt: "Basketball team practicing layups in the indoor court.",
    category: ["sports"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=800&q=80",
    fullUrl:
      "https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "science-2",
    title: "Robotics Lab",
    caption: "Robotics club testing autonomous builds before regional competition.",
    alt: "Students collaborating on a robotics project in the innovation lab.",
    category: ["science-lab"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1581091012184-7b1c1ab0f18d?auto=format&fit=crop&w=800&q=80",
    fullUrl:
      "https://images.unsplash.com/photo-1581091012184-7b1c1ab0f18d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "graduation-2",
    title: "Valedictory Address",
    caption: "Head of school addressing graduates and families during the valedictory ceremony.",
    alt: "Principal speaking at the podium during graduation ceremony.",
    category: ["graduation"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    fullUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "campus-2",
    title: "Collaborative Commons",
    caption: "Library commons where learners collaborate on interdisciplinary projects.",
    alt: "Students studying together in the library commons with laptops and notebooks.",
    category: ["campus-life"],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80",
    fullUrl:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80",
  },
];

export const GallerySection: FC = () => {
  const [activeFilter, setActiveFilter] = useState<(typeof GALLERY_FILTERS)[number]["value"]>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef<string | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return GALLERY_ITEMS;
    }

    return GALLERY_ITEMS.filter((item) =>
      item.category.some((category) => category === activeFilter)
    );
  }, [activeFilter]);

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

  const handleFilterClick = (value: (typeof GALLERY_FILTERS)[number]["value"]) => {
    setActiveFilter(value);
  };

  const handleTriggerClick = (
    event: MouseEvent<HTMLButtonElement>,
    item: GalleryItem
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
          {GALLERY_FILTERS.map((filter) => {
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
          {filteredItems.map((item) => (
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
          ))}
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
