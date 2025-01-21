"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { FaCaretRight } from "react-icons/fa6";
import { EyeIcon, EyeOffIcon, Fingerprint, MailWarning } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "@/components/ui/loader";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { resendLink } from "@/actions/resend-link";
import ReCAPTCHA from "react-google-recaptcha";
import { ResendCodeCountdown } from "./countdown";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This email is already associated with a different provider. Please use a different email or sign in with the correct provider."
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isUnverified, setIsUnverified] = useState<boolean | undefined>();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isResending, setIsResending] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(true);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setEmail(values.email);
        setIsUnverified(data?.error === "UNVERIFIED");
        // setSuccess(data?.success);
      });
    });
  };

  // Function to resend the verification code
  const handleResendCode = async (captchaToken: string | null) => {
    if (!captchaToken) {
      setError("Please complete the CAPTCHA");
      return;
    }

    setIsResending(true);
    setError("");

    await resendLink(email, captchaToken)
      .then((data) => {
        setResendEnabled(false);
        setShowCaptcha(false);
        setError(data.error);
      })
      .catch(() => {
        setError("Resend link issue encountered!");
      })
      .finally(() => {
        setIsResending(false);
      });
  };

  const handleCaptchaSuccess = (token: string | null) => {
    if (token) {
      handleResendCode(token);
    }
  };

  // Function to enable the resend button
  const handleResendComplete = () => {
    setResendEnabled(true);
  };
  // error !== "UNVERIFIED";
  return (
    <CardWrapper
      cardSize={!isUnverified ? "w-[400px]" : "w-[500px]"}
      icon={
        isUnverified && <MailWarning size="60" className="text-yellow-400" />
      }
      headerLabel={
        !isUnverified ? "Sign in to VeriSafe" : "Please verify your email"
      }
      headerSubLabel={
        !isUnverified ? "Welcome back! Please sign in to continue" : ""
      }
      backButtonLabel={!isUnverified ? "Don't have an account?" : ""}
      backButtonLink={!isUnverified ? "Sign up" : ""}
      backButtonHref={!isUnverified ? "/auth/register" : ""}
      showSocial={!isUnverified}
      showFooter={!isUnverified}
    >
      {!isUnverified ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="email" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
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
                            <EyeOffIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-500" />
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
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} className="button">
              Continue
              {isPending ? (
                <Loader size="sm" color="white" className="ml-2" />
              ) : (
                <FaCaretRight />
              )}
            </Button>
          </form>
          <div className="w-full flex place-content-center">
            <Button
              type="button"
              variant="link"
              disabled={isPending}
              className="font-semibold mt-4 self-center text-accent-highlight"
            >
              <Fingerprint /> Use passkey instead
            </Button>
          </div>
        </Form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 text-center ">
          <p className="text-gray-700 text-sm ">
            We sent an email to <strong>{email}</strong>
          </p>
          <p className="text-gray-700 text-sm inline">
            Just click on the link in that email to continue using the
            application. <br /> The link in the email will expire in 24 hours.
            <br />
            If you don&apos;t see it, you may need to{" "}
            <strong>check your spam folder</strong>.
          </p>

          <p className="text-muted-foreground text-sm inline">
            Still can&apos;t find the email?
          </p>

          {showCaptcha && (
            <div className="flex flex-col items-center gap-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleCaptchaSuccess}
              />
            </div>
          )}
          {!isResending && resendEnabled && !showCaptcha && (
            <Button
              className="button !max-w-[413px]"
              onClick={() => setShowCaptcha(true)}
              disabled={isResending || !resendEnabled}
            >
              Resend Email
            </Button>
          )}
          {isResending && !showCaptcha && (
            <span className="flex gap-4 link text-sm text-accent-highlight/50 !font-semibold">
              Resending
              <Loader size="sm" />
            </span>
          )}
          {!resendEnabled && !showCaptcha && (
            <Button
              className="button !max-w-[413px]"
              disabled={isResending || !resendEnabled}
            >
              Resend code in
              <ResendCodeCountdown
                initialCount={120}
                onComplete={handleResendComplete}
              />
            </Button>
          )}

          <p className="text-muted-foreground text-sm inline">
            Need help?
            <Button
              variant="link"
              className="font-normal"
              size="custom"
              asChild
            >
              <Link
                href="/contact-us"
                className="!text-accent-highlight underline"
              >
                Contact Us
              </Link>
            </Button>
          </p>
        </div>
      )}
    </CardWrapper>
  );
};
