"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";

export const verifyEmail = async (token: string) => {
  const verificationRecord = await getVerificationTokenByToken(token);

  // TODO: add page to resolve this or resend another token
  if (!verificationRecord) {
    // If token is missing from the database
    return { error: "Invalid token!" };
  }

  return;
};
