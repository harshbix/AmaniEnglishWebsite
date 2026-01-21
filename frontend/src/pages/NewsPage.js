import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Container, Hero } from "@/components";
import { usePageMeta, useNews } from "@/hooks";
import { Skeleton } from "@/components/Skeleton";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
export const NewsPage = () => {
    usePageMeta({
        title: "News & Announcements",
        description: "Latest news, announcements, and updates from Amani School.",
        keywords: ["news", "announcements", "updates"],
    });
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;
    const { data: newsData, isLoading } = useNews(currentPage, limit);
    const news = newsData?.items || [];
    const pagination = newsData?.pagination || { page: 1, pages: 1, total: 0 };
    return (_jsxs(_Fragment, { children: [_jsx(Hero, { title: "News & Announcements", subtitle: "Stay informed with the latest updates from our school community." }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs(Container, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 }, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12", children: isLoading ? (Array.from({ length: limit }).map((_, i) => (_jsx(Skeleton, { className: "h-64" }, i)))) : news.length > 0 ? (news.map((article) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: _jsx(NewsCard, { news: article }) }, article.id)))) : (_jsx("div", { className: "col-span-full text-center py-12", children: _jsx("p", { className: "text-gray-600 text-lg", children: "No news available at the moment." }) })) }), pagination.pages > 1 && (_jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx(Button, { variant: "outline", disabled: currentPage === 1, onClick: () => setCurrentPage(currentPage - 1), children: "Previous" }), _jsxs("span", { className: "text-gray-600 font-medium", children: ["Page ", currentPage, " of ", pagination.pages] }), _jsx(Button, { variant: "outline", disabled: currentPage === pagination.pages, onClick: () => setCurrentPage(currentPage + 1), children: "Next" })] }))] }) })] }));
};
