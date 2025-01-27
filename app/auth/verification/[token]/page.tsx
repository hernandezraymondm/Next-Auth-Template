import React from "react";
import { VerificationForm } from "@/components/auth/verification/verification-form";

const VerifyEmailPage = async ({ params }: { params: { token: string } }) => {
  const token = (await params).token;

  return <VerificationForm token={token} />;
};

export default VerifyEmailPage;
