"use server";

import { verifyReCAPTCHA } from "@/lib/captcha";
import { sendVerificationEmail } from "@/lib/mail";
import { updateVerificationCode } from "@/lib/token";

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

    // Send the email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      verificationToken.code
    );

    return { success: true, message: "Code has been reset!" };
  } catch {
    return { error: "Unexpected error occurred!" };
  }
};
