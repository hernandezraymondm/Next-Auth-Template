"use client";

import { useCallback, useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { Frown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { emailVerification } from "@/actions/email-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }
    emailVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Verification issue encountered!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      icon={
        success ? (
          <CircleCheckBig
            size="60"
            className="text-white bg-green-400 rounded-full"
          />
        ) : error ? (
          <Frown size="60" className="text-white bg-red-400 rounded-full" />
        ) : (
          <Loader size="md" />
        )
      }
      headerLabel={
        success
          ? "Verification Success"
          : error
          ? "Verification Failed"
          : "Verifying Your Information"
      }
      headerSubLabel={
        success
          ? "Welcome! Thrilled to have you with us."
          : error
          ? "There was a problem when trying to verify your email."
          : "Please wait while we process your request."
      }
      backButtonLink="Return to Login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex flex-col place-content-center gap-5">
        {success && (
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Thank you for your support, we are pleased to inform you that your
            account is now ready for use. You can now sign in with your email
            address.
          </p>
        )}
        {error && (
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Please contact us if this error persists. Unique error code:{" "}
            <code className="rounded-sm bg-slate-100 p-1 text-xs">{error}</code>
          </p>
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
