"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, IdCard, UserPen } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { OutlineInput } from "@/components/ui/outline-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface RegisterFormFieldsProps {
  form: UseFormReturn<any>;
  isPending: boolean;
}

export const RegisterFormFields = ({
  isPending,
  form,
}: RegisterFormFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <OutlineInput label="Name" {...field} disabled={isPending} />
                <div className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent flex items-center">
                  <UserPen className="h-4 w-4 text-gray-600" strokeWidth="3" />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <OutlineInput
                  label="Email address"
                  {...field}
                  disabled={isPending}
                  type="email"
                />
                <div className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent flex items-center">
                  <IdCard className="h-4 w-4 text-gray-600" strokeWidth="3" />
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
    </div>
  );
};
