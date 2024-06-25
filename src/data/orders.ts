'use server';

import { db } from "@/lib/db";

export const getOrders = async () => {
  
  const orders = await db.orders.findMany();

  return orders;
}