import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.DASCHBOARD_URL;
const NO_REPLY_EMAIL = "CARP Audio <noreply@carpaudio.com>";

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    
    headers: {
      "X-Priority": "1 (Highest)",
      "Priority": "urgent",
      "Importance": "high"
    }
  });
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: NO_REPLY_EMAIL,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });
};