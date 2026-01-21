import { jsx as _jsx } from "react/jsx-runtime";
export const Container = ({ children, className = "", size = "lg", }) => {
    const sizes = {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        full: "w-full",
    };
    return (_jsx("div", { className: `${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`, children: children }));
};
export default Container;
