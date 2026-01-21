import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Container, Hero } from "@/components";
import { usePageMeta } from "@/hooks";
import { motion } from "framer-motion";
export const AboutPage = () => {
    usePageMeta({
        title: "About Us",
        description: "Learn about Amani School's mission, vision, values, and leadership.",
        keywords: ["about", "mission", "vision", "school leadership"],
    });
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
    return (_jsxs(_Fragment, { children: [_jsx(Hero, { title: "About Amani School", subtitle: "Discover our mission to nurture excellence in every student." }), _jsx("section", { className: "py-16 md:py-24 bg-white", children: _jsx(Container, { children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [_jsxs(motion.div, { variants: itemVariants, className: "p-8 border-2 border-brand-green rounded-lg", children: [_jsx("h3", { className: "text-2xl font-bold text-brand-green mb-4", children: "Our Mission" }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: "To provide world-class English medium education that empowers students to achieve academic excellence, develop critical thinking skills, and become responsible global citizens who positively impact their communities." })] }), _jsxs(motion.div, { variants: itemVariants, className: "p-8 border-2 border-brand-brown rounded-lg", children: [_jsx("h3", { className: "text-2xl font-bold text-brand-brown mb-4", children: "Our Vision" }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: "To be the leading educational institution in Tanzania, recognized for producing confident, compassionate, and competent individuals who excel academically and make meaningful contributions to society." })] }), _jsxs(motion.div, { variants: itemVariants, className: "p-8 border-2 border-brand-green rounded-lg", children: [_jsx("h3", { className: "text-2xl font-bold text-brand-green mb-4", children: "Core Values" }), _jsxs("ul", { className: "text-gray-700 space-y-2", children: [_jsx("li", { children: "\u2713 Integrity and Honesty" }), _jsx("li", { children: "\u2713 Academic Excellence" }), _jsx("li", { children: "\u2713 Respect and Inclusivity" }), _jsx("li", { children: "\u2713 Community Engagement" }), _jsx("li", { children: "\u2713 Continuous Improvement" })] })] })] }) }) }), _jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center", children: "Our Journey" }), _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "space-y-8", children: [_jsxs(motion.div, { variants: itemVariants, className: "flex gap-6", children: [_jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl", children: "2015" }), _jsxs("div", { className: "pt-4", children: [_jsx("h3", { className: "text-xl font-bold text-brand-dark mb-2", children: "School Established" }), _jsx("p", { className: "text-gray-600", children: "Amani School opened its doors with a commitment to academic excellence and holistic student development." })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "flex gap-6", children: [_jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-brand-brown rounded-full flex items-center justify-center text-white font-bold text-xl", children: "2018" }), _jsxs("div", { className: "pt-4", children: [_jsx("h3", { className: "text-xl font-bold text-brand-dark mb-2", children: "Accreditation Recognition" }), _jsx("p", { className: "text-gray-600", children: "Earned national accreditation for our curriculum and teaching methodologies." })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "flex gap-6", children: [_jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl", children: "2020" }), _jsxs("div", { className: "pt-4", children: [_jsx("h3", { className: "text-xl font-bold text-brand-dark mb-2", children: "Digital Learning Initiative" }), _jsx("p", { className: "text-gray-600", children: "Launched comprehensive digital learning platform to enhance educational delivery." })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "flex gap-6", children: [_jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-brand-brown rounded-full flex items-center justify-center text-white font-bold text-xl", children: "2023" }), _jsxs("div", { className: "pt-4", children: [_jsx("h3", { className: "text-xl font-bold text-brand-dark mb-2", children: "State-of-the-Art Facilities" }), _jsx("p", { className: "text-gray-600", children: "Completed expansion of STEM laboratory and sports facilities to support modern education." })] })] })] })] }) }), _jsx("section", { className: "py-16 md:py-24", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center", children: "Leadership Team" }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
                                {
                                    name: "Dr. Joseph Mwangi",
                                    title: "Principal",
                                    bio: "15+ years in educational leadership",
                                },
                                {
                                    name: "Margaret Kipchoge",
                                    title: "Deputy Principal (Academic)",
                                    bio: "Specialist in curriculum development",
                                },
                                {
                                    name: "David Otieno",
                                    title: "Head of Administration",
                                    bio: "Expert in school operations",
                                },
                                {
                                    name: "Grace Mghalu",
                                    title: "Head of Student Affairs",
                                    bio: "Passionate about student welfare",
                                },
                            ].map((leader, index) => (_jsxs(motion.div, { variants: itemVariants, className: "text-center p-6 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "w-20 h-20 bg-brand-green rounded-full mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-bold text-brand-dark mb-1", children: leader.name }), _jsx("p", { className: "text-brand-green font-semibold mb-2", children: leader.title }), _jsx("p", { className: "text-sm text-gray-600", children: leader.bio })] }, index))) })] }) }), _jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: _jsxs(Container, { children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center", children: "Our Facilities" }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
                                {
                                    title: "Modern Classrooms",
                                    description: "Well-equipped learning spaces with interactive boards and technology.",
                                    icon: "🏫",
                                },
                                {
                                    title: "STEM Laboratory",
                                    description: "State-of-the-art facilities for science and technology learning.",
                                    icon: "🔬",
                                },
                                {
                                    title: "Library",
                                    description: "Comprehensive collection of physical and digital learning resources.",
                                    icon: "📚",
                                },
                                {
                                    title: "Sports Complex",
                                    description: "Indoor and outdoor facilities for athletic development.",
                                    icon: "🏃",
                                },
                                {
                                    title: "Computer Lab",
                                    description: "Fully equipped with modern computers for digital learning.",
                                    icon: "💻",
                                },
                                {
                                    title: "Assembly Hall",
                                    description: "Multi-purpose venue for events and gatherings.",
                                    icon: "🎭",
                                },
                            ].map((facility, index) => (_jsxs(motion.div, { variants: itemVariants, className: "bg-white p-6 rounded-lg shadow-md", children: [_jsx("div", { className: "text-4xl mb-4", children: facility.icon }), _jsx("h3", { className: "text-xl font-bold text-brand-dark mb-2", children: facility.title }), _jsx("p", { className: "text-gray-600", children: facility.description })] }, index))) })] }) })] }));
};
