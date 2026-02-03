import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Variants
          {
            "bg-amber-700 text-white hover:bg-amber-800 shadow-lg shadow-amber-700/25 hover:shadow-amber-700/40":
              variant === "primary",
            "bg-white text-slate-900 hover:bg-gray-100 shadow-lg":
              variant === "secondary",
            "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm":
              variant === "outline",
            "text-gray-300 hover:text-white hover:bg-white/10":
              variant === "ghost",
          },
          // Sizes
          {
            "h-9 px-4 text-sm rounded-lg": size === "sm",
            "h-11 px-6 text-sm rounded-lg": size === "md",
            "h-13 px-8 text-base rounded-xl": size === "lg",
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

export { Button };
