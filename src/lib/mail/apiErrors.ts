'use server';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const SENDER_EMAIL = "CARP Audio <noreply@carpaudio.com>";

export const cppApiErrorEmail = async (
  error: string,
  data: string,
  orderNumber: number
) => {
  await resend.emails.send({
    from: SENDER_EMAIL,
    to: "carpaudio@gmail.com",
    subject: "CPP API Error",
    html: `<p>Error: ${error}</p><p>Order number: ${orderNumber}</p><p>Data: ${data}</p>`
  });
}