'use server';
import { Resend } from "resend";
import { PRODUCTS } from "../product-constants";
import { ServerKey } from "@/app/api/order-created-colin/types";


const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.DASCHBOARD_URL;

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


/**
 * Sends an email containing keys to a customer.
 * @param customerEmail - The email address of the customer.
 * @param customerName - The name of the customer.
 * @param keys - An array of ServerKey objects representing the keys to be sent.
 */
export const sendKeysToExistingCustomer = async (customerName: string, customerEmail: string, keys: ServerKey[]) => {
  const prodcutHtml = keys.map(key => {
    return `
      <div
        style="border-radius: 1.5rem; padding: 0.75rem; height: 300px; width: 300px; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); background-color: #1e211f;">
        <h2 style="font-size: 1.5rem; text-align: center; color: #FFFFFF; margin: 0 0 16px 0;">${PRODUCTS[key.productId].name}</h2>
        <div style="display: flex; justify-content: center; margin-bottom: 16px;" >
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


const template = `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            padding: 0
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0;
            overflow: hidden
        }

        .image_block img+div {
            display: none
        }

        @media (max-width:720px) {
            .mobile_hide {
                display: none
            }

            .row-content {
                width: 100% !important
            }

            .stack .column {
                width: 100%;
                display: block
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important
            }

            .row-2 .column-1 .block-1.text_block td.pad {
                padding: 10px !important
            }

            .row-2 .column-1 {
                padding: 0 !important
            }
        }
    </style>
</head>

<body class="body"
    style="background-color:#181c1a;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0;mso-table-rspace:0;background-color:#181c1a">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:20px;padding-top:30px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0">
                                                        <tr>
                                                            <td class="pad"
                                                                style="width:100%;padding-right:0;padding-left:0">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width:80px">
                                                                                                                                              <img alt="Logo" height="auto"
                                                                            src="https://carpaudio.com/cdn/shop/files/CARP_Audio_Logo_Website.png?v=1707150007&width=130"
                                                                            width="80">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-top:40px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="text_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:0px">
                                                                <div style="font-family:sans-serif">
                                                                    <div style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:14.399999999999999px;color:#fff;line-height:1.2">
                                                                        <p style="margin:0;font-size:16px;text-align:center;mso-line-height-alt:19.2px">
                                                                            <span style="word-break: break-word; font-size: 18px;">Hi, ${customerName}</span>
                                                                        </p>
                                                                        <p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <span style="word-break: break-word; font-size: 24px;"><strong>Your keys are ready!</strong></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="text_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class
                                                                        style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:18px;color:#fff;line-height:1.5">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:21px">
                                                                            <span
                                                                                style="word-break: break-word; font-size: 14px;">You
                                                                                can view an overview of all your owned
                                                                                plugins and licenses in the <a
                                                                                    href="${domain}"
                                                                                    target="_blank"
                                                                                    style="text-decoration: underline; color: #22c55e;"
                                                                                    rel="noopener">License
                                                                                    Dashboard</a>.</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:20px;padding-top:20px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="text_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:sans-serif">
                                                                    <div class
                                                                        style="font-size:14px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:16.8px;color:#fff;line-height:1.2">
`
+
prodcutHtml
+
`
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:40px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="text_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:sans-serif">
                                                                    <div class
                                                                        style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:14.399999999999999px;color:#fff;line-height:1.2">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <span
                                                                                style="word-break: break-word; font-size: 24px;"><strong>License(s)
                                                                                    added to your
                                                                                    Dashboard!</strong></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="text_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class
                                                                        style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:18px;color:#fff;line-height:1.5">
                                                                        <p
                                                                            style="margin:0;font-size:12px;text-align:center;mso-line-height-alt:18px">
                                                                            <span
                                                                                style="word-break: break-word; font-size: 12px;">All your plugin licenses are automatically added to your dashboard.</span>
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:12px;text-align:center;mso-line-height-alt:18px">
                                                                            <span
                                                                                style="word-break: break-word; font-size: 12px;">Login to view them all:</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="button_block block-3" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${domain}" style="height:48px;width:209px;v-text-anchor:middle;" arcsize="105%" stroke="false" fillcolor="#ffffff">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#000000;font-family:Arial, sans-serif;font-size:16px">
<![endif]-->
                                                                    <a href="${domain}"
                                                                        target="_blank"
                                                                        style="background-color:#ffffff;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:50px;border-right:0px solid transparent;border-top:0px solid transparent;color:#000000;display:inline-block;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:8px;padding-top:8px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
                                                                            style="word-break: break-word; padding-left: 40px; padding-right: 40px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span
                                                                                style="word-break: break-word; line-height: 32px;"><strong>Open
                                                                                    Dashboard</strong></span></span></a>
                                                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:25px;padding-top:25px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="text_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:sans-serif">
                                                                    <div
                                                                        style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:14.4px;color:#555;line-height:1.2">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <strong>Address:</strong> Vlaamse Gaai 39,
                                                                            3893KE Zeewolde, The Netherlands
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <strong>Contact:</strong>
                                                                            info@carpaudio.com, +31 6 42015153
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <strong>VAT:</strong> NL004371747B72
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <strong>KVK:</strong> 87197642
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
    <div style="background-color:transparent;">
        <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"
            class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12"
                    style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                            style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
                            <!--<![endif]-->


                            <div align="center" class="img-container center  autowidth "
                                style="padding-right: 0px;  padding-left: 0px;">
                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->

                                <a href="https://goo.gl/sDhD5J" target="_blank" title="c">
                                </a>
                                <!--[if mso]></td></tr></table><![endif]-->
                            </div>


                            <!--[if (!mso)&(!IE)]><!-->
                        </div><!--<![endif]-->
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div>
</body>

</html>
`

  const res = await resend.emails.send({
    from: "noreply@carpaudio.com",
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

  const prodcutHtml = keys.map(key => {
    return `
      <div
        style="border-radius: 1.5rem; padding: 0.75rem; height: 300px; width: 300px; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); background-color: #1e211f;">
        <h2 style="font-size: 1.5rem; text-align: center; color: #FFFFFF; margin: 0 0 16px 0;">${PRODUCTS[key.productId].name}</h2>
        <div style="display: flex; justify-content: center; margin-bottom: 16px;" >
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

  const template = `    
  <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            padding: 0
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0;
            overflow: hidden
        }

        .image_block img+div {
            display: none
        }

        @media (max-width:720px) {
            .mobile_hide {
                display: none
            }

            .row-content {
                width: 100% !important
            }

            .stack .column {
                width: 100%;
                display: block
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important
            }

            .row-2 .column-1 .block-1.text_block td.pad {
                padding: 10px !important
            }

            .row-2 .column-1 {
                padding: 0 !important
            }
        }
    </style>
</head>

<body class="body"
    style="background-color:#181c1a;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0;mso-table-rspace:0;background-color:#181c1a">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:20px;padding-top:30px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0">
                                                        <tr>
                                                            <td class="pad"
                                                                style="width:100%;padding-right:0;padding-left:0">
                                                                <div class="alignment" align="center"
                                                                    style="line-height:10px">
                                                                    <div style="max-width:80px">
                                                                        <img alt="Logo" height="auto"
                                                                            src="https://carpaudio.com/cdn/shop/files/CARP_Audio_Logo_Website.png?v=1707150007&width=130"
                                                                            width="80">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-top:40px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="text_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:0px">
                                                                <div style="font-family:sans-serif">
                                                                    <div style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:14.399999999999999px;color:#fff;line-height:1.2">
                                                                        <p style="margin:0;font-size:16px;text-align:center;mso-line-height-alt:19.2px">
                                                                            <span style="word-break: break-word; font-size: 18px;">Hi, ${customerName}</span>
                                                                        </p>
                                                                        <p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <span style="word-break: break-word; font-size: 24px;"><strong>Your keys are ready!</strong></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="text_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class
                                                                        style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:18px;color:#fff;line-height:1.5">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:21px">
                                                                            <span
                                                                                style="word-break: break-word; font-size: 14px;">You
                                                                                can view an overview of all your owned
                                                                                plugins and licenses in the <a
                                                                                    href="${registerLink}"
                                                                                    target="_blank"
                                                                                    style="text-decoration: underline; color: #22c55e;"
                                                                                    rel="noopener">License
                                                                                    Dashboard</a>.</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:20px;padding-top:20px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="text_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:sans-serif">
                                                                    <div style="font-size:14px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:16.8px;color:#fff;line-height:1.2; display: grid; grid-template-columns: repeat(2, 1fr)">
`
    +
    prodcutHtml
    +
    `
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;background-size:auto;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:40px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="text_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:sans-serif">
                                                                    <div class
                                                                        style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:14.399999999999999px;color:#fff;line-height:1.2">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <span
                                                                                style="word-break: break-word; font-size: 24px;"><strong>License(s)
                                                                                    added to your
                                                                                    Dashboard!</strong></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="text_block block-2" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class
                                                                        style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:18px;color:#fff;line-height:1.5">
                                                                        <p
                                                                            style="margin:0;font-size:12px;text-align:center;mso-line-height-alt:18px">
                                                                            <span
                                                                                style="word-break: break-word; font-size: 12px;">We've
                                                                                created an account for you.</span>
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:12px;text-align:center;mso-line-height-alt:18px">
                                                                            <span
                                                                                style="word-break: break-word; font-size: 12px;">Please
                                                                                create a password to claim your
                                                                                account:</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="button_block block-3" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href=${registerLink} style="height:48px;width:209px;v-text-anchor:middle;" arcsize="105%" stroke="false" fillcolor="#ffffff">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#000000;font-family:Arial, sans-serif;font-size:16px">
<![endif]-->
                                                                    <a href=${registerLink}
                                                                        target="_blank"
                                                                        style="background-color:#ffffff;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:50px;border-right:0px solid transparent;border-top:0px solid transparent;color:#000000;display:inline-block;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:8px;padding-top:8px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span
                                                                            style="word-break: break-word; padding-left: 40px; padding-right: 40px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span
                                                                                style="word-break: break-word; line-height: 32px;"><strong>Create
                                                                                    Password</strong></span></span></a>
                                                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:700px;margin:0 auto"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:25px;padding-top:25px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                    <table class="text_block block-1" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:sans-serif">
                                                                    <div
                                                                        style="font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;mso-line-height-alt:14.4px;color:#555;line-height:1.2">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <strong>Address:</strong> Vlaamse Gaai 39,
                                                                            3893KE Zeewolde, The Netherlands
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <strong>Contact:</strong>
                                                                            info@carpaudio.com, +31 6 42015153
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <strong>VAT:</strong> NL004371747B72
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
                                                                            <strong>KVK:</strong> 87197642
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
    <div style="background-color:transparent;">
        <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"
            class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12"
                    style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                            style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
                            <!--<![endif]-->


                            <div align="center" class="img-container center  autowidth "
                                style="padding-right: 0px;  padding-left: 0px;">
                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->

                                <a href="https://goo.gl/sDhD5J" target="_blank" title="c">
                                </a>
                                <!--[if mso]></td></tr></table><![endif]-->
                            </div>


                            <!--[if (!mso)&(!IE)]><!-->
                        </div><!--<![endif]-->
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div>
</body>

</html>
    `

  const res = await resend.emails.send({
    from: "noreply@carpaudio.com",
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