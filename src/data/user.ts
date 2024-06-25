'use server';

import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  if (!email) {
    return null;
  }
  const user = await db.user.findFirst({
    where: {
      email
    },
    include:{
      keys:true
    }
  });

  return user;
}

export const getAllUsers = async () => {
  const users = await db.user.findMany();

  return users;
}

export const getAllUsersOrders = async () => {
  const orders = await db.user.findMany({
    include: {
      keys: true
    }
  });

  return orders;
}