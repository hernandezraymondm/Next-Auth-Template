"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { updateVerificationCode } from "@/lib/tokens";

export const resendCode = async (
  email: string,
  token: string,
  captchaToken: string
) => {
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
      return { error: "CAPTCHA verification failed!" };
    }

    // Generate a new verification token
    const verificationToken = await updateVerificationCode(email, token);

    if (!verificationToken) {
      return { error: "Code generation failed!" };
    }

    const expiration = verificationToken.expires.getTime();

    // Send the email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      verificationToken.code,
      expiration.toString()
    );

    return { success: true };
  } catch {
    return { error: "Error resending code!" };
  }
};
