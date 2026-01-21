import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const MainLayout = ({ children }) => {
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-white", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1", children: children }), _jsx(Footer, {})] }));
};
