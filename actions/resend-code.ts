"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const resendCode = async (email: string, captchaToken: string) => {
  try {
    // Verify reCAPTCHA using fetch instead of axios
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: captchaToken,
        }).toString(),
      }
    );

    const data = await response.json();
    if (!data.success) {
      return { error: "reCAPTCHA verification failed!" };
    }

    // Generate a new verification token
    const verificationToken = await generateVerificationToken(email);
    const expiration = verificationToken.expires.getTime();

    // Send the email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      verificationToken.code,
      expiration.toString()
    );

    return { success: "Verification code resent successfully" };
  } catch {
    return { error: "Failed to resend verification code" };
  }
};
