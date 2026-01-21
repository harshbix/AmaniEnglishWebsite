import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
export const Badge = ({ children, variant = "primary", size = "md", }) => {
    const variants = {
        primary: "bg-brand-green text-white",
        secondary: "bg-brand-brown text-white",
        success: "bg-green-100 text-green-800",
        warning: "bg-amber-100 text-amber-800",
        error: "bg-red-100 text-red-800",
    };
    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
    };
    return (_jsx(motion.span, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: `inline-block rounded-full font-medium ${variants[variant]} ${sizes[size]}`, children: children }));
};
export default Badge;
