import { useMemo, type FC } from "react";
import { format, getDay, isSameMonth, isToday, subDays, addDays } from "date-fns";
import type { CalendarEvent } from "@/types/api";

interface CalendarGridProps {
  month: number; // 0-based
  year: number;
  selectedDate: string | null;
  onSelectDate: (isoDate: string) => void;
  eventsByDate: Record<string, CalendarEvent[]>;
  eventTypeClasses: Record<CalendarEvent["type"], string>;
  loading?: boolean;
}

interface CalendarDayCell {
  date: Date;
  iso: string;
  inCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

const WEEKDAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TOTAL_CELLS = 42; // 6 weeks to cover any month

export const CalendarGrid: FC<CalendarGridProps> = ({
  month,
  year,
  selectedDate,
  onSelectDate,
  eventsByDate,
  eventTypeClasses,
  loading = false,
}) => {
  const cells = useMemo<CalendarDayCell[]>(() => {
    const firstOfMonth = new Date(year, month, 1);
    const startDate = subDays(firstOfMonth, getDay(firstOfMonth));

    const makeCell = (offset: number): CalendarDayCell => {
      const date = addDays(startDate, offset);
      const iso = format(date, "yyyy-MM-dd");
      return {
        date,
        iso,
        inCurrentMonth: isSameMonth(date, firstOfMonth),
        isToday: isToday(date),
        events: eventsByDate[iso] ?? [],
      };
    };

    const cellsList: CalendarDayCell[] = [];
    for (let i = 0; i < TOTAL_CELLS; i += 1) {
      cellsList.push(makeCell(i));
    }

    return cellsList;
  }, [eventsByDate, month, year]);

  if (loading) {
    return (
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={`header-${index}`} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {WEEKDAY_HEADERS[index]}
          </div>
        ))}
        {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
          <div key={`skeleton-${index}`} className="h-28 rounded-xl border border-gray-200 bg-gray-50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-3">
      {WEEKDAY_HEADERS.map((label) => (
        <div key={label} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </div>
      ))}
      {cells.map(({ date, iso, inCurrentMonth, isToday: today, events }) => {
        const isSelected = selectedDate === iso;
        const baseColor = inCurrentMonth ? "bg-white hover:border-brand-green" : "bg-gray-50 text-gray-400";
        const selectedClasses = isSelected ? "border-brand-green ring-2 ring-brand-green/40" : "border-gray-200";
        const todayClasses = today ? "border-brand-green" : "";
        const hasEvents = events.length > 0;

        return (
          <button
            type="button"
            key={iso}
            onClick={() => onSelectDate(iso)}
            className={`flex flex-col items-start justify-between rounded-xl border px-3 py-2 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 ${baseColor} ${selectedClasses} ${todayClasses}`}
            aria-pressed={isSelected}
          >
            <div className="flex items-center justify-between w-full">
              <span className={`text-sm font-semibold ${inCurrentMonth ? "text-brand-dark" : "text-gray-400"}`}>
                {format(date, "d")}
              </span>
              {today && <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-green">Today</span>}
            </div>
            <div className="mt-2 flex flex-col gap-1 w-full">
              {hasEvents ? (
                <>
                  {events.slice(0, 3).map((event) => (
                    <span
                      key={event.id}
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ${eventTypeClasses[event.type]}`}
                    >
                      {event.title}
                    </span>
                  ))}
                  {events.length > 3 && (
                    <span className="text-xs font-semibold text-brand-green">+{events.length - 3} more</span>
                  )}
                </>
              ) : (
                inCurrentMonth && <span className="text-xs text-gray-400">No events</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
