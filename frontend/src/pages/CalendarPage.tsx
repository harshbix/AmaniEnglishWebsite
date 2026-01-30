import { useEffect, useMemo, useState, type FC } from "react";
import { addMonths, format, parseISO, startOfMonth } from "date-fns";
import { Container, Hero, CalendarGrid, Skeleton, Card, Badge, Button } from "@/components";
import { usePageMeta, useCalendar } from "@/hooks";
import type { CalendarEvent } from "@/types/api";

type EventFilter = CalendarEvent["type"] | "all";

const EVENT_TYPE_LABELS: Record<CalendarEvent["type"], string> = {
  academic: "Academic",
  meeting: "Meeting",
  activity: "Activity",
  exam: "Exam",
};

const EVENT_TYPE_CLASSES: Record<CalendarEvent["type"], string> = {
  academic: "bg-brand-green",
  meeting: "bg-brand-brown",
  activity: "bg-green-500",
  exam: "bg-amber-500",
};

const EVENT_TYPE_BADGE_VARIANTS: Record<CalendarEvent["type"], "primary" | "secondary" | "success" | "warning"> = {
  academic: "primary",
  meeting: "secondary",
  activity: "success",
  exam: "warning",
};

const parseEventDate = (value: string): Date => {
  const parsed = parseISO(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }
  const fallback = new Date(value);
  return Number.isNaN(fallback.getTime()) ? new Date() : fallback;
};

export const CalendarPage: FC = () => {
  usePageMeta({
    title: "Academic Calendar",
    description: "View important school events, examinations, and holidays.",
    keywords: ["calendar", "events", "exams", "holidays"],
  });

  const { data: calendar, isLoading } = useCalendar();
  const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<string | null>(format(new Date(), "yyyy-MM-dd"));
  const [selectedType, setSelectedType] = useState<EventFilter>("all");

  const availableTypes = useMemo<CalendarEvent["type"][]>(() => {
    if (!calendar?.events?.length) {
      return [];
    }
    return Array.from(new Set(calendar.events.map((event) => event.type))) as CalendarEvent["type"][];
  }, [calendar?.events]);

  const filteredEvents = useMemo(() => {
    if (!calendar?.events?.length) {
      return [] as CalendarEvent[];
    }

    const base = selectedType === "all"
      ? calendar.events
      : calendar.events.filter((event) => event.type === selectedType);

    return [...base].sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime());
  }, [calendar?.events, selectedType]);

  const eventsByDate = useMemo(() => {
    return filteredEvents.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
      const iso = format(parseEventDate(event.date), "yyyy-MM-dd");
      if (!acc[iso]) {
        acc[iso] = [];
      }
      acc[iso].push(event);
      return acc;
    }, {});
  }, [filteredEvents]);

  useEffect(() => {
    if (!calendar?.events?.length) {
      if (selectedDate !== null) {
        setSelectedDate(null);
      }
      return;
    }

    if (selectedDate && eventsByDate[selectedDate]) {
      return;
    }

    const todayIso = format(new Date(), "yyyy-MM-dd");
    if (eventsByDate[todayIso]) {
      setSelectedDate(todayIso);
      setViewDate(startOfMonth(new Date()));
      return;
    }

    const firstEvent = filteredEvents[0];
    if (firstEvent) {
      const eventDate = parseEventDate(firstEvent.date);
      setSelectedDate(format(eventDate, "yyyy-MM-dd"));
      setViewDate(startOfMonth(eventDate));
    }
  }, [calendar?.events, eventsByDate, filteredEvents, selectedDate]);

  const handleMonthChange = (offset: number) => {
    setViewDate((previous) => {
      const next = addMonths(previous, offset);
      setSelectedDate(format(next, "yyyy-MM-01"));
      return next;
    });
  };

  const handleSelectDate = (iso: string) => {
    setSelectedDate(iso);
    const parsed = parseISO(iso);
    if (!Number.isNaN(parsed.getTime())) {
      setViewDate(startOfMonth(parsed));
    }
  };

  const selectedEvents = selectedDate ? eventsByDate[selectedDate] ?? [] : [];
  const selectedDateLabel = selectedDate
    ? format(parseISO(selectedDate), "EEEE, MMMM d")
    : "No date selected";

  return (
    <>
      <Hero
        title="Academic Calendar"
        subtitle="Stay updated with important school events and dates."
        backgroundImage="/images/WhatsApp%20Image%202026-01-29%20at%2022.30.02%20%2816%29.jpeg"
      />

      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-brand-green">Plan Ahead</p>
                  <h2 className="text-3xl font-bold text-brand-dark">
                    {format(viewDate, "MMMM yyyy")}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleMonthChange(-1)}>
                    &#8592;
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleMonthChange(1)}>
                    &#8594;
                  </Button>
                </div>
              </div>

              {availableTypes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {["all", ...availableTypes].map((type) => {
                    const isActive = selectedType === type;
                    const label = type === "all" ? "All Events" : EVENT_TYPE_LABELS[type as CalendarEvent["type"]];
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type as EventFilter)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? "border-brand-green bg-brand-green text-white"
                            : "border-gray-200 bg-white text-brand-dark hover:border-brand-green hover:text-brand-green"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}

              <CalendarGrid
                month={viewDate.getMonth()}
                year={viewDate.getFullYear()}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                eventsByDate={eventsByDate}
                eventTypeClasses={EVENT_TYPE_CLASSES}
                loading={isLoading}
              />

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-brand-dark mb-4">Event Legend</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {availableTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className={`inline-flex h-3 w-3 rounded-full ${EVENT_TYPE_CLASSES[type]}`} />
                      <span>{EVENT_TYPE_LABELS[type]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-brand-green">Selected Day</p>
                <h3 className="text-xl font-semibold text-brand-dark mt-1">{selectedDateLabel}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedEvents.length > 0
                    ? `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""} scheduled`
                    : "No events scheduled for this date."}
                </p>
              </div>

              {isLoading ? (
                <Skeleton className="h-28" count={3} />
              ) : selectedEvents.length > 0 ? (
                selectedEvents.map((event) => {
                  const eventDate = parseEventDate(event.date);
                  return (
                    <Card key={event.id} hoverable className="border border-gray-200">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold text-brand-dark">{event.title}</h4>
                          <p className="text-xs text-gray-500">
                            {format(eventDate, "EEEE, MMMM d" )}
                          </p>
                        </div>
                        <Badge variant={EVENT_TYPE_BADGE_VARIANTS[event.type]} size="sm">
                          {EVENT_TYPE_LABELS[event.type]}
                        </Badge>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        {event.description}
                      </p>
                    </Card>
                  );
                })
              ) : (
                <Card className="border border-dashed border-gray-300 text-center">
                  <p className="text-sm text-gray-500">
                    Explore other dates or adjust filters to find events.
                  </p>
                </Card>
              )}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
};
