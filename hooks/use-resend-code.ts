"use client";

import { useState } from "react";
import { resendCode as resendCodeAction } from "@/actions/resend-code";

export const useResendCode = (email: string, token: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [resendCount, setResendCount] = useState(120);
  const [error, setError] = useState<string | undefined>();

  const handleResendCode = async (captchaToken: string) => {
    setIsLoading(true);
    setError("");

    await resendCodeAction(email, token, captchaToken)
      .then((data) => {
        setResendEnabled(false);
        setShowCaptcha(false);
        setError(data.error);
        setResendCount((prev) => prev * 2);
      })
      .catch(() => {
        setError("Resend code issue encountered!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCaptchaSuccess = (token: string | null) => {
    if (token) {
      handleResendCode(token);
    }
  };

  const handleResendComplete = () => {
    setResendEnabled(true);
  };

  return {
    error,
    showCaptcha,
    setShowCaptcha,
    isLoading,
    resendEnabled,
    resendCount,
    handleCaptchaSuccess,
    handleResendComplete,
  };
};
