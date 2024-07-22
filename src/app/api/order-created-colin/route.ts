const SHOPIFY_WEBHOOK_SECRET = '5f25bd8a428a8abd8b1478bbbcc63f1ea11d1f22f47c375ee272ac923741f1ff'

import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';

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

    const orderData = JSON.parse(data);
    console.log(orderData);
    
    await db.orders.create({
      data: {
        json: data
      },
    });

    return new Response(null, { status: 200 });
  } else {
    return new Response('Unauthorized Request', {
      status: 401
    });
  }
};