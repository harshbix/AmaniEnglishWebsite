import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { formatDateShort } from "@/utils/helpers";
export const EventCard = ({ event, onClick }) => {
    const typeVariants = {
        academic: "primary",
        meeting: "secondary",
        activity: "success",
        exam: "warning",
    };
    return (_jsx(motion.div, { whileHover: { y: -4 }, transition: { duration: 0.2 }, children: _jsx(Card, { hoverable: true, onClick: onClick, className: "cursor-pointer", children: _jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsxs("div", { className: "w-16 h-16 bg-brand-green bg-opacity-10 rounded-lg flex flex-col items-center justify-center", children: [_jsx("div", { className: "text-xs text-brand-green font-bold", children: formatDateShort(event.date).split(" ")[0] }), _jsx("div", { className: "text-lg font-bold text-brand-green", children: formatDateShort(event.date).split(" ")[1] })] }) }), _jsx("div", { className: "flex-1", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg text-brand-dark mb-2", children: event.title }), _jsx("p", { className: "text-gray-600 text-sm", children: event.description })] }), _jsx(Badge, { variant: typeVariants[event.type], size: "sm", children: event.type })] }) })] }) }) }));
};
