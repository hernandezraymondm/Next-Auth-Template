"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCaretRight } from "react-icons/fa6";
import { Fingerprint } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { FormAlert } from "@/components/form-alert";
import { LoginFormFields } from "@/components/auth/login/login-form-fields";
import { login } from "@/actions/login";

interface LoginFormContentProps {
  urlError: string;
  setIsUnverified: (isUnverified: boolean | undefined) => void;
  setEmail: (email: string) => void;
}

export const LoginFormContent = ({
  setIsUnverified,
  setEmail,
  urlError,
}: LoginFormContentProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setEmail(values.email);
        setIsUnverified(data?.unverified);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LoginFormFields form={form} isPending={isPending} />
        <FormAlert message={error || urlError} variant="error" />
        <Button type="submit" disabled={isPending} className="button">
          Continue
          {isPending ? (
            <Loader size="sm" color="white" className="ml-2" />
          ) : (
            <FaCaretRight />
          )}
        </Button>
        <div className="w-full flex place-content-center">
          <Button
            type="button"
            variant="link"
            disabled={isPending}
            className="font-semibold self-center text-accent"
          >
            <Fingerprint /> Use passkey instead
          </Button>
        </div>
      </form>
    </Form>
  );
};
