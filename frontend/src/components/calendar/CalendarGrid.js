import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { format, getDay, isSameMonth, isToday, subDays, addDays } from "date-fns";
const WEEKDAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TOTAL_CELLS = 42; // 6 weeks to cover any month
export const CalendarGrid = ({ month, year, selectedDate, onSelectDate, eventsByDate, eventTypeClasses, loading = false, }) => {
    const cells = useMemo(() => {
        const firstOfMonth = new Date(year, month, 1);
        const startDate = subDays(firstOfMonth, getDay(firstOfMonth));
        const makeCell = (offset) => {
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
        const cellsList = [];
        for (let i = 0; i < TOTAL_CELLS; i += 1) {
            cellsList.push(makeCell(i));
        }
        return cellsList;
    }, [eventsByDate, month, year]);
    if (loading) {
        return (_jsxs("div", { className: "grid grid-cols-7 gap-3", children: [Array.from({ length: 7 }).map((_, index) => (_jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-gray-500", children: WEEKDAY_HEADERS[index] }, `header-${index}`))), Array.from({ length: TOTAL_CELLS }).map((_, index) => (_jsx("div", { className: "h-28 rounded-xl border border-gray-200 bg-gray-50 animate-pulse" }, `skeleton-${index}`)))] }));
    }
    return (_jsxs("div", { className: "grid grid-cols-7 gap-3", children: [WEEKDAY_HEADERS.map((label) => (_jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-gray-500", children: label }, label))), cells.map(({ date, iso, inCurrentMonth, isToday: today, events }) => {
                const isSelected = selectedDate === iso;
                const baseColor = inCurrentMonth ? "bg-white hover:border-brand-green" : "bg-gray-50 text-gray-400";
                const selectedClasses = isSelected ? "border-brand-green ring-2 ring-brand-green/40" : "border-gray-200";
                const todayClasses = today ? "border-brand-green" : "";
                const hasEvents = events.length > 0;
                return (_jsxs("button", { type: "button", onClick: () => onSelectDate(iso), className: `flex flex-col items-start justify-between rounded-xl border px-3 py-2 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 ${baseColor} ${selectedClasses} ${todayClasses}`, "aria-pressed": isSelected, children: [_jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsx("span", { className: `text-sm font-semibold ${inCurrentMonth ? "text-brand-dark" : "text-gray-400"}`, children: format(date, "d") }), today && _jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-brand-green", children: "Today" })] }), _jsx("div", { className: "mt-2 flex flex-col gap-1 w-full", children: hasEvents ? (_jsxs(_Fragment, { children: [events.slice(0, 3).map((event) => (_jsx("span", { className: `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ${eventTypeClasses[event.type]}`, children: event.title }, event.id))), events.length > 3 && (_jsxs("span", { className: "text-xs font-semibold text-brand-green", children: ["+", events.length - 3, " more"] }))] })) : (inCurrentMonth && _jsx("span", { className: "text-xs text-gray-400", children: "No events" })) })] }, iso));
            })] }));
};
