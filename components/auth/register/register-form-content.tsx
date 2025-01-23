"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCaretRight } from "react-icons/fa6";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Form } from "@/components/ui/form";
import { FormAlert } from "@/components/form-alert";
import { RegisterFormFields } from "@/components/auth/register/register-form-fields";

interface RegisterFormContentProps {
  success: boolean | undefined;
  setSuccess: (success: boolean | undefined) => void;
  setEmail: (email: string) => void;
}

export const RegisterFormContent = ({
  setSuccess,
  setEmail,
}: RegisterFormContentProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess(false);
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        setEmail(values.email);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-3">
        <RegisterFormFields form={form} isPending={isPending} />
        <FormAlert message={error} variant="error" />
        <Button type="submit" disabled={isPending} className="button">
          Create an account
          {isPending ? (
            <Loader size="sm" color="white" className="ml-2" />
          ) : (
            <FaCaretRight />
          )}
        </Button>
      </form>
    </Form>
  );
};
