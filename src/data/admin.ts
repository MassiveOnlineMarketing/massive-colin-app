'use server';

import { db } from '@/lib/db';

export const insertNewProduct = async (sku: string) => {
  const newProduct = await db.product.create({
    data: {
      sku: sku,
    },
  });

  return newProduct;
}

export const insertNewBundle = async (sku: string) => {
  const newBundle = await db.bundle.create({
    data: {
      sku: sku,
    },
  });

  return newBundle;
}


export async function createProductBundle(productId: string) {
  try {
    const productBundle = await db.productBundle.create({
      data: {
        productId: productId,
        bundleId: 'clxusboul000513q1nc2mrzzc',
      },
    });
    console.log("ProductBundle created:", productBundle);
  } catch (error) {
    console.error("Error creating ProductBundle:", error);
  }
}
