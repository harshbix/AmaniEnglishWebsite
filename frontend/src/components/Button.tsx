import { type ButtonHTMLAttributes, type FC, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
  icon?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  icon,
  className = "",
  ...props
}) => {
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

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && <span className="inline-block animate-spin">⟳</span>}
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;
