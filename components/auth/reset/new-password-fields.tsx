"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FaCode } from "react-icons/fa";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { OutlineInput } from "@/components/ui/outline-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface NewPasswordFieldsProps {
  form: UseFormReturn<any>;
  isPending: boolean;
}

export const NewPasswordFields = ({
  isPending,
  form,
}: NewPasswordFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <OutlineInput
                  label="6-digit code"
                  {...field}
                  disabled={isPending}
                  autoComplete="off"
                />
                <div className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent flex items-center">
                  <FaCode className="h-4 w-4 text-gray-500" strokeWidth="3" />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <OutlineInput
                  label="Password"
                  {...field}
                  disabled={isPending}
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                  disabled={isPending}
                >
                  {showPassword ? (
                    <EyeOffIcon
                      className="h-4 w-4 text-gray-600"
                      strokeWidth="3"
                    />
                  ) : (
                    <EyeIcon
                      className="h-4 w-4 text-gray-500"
                      strokeWidth="3"
                    />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <OutlineInput
                  label="Confirm Password"
                  {...field}
                  disabled={isPending}
                  type={showConfirmPassword ? "text" : "password"}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={isPending}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon
                      className="h-4 w-4 text-gray-600"
                      strokeWidth="3"
                    />
                  ) : (
                    <EyeIcon
                      className="h-4 w-4 text-gray-500"
                      strokeWidth="3"
                    />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
