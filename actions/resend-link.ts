"use server";

import { verifyReCAPTCHA } from "@/lib/captcha";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationLink } from "@/lib/verification";

export const resendLink = async (email: string, captchaToken: string) => {
  try {
    // Verify reCAPTCHA if captchaToken is provided
    const reCaptcha = await verifyReCAPTCHA(captchaToken);
    if (!reCaptcha) {
      return { error: "CAPTCHA verification failed!" };
    }

    // Generate a new verification token
    const verificationToken = await generateVerificationLink(email);

    if (!verificationToken) {
      return { error: "Link generation failed!" };
    }

    // Send the email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      verificationToken.code
    );

    return { success: true };
  } catch {
    return { error: "Unexpected error occurred!" };
  }
};
