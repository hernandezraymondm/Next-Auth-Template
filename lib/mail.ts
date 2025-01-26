import Verification from "@/components/emails/verification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const appName = process.env.NEXT_PUBLIC_APP_NAME;
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

export const sendVerificationEmail = async (
  email: string,
  token: string,
  code: string
) => {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/email-verification/${token}`;

  // Send verification email
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify Your Email",
    react: Verification({
      verificationLink,
      verificationCode: code,
      appName,
      supportEmail,
    }),
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  code: string
) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password/${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <p><strong>Someone requested that the password be reset for the following account: </strong></p>
      <p>To reset your password, visit the following address:</p>
      <button><a href="${resetLink}">Set a new password</a></button>
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
