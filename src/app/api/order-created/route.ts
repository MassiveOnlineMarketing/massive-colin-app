const SHOPIFY_WEBHOOK_SECRET = '00ffdbafa9cfc48049ff8715b9d7bcae559e28301011432ea98d0e4c1647ecec'
// import { CACHE_TAG_PRODUCTS } from '@/app/api/requests';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';
import { NextRequest } from 'next/server';

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
    // revalidateTag(CACHE_TAG_PRODUCTS); // We will discuss this next
    const dataString = JSON.stringify(JSON.parse(data), null, 2); // Pretty print the JSON
    const chunkSize = 2000; // Define a suitable chunk size
    for (let i = 0; i < dataString.length; i += chunkSize) {
      console.log(dataString.substring(i, i + chunkSize)); // Log each chunk separately
    }
    return new Response(null, { status: 200 });
  } else {
    return new Response('Unauthorized Request', {
      status: 401
    });
  }
};