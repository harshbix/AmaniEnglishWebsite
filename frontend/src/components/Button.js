import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = ({ variant = "primary", size = "md", children, isLoading = false, icon, className = "", ...props }) => {
    const baseStyles = "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantStyles = {
        primary: "bg-brand-green text-white hover:bg-opacity-90 focus:ring-brand-green",
        secondary: "bg-brand-brown text-white hover:bg-opacity-90 focus:ring-brand-brown",
        outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white",
        ghost: "text-brand-green hover:bg-green-50",
    };
    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
    };
    const disabledStyles = "disabled:opacity-50 disabled:cursor-not-allowed";
    return (_jsx("button", { className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`, disabled: isLoading || props.disabled, ...props, children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [isLoading && _jsx("span", { className: "inline-block animate-spin", children: "\u27F3" }), icon && _jsx("span", { children: icon }), _jsx("span", { children: children })] }) }));
};
export default Button;
