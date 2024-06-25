'use client';

import { createProductBundle, insertNewBundle } from '@/data/admin';
import { PRODUCTS } from '@/lib/product-constants';
import React from 'react'

export const AdminForms = () => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const sku = formData.get('sku') as string;

    // Check if the sku is not empty or whitespace
    if (!sku.trim()) {
      console.log("Sku is empty")
      return; // Exit the function if sku is empty
    }

    const res = await insertNewBundle(sku);
    console.log('res', res)
  }


  const clicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const sku = formData.get('sku') as string;

    // Check if the sku is not empty or whitespace
    if (!sku.trim()) {
      console.log("Sku is empty")
      return; // Exit the function if sku is empty
    }

    const res = await createProductBundle(sku);
    console.log('res', res)
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="sku" />
        <button type="submit">Add Product</button>
      </form>

      <form onSubmit={clicked}>
        <input type="text" name="sku" />
        <button type="submit">Add Bundle</button>
      </form>

    </div>
  )
}
