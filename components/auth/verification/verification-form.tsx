"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { IoIosMail } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { FormAlert } from "@/components/form-alert";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { TokenExpirationCountdown } from "@/components/auth/countdown";
import { ResendCodeSection } from "@/components/auth/verification/resend-code-section";
import { OtpInput } from "@/components/auth/otp-input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { verifyEmailToken } from "@/actions/verify-email-token";
import { verifyEmailCode } from "@/actions/verify-email-code";
import { Form } from "@/components/ui/form";
import { OtpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface VerificationFormProps {
  token: string;
}

export const VerificationForm = ({ token }: VerificationFormProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [email, setEmail] = useState("");
  const [expires, setExpires] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState(false);
  const form = useForm({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    const verifyLink = async () => {
      const result = await verifyEmailToken(token);
      setIsTokenValid(result.valid);
      if (result.data && result.valid) {
        setEmail(result.data.email);
        setExpires(result.data.expires);
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    };

    if (token) {
      verifyLink();
    } else {
      setError("No verification token provided");
      setIsLoading(false);
    }
  }, [token]);

  const onSubmit = (values: z.infer<typeof OtpSchema>) => {
    setError("");
    setIsVerifying(true);
    setTimeout(async () => {
      const result = await verifyEmailCode(token, values.code);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error);
      }
      setIsVerifying(false);
    }, 2000);
  };

  if (isLoading) {
    return <Loader size="lg" />;
  }

  if (success) {
    return (
      <FormSuccess
        headerLabel="Verification Success!"
        mainMessage=" Thank you for your support, we are pleased to inform you that your
        account is now ready for use."
        subMessage="You can now sign in with your email address."
      />
    );
  }

  if (!isTokenValid) {
    return <FormError error={error || "Invalid verification link"} />;
  }

  return (
    <CardWrapper
      size="md"
      icon={<IoIosMail size="60" color="#8b70f5" />}
      headerLabel={
        isVerifying ? "Verifying your Information" : "Verify your Email Address"
      }
      headerSubLabel={
        isVerifying
          ? "Please wait while we process your request..."
          : "Thanks for helping us keep your account secure!"
      }
      separator
      backButtonLink="Back to login"
      backButtonHref="/auth/login"
      isBackArrowed={true}
      className="!text-gray-600"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {isVerifying ? (
            <div className="mb-10">
              <Loader size="lg" color="#8b70f5" />
            </div>
          ) : (
            <div className="text-center">
              <p className="paragraph">
                Enter the 6-digit code we sent to <strong>{email}</strong> to
                continue.
              </p>
              <div className="text-sm text-center mt-3">
                This code will expire in
                <strong>
                  <TokenExpirationCountdown expiration={expires} />
                </strong>
              </div>
            </div>
          )}
          <OtpInput form={form} loading={isVerifying} />
          {error && <FormAlert message={error} variant="error" />}
          <Button type="submit" disabled={isVerifying} className="button">
            Verify Email
          </Button>
          <ResendCodeSection email={email} token={token} setError={setError} />
        </form>
      </Form>
    </CardWrapper>
  );
};
