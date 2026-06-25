import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-cyan text-void hover:bg-cyan/90 active:scale-95": variant === "primary",
            "bg-white/10 text-white border border-white/10 hover:bg-white/15": variant === "secondary",
            "text-white/60 hover:text-white hover:bg-white/5": variant === "ghost",
          },
          {
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-5 py-2.5": size === "md",
            "text-base px-7 py-3": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
