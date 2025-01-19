import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  code: string,
  expires: string
) => {
  const confirmLink = `${process.env.BASE_URL}/auth/verify-email?token=${token}&expires=${expires}&email=${email}`;

  // Send verification email
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `
      <p>Keep your account secure by verifying your email address.</p>
      <p>Click the link to verify: <a href="${confirmLink}">Verify Email</a></p>
      <p>Then enter this 6-digit code: <strong>${code}</strong></p>
    `,
  });
};

// Lockout email alert
export const sendLockoutEmail = async (email: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your Account Has Been Locked",
    html: `<p>Your account has been locked due to multiple failed login attempts.</p>
    <p> If this was you, you don’t need to do anything. If not, please secure your account.</p>`,
  });
};
