// src/app/api/order-created/route.ts
import { NextRequest } from "next/server";
import { handleWebhook } from "./webhookHandler";

export const POST = async (req: NextRequest) => {
  return await handleWebhook(req);
};