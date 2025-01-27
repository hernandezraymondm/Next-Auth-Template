import { NewPasswordForm } from "@/components/auth/reset/new-password-form";
import React from "react";

const NewPasswordPage = async ({ params }: { params: { token: string } }) => {
  const token = (await params).token;

  return <NewPasswordForm token={token} />;
};

export default NewPasswordPage;
