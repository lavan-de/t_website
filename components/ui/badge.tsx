import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "purple" | "green" | "blue";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
        {
          "bg-white/10 text-white border border-white/20": variant === "default",
          "bg-purple-500/20 text-purple-300 border border-purple-500/30":
            variant === "purple",
          "bg-green-500/20 text-green-300 border border-green-500/30":
            variant === "green",
          "bg-blue-500/20 text-blue-300 border border-blue-500/30":
            variant === "blue",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
