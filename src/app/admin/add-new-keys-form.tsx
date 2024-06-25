'use client'

import React from 'react'
import { PRODUCTS } from '@/lib/product-constants';
import { addNewKeys } from '@/data/key';
import { useToast } from '@/components/toast/use-toast';

export interface KeyPair {
  key1: string;
  key2: string;
}

const AddKeysForm = () => {
  const entries = Object.entries(PRODUCTS)

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('text') as string;

    // Check if the text is not empty or whitespace
    if (!text.trim()) {
      toast({
        description: "Text is empty",
        variant: 'destructive',
        duration: 5000
      })
      return; // Exit the function if text is empty
    }

    // Proceed with processing if text is not empty
    const pairs = text.split('\n').map(line => {
      const [key1, key2] = line.split('\t');
      return { key1, key2 };
    });

    const plugin = formData.get('select') as string;


    const res = await addNewKeys(pairs, plugin);

    if (res.success) {
      toast({
        description: res.success,
        variant: 'success',
        duration: 5000
      })

      formData.set('text', '');
    } else {
      toast({
        description: res.error,
        variant: 'destructive',
        duration: 5000
      })
    }

    console.log('Plugin:', plugin);
    console.log('Pairs:', pairs);
  }

  return (
    <div>
      <h2 className='text-2xl'>Add keys to the database</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 max-w-[500px] p-2'>
        <div className='w-full'>
          <p>Select Plugin</p>
          <select name='select' id='select'>
            {entries.map(product => (
              <option key={product[0]} value={product[0]}>{product[1].name}</option>
            ))}
          </select>
        </div>
        <div className='w-full'>
          <p>Enter Keys</p>
          <textarea name="text" id="text" className='w-full' cols={30} rows={10} placeholder="Enter key-value pairs separated by tabs"></textarea>
        </div>
        <button className='mx-auto w-fit'>Submit</button>
      </form>
    </div>
  )
}

export default AddKeysForm