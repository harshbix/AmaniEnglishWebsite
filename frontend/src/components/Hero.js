import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
export const Hero = ({ title, subtitle, backgroundImage, ctaText, ctaLink, }) => {
    return (_jsxs("section", { className: "relative py-20 md:py-32 bg-brand-dark text-white overflow-hidden", style: backgroundImage
            ? {
                backgroundImage: `linear-gradient(135deg, rgba(26, 26, 26, 0.85), rgba(127, 176, 105, 0.85)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }
            : undefined, children: [_jsx(Container, { className: "relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "max-w-3xl", children: [_jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight", children: title }), subtitle && (_jsx("p", { className: "text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed", children: subtitle })), ctaText && ctaLink && (_jsx(motion.a, { href: ctaLink, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "inline-block px-8 py-3.5 bg-brand-green text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors", children: ctaText }))] }) }), _jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-brand-green opacity-10 rounded-full -mr-48 -mt-48" }), _jsx("div", { className: "absolute bottom-0 left-0 w-72 h-72 bg-brand-brown opacity-10 rounded-full -ml-36 -mb-36" })] }));
};
