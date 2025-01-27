"use server";

import { getPasswordResetTokenByToken } from "@/data/reset-token";

export const verifyResetToken = async (token: string) => {
  const passwordResetRecord = await getPasswordResetTokenByToken(token);

  if (!passwordResetRecord) {
    return { valid: false, message: "Invalid reset password link" };
  }

  const hasExpired = new Date(passwordResetRecord.expires) < new Date();

  if (hasExpired) {
    return { valid: false, message: "Reset password link has expired" };
  }

  return {
    valid: true,
  };
};
