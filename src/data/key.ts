'use server';

import { KeyPair } from "@/app/admin/add-new-keys-form";
import { db } from "@/lib/db";
import { Key } from "@prisma/client";

export const assignKeysToNewUser = async (userId: string, keys: Key) => {

  const res = await db.key.update({
    where: {
      id: keys.id
    },
    data: {
      customerId: userId,
      orderId: null
    }
  });

  return res;
}


export const addNewKeys = async (keys: KeyPair[], productId: string) => {
  const amountOfKeys = keys.length;
  console.log('keys', keys)

  if (amountOfKeys === 0) {
    return { error: 'No keys to add' }
  }

  const res = await db.key.createMany({
    data: keys.map(key => ({
      key1: key.key1,
      key2: key.key2,
      productId
    }))
  });

  if (res.count === amountOfKeys) {
    return { success: 'Keys added successfully' }
  }

  return { error: 'Failed to add keys' }
}