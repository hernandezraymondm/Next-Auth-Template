"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StandardInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const StandardInput = React.forwardRef<HTMLInputElement, StandardInputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    return (
      <div className="relative z-0">
        <input
          type={type}
          id={id}
          className={cn(
            "peer block w-full appearance-none border-0 border-b-2 border-input bg-transparent px-0 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-0 dark:border-input dark:text-white dark:focus:border-primary",
            className
          )}
          placeholder=" "
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary dark:text-muted-foreground rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {label}
        </label>
      </div>
    );
  }
);
StandardInput.displayName = "StandardInput";

export { StandardInput };
