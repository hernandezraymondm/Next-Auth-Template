import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Keep your Account secure by verifying your email address. <a href="${confirmLink}">Verify Email</a></p>`,
  });
};

export const sendLockoutEmail = async (email: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your Account Has Been Locked",
    html: `<p>Your account has been locked due to multiple failed login attempts.</p>
    <p> If this was you, you don’t need to do anything. If not, please secure your account.</p>`,
  });
};
