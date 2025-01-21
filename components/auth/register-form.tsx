"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { RiMailSendFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FaCaretRight } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import { ResendCodeCountdown } from "./countdown";
import { resendLink } from "@/actions/resend-link";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [isResending, setIsResending] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [resendCount, setResendCount] = useState(120);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        setEmail(values.email);
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
        setResendCount((prev) => prev * 2);
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

  console.log(success);

  return (
    <CardWrapper
      cardSize={!success ? "w-[400px]" : "w-[500px]"}
      icon={success && <RiMailSendFill size="60" className="text-sky-400" />}
      headerLabel={
        !success ? "Create your account" : "Please verify your email"
      }
      headerSubLabel={
        !success ? "Welcome! Please fill in the details to get started." : ""
      }
      backButtonLabel={!success ? "Already have an account?" : ""}
      backButtonLink={!success ? "Sign in" : ""}
      backButtonHref={!success ? "/auth/login" : ""}
      showSocial={!success}
      showFooter={!success}
    >
      {!success ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
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
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="email"
                        placeholder="e.g. name@yourcompany.com"
                      />
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
            <FormError message={error} />
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
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 text-center ">
          <p className="text-gray-700 text-sm ">
            You&apos;re almost there! We sent an email to{" "}
            <strong>{email}</strong>
          </p>
          <p className="text-gray-700 text-sm inline">
            Just click on the link in that email to complete your signup. <br />
            The link in the email will expire in 24 hours. <br /> If you
            don&apos;t see it, you may need to{" "}
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
              className="button !max-w-[383px]"
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
              className="button !max-w-[383px]"
              disabled={isResending || !resendEnabled}
            >
              Resend code in
              <ResendCodeCountdown
                initialCount={resendCount}
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
