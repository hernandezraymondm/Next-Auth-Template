"use server";

import { getVerificationTokenByToken } from "@/data/verification-token";

export const verifyEmail = async (token: string) => {
  const verificationRecord = await getVerificationTokenByToken(token);

  if (!verificationRecord) {
    // If token is missing from the database
    return { error: "Invalid verification link!" };
  }

  return;
};
