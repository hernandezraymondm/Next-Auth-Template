"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";

export const verifyEmailToken = async (token: string) => {
  const verificationRecord = await getVerificationTokenByToken(token);

  if (!verificationRecord) {
    return { valid: false, message: "Invalid verification link" };
  }

  const hasExpired = new Date(verificationRecord.expires) < new Date();

  if (hasExpired) {
    return { valid: false, message: "Verification link has expired" };
  }

  // converts to milliseconds
  const expires = verificationRecord.expires.getTime();

  return {
    valid: true,
    data: {
      email: verificationRecord.email,
      expires,
    },
  };
};
