'use server';

import { db } from '@/lib/db';
import { Key, User } from '@prisma/client';

export type KeysWithCustomer = Key & {
  customer: User | null
}


export const getKeysPerProduct = async (productId: string) => {
  const keys = await db.key.findMany({
    where: {
      productId: productId,
    },
    include: {
      customer: true
    }
  });

  return keys;
}