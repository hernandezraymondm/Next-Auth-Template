import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// TODO: Make a better template
export const sendVerificationEmail = async (
  email: string,
  token: string,
  code: string
) => {
  const confirmLink = `${process.env.BASE_URL}/auth/email-verification?token=${token}`;

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
export const sendLockoutEmailAlert = async (email: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your Account Has Been Locked",
    html: `<p>Your account has been locked due to multiple failed login attempts.</p>
    <p> If this is not you, please secure your account.</p>`,
  });
};
