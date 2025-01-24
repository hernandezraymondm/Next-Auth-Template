"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface OutlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const OutlineInput = React.forwardRef<HTMLInputElement, OutlineInputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasContent, setHasContent] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={type}
          id={id}
          className={cn(
            "peer block w-full rounded-md border bg-background px-2.5 pb-2.5 pt-4 text-sm text-foreground appearance-none focus:outline-none focus:ring-0",
            "border-input",
            "focus:border-accent",
            "placeholder-shown:border-input",
            "dark:border-input dark:text-white dark:focus:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder=" "
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasContent(e.target.value !== "");
          }}
          onChange={(e) => setHasContent(e.target.value !== "")}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2",
            "text-gray-700 peer-focus:text-accent rounded-lg",
            "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2",
            "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4",
            "rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
            "dark:bg-background",
            "pointer-events-none user-select-none",
            (isFocused || hasContent) && "text-gray-700"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
OutlineInput.displayName = "OutlineInput";

export { OutlineInput };
