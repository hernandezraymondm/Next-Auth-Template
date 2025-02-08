"use client";

import * as z from "zod";
import { useSearchParams } from "next/navigation";
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
import { LoginFields } from "@/components/auth/login/login-fields";
import { login } from "@/actions/login";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This email is already associated with a different provider. Please use a different email or sign in with the correct provider."
      : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: undefined,
    },
  });
  // TODO: useSession status: "loading" | "authenticated" | "unauthenticated"
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((err) => {
          console.log("Error during sign-in callback:", err);
          setError("Something went wrong");
        });
    });
  };

  return (
    <CardWrapper
      size="sm"
      headerLabel="Sign in to VeriSafe"
      headerSubLabel="Welcome back! Please sign in to continue"
      backButtonLabel="Don't have an account?"
      backButtonLink="Sign up"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <LoginFields
            form={form}
            isPending={isPending}
            showTwoFactor={showTwoFactor}
          />
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
              className="font-semibold self-center text-tertiary"
            >
              <Fingerprint /> Use passkey instead
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
