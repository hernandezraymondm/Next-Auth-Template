"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByTokenAndCode } from "@/data/verification-token";

export const verifyCode = async (token: string, code: string) => {
  const verificationRecord = await getVerificationTokenByTokenAndCode(
    token,
    code
  );

  if (!verificationRecord) {
    return { error: "Invalid code!" };
  }

  const hasExpired = new Date(verificationRecord.expires) < new Date();

  if (hasExpired) {
    return { error: "Verification code has expired!" };
  }

  const existingUser = await getUserByEmail(verificationRecord.email);

  if (!existingUser || existingUser.emailVerified) {
    // If email does not exist
    return { error: "Unexpected error occurred!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: verificationRecord.email, // for updating email
    },
  });

  // Delete verification record after successful verification
  await db.verificationToken.delete({
    where: { id: verificationRecord.id },
  });

  return { success: "Your email has been verified!" };
};
