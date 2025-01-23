"use client";

import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { ResendCodeCountdown } from "@/components/auth/countdown";
import { useResendCode } from "@/hooks/use-resend-code";

interface ResendCodeSectionProps {
  email: string;
  token: string;
  setError: (error: string | undefined) => void;
}

export const ResendCodeSection = ({
  email,
  token,
  setError,
}: ResendCodeSectionProps) => {
  const {
    error,
    showCaptcha,
    setShowCaptcha,
    isLoading,
    resendEnabled,
    resendCount,
    handleCaptchaSuccess,
    handleResendComplete,
  } = useResendCode(email, token);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  return (
    <div className="w-full flex justify-center">
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
          variant="ghost"
          className="text-md !font-semibold"
          onClick={() => setShowCaptcha(true)}
          disabled={isLoading || !resendEnabled}
        >
          Resend code
        </Button>
      )}

      {isLoading && !showCaptcha && (
        <span className="flex gap-4 link text-sm text-accent-highlight/50 !font-semibold">
          <Loader size="sm" />
        </span>
      )}

      {!resendEnabled && !showCaptcha && (
        <Button
          variant="ghost"
          className="text-md !font-semibold"
          disabled={isLoading || !resendEnabled}
        >
          Resend code in
          <ResendCodeCountdown
            initialCount={resendCount}
            onComplete={handleResendComplete}
          />
        </Button>
      )}
    </div>
  );
};
