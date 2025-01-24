"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loaderVariants = cva("flex justify-center items-center", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const lineVariants = cva("transform rotate-45 rounded-full", {
  variants: {
    size: {
      sm: "w-[2px] h-3",
      md: "w-1 h-6",
      lg: "w-[4px] h-7",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  color?: string;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = "md", color = "gray", ...props }, ref) => {
    const lines = [0, 1, 2];
    const translateYValue = size === "sm" ? 5 : size === "md" ? 7 : 10;

    return (
      <div
        className={cn(loaderVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        {lines.map((index) => (
          <div
            key={index}
            className={cn(lineVariants({ size }))}
            style={{
              backgroundColor: color,
              animation: `bounce .5s ${index * 0.3}s infinite alternate`,
            }}
          ></div>
        ))}
        <style jsx>{`
          @keyframes bounce {
            from {
              transform: rotate(45deg) translateY(-${translateYValue}px);
              opacity: 0.5;
            }
            to {
              transform: rotate(45deg) translateY(${translateYValue}px);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }
);

Loader.displayName = "Loader";

export { Loader };
