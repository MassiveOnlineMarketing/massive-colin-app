import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Key as KeyType } from '@prisma/client';
import { PRODUCT_ID_CONSTANTS, PRODUCTS } from '@/lib/product-constants';
import { Key } from './plugin-card';
import { oswald } from '@/styles/styles';
import { LockClosedIcon } from '@radix-ui/react-icons';

type CardGridProps = {
  keys: KeyType[];
};

const getProduct = (productId: string) => PRODUCTS[productId];

type CardProps = {
  productId: string;
  productKeys: KeyType[];
  owned: boolean;
  index: number;
};

const Card = ({ productId, productKeys, owned, index }: CardProps) => (
  <div key={`${productId}-${index}`} className={`relative flex flex-col gap-4 rounded-3xl p-3 h-[300px] w-[300px] shadow-xl ${owned ? 'bg-[#1e211f]' : 'bg-[#1e211f]/30'}`}>
    <h2 className={`text-2xl text-center ${oswald.className} ${owned ? 'text-[#FFFFFF]' :"text-[#FFFFFF]/50"}`}>{getProduct(productId).name}</h2>
    <Link target="_blank" href={getProduct(productId).storeLink}>
      <Image src={getProduct(productId).imgUrl} alt="product" width={getProduct(productId).width} height={getProduct(productId).height} className={`h-[130px] w-fit mx-auto shadow-lg ${owned ? '' : 'opacity-40'}`} />
    </Link>
    {productKeys.length > 1 ? (
      <Key key={`key-${productId}-${index}`} keyOne={productKeys[index].key1} keyTwo={productKeys[index].key2} />
    ) : (
      productKeys.map((productKey, index) => (
        <Key key={`key-${productId}-${index}`} keyOne={productKey.key1} keyTwo={productKey.key2} />
      ))
    )}

    {!owned && (
      <div className={`mt-auto h-[78px] rounded-[12px] px-4 py-3 flex justify-center items-center ${owned ? 'bg-[#262928]' : 'bg-[#262928]/30'}`}>
        <Link target="_blank" href={getProduct(productId).addToCartUrl}>Add to cart</Link>
      </div>
    )}
    {owned && <div className="absolute right-4 top-4 rounded-full bg-green-500 w-2 h-2 animate-pulse"></div>}
    {!owned && <LockClosedIcon className="absolute right-4 top-4 text-white/50" />}
  </div>
);

const CardGridTest = ({ keys }: CardGridProps) => {
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
            <Card key={`${productId}-${index}`} productId={productId} productKeys={productKeys} owned={owned} index={index} />
          ))
          : (
            <Card key={`${productId}`} productId={productId} productKeys={productKeys} owned={owned} index={0} />
          );
      })}
    </div>
  );
};

export default CardGridTest;
