export const verifyReCAPTCHA = async (token: string): Promise<boolean> => {
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: token,
      }).toString(),
    }
  );

  const data = await response.json();
  return data.success;
};

// TODO: add Cloudflare Turnstile, hCaptcha CAPTCHA options
