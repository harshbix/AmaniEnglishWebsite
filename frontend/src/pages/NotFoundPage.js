import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "@/components";
export const NotFoundPage = () => {
    useEffect(() => {
        document.title = "Page Not Found | Amani School";
    }, []);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-dark to-brand-dark", children: _jsxs(Container, { className: "text-center", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-6xl md:text-8xl font-bold text-brand-green mb-4", children: "404" }), _jsx("h2", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: "Page Not Found" }), _jsx("p", { className: "text-gray-300 text-lg mb-8", children: "Sorry, the page you're looking for doesn't exist or has been moved." })] }), _jsx(Link, { to: "/", children: _jsx(Button, { variant: "primary", size: "lg", children: "Go Back Home" }) })] }) }));
};
