'use server';

import { Resend } from "resend";


type EmailTemplate = {
  from: string;
  to: string;
  subject: string;
  html: string;
}


const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailsInBatch(batchEmails: EmailTemplate[]) {
  const res = await resend.batch.send(batchEmails)
  console.log('Resend sendEmailsInBatch res: ',res)

  return res
}

export async function sendEmail (email: EmailTemplate) {
  const res = await resend.emails.send(email)

  return res
}
