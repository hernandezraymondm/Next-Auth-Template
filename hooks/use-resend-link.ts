"use client";

import { useState } from "react";
import { resendLink } from "@/actions/resend-link";

export const useResendLink = (email: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [resendCount, setResendCount] = useState(5);
  const [error, setError] = useState<string | undefined>();

  const handleResendLink = async (captchaToken: string) => {
    setIsLoading(true);
    setError("");

    await resendLink(email, captchaToken)
      .then((data) => {
        setResendEnabled(false);
        setShowCaptcha(false);
        setError(data.error);
        setResendCount((prev) => prev + 120);
      })
      .catch(() => {
        setError("Resend link issue encountered!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCaptchaSuccess = (token: string | null) => {
    if (token) {
      handleResendLink(token);
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
