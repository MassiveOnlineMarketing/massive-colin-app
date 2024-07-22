import { Resend } from "resend";
import { PRODUCTS } from "../product-constants";
import { ServerKey } from "@/app/api/order-created-colin/types";


const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: change to the domain of the website
const domain = process.env.WEBSITE_URL;

/**
 * Sends an email containing keys to a customer.
 * @param customerEmail - The email address of the customer.
 * @param customerName - The name of the customer.
 * @param keys - An array of ServerKey objects representing the keys to be sent.
 */
export const sendKeysEmail = async (
  customerEmail: string,
  customerName: string,
  keys: ServerKey[]
) => {
  console.log('customerEmail: ', customerEmail)
  console.log('customerName: ', customerName)


  const keysHtml = keys.map(key => {
    return `
      <h3>Key: ${PRODUCTS[key.productId]?.name}</h3>
      <p><b>Key 1</b>: ${key.key1} <b>Key 2</b>: ${key.key2}</p>
      <br>
    `
  }).join('')


  const res = await resend.emails.send({
    from: "carpaudio@carpaudio.com",
    // TODO: change to customer email
    to: 'trespaan@gmail.com',
    subject: "Your keys from CARP Audio",
    html: `    
      <p>Hello ${customerName},</p>
      <br>
      <p>Here are your keys:</p>
      `
      + keysHtml +
      `
      <p>Your keys have also been added to your account!: ${customerEmail} </p>
      <p>If you haven't installed the plugin yet, scroll down on the product page or download it from the main download page:</p>
      <p> https://carpaudio.com/pages/downloads</p>
        <br>
        <p>PS: Screenshot or save this email to keep the keys safe! </p>
        <p> Though you can always contact us when you've lost your keys ;)</p>
        <br>
      <p>Kind Regards, </p>
      <p> CARP Audio </p>
    `
  });

  if (res.error) {
    console.error('Error: ', res.error)
    return
  }

  console.log('🟢 Keys email sent')
}

/**
 * Sends an email to the customer with the provided keys with the account activation link.
 * @param customerEmail - The email address of the customer.
 * @param customerName - The name of the customer.
 * @param keys - An array of ServerKey objects representing the keys to be sent.
 */
export const sendKeysEmailWithAccount = async (
  customerEmail: string,
  customerName: string,
  keys: ServerKey[]
) => {
  console.log('customerEmail: ', customerEmail)
  console.log('customerName: ', customerName)

  const keysHtml = keys.map(key => {
    return `
      <h3>Key: ${PRODUCTS[key.productId]?.name}</h3>
      <p><b>Key 1</b>: ${key.key1} <b>Key 2</b>: ${key.key2}</p>
      <br>
    `
  }).join('')


  const res = await resend.emails.send({
    from: "carpaudio@carpaudio.com",
    // TODO: change to customer email + localhost in the email
    to: 'trespaan@gmail.com',
    subject: "Your keys from CARP Audio",
    html: `    
      <p>Hello ${customerName},</p>
      <br>
      <p>Here are your keys:</p>
      `
      + keysHtml +
      `
      <p>We have also created an account for you with the email: ${customerEmail} </p>
      <p>Please <a href='http://localhost:3000/auth/register?email=${customerEmail}'>Activate</a> your account</p>
      <p>If you haven't installed the plugin yet, scroll down on the product page or download it from the main download page:</p>
      <p> https://carpaudio.com/pages/downloads</p>
        <br>
        <p>PS: Screenshot or save this email to keep the keys safe! </p>
        <p> Though you can always contact us when you've lost your keys ;)</p>
        <br>
      <p>Kind Regards, </p>
      <p> CARP Audio </p>
    `
  });

  if (res.error) {
    console.error('Error: ', res.error)
    return
  }

  console.log('🟢 Keys email sent with account')
}