"use server";

import { verifyReCAPTCHA } from "@/lib/captcha";
import { sendVerificationEmail } from "@/lib/mail";
import { updateVerificationCode } from "@/lib/verification";

export const resendCode = async (
  email: string,
  token: string,
  captchaToken: string
) => {
  try {
    // Verify reCAPTCHA if captchaToken is provided
    const reCaptcha = await verifyReCAPTCHA(captchaToken);
    if (!reCaptcha) {
      return { error: "CAPTCHA verification failed!" };
    }

    // Update verification code
    const verificationToken = await updateVerificationCode(email, token);

    if (!verificationToken) {
      return { error: "Code generation failed!" };
    }

    const expiration = verificationToken.expires.getTime().toString();

    // Send the email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      verificationToken.code,
      expiration
    );

    return { success: true };
  } catch {
    return { error: "Invalid verification link!" };
  }
};
