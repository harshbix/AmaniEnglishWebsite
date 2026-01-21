import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion";
export const Skeleton = ({ className = "w-full h-12", count = 1, }) => {
    return (_jsx(_Fragment, { children: Array.from({ length: count }).map((_, index) => (_jsx(motion.div, { className: `bg-gray-200 rounded-lg ${className} mb-4`, animate: { opacity: [0.6, 1, 0.6] }, transition: { duration: 1.5, repeat: Infinity } }, index))) }));
};
export default Skeleton;
