import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/Card";
export const MetricCard = ({ label, value, suffix = "%", icon, }) => {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 50);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            }
            else {
                setDisplayValue(Math.floor(start));
            }
        }, 50);
        return () => clearInterval(timer);
    }, [value]);
    return (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 0.4 }, viewport: { once: true }, children: _jsxs(Card, { className: "text-center", children: [icon && _jsx("div", { className: "mb-4 text-4xl", children: icon }), _jsxs("div", { className: "text-4xl md:text-5xl font-bold text-brand-green mb-2", children: [displayValue, suffix] }), _jsx("p", { className: "text-gray-600 font-medium", children: label })] }) }));
};
