import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Select = ({ label, error, options, placeholder, className = "", ...props }) => {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsxs("label", { htmlFor: props.id, className: "block text-sm font-medium text-brand-dark mb-2", children: [label, props.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] })), _jsxs("select", { className: `w-full px-4 py-2.5 border rounded-lg text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all appearance-none ${error ? "border-red-500" : "border-gray-300"} ${className}`, ...props, children: [placeholder && _jsx("option", { value: "", children: placeholder }), options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }), error && _jsx("p", { className: "text-red-500 text-sm mt-1", children: error })] }));
};
export default Select;
