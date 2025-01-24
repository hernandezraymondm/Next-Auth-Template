"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OutlineInput } from "@/components/ui/outline-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormAlert } from "@/components/form-alert";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ResetSchema } from "@/schemas";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      size="md"
      headerLabel="Forgot password?"
      headerSubLabel="No worries, we'll send you reset instructions."
      backButtonLink="Back to login"
      backButtonHref="/auth/login"
      isBackArrowed={true}
      className="!text-gray-600"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
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
                        <IdCard
                          className="h-4 w-4 text-gray-600"
                          strokeWidth="3"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormAlert message={error} variant="error" />
          <FormAlert message={success} variant="success" />
          <Button type="submit" disabled={isPending} className="button">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
