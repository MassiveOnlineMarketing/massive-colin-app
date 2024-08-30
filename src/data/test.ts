'use server'

import { ServerKey } from "@/app/api/order-created-colin/types";
import { getUserById } from "@/auth/data/user";
import { db } from "@/lib/db";
import { sendKeysToExistingCustomer, sendKeysToNewCustomer } from "@/lib/mail/keys";


export async function sendKeysWithNewAccountByOrderId(orderId: string) {
  const order = await getOrderById(orderId);

  if (!order) {
    return { error: "Order not found" };
  }

  const user = await getUserById(order.customerId);

  if (!user) {
    return { error: "User not found" };
  }
  
  if (!user.name) {
    return { error: "User does not have an email" };
  }

  if (!user.email) {
    return { error: "User does not have an email" };
  }
  

  const resendRes = await sendKeysToNewCustomer(user.name, user.email, order.keys as ServerKey[]);

  if (resendRes.error) {
    return { error: resendRes.error };
  }

  return { success: true };
}

export async function sendKeysByOrderId(orderId: string) {
  const order = await getOrderById(orderId);

  if (!order) {
    return { error: "Order not found" };
  }

  const user = await getUserById(order.customerId);

  if (!user) {
    return { error: "User not found" };
  }
  
  if (!user.name) {
    return { error: "User does not have an email" };
  }

  if (!user.email) {
    return { error: "User does not have an email" };
  }
  

  const resendRes = await sendKeysToExistingCustomer(user.name, user.email, order.keys as ServerKey[]);

  if (resendRes.error) {
    return { error: resendRes.error };
  }

  return { success: true };
}

export async function getOrderById(orderId: string) {
  return db.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      keys: true
    }
  });
}

