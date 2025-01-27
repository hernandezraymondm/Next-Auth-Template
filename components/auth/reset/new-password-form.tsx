"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormAlert } from "@/components/form-alert";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { NewPasswordSchema } from "@/schemas";
import { NewPasswordFields } from "./new-password-fields";
import { Loader } from "@/components/ui/loader";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "../../form-error";
import { verifyResetToken } from "@/actions/verify-reset-token";
import { verifyNewPassword } from "@/actions/verify-new-password";

interface NewPasswordFormProps {
  token: string;
}

export const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const verifyLink = async () => {
      const result = await verifyResetToken(token);
      if (result.valid) {
        setIsTokenValid(result.valid);
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    };

    if (token) {
      verifyLink();
    } else {
      setError("No reset password token provided");
      setIsLoading(false);
    }
  }, [token]);

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    startTransition(() => {
      verifyNewPassword(token, values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  if (isLoading) {
    return <Loader size="lg" />;
  }

  if (success) {
    return (
      <FormSuccess
        headerLabel={success}
        mainMessage="Your password has been changed successfully."
        subMessage="Use your new password to login."
      />
    );
  }

  if (!isTokenValid) {
    return <FormError error={error || "Invalid verification link"} />;
  }

  return (
    <CardWrapper
      size="md"
      headerLabel="Set a new password"
      headerSubLabel="Please enter your 6-digit code. Then create and confirm your new password."
      backButtonLink="Back to login"
      backButtonHref="/auth/login"
      isBackArrowed={true}
      className="!text-gray-600"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <NewPasswordFields form={form} isPending={isPending} />
          </div>
          <FormAlert message={error} variant="error" />
          <Button type="submit" disabled={isPending} className="button">
            Change Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
