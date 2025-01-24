"use client";

import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { FormAlert } from "@/components/form-alert";
import { ResendCodeCountdown } from "@/components/auth/countdown";
import { useResendLink } from "@/hooks/use-resend-link";

interface UnverifiedEmailProps {
  email: string;
  message: string;
}

export const UnverifiedEmail = ({ email, message }: UnverifiedEmailProps) => {
  const {
    error,
    showCaptcha,
    setShowCaptcha,
    isLoading,
    resendEnabled,
    resendCount,
    handleCaptchaSuccess,
    handleResendComplete,
  } = useResendLink(email);

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center ">
      <p className="text-gray-700 text-sm ">
        {message} <strong>{email}</strong>
      </p>
      <p className="text-gray-700 text-sm inline">
        Just click on the link in that email to complete your signup. <br />
        The link in the email will expire in 24 hours. <br />
        If you don&apos;t see it, you may need to{" "}
        <strong>check your spam folder</strong>.
      </p>

      <p className="text-muted-foreground text-sm inline">
        Still can&apos;t find the email?
      </p>

      <FormAlert message={error} variant="error" />

      {showCaptcha && (
        <div className="flex flex-col items-center gap-4">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={handleCaptchaSuccess}
          />
        </div>
      )}
      {!isLoading && resendEnabled && !showCaptcha && (
        <Button
          className="button !max-w-[413px]"
          onClick={() => setShowCaptcha(true)}
          disabled={isLoading || !resendEnabled}
        >
          Send
        </Button>
      )}
      {isLoading && !showCaptcha && (
        <span className="flex gap-4 link text-sm text-accent/50 !font-semibold">
          Sending
          <Loader size="sm" />
        </span>
      )}
      {!resendEnabled && !showCaptcha && (
        <Button
          className="button !max-w-[413px]"
          disabled={isLoading || !resendEnabled}
        >
          Send in
          <ResendCodeCountdown
            initialCount={resendCount}
            onComplete={handleResendComplete}
          />
        </Button>
      )}

      <p className="text-muted-foreground text-sm inline">
        Need help?
        <Button variant="link" className="font-normal" size="custom" asChild>
          <Link href="/contact-us" className="!text-accent underline">
            Contact Us
          </Link>
        </Button>
      </p>
    </div>
  );
};
