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
            "peer block w-full appearance-none rounded-lg border bg-background px-2.5 pb-2.5 pt-4 text-sm text-foreground focus:outline-none focus:ring-0",
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
            "absolute top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm duration-300 peer-focus:px-2",
            "rounded-lg text-gray-500 peer-focus:text-tertiary",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",
            "peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75",
            "start-1 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
            "dark:bg-background",
            "user-select-none pointer-events-none",
            isFocused || hasContent
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
