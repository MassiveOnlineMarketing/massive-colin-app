'use server';

import { db } from "@/lib/db";

export async function getKeysByOrderId(orderId: string) {
  const keys = db.key.findMany({
    where: {
      orderId
    }
  })

  return keys
}