import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { addMonths, format, parseISO, startOfMonth } from "date-fns";
import { Container, Hero, CalendarGrid, Skeleton, Card, Badge, Button } from "@/components";
import { usePageMeta, useCalendar } from "@/hooks";
const EVENT_TYPE_LABELS = {
    academic: "Academic",
    meeting: "Meeting",
    activity: "Activity",
    exam: "Exam",
};
const EVENT_TYPE_CLASSES = {
    academic: "bg-brand-green",
    meeting: "bg-brand-brown",
    activity: "bg-green-500",
    exam: "bg-amber-500",
};
const EVENT_TYPE_BADGE_VARIANTS = {
    academic: "primary",
    meeting: "secondary",
    activity: "success",
    exam: "warning",
};
const parseEventDate = (value) => {
    const parsed = parseISO(value);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed;
    }
    const fallback = new Date(value);
    return Number.isNaN(fallback.getTime()) ? new Date() : fallback;
};
export const CalendarPage = () => {
    usePageMeta({
        title: "Academic Calendar",
        description: "View important school events, examinations, and holidays.",
        keywords: ["calendar", "events", "exams", "holidays"],
    });
    const { data: calendar, isLoading } = useCalendar();
    const [viewDate, setViewDate] = useState(() => startOfMonth(new Date()));
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [selectedType, setSelectedType] = useState("all");
    const availableTypes = useMemo(() => {
        if (!calendar?.events?.length) {
            return [];
        }
        return Array.from(new Set(calendar.events.map((event) => event.type)));
    }, [calendar?.events]);
    const filteredEvents = useMemo(() => {
        if (!calendar?.events?.length) {
            return [];
        }
        const base = selectedType === "all"
            ? calendar.events
            : calendar.events.filter((event) => event.type === selectedType);
        return [...base].sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime());
    }, [calendar?.events, selectedType]);
    const eventsByDate = useMemo(() => {
        return filteredEvents.reduce((acc, event) => {
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
    const handleMonthChange = (offset) => {
        setViewDate((previous) => {
            const next = addMonths(previous, offset);
            setSelectedDate(format(next, "yyyy-MM-01"));
            return next;
        });
    };
    const handleSelectDate = (iso) => {
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
    return (_jsxs(_Fragment, { children: [_jsx(Hero, { title: "Academic Calendar", subtitle: "Stay updated with important school events and dates." }), _jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: _jsx(Container, { children: _jsxs("div", { className: "grid gap-10 lg:grid-cols-[2fr_1fr]", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm uppercase tracking-wide text-brand-green", children: "Plan Ahead" }), _jsx("h2", { className: "text-3xl font-bold text-brand-dark", children: format(viewDate, "MMMM yyyy") })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => handleMonthChange(-1), children: "\u2190" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => handleMonthChange(1), children: "\u2192" })] })] }), availableTypes.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: ["all", ...availableTypes].map((type) => {
                                            const isActive = selectedType === type;
                                            const label = type === "all" ? "All Events" : EVENT_TYPE_LABELS[type];
                                            return (_jsx("button", { type: "button", onClick: () => setSelectedType(type), className: `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${isActive
                                                    ? "border-brand-green bg-brand-green text-white"
                                                    : "border-gray-200 bg-white text-brand-dark hover:border-brand-green hover:text-brand-green"}`, children: label }, type));
                                        }) })), _jsx(CalendarGrid, { month: viewDate.getMonth(), year: viewDate.getFullYear(), selectedDate: selectedDate, onSelectDate: handleSelectDate, eventsByDate: eventsByDate, eventTypeClasses: EVENT_TYPE_CLASSES, loading: isLoading }), _jsxs("div", { className: "rounded-xl border border-gray-200 bg-white p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-brand-dark mb-4", children: "Event Legend" }), _jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-4", children: availableTypes.map((type) => (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx("span", { className: `inline-flex h-3 w-3 rounded-full ${EVENT_TYPE_CLASSES[type]}` }), _jsx("span", { children: EVENT_TYPE_LABELS[type] })] }, type))) })] })] }), _jsxs("aside", { className: "space-y-4", children: [_jsxs("div", { className: "rounded-xl border border-gray-200 bg-white p-6 shadow-sm", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-brand-green", children: "Selected Day" }), _jsx("h3", { className: "text-xl font-semibold text-brand-dark mt-1", children: selectedDateLabel }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: selectedEvents.length > 0
                                                    ? `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""} scheduled`
                                                    : "No events scheduled for this date." })] }), isLoading ? (_jsx(Skeleton, { className: "h-28", count: 3 })) : selectedEvents.length > 0 ? (selectedEvents.map((event) => {
                                        const eventDate = parseEventDate(event.date);
                                        return (_jsxs(Card, { hoverable: true, className: "border border-gray-200", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-semibold text-brand-dark", children: event.title }), _jsx("p", { className: "text-xs text-gray-500", children: format(eventDate, "EEEE, MMMM d") })] }), _jsx(Badge, { variant: EVENT_TYPE_BADGE_VARIANTS[event.type], size: "sm", children: EVENT_TYPE_LABELS[event.type] })] }), _jsx("p", { className: "mt-3 text-sm text-gray-600", children: event.description })] }, event.id));
                                    })) : (_jsx(Card, { className: "border border-dashed border-gray-300 text-center", children: _jsx("p", { className: "text-sm text-gray-500", children: "Explore other dates or adjust filters to find events." }) }))] })] }) }) })] }));
};
