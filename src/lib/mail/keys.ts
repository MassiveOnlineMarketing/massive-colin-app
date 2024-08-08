'use server';
import { Resend } from "resend";
import { PRODUCTS } from "../product-constants";
import { ServerKey } from "@/app/api/order-created-colin/types";


const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.DASCHBOARD_URL;
const SENDER_EMAIL = "CARP Audio <noreply@carpaudio.com>";

/**
 * Sends an email containing keys to a customer.
 * @param customerEmail - The email address of the customer.
 * @param customerName - The name of the customer.
 * @param keys - An array of ServerKey objects representing the keys to be sent.
 */
export const sendKeysToExistingCustomer = async (customerName: string, customerEmail: string, keys: ServerKey[]) => {
  console.log('customerEmail: ', customerEmail)
  console.log('customerName: ', customerName)
  console.log('keys: ', keys)
  
const template = `
  <!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
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
        <p style="color:#fff;font-size: 24px; margin: 0;"><strong>Your keys are ready!</strong></p>
        <p style="color: #fff;">You can view an overview of all your owned plugins and licenses in the <a href="${domain}"
            target="_blank" style="text-decoration: underline; color: #22c55e;" rel="noopener">License
            Dashboard</a>.</span></p>
      </div>

      <div style="margin: 0 auto 0 auto; width: fit-content; margin: 32px 0;">
        <div style="display: grid; gap:16px; grid-templte-columns: repeat(2, 1fr);">
        `
        +
        productCardHtml(keys)
        +
        `
        </div>
      </div>

      <div style="color: #fff; text-align: center;">
        <p style="color:#fff;font-size: 24px; margin: 0; padding: 10px 0;"><strong>License(s) added to your Dashboard!</strong></p>
        <p style="color:#fff;font-size: 12px; margin: 0; padding-top: 10px;">All your plugin licenses are automatically added to your dashboard.</p>
        <p style="color:#fff;font-size: 12px; margin: 0; padding-bottom: 20px;">Login to view them all:</p>
        <a href="${domain}" target="_blank"
        style="background-color:#ffffff;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:50px;border-right:0px solid transparent;border-top:0px solid transparent;color:#000000;display:inline-block;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding:16px 40px ;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
        ><strong>Open Dashboard</strong></a>
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

  const res = await resend.emails.send({
    from: SENDER_EMAIL,
    to: customerEmail,
    subject: `Your activation keys for: ${keys.map(key => PRODUCTS[key.productId].name).join(', ')}`,
    html: template
  });

  if (res.error) {
    console.error('Error: ', res.error)
    return
  }

  console.log('🟢 sendKeysToExistingCustomer')
}

/**
 * Sends an email to the customer with the provided keys with the account activation link.
 * @param customerEmail - The email address of the customer.
 * @param customerName - The name of the customer.
 * @param keys - An array of ServerKey objects representing the keys to be sent.
 */
export const sendKeysToNewCustomer = async (customerName: string, customerEmail: string, keys: ServerKey[]) => {
  const registerLink = `${domain}/auth/register?email=${customerEmail}`

  console.log('customerEmail: ', customerEmail)
  console.log('customerName: ', customerName)
  console.log('keys: ', keys)


  const template = `    
  <!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>

  <body class="body"
    style="width: 100%; height: 100%; margin:0; padding: 36px;  background-image: linear-gradient(to bottom, #181C1A, #0D0D0D); font-family:Arial,Helvetica Neue,Helvetica,sans-serif;">
    <div style="max-width: 680px; margin: 0 auto 0 auto;">
      <div style="width: 100%; display: flex;">
        <img alt="Logo" height="auto" style="max-width:160px;  margin:0 auto 0 auto;"
          src="https://carpaudio.com/cdn/shop/files/CARP_Audio_Logo_Website.png?v=1707150007&width=130" width="160">
      </div>
      <div style="padding-top: 60px; color: #fff; text-align: center;">
        <p style="color: #fff; font-size: 18px; margin: 0;">Hi, ${customerName}</p>
        <p style="color: #fff; font-size: 24px; margin: 0;"><strong>Your keys are ready!</strong></p>
        <p style="color: #fff;">You can view an overview of all your owned plugins and licenses in the <a href="${registerLink}"
            target="_blank" style="text-decoration: underline; color: #22c55e;" rel="noopener">License
            Dashboard</a>.</span></p>
      </div>

      <div style="margin: 0 auto 0 auto; width: fit-content; margin: 32px 0;">
        <div style="display: grid; gap:16px; ">
        `
        +
        productCardHtml(keys)
        +
        `
        </div>
      </div>

      <div style="color: #fff; text-align: center;">
        <p style="color: #fff; font-size: 24px; margin: 0; padding: 10px 0;"><strong>License(s) added to your Dashboard!</strong></p>
        <p style="color: #fff; font-size: 12px; margin: 0; padding-top: 10px;">All your plugin licenses are automatically added to your dashboard.</p>
        <p style="color: #fff; font-size: 12px; margin: 0; padding-bottom: 20px;">Login to view them all:</p>
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

  const res = await resend.emails.send({
    from: SENDER_EMAIL,
    to: customerEmail,
    subject: `Your activation keys for: ${keys.map(key => PRODUCTS[key.productId].name).join(', ')}`,
    html: template
  });



  if (res.error) {
    console.error('Error: ', res.error)
    return
  }

  console.log('🟢 sendKeysToNewCustomer')
}


function productCardHtml(keys: ServerKey[]) {
  return (
    keys.map(key => {
      return `
        <div
          style="color: #fff; border-radius: 1.5rem; padding: 0.75rem; height: 300px; width: 300px; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); background-color: #1e211f;">
          <h2 style="font-size: 1.5rem; text-align: center; color: #FFFFFF; margin: 0 0 16px 0;">${PRODUCTS[key.productId].name}</h2>
          <div style="display: flex; justify-content: center; margin-bottom: 32px;" >
            <img alt="product" loading="lazy" width="425" height="400" decoding="async"
              style="height: 130px; width: fit-content; margin-left: auto; margin-right: auto; color: transparent;"
              src=${PRODUCTS[key.productId].imgUrl}>
          </div>
          <div
            style="margin-top: auto; padding-left: 1rem; padding-right: 1rem; padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 12px; background-color: #262928; font-size: 0.875rem;">
            <div
              style="display: inline-flex; gap: 0.5rem; align-items: center; width: 100%;">
              <img src='https://cdn.shopify.com/s/files/1/0771/9249/5446/files/key1-20px.png?v=1722539093' style='width: 20px; height: 20px; margin-right: 8px;'>
              <p style="margin: 0; text-decoration: none; color: #fff">${key.key1}</p>
            </div>
            <div
              style="margin-top: 0.25rem; display: inline-flex; gap: 0.5rem; align-items: center; width: 100%;">
              <img src='https://cdn.shopify.com/s/files/1/0771/9249/5446/files/key2-20px.png?v=1722539093' style='width: 20px; height: 20px; margin-right: 8px;'>
              <p style="margin: 0;">${key.key2}</p>
            </div>
          </div>
        </div>
      `
    }).join('')
  )
}