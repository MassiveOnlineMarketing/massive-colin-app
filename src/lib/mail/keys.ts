import { Resend } from "resend";
import { PRODUCTS } from "../product-constants";
import { ServerKey } from "@/app/api/test/type";


const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.WEBSITE_URL;

// export const sendLowKeyStockEmail = async (
//   productId: string,
//   keysLeft: number
// ) => {
//   await resend.emails.send({
//     from: "noreply@carpaudio.com",
//     to: "carpaudio@gmail.com",
//     subject: "Low key stock",
//     html: `<p>Product: ${PRODUCTS[productId]?.name} has only ${keysLeft} keys left</p>`
//   });
// };

export const sendKeysEmail = async (
  customerEmail: string,
  customerName: string,
  keys: ServerKey[]
) => {

  const keysHtml = keys.map(key => {
    return `
      <h3>Key: ${PRODUCTS[key.productId]?.name}</h3>
      <p><b>Key 1</b>: ${key.key1} <b>Key 2</b>: ${key.key2}</p>
      <br>
    `
  }).join('')


  await resend.emails.send({
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
}

export const sendKeysEmailWithAccount = async (
  customerEmail: string,
  customerName: string,
  keys: ServerKey[]
) => {

  const keysHtml = keys.map(key => {
    return `
      <h3>Key: ${PRODUCTS[key.productId]?.name}</h3>
      <p><b>Key 1</b>: ${key.key1} <b>Key 2</b>: ${key.key2}</p>
      <br>
    `
  }).join('')


  await resend.emails.send({
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
}