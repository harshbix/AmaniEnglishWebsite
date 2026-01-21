import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Container, Hero, Button } from "@/components";
import { EventCard, NewsCard, MetricCard } from "@/components";
import { usePageMeta, useEvents, useNews, usePerformance } from "@/hooks";
import { SCHOOL_INFO } from "@/utils/constants";
import { Skeleton } from "@/components/Skeleton";
import { motion } from "framer-motion";
export const HomePage = () => {
    usePageMeta({
        title: "Home",
        description: SCHOOL_INFO.description,
        keywords: [
            "school",
            "education",
            "Tanga",
            "Tanzania",
            "academic excellence",
        ],
    });
    const { data: events = [], isLoading: eventsLoading } = useEvents();
    const { data: news = { items: [] }, isLoading: newsLoading } = useNews(1, 3);
    const { data: performance = {
        summary: { passRate: 0, averageScore: 0, graduationRate: 0, studentSatisfaction: 0 },
    }, isLoading: performanceLoading, } = usePerformance();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };
    return (_jsxs(_Fragment, { children: [_jsx(Hero, { title: "Empowering Academic Excellence Through Seamless Competence", subtitle: "Nurturing brilliance, inspiring excellence. A world-class education in Tanga, Tanzania.", ctaText: "Apply Now", ctaLink: "/admissions" }), _jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: _jsx(Container, { children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsxs(motion.div, { variants: itemVariants, className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("span", { className: "text-white text-2xl", children: "\uD83C\uDF93" }) }), _jsx("h3", { className: "text-xl font-bold text-brand-dark mb-3", children: "Excellence" }), _jsx("p", { className: "text-gray-600", children: "We maintain the highest standards in academic instruction and student development." })] }), _jsxs(motion.div, { variants: itemVariants, className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("span", { className: "text-white text-2xl", children: "\uD83E\uDD1D" }) }), _jsx("h3", { className: "text-xl font-bold text-brand-dark mb-3", children: "Community" }), _jsx("p", { className: "text-gray-600", children: "We foster a supportive environment where every student belongs and thrives." })] }), _jsxs(motion.div, { variants: itemVariants, className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("span", { className: "text-white text-2xl", children: "\uD83C\uDF1F" }) }), _jsx("h3", { className: "text-xl font-bold text-brand-dark mb-3", children: "Growth" }), _jsx("p", { className: "text-gray-600", children: "We empower each student to reach their full potential and become leaders." })] })] }) }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center", children: "Our Performance" }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: performanceLoading ? (Array.from({ length: 4 }).map((_, i) => (_jsx(Skeleton, { className: "h-32" }, i)))) : (_jsxs(_Fragment, { children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(MetricCard, { label: "Pass Rate", value: performance.summary.passRate, icon: "\uD83D\uDCCA" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(MetricCard, { label: "Average Score", value: performance.summary.averageScore, suffix: "", icon: "\u2713" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(MetricCard, { label: "Graduation Rate", value: performance.summary.graduationRate, icon: "\uD83C\uDF93" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(MetricCard, { label: "Student Satisfaction", value: performance.summary.studentSatisfaction, icon: "\uD83D\uDE0A" }) })] })) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: _jsxs(Container, { children: [_jsxs("div", { className: "flex items-center justify-between mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark", children: "Upcoming Events" }), _jsx(Link, { to: "/calendar", children: _jsx(Button, { variant: "outline", children: "View Calendar" }) })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: eventsLoading ? (Array.from({ length: 4 }).map((_, i) => (_jsx(Skeleton, { className: "h-40" }, i)))) : (events.slice(0, 4).map((event) => (_jsx(motion.div, { variants: itemVariants, children: _jsx(EventCard, { event: event }) }, event.id)))) })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs(Container, { children: [_jsxs("div", { className: "flex items-center justify-between mb-12", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark", children: "Latest News" }), _jsx(Link, { to: "/news", children: _jsx(Button, { variant: "outline", children: "Read More" }) })] }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: newsLoading ? (Array.from({ length: 3 }).map((_, i) => (_jsx(Skeleton, { className: "h-64" }, i)))) : (news.items.map((article) => (_jsx(motion.div, { variants: itemVariants, children: _jsx(NewsCard, { news: article }) }, article.id)))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-brand-dark text-white", children: _jsx(Container, { children: _jsxs(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, className: "text-center max-w-2xl mx-auto", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Ready to Join Amani School?" }), _jsx("p", { className: "text-lg text-gray-300 mb-8", children: "Start your journey with us today. We welcome students of all backgrounds and learning styles." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/admissions", children: _jsx(Button, { variant: "primary", children: "Apply Now" }) }), _jsx(Link, { to: "/contact", children: _jsx(Button, { variant: "outline", children: "Contact Us" }) })] })] }) }) })] }));
};
