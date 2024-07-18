import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { Key as KeyType } from '@prisma/client';
import { PRODUCT_ID_CONSTANTS, PRODUCTS } from '@/lib/product-constants';

import { Key } from './plugin-card';
import { oswald } from '@/styles/styles';

import { LockClosedIcon } from '@radix-ui/react-icons';

type CardGridProps = {
  keys: KeyType[];
}

function getProduct(productId: string) {
  return PRODUCTS[productId]
}


const CardGrid = ({ keys }: CardGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      {Object.entries(PRODUCT_ID_CONSTANTS).sort(([keyA, productIdA], [keyB, productIdB]) => {
        const ownedA = keys.some(userKey => userKey.productId === productIdA);
        const ownedB = keys.some(userKey => userKey.productId === productIdB);
        return (+ownedB) - (+ownedA);
      })
        .map(([key, productId]) => {
          const product = PRODUCTS[productId];
          const owned = keys.some(userKey => userKey.productId === productId);
          const productKeys = keys.filter(userKey => userKey.productId === productId);
          console.log('productKeys', productKeys);
          console.log('productKeys.length', productKeys.length);
          if (productKeys.length > 1) {
            return productKeys.map((productKey, index) => (
              <div key={`${productKey}-${index}`} className={`relative  flex flex-col gap-4 rounded-3xl p-3 h-[300px] ${owned ? 'bg-[#1e211f]' : 'bg-[#1e211f]/30'}`}>
                <h2 className={`text-[#FFFFFF] text-2xl text-center ${oswald.className} `}>{product.name}</h2>
                <Image src={product.imgUrl as string} alt="product" width={product.width} height={product.height} className={`h-[130px] w-fit mx-auto `} />
                {/* Render a Key component for each set of keys */}
                <Key key={`key-${productId}-${index}`} keyOne={productKeys[index].key1} keyTwo={productKeys[index].key2} />
                {
                  !owned && <div className="mt-auto bg-[#262928] h-[68px] rounded-[12px] px-4 py-3 flex justify-center items-center"><Link className="opacity-100 " target="_blank" href={getProduct(productId).addToCartUrl}>Add to cart</Link></div>
                }

                {owned && <div className="absolute right-4 top-4 rounded-full bg-green-500 w-2 h-2 animate-pulse"></div>}
                {!owned && <LockClosedIcon className="absolute right-4 top-4" />}
              </div>
            ));
          } else {
            return (
              <div key={productId} className={`relative flex flex-col gap-4 rounded-3xl p-3 h-[300px] ${owned ? 'bg-[#1e211f]' : 'bg-[#1e211f]/30'}`}>
                <h2 className={`text-[#FFFFFF] text-2xl text-center ${oswald.className} `}>{product.name}</h2>
                <Image src={product.imgUrl as string} alt="product" width={product.width} height={product.height} className={`h-[130px] w-fit mx-auto ${owned ? '' : 'opacity-40'}`} />
                {/* Render a Key component for each set of keys */}
                {
                  productKeys.map((productKey, index) => (
                    <Key key={`key-${productId}-${index}`} keyOne={productKey.key1} keyTwo={productKey.key2} />
                  ))
                }
                {
                  !owned && <div className={`mt-auto h-[68px] rounded-[12px] px-4 py-3 flex justify-center items-center ${owned ? 'bg-[#262928]' : 'bg-[#262928]/30'}`}><Link className="opacity-100 " target="_blank" href={getProduct(productId).addToCartUrl}>Add to cart</Link></div>
                }

                {owned && <div className="absolute right-4 top-4 rounded-full bg-green-500 w-2 h-2 animate-pulse"></div>}
                {!owned && <LockClosedIcon className="absolute right-4 top-4" />}
              </div>
            )
          }
        })}
    </div>
  )
}

export default CardGrid