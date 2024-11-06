// src/api/webhookHandler.ts
import crypto from "crypto";
import { NextRequest } from "next/server";
import { processOrder } from "./orderProcessor";

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || "";

export const handleWebhook = async (req: NextRequest) => {
  const data = await req.text();

  const hmacHeader = req.headers.get("X-Shopify-Hmac-Sha256");
  const digest = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(data)
    .digest("base64");

  if (hmacHeader !== digest) {
    console.log("🔴 Unauthorized Request");
    return new Response("Unauthorized Request", {
      status: 401,
    });
  }

  console.log("🟢 Order created webhook received");
  await processOrder(data);

  return new Response(null, { status: 200 });
};