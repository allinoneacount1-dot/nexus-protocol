import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("glass rounded-xl", glow && "border-glow-cyan", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
export default GlassCard;
