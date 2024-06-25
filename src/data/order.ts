'use server';

import { db } from "@/lib/db";
import { Key, User } from "@prisma/client";

interface Order {
  id: string;
  oderNumber: number;
  customerId: string;
  createdAt: Date;
  customer: User;
  keys: Key[];
}

export const getAllOrders = async (): Promise<Order[]> => {
  const orders = await db.order.findMany({
    include: {
      customer: true,
      keys: true
    }
  });
  return orders as Order[];
}