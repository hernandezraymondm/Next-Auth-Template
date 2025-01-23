"use client";

import { useState } from "react";
import { RiMailSendFill } from "react-icons/ri";
import { RegisterFormContent } from "@/components/auth/register/register-form-content";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { UnverifiedEmail } from "@/components/auth/unverified-email";

export const RegisterForm = () => {
  const [success, setSuccess] = useState<boolean | undefined>(false);
  const [email, setEmail] = useState<string>("");

  if (success) {
    return (
      <CardWrapper
        size="md"
        icon={<RiMailSendFill size="60" className="text-sky-400" />}
        headerLabel="Please verify your email"
        backButtonLink=""
        backButtonHref="/auth/login"
      >
        <UnverifiedEmail
          email={email}
          message="You're almost there! We've sent an email to"
        />
      </CardWrapper>
    );
  }

  return (
    <CardWrapper
      size="sm"
      headerLabel="Create your account"
      headerSubLabel="Welcome! Please fill in the details to get started."
      backButtonLabel="Already have an account?"
      backButtonLink="Sign in"
      backButtonHref="/auth/login"
      showSocial
      showFooter
    >
      <RegisterFormContent
        success={success}
        setSuccess={setSuccess}
        setEmail={setEmail}
      />
    </CardWrapper>
  );
};
