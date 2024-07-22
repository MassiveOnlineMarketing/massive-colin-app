const SHOPIFY_WEBHOOK_SECRET = '5f25bd8a428a8abd8b1478bbbcc63f1ea11d1f22f47c375ee272ac923741f1ff'
const URL = 'http://172.233.40.227:8080/generate_key'

import crypto from 'crypto';
import { NextRequest } from 'next/server';

import { IShopifyOrder, ServerKey, ServerResponse } from '../test/type';
import { db } from "@/lib/db"
import { sendKeysEmail, sendKeysEmailWithAccount } from "@/lib/mail/keys"



const BUNDLE_PRODUCT_IDS: { [key: number]: number[] } = {
  // Parallel Bundle
  8785285742934: [8612997890390, 8651898257750],
  // Pusher Bundle
  8492913656150: [8492908020054, 8492913262934],
  // Everything Bundle
  8867749134678: [8612997890390, 8651898257750, 8492908020054, 8492913262934, 8703626576214, 8818545066326, 8536354226518]
}

const SEEDS: { [key: number]: string } = {
  8612997890390: '13092000',
  8492913262934: '130920001',
  8492908020054: '130920002',
  8536354226518: '130920003',
  8651898257750: '130920004',
  8703626576214: '130920005',
  8818545066326: '130920006'
}


export const POST = async (req: NextRequest) => {
  const data = await req.text();

  const hmacHeader = req.headers.get('X-Shopify-Hmac-Sha256');
  const digest = crypto
    .createHmac(
      'sha256',
      SHOPIFY_WEBHOOK_SECRET
    )
    .update(data)
    .digest('base64');

  if (hmacHeader === digest) {
    console.log('🟢 Order created webhook received');

    const orderData: IShopifyOrder = JSON.parse(data);

    await db.orders.create({
      data: {
        json: data
      },
    });

    const { customer: { email }, customer: { first_name }, customer: { last_name }, order_number, line_items } = orderData;
    const customerName = `${first_name} ${last_name}`
    console.log('🟢 Processing order: ', order_number) 

    let newCustomer = false
    //* Check if we already have an user with this email
    let customer = await db.user.findUnique({ where: { email } })
    if (!customer) {
      customer = await db.user.create({
        data: {
          email,
          name: customerName
        }
      })
      newCustomer = true
    }

    //* Create order
    const order = await db.order.create({
      data: {
        customerId: customer.id,
        orderNumber: order_number
      }
    })


    //* Create product keys
    let productKeys: ServerKey[] = []
    for (const item of line_items) {
      // Bundle product
      if (item.product_id in BUNDLE_PRODUCT_IDS) {
        console.log('bundle product')
        console.log('product id ', item.product_id)

        const productIds = BUNDLE_PRODUCT_IDS[item.product_id]
        for (const productId of productIds) {
          const seed = SEEDS[productId]
          const key = await generateKey(email, seed, order_number)

          if (key === null) {
            // TODO: handle error something went wrong email, and mail to carp audio to fix
            return
          }

          productKeys.push({
            key1: email,
            key2: key,
            productId: productId.toString(),
            customerId: customer.id,
            orderId: order.id
          })
        }

        // Single product
      } else {
        console.log('single product')
        console.log('product id: ', item.product_id)

        const seed = SEEDS[item.product_id]
        const key = await generateKey(email, seed, order_number)

        if (key === null) {
          // TODO: handle error something went wrong email, and mail to carp audio to fix
          return
        }

        productKeys.push({
          key1: email,
          key2: key,
          productId: item.product_id.toString(),
          customerId: customer.id,
          orderId: order.id
        })
      }
    }

    //* Save keys to db
    const res = await db.key.createMany({
      data: productKeys
    })
    if (!res) {
      // TODO: handle error something went wrong email, and mail to carp audio to fix
      return
    }


    //* Send keys to user
    if (newCustomer) {
      // Send welcome email with keys
      console.log('send email account');
      await sendKeysEmailWithAccount(email, customerName, productKeys)
    } else {
      // Send keys
      console.log('send email keys');
      await sendKeysEmail(email, customerName, productKeys);
    }

    console.log('productKeys: ', productKeys)

    return new Response(null, { status: 200 });
  } else {
    return new Response('Unauthorized Request', {
      status: 401
    });
  }
};



const generateKey = async (email: string, seed: string, order_number: number) => {
  try {
    const params = {
      name: email,
      seed: seed,
    }

    const res = await fetch(URL + '?' + new URLSearchParams(params))

    const data: ServerResponse = await res.json()
    // console.log('data: ', data)

    if (data.status === 'success') {
      // console.log('generated key: ', data.generatedKey)

      return data.generatedKey
    } else {
      console.error('🔴 error: ', data.message, order_number)
      // TODO: handle error something went wrong email, and mail to carp audio to fix
      return null
    }
  } catch (error) {
    console.error('🔴 error: ', error, order_number)
    // TODO: handle error something went wrong email, and mail to carp audio to fix
    return null
  }
}