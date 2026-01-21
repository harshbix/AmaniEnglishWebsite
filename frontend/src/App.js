import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage, AboutPage, CalendarPage, NewsPage, PerformancePage, AdmissionsPage, ContactPage, NotFoundPage, } from "@/pages";
import "./styles/globals.css";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        },
    },
});
export const App = () => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainLayout, { children: _jsx(HomePage, {}) }) }), _jsx(Route, { path: "/about", element: _jsx(MainLayout, { children: _jsx(AboutPage, {}) }) }), _jsx(Route, { path: "/calendar", element: _jsx(MainLayout, { children: _jsx(CalendarPage, {}) }) }), _jsx(Route, { path: "/news", element: _jsx(MainLayout, { children: _jsx(NewsPage, {}) }) }), _jsx(Route, { path: "/performance", element: _jsx(MainLayout, { children: _jsx(PerformancePage, {}) }) }), _jsx(Route, { path: "/admissions", element: _jsx(MainLayout, { children: _jsx(AdmissionsPage, {}) }) }), _jsx(Route, { path: "/contact", element: _jsx(MainLayout, { children: _jsx(ContactPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(MainLayout, { children: _jsx(NotFoundPage, {}) }) })] }) }) }));
};
export default App;
