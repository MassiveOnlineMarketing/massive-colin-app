export const BUNDLE_PRODUCT_IDS: { [key: number]: number[] } = {
  // Parallel Bundle
  8785285742934: [8612997890390, 8651898257750],
  // Pusher Bundle
  8492913656150: [8492908020054, 8492913262934],
  // Everything Bundle
  8867749134678: [
    8612997890390, 8651898257750, 8492908020054, 8492913262934, 8703626576214,
    8818545066326, 8536354226518, 9122402894166,
  ],
};

export type ProductDetails = {
  name: string;
  storeLink: string;
  imgUrl: string;
  width: number;
  height: number;
  seed: string;
  shopifyVariantId: string;
};

type ProductDictionary = {
  [key: string]: ProductDetails;
};

export const PRODUCT_ID_CONSTANTS = {
  reeferbIR: '9122402894166',
  krossbow: '8818545066326',
  amp: '8703626576214',
  octapus: '8651898257750',
  resonote: '8612997890390',
  reeferb: '8536354226518',
  stereo: '8492913262934',
  mono: '8492908020054',
};

export const PRODUCTS: ProductDictionary = {
  '9122402894166': {
    'name': 'Reeferb IR',
    'storeLink': 'https://carpaudio.com/products/reeferb-ir',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Reeferb_IR_Init.png?v=1725908484',
    'width': 251,
    'height': 486,
    'seed': '130920007',
    'shopifyVariantId': '48687945154902',
  },
  '8818545066326': {
    'name': 'Krossbow',
    'storeLink': 'https://carpaudio.com/products/krossbow',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Krossbow_Init.png?v=1719348324',
    'width': 425,
    'height': 400,
    'seed': '130920006',
    'shopifyVariantId': '47902744052054',
  },
  '8703626576214': {
    'name': 'APM Live',
    'storeLink': 'https://carpaudio.com/products/apm-live',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/APM_Live_Init.png?v=1719348325',
    'width': 526,
    'height': 351,
    'seed': '130920005',
    'shopifyVariantId': '47573083554134',
  },
  "8651898257750": {
    'name': 'Octapus',
    'storeLink': 'https://carpaudio.com/products/octapus',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Octapus_Init.png?v=1719348324',
    'width': 280,
    'height': 465,
    'seed': '130920004',
    'shopifyVariantId': '47406846869846',
  },
  '8612997890390': {
    'name': 'Resonote',
    'storeLink': 'https://carpaudio.com/products/resonote',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Resonote_Init.png?v=1719348325',
    'width': 910,
    'height': 459,
    'seed': '13092000',
    'shopifyVariantId': '47276787073366',
  },
  '8536354226518': {
    'name': 'Reeferb',
    'storeLink': 'https://carpaudio.com/products/reeferb',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Reeferb_Init.png?v=1719348324',
    'width': 250,
    'height': 484,
    'seed': '130920003',
    'shopifyVariantId': '47028435910998',
  },
  '8492913262934': {
    'name': "Stereo Pusher",
    'storeLink': 'https://carpaudio.com/products/stereo-pusher',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Stereo_Pusher_Init.png?v=1719348325',
    'width': 250,
    'height': 484,
    'seed': '130920001',
    'shopifyVariantId': '46882671395158',
  },
  '8492908020054': {
    'name': "Mono Pusher",
    'storeLink': 'https://carpaudio.com/products/mono-pusher',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Mono_Pusher_Init.png?v=1719348324',
    'width': 248,
    'height': 456,
    'seed': '130920002',
    'shopifyVariantId': '46882659238230',
  }
}

// Function to get product information by product ID
export function getProductInfo(productId: string): ProductDetails | undefined {
  return PRODUCTS[productId];
}
