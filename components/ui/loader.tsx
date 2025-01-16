import * as React from "react";
import { cn } from "@/lib/utils";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = "md", color = "primary", ...props }, ref) => {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center",
          {
            "h-6 w-6": size === "sm",
            "h-10 w-10": size === "md",
            "h-16 w-16": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <svg
          className={cn("animate-spin", {
            "text-primary": color === "primary",
            "text-secondary": color === "secondary",
            "text-accent": color === "accent",
          })}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }
);
Loader.displayName = "Loader";

export { Loader };
