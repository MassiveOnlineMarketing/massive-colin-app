'use server';

import { db } from "../db";
import { sendEmailsInBatch } from "./actions";

const domain = process.env.DASCHBOARD_URL;
const SENDER_EMAIL = "CARP Audio <noreply@carpaudio.com>";
const BATCH_SIZE = 99;

export const sendAnnouncementToOldCustomers = async () => {
  const customers = await db.user.findMany()
  const oldCustomers = customers.filter(customer => customer.oldUser === true)
  console.log('Number of old customers: ',oldCustomers.length)

  const batches = Math.ceil(oldCustomers.length / BATCH_SIZE)
  console.log('Number of batches to do:',batches)

  for (let i = 0; i < batches; i++) {
    const start = i * BATCH_SIZE
    const end = start + BATCH_SIZE
    const batch = oldCustomers.slice(start, end)
    console.log(batch.length)

    const batchEmails = []

    for (const customer of batch) {
      // ! Check, if all users have a name and email
      batchEmails.push(creatAnnouncementEmail(customer.name as string, customer.email as string))
    }

    await sendEmailsInBatch(batchEmails)
  }
}

function creatAnnouncementEmail(customerName: string, customerEmail: string) {
  const template = createAnnouncementEmailTemplate(customerName, customerEmail)
  return {
    from: SENDER_EMAIL,
    to: customerEmail,
    subject: "Your license(s) are added to our new Dashboard!",
    html: template
  }
}

function createAnnouncementEmailTemplate(customerName: string, customerEmail: string) {
  const registerLink = `${domain}/auth/register?email=${customerEmail}`

  return `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
        @media only screen and (max-width: 660px) {
            table, tbody, tr {
                display: block;
                width: 100%;
            }
            td {
                display: block;
                width: 100%;
                box-sizing: border-box;
            }
        }
    </style>
  </head>

  <body class="body"
    style="width: 100%; height: 100%; margin:0; padding: 36px;  background-image: linear-gradient(to bottom, #181C1A, #0D0D0D); font-family:Arial,Helvetica Neue,Helvetica,sans-serif;">
    <div style="max-width: 680px; margin: 0 auto 0 auto;">
      <div style="width: 100%; display: flex;">
        <img alt="Logo" height="auto" style="max-width:160px;  margin:0 auto 0 auto;"
          src="https://carpaudio.com/cdn/shop/files/CARP_Audio_Logo_Website.png?v=1707150007&width=130" width="160">
      </div>
      <div style="padding-top: 60px; color: #fff; text-align: center;">
        <p style="color:#fff;font-size: 18px; margin: 0;">Hi, ${customerName}</p>
        <p style="color:#fff;font-size: 24px; margin: 0;"><strong>Your license(s) are added to our new Dashboard!</strong></p>
        <p style="color: #fff;">You can view an overview of all your owned plugins and licenses in the <a href="${domain}"
            target="_blank" style="text-decoration: underline; color: #22c55e;" rel="noopener">License
            Dashboard</a>.</span></p>
      </div>


      <div style="color: #fff; text-align: center;">
        <p style="color: #fff; font-size: 12px; margin: 0; padding-top: 10px;">We've created an account for you.</p>
        <p style="color: #fff; font-size: 12px; margin: 0; padding-bottom: 20px;">Please create a password to claim your account::</p>
        <a href="${registerLink}" target="_blank"
        style="background-color:#ffffff;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:50px;border-right:0px solid transparent;border-top:0px solid transparent;color:#000000;display:inline-block;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding:16px 40px ;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
        ><strong>Create Password</strong></a>
      </div>

      <div style="margin-top: 60px; color: #555; text-align: center;">
        <p style="margin:0; font-size: 14px;"><strong>Adress:</strong> Vlaamse Gaai 39, 3893KE Zeewolde, The Netherlands</p>
        <p style="margin:0; font-size: 14px;"><strong>Contact:</strong> info@carpaudio.com, +31 6 42015153</p>
        <p style="margin:0; font-size: 14px;"><strong>VAT:</strong> NL004371747B72</p>
        <p style="margin:0; font-size: 14px;"><strong>KVK:</strong> 87197642</p>
      </div>

    </div>
  </body>

  </html>
      
      `
}