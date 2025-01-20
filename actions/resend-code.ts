"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const resendCode = async (email: string) => {
  const verificationToken = await generateVerificationToken(email);

  // convert to milliseconds
  const expiration = verificationToken.expires.getTime();

  // Send verification email
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    verificationToken.code,
    expiration.toString()
  );

  return;
};
