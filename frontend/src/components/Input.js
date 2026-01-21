import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Input = ({ label, error, helperText, className = "", ...props }) => {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsxs("label", { htmlFor: props.id, className: "block text-sm font-medium text-brand-dark mb-2", children: [label, props.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] })), _jsx("input", { className: `w-full px-4 py-2.5 border rounded-lg text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all ${error ? "border-red-500" : "border-gray-300"} ${className}`, ...props }), error && _jsx("p", { className: "text-red-500 text-sm mt-1", children: error }), helperText && !error && (_jsx("p", { className: "text-gray-500 text-sm mt-1", children: helperText }))] }));
};
export default Input;
