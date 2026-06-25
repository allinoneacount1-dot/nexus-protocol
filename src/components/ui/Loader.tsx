import { cn } from "@/lib/utils/cn";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Loader({ size = "md", className }: LoaderProps) {
  return (
    <div
      className={cn(
        "border-2 border-white/10 border-t-cyan rounded-full animate-spin",
        {
          "w-4 h-4": size === "sm",
          "w-8 h-8": size === "md",
          "w-12 h-12": size === "lg",
        },
        className
      )}
    />
  );
}
