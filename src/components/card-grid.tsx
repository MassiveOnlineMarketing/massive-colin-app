import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Key as KeyType } from '@prisma/client';
import { getProductInfo, PRODUCT_ID_CONSTANTS } from '@/config/product.config';

import { Key } from './plugin-card';

import { oswald } from '@/styles/styles';
import { LockClosedIcon } from '@radix-ui/react-icons';

type CardGridProps = {
  keys: KeyType[];
  userEmail?: string | null;
};


type CardProps = {
  productId: string;
  productKeys: KeyType[];
  owned: boolean;
  index: number;
  userEmail?: string | null;
};

const Card = ({ productId, productKeys, owned, index, userEmail }: CardProps) => (
  <div className='group'>
    <div key={`${productId}-${index}`} className={`relative flex flex-col gap-4 rounded-3xl p-3 h-[300px] w-[300px] shadow-xl  transition-colors duration-200 ease-in-out ${owned ? 'bg-[#1e211f] group-hover:bg-[#222523]' : 'bg-[#1e211f]/30'}`}>
      <h2 className={`text-2xl text-center ${oswald.className} ${owned ? 'text-[#FFFFFF]' : "text-[#FFFFFF]/50"}`}>{getProductInfo(productId)!.name}</h2>
      <Link target="_blank" href={getProductInfo(productId)!.storeLink}>
        <Image src={getProductInfo(productId)!.imgUrl} alt="product" width={getProductInfo(productId)!.width} height={getProductInfo(productId)!.height} className={`h-[130px] w-fit mx-auto shadow-custom-lg ${owned ? '' : 'opacity-40'}`} />
      </Link>
      {productKeys.length > 1 ? (
        <Key key={`key-${productId}-${index}`} keyOne={productKeys[index].key1} keyTwo={productKeys[index].key2} />
      ) : (
        productKeys.map((productKey, index) => (
          <Key key={`key-${productId}-${index}`} keyOne={productKey.key1} keyTwo={productKey.key2} />
        ))
      )}

      {!owned && (
        <Link
          target="_blank"
          href={`https://www.carpaudio.com/cart/${getProductInfo(productId)!.shopifyVariantId}:1?checkout[email]=${userEmail}`}
          className={`rounded-full w-fit h-fit m-auto px-6 py-3 flex justify-center items-center shadow-custom-lg2 transition-colors duration-100 ease-out ${owned ? 'bg-[#262928]' : 'hover:bg-[#262928]/100 bg-[#262928]/50'
            }`}
        >
          Buy Now
        </Link>
      )}
      {owned && <div className="absolute right-4 top-4 rounded-full bg-green-500 w-2 h-2 animate-pulse"></div>}
      {!owned && <LockClosedIcon className="absolute right-4 top-4 text-white/50" />}
    </div>
  </div>
);

const CardGrid = ({ keys, userEmail }: CardGridProps) => {
  const sortedProductEntries = Object.entries(PRODUCT_ID_CONSTANTS).sort(
    ([, productIdA], [, productIdB]) => {
      const ownedA = keys.some(userKey => userKey.productId === productIdA);
      const ownedB = keys.some(userKey => userKey.productId === productIdB);
      return (+ownedB) - (+ownedA);
    }
  );

  return (
    // <div className="grid grid-cols-4 gap-10">
    <div className='flex flex-wrap gap-8 w-fit mx-auto justify-center'>
      {sortedProductEntries.map(([key, productId]) => {
        const owned = keys.some(userKey => userKey.productId === productId);
        const productKeys = keys.filter(userKey => userKey.productId === productId);

        return productKeys.length > 1
          ? productKeys.map((productKey, index) => (
            <Card key={`${productId}-${index}`} productId={productId} productKeys={productKeys} owned={owned} index={index} userEmail={userEmail}/>
          ))
          : (
            <Card key={`${productId}`} productId={productId} productKeys={productKeys} owned={owned} index={0} userEmail={userEmail}/>
          );
      })}
    </div>
  );
};

export default CardGrid;
