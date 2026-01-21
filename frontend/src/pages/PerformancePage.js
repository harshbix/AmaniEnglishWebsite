import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Container, Hero, MetricCard } from "@/components";
import { usePageMeta, usePerformance } from "@/hooks";
import { Skeleton } from "@/components/Skeleton";
import { motion } from "framer-motion";
export const PerformancePage = () => {
    usePageMeta({
        title: "School Performance",
        description: "Review our academic performance metrics, achievements, and statistics.",
        keywords: ["performance", "results", "achievements", "metrics"],
    });
    const { data: performance, isLoading } = usePerformance();
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
    return (_jsxs(_Fragment, { children: [_jsx(Hero, { title: "School Performance", subtitle: "Excellence through measurable results and continuous improvement." }), _jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center", children: "Key Performance Indicators" }), isLoading ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: Array.from({ length: 4 }).map((_, i) => (_jsx(Skeleton, { className: "h-32" }, i))) })) : (_jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(MetricCard, { label: "Pass Rate", value: performance?.summary.passRate || 0, icon: "\uD83D\uDCCA" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(MetricCard, { label: "Average Score", value: performance?.summary.averageScore || 0, suffix: "", icon: "\u2713" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(MetricCard, { label: "Graduation Rate", value: performance?.summary.graduationRate || 0, icon: "\uD83C\uDF93" }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(MetricCard, { label: "Student Satisfaction", value: performance?.summary.studentSatisfaction || 0, icon: "\uD83D\uDE0A" }) })] }))] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center", children: "Performance by Subject" }), isLoading ? (Array.from({ length: 5 }).map((_, i) => (_jsx(Skeleton, { className: "h-16 mb-4" }, i)))) : (_jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "space-y-6", children: performance?.bySubject.map((subject, index) => (_jsxs(motion.div, { variants: itemVariants, className: "bg-white p-6 rounded-lg shadow-md", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-lg font-bold text-brand-dark", children: subject.subject }), _jsxs("span", { className: "text-2xl font-bold text-brand-green", children: [subject.passRate, "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-4 overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, whileInView: { width: `${subject.passRate}%` }, transition: { duration: 1, delay: index * 0.1 }, viewport: { once: true }, className: "h-full bg-gradient-to-r from-brand-green to-brand-brown" }) }), _jsxs("p", { className: "text-sm text-gray-600 mt-2", children: ["Average Score: ", subject.averageScore, "/100"] })] }, index))) }))] }) }), _jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center", children: "Achievements & Recognition" }), isLoading ? (Array.from({ length: 5 }).map((_, i) => (_jsx(Skeleton, { className: "h-20 mb-4" }, i)))) : (_jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "space-y-4", children: performance?.achievements.map((achievement, index) => (_jsx(motion.div, { variants: itemVariants, className: "bg-white p-6 rounded-lg border-l-4 border-brand-green shadow-md", children: _jsxs("div", { className: "flex gap-4", children: [_jsx("span", { className: "text-2xl", children: "\u2B50" }), _jsx("p", { className: "text-gray-700 font-medium", children: achievement })] }) }, index))) }))] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center", children: "Growth Trajectory" }), isLoading ? (Array.from({ length: 3 }).map((_, i) => (_jsx(Skeleton, { className: "h-20 mb-4" }, i)))) : (_jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: performance?.yearOverYear.map((year, index) => (_jsxs(motion.div, { variants: itemVariants, className: "bg-gradient-to-br from-brand-green to-brand-green bg-opacity-10 p-8 rounded-lg text-center", children: [_jsxs("div", { className: "text-4xl font-bold text-brand-green mb-2", children: [year.passRate, "%"] }), _jsx("p", { className: "text-gray-600 text-lg font-medium", children: year.year })] }, index))) }))] }) })] }));
};
