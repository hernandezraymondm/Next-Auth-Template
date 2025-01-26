import React from "react";
import { VerificationForm } from "@/components/auth/verification/verification-form";

const VerifyEmailPage = ({ params }: { params: { token: string } }) => {
  return <VerificationForm token={params.token} />;
};

export default VerifyEmailPage;
