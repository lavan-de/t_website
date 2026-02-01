import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8",
        "transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardIcon({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn("text-4xl mb-4 transition-transform group-hover:scale-110", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3
      className={cn("text-xl font-semibold text-white mb-3", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: CardProps) {
  return (
    <p className={cn("text-gray-400 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}
