"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCaretRight } from "react-icons/fa6";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Form } from "@/components/ui/form";
import { FormAlert } from "@/components/form-alert";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterFormFields } from "@/components/auth/register/register-form-fields";

export const RegisterForm = () => {
  const router = useRouter();
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
    startTransition(() => {
      register(values).then((response) => {
        setError(response.error);
        if (response.data) {
          router.push(`/auth/verification/${response.data.token}`);
        }
      });
    });
  };

  return (
    <CardWrapper
      size="sm"
      headerLabel="Create your account"
      headerSubLabel="Welcome! Please fill in the details to get started."
      backButtonLabel="Already have an account?"
      backButtonLink="Sign in"
      backButtonHref="/auth/login"
      showSocial
      showFooter
    >
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
    </CardWrapper>
  );
};
