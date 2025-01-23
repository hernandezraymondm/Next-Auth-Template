"use client";

import { useState } from "react";
import { MailWarning } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { LoginFormContent } from "@/components/auth/login/login-form-content";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { UnverifiedEmail } from "@/components/auth/unverified-email";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This email is already associated with a different provider. Please use a different email or sign in with the correct provider."
      : "";
  const [isUnverified, setIsUnverified] = useState<boolean | undefined>();
  const [email, setEmail] = useState<string>("");

  if (isUnverified) {
    return (
      <CardWrapper
        size="md"
        icon={<MailWarning size="60" className="text-yellow-400" />}
        headerLabel="Please verify it's you"
        headerSubLabel="Get a verification link"
        backButtonLink=""
        backButtonHref="/auth/login"
      >
        <UnverifiedEmail email={email} message="We will send an email to" />
      </CardWrapper>
    );
  }

  return (
    <CardWrapper
      size="sm"
      headerLabel="Sign in to VeriSafe"
      headerSubLabel="Welcome back! Please sign in to continue"
      backButtonLabel="Don't have an account?"
      backButtonLink="Sign up"
      backButtonHref="/auth/register"
      showSocial
      showFooter
    >
      <LoginFormContent
        urlError={urlError}
        setIsUnverified={setIsUnverified}
        setEmail={setEmail}
      />
    </CardWrapper>
  );
};
