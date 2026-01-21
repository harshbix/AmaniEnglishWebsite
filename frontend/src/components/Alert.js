import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export const Alert = ({ type = "info", title, message, onClose, }) => {
    const colors = {
        success: "bg-green-50 border-green-200 text-green-800",
        error: "bg-red-50 border-red-200 text-red-800",
        warning: "bg-amber-50 border-amber-200 text-amber-800",
        info: "bg-blue-50 border-blue-200 text-blue-800",
    };
    const icons = {
        success: "✓",
        error: "✕",
        warning: "⚠",
        info: "ℹ",
    };
    return (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: `border rounded-lg p-4 ${colors[type]}`, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("span", { className: "text-xl mt-0.5", children: icons[type] }), _jsxs("div", { className: "flex-1", children: [title && _jsx("h3", { className: "font-semibold mb-1", children: title }), _jsx("p", { className: "text-sm", children: message })] }), onClose && (_jsx("button", { onClick: onClose, className: "text-lg opacity-60 hover:opacity-100 transition-opacity", "aria-label": "Close alert", children: "\u00D7" }))] }) }));
};
export default Alert;
