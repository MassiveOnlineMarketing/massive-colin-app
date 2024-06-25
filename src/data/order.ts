'use server';

import { db } from "@/lib/db";
import { Key, User } from "@prisma/client";

export interface OrderDTO {
  id: string;
  orderNumber: number;
  customerId: string;
  createdAt: Date;
  customer: User;
  keys: Key[];
}

export const getAllOrders = async (): Promise<OrderDTO[]> => {
  const orders = await db.order.findMany({
    include: {
      customer: true,
      keys: true
    }
  });
  return orders as OrderDTO[];
}