export type ProductDetails = {
  name: string;
  storeLink: string;
  imgUrl: string;
  addToCartUrl: string;
  width: number;
  height: number;
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
    // 'imgUrl': '/gui/Reeferb_IR_Init.png',
    'storeLink': 'https://carpaudio.com/products/reeferb-ir',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Reeferb_IR_Init.png?v=1725908484',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=48687945154902&quantity=1',
    'width': 251,
    'height': 486,
  },
  '8818545066326': {
    'name': 'Krossbow',
    // 'imgUrl': '/gui/krossbow-gui.png',
    'storeLink': 'https://carpaudio.com/products/krossbow',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Krossbow_Init.png?v=1719348324',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47902744052054&quantity=1',
    'width': 425,
    'height': 400,
  },
  '8703626576214': {
    'name': 'APM Live',
    // 'imgUrl': '/gui/amp-live-gui.png',
    'storeLink': 'https://carpaudio.com/products/apm-live',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/APM_Live_Init.png?v=1719348325',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47573083554134&quantity=1',
    'width': 526,
    'height': 351,
  },
  "8651898257750": {
    'name': 'Octapus',
    // 'imgUrl': '/gui/octapus-gui.png',
    'storeLink': 'https://carpaudio.com/products/octapus',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Octapus_Init.png?v=1719348324',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47406846869846&quantity=1',
    'width': 280,
    'height': 465,
  },
  '8612997890390': {
    'name': 'Resonote',
    // 'imgUrl': '/gui/resonote-gui.png',
    'storeLink': 'https://carpaudio.com/products/resonote',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Resonote_Init.png?v=1719348325',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47276787073366&quantity=1',
    'width': 910,
    'height': 459,
  },
  '8536354226518': {
    'name': 'Reeferb',
    // 'imgUrl': '/gui/reeferb-gui.png',
    'storeLink': 'https://carpaudio.com/products/reeferb',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Reeferb_Init.png?v=1719348324',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47028435910998&quantity=1',
    'width': 250,
    'height': 484,
  },
  '8492913262934': {
    'name': "Stereo Pusher",
    // 'imgUrl': '/gui/stereo-pusher-gui.png',
    'storeLink': 'https://carpaudio.com/products/stereo-pusher',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Stereo_Pusher_Init.png?v=1719348325',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=46882671395158&quantity=1',
    'width': 250,
    'height': 484,
  },
  '8492908020054': {
    'name': "Mono Pusher",
    // 'imgUrl': '/gui/mono-pusher-gui.png',
    'storeLink': 'https://carpaudio.com/products/mono-pusher',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Mono_Pusher_Init.png?v=1719348324',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=46882659238230&quantity=1',
    'width': 248,
    'height': 456,
  }
}