'use server'

import { ServerKey } from "@/app/api/order-created-colin/types";
import { getUserById } from "@/auth/data/user";
import { db } from "@/lib/db";
import { sendKeysToExistingCustomer, sendKeysToNewCustomer } from "@/lib/mail/keys";


/**
 * Sends keys to a customer based on the order ID.
 * If the user has a password, the keys will be sent to the existing customer.
 * If the user does not have a password, the keys will be sent to the new customer.
 * 
 * @param orderId - The ID of the order.
 * @param sendKeysFunction - The function used to send the keys to the customer.
 * @returns An object indicating the success or failure of sending the keys.
 */
export async function sendKeys(orderId: string): Promise<{ success: boolean; message: string }> {
  const order = await getOrderById(orderId);

  if (!order) {
    return { success: false, message: "Order not found" };
  }

  const user = await getUserById(order.customerId);

  if (!user) {
    return { success: false, message: "User not found" };
  }
  
  if (!user.name) {
    return { success: false, message: "User does not have an email" };
  }

  if (!user.email) {
    return { success: false, message: "User does not have an email" };
  }

  if (user.password) {
    try {
      return await retry(() => sendKeysToExistingCustomer(user.name!, user.email!, order.keys as ServerKey[]));
    } catch (error) {
      return { success: false, message: error as string || "Error sending keys to existing customer" };
    }
  } else {
    try {
      return await retry(() => sendKeysToNewCustomer(user.name!, user.email!, order.keys as ServerKey[]));
    } catch (error) {
      return { success: false, message: error as string || "Error sending keys to new customer" };
    }
  }
}


type RetryResult = {
  success: boolean;
  message: string;
};
async function retry<T>(fn: () => Promise<T>, retries: number = 5): Promise<RetryResult> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const res = await fn();
      // Check if the result has an error property
      if (res && (res as any).error) {
        attempt++;
        if (attempt >= retries) {
          return {success: false, message: (res as any).error };
        }
      } else {
        return { success: true, message: 'Keys sent successfully' };
      }
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        return { success: false, message: error as string || 'Max retries reached' };
      }
    }
  }
  return { success: false, message: 'Max retries reached' };
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

