import { ServerKey, ServerResponse } from "./types";
import { cppApiErrorEmail } from "@/lib/mail/apiErrors";
import { BUNDLE_PRODUCT_IDS, getProductInfo } from "@/config/product.config";

const CPP_API_URL = "http://172.233.40.227:8080/generate_key";

export const generateProductKeys = async (
  email: string,
  line_items: any[],
  order_number: number,
  customerId: string,
  orderId: string
): Promise<ServerKey[] | null> => {
  console.log(
    "🟡 Generating product keys",
    line_items.map((item) => item.product_id)
  );
  let productKeys: ServerKey[] = [];
  for (const item of line_items) {
    let keysToAdd: ServerKey[] | null = null;

    if (item.product_id in BUNDLE_PRODUCT_IDS) {
      console.log(item.product_id, "is in BUNDLE_PRODUCT_IDS");
      const productIds = BUNDLE_PRODUCT_IDS[item.product_id];
      keysToAdd = await processProductKeys(
        email,
        productIds,
        order_number,
        customerId,
        orderId
      );
    } else {
      console.log(item.product_id, "item is not in BUNDLE_PRODUCT_IDS");
      keysToAdd = await processProductKeys(
        email,
        [item.product_id],
        order_number,
        customerId,
        orderId
      );
    }

    if (keysToAdd === null) {
      console.error("keysToAdd is null");
      return null;
    }

    productKeys = productKeys.concat(keysToAdd);
  }
  return productKeys;
};

const processProductKeys = async (
  email: string,
  productIds: number[],
  order_number: number,
  customerId: string,
  orderId: string
): Promise<ServerKey[] | null> => {
  let productKeys: ServerKey[] = [];
  for (const productId of productIds) {
    const seed = getProductInfo(productId.toString())?.seed;
    if (!seed) {
      console.error("seed is null", order_number);
      return null;
    }
    const key = await generateKey(email, seed, order_number);
    if (key === null) {
      await cppApiErrorEmail("key is null", "key is null", order_number);
      return null;
    }

    productKeys.push({
      key1: email,
      key2: key,
      productId: productId.toString(),
      customerId: customerId,
      orderId: orderId,
    });
  }
  return productKeys;
};

// src/api/keyGenerator.ts

const generateKey = async (
  email: string,
  seed: string,
  order_number: number
): Promise<string | null> => {
  const maxRetries = 5;
  let attempts = 0;

  console.log("🟡 Generating key", email, seed);

  while (attempts < maxRetries) {
    try {
      const params = { name: email, seed: seed };

      console.log(
        `🟡 Attempt ${attempts + 1}: Fetching key with URL`,
        CPP_API_URL + "?" + new URLSearchParams(params)
      );

      const res = await fetch(CPP_API_URL + "?" + new URLSearchParams(params));
      const data: ServerResponse = await res.json();

      console.log("🟡 Key generated response", data);

      if (data.status === "success") {
        console.log("🟢 Key generation successful", data.data);
        return data.data;
      } else {
        console.warn(`🟠 Attempt ${attempts + 1} failed:`, data.data);
        attempts++;
        if (attempts >= maxRetries) {
          console.error("🔴 Max retries reached. Sending error email.");
          await cppApiErrorEmail(data.data, JSON.stringify(data), order_number);
          return null;
        }
      }
    } catch (error) {
      console.error(`🔴 Attempt ${attempts + 1} encountered an error:`, error);
      attempts++;
      if (attempts >= maxRetries) {
        console.error("🔴 Max retries reached. Sending error email.");
        await cppApiErrorEmail(
          "catch error",
          JSON.stringify(error),
          order_number
        );
        return null;
      }
    }
  }
  return null;
};
