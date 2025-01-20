"use server";

export const verifyCaptcha = async (captchaToken: string | null) => {
  if (!captchaToken) {
    return { error: "Captcha token is missing" };
  }

  // Verify the captcha token
  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
  const response = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
  });
  const captchaVerification = await response.json();

  if (!captchaVerification.success) {
    return { error: "Captcha verification failed" };
  }

  return { success: true };
};
