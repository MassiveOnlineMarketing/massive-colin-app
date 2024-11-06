import { IShopifyOrder } from "./types";
import { db } from "@/lib/db";
import { generateProductKeys } from "./keyGenerator";
import {
  sendKeysToExistingCustomer,
  sendKeysToNewCustomer,
} from "@/lib/mail/keys";

export const processOrder = async (data: string) => {
  const orderData: IShopifyOrder = JSON.parse(data);
  const {
    customer: { email, first_name, last_name },
    order_number,
    line_items,
  } = orderData;
  const lowerCaseEmail = email.toLowerCase();
  const customerName = `${first_name} ${last_name}`;
  console.log("🟡 Processing order: ", order_number);

  let newCustomer = false;
  let customer = await db.user.findUnique({ where: { email: lowerCaseEmail } });
  if (!customer) {
    console.log("🟡 Creating customer");
    try {
      customer = await db.user.create({
        data: {
          email: lowerCaseEmail,
          name: customerName,
        },
      });
      newCustomer = true;
    } catch (err) {
      console.error("🔴 Failed to create customer db", err);
      return;
    }
    console.log("🟢 Customer created");
  }

  let orderId;
  try {
    console.log("🟡 Creating order");
    const order = await db.order.create({
      data: {
        customerId: customer.id,
        orderNumber: order_number,
      },
    });
    orderId = order.id;
  } catch (error) {
    console.error("🔴 Failed to create order db", error);
    return;
  }
  console.log("🟢 Order created");

  const productKeys = await generateProductKeys(
    lowerCaseEmail,
    line_items,
    order_number,
    customer.id,
    orderId
  );
  if (!productKeys) {
    console.error("🔴 Failed to generate product keys");
    return;
  }

  const res = await db.key.createMany({ data: productKeys });
  if (!res) {
    console.error("🔴 Failed to save keys to db");
    return;
  }

  console.log("🟢 productKeys: ", productKeys);

  if (newCustomer) {
    console.log("🟡 Send keys with account");
    await sendKeysToNewCustomer(customerName, lowerCaseEmail, productKeys);
  } else {
    console.log("🟡 Send keys without account");
    await sendKeysToExistingCustomer(customerName, lowerCaseEmail, productKeys);
  }

  console.log("🟢 Keys sent, order processed");
};
