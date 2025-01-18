"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const emailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  // TODO: add page to resolve this and send another token
  if (!existingToken) {
    // If token is missing from the database
    return { error: "Invalid Token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  // TODO: add page to resolve this and send another token
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    // If email does not exist
    return { error: "Unexpected error occurred!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email, // for updating email
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Your account has been verified!" };
};
