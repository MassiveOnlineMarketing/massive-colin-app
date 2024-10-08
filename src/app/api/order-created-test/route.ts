
import crypto from 'crypto';
import { NextRequest } from 'next/server';

import { IShopifyOrder, ServerKey, ServerResponse } from '../order-created-colin/types';
import { db } from "@/lib/db"
import { sendKeysToExistingCustomer, sendKeysToNewCustomer } from "@/lib/mail/keys"
import { cppApiErrorEmail } from '@/lib/mail/apiErrors';


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
  8818545066326: '130920006',
  9122402894166: '130920007',
}

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || '';
const CPP_API_URL = process.env.CPP_API || '';
const TEMP_EMAIL = 'carpaudio@gmail.com'

export const POST = async (req: NextRequest) => {
  const data = await req.text();

  console.log('🟢 Order created webhook received');
  await db.orders.create({
    data: {
      json: data
    },
  });


  const orderData: IShopifyOrder = JSON.parse(data);
  // const orderData: IShopifyOrder = await req.json();
  const { customer: { email }, customer: { first_name }, customer: { last_name }, order_number, line_items } = orderData;
  const lowerCaseEmail = email.toLowerCase();
  const customerName = `${first_name} ${last_name}`
  console.log('🟡 Processing order: ', order_number)

  let newCustomer = false
  //* Check if we already have an user with this email
  let customer = await db.user.findUnique({ where: { email } })
  if (!customer) {
    console.log('🟡 Creating customer')
    customer = await db.user.create({
      data: {
        email: lowerCaseEmail,
        name: customerName
      }
    })
    newCustomer = true
  }

  //* Create order
  console.log('🟡 Creating order')
  const order = await db.order.create({
    data: {
      customerId: customer.id,
      orderNumber: order_number
    }
  })


  //* Create product keys
  let productKeys: ServerKey[] = []
  for (const item of line_items) {
    let keysToAdd: ServerKey[] | null = null;

    // Bundle product
    if (item.product_id in BUNDLE_PRODUCT_IDS) {
      console.log('product id ', item.product_id);
      const productIds = BUNDLE_PRODUCT_IDS[item.product_id];
      keysToAdd = await processProductKeys(lowerCaseEmail, productIds, order_number, customer.id, order.id);
    } else {
      // Single product
      console.log('product id: ', item.product_id);
      keysToAdd = await processProductKeys(lowerCaseEmail, [item.product_id], order_number, customer.id, order.id);
    }

    if (keysToAdd === null) {
      // TODO: handle error something went wrong email, and mail to carp audio to fix
      console.error('keysToAdd is null')
      return;
    }

    productKeys = productKeys.concat(keysToAdd);
  }

  //* Save keys to db
  const res = await db.key.createMany({
    data: productKeys
  })
  if (!res) {
    // TODO: handle error something went wrong email, and mail to carp audio to fix
    console.error('create keys db res is null')
    return
  }

  console.log('productKeys: ', productKeys)

  //* Send keys to user
  if (newCustomer) {
    // Send welcome email with keys
    console.log('🟡 Send keys with account');
    await sendKeysToNewCustomer(customerName, lowerCaseEmail, productKeys)
    // await sendKeysToNewCustomer(customerName, TEMP_EMAIL, productKeys)
  } else {
    // Send keys
    console.log('🟡 Send keys without account');
    await sendKeysToExistingCustomer(customerName, lowerCaseEmail, productKeys);
    // await sendKeysToExistingCustomer(customerName, TEMP_EMAIL, productKeys);
  }


  return new Response(null, { status: 200 });
};


/**
 * Processes product keys for a given email, product IDs, order number, customer ID, and order ID.
 * 
 * @param email - The email associated with the product keys.
 * @param productIds - An array of product IDs.
 * @param order_number - The order number.
 * @param customerId - The customer ID.
 * @param orderId - The order ID.
 * @returns A promise that resolves to an array of ServerKey objects or null if an error occurred.
 */
async function processProductKeys(email: string, productIds: number[], order_number: number, customerId: string, orderId: string): Promise<ServerKey[] | null> {
  let productKeys: ServerKey[] = [];
  console.log('🟡 Processing product keys: ', productIds);
  for (const productId of productIds) {
    const seed = SEEDS[productId];
    const key = await generateKey(email, seed, order_number);
    console.log('🟡 key: ', key, 'productId: ', productId);

    if (key === null) {
      // TODO: Email to customer?
      await cppApiErrorEmail('key is null', 'key is null', order_number)
      return null;
    }

    productKeys.push({
      key1: email,
      key2: key,
      productId: productId.toString(),
      customerId: customerId,
      orderId: orderId
    });
  }
  return productKeys;
}



/**
 * Generates a key based on the provided email, seed, and order number.
 * @param email - The email address.
 * @param seed - The seed value.
 * @param order_number - The order number.
 * @returns The generated key if successful, otherwise null.
 */
const generateKey = async (email: string, seed: string, order_number: number) => {
  try {
    const params = {
      name: email,
      seed: seed,
    }
    console.log('url:', CPP_API_URL + '?' + new URLSearchParams(params))
    const res = await fetch(CPP_API_URL + '?' + new URLSearchParams(params))
    const data: ServerResponse = await res.json()

    if (data.status === 'success') {
      // console.log('generated key: ', data.generatedKey)

      return data.generatedKey
    } else {
      console.log('error: ', data.message, order_number)
      // TODO: sen email to customer?
      await cppApiErrorEmail(data.message, JSON.stringify(data), order_number)
      return null
    }
  } catch (error) {
    console.log('error: ', error, order_number)
    // TODO: sen email to customer?
    await cppApiErrorEmail('catch error', JSON.stringify(error), order_number)
    return null
  }
}