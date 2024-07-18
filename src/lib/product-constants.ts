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
  krossbow: 'clxurzyj50000ihe42jmujpmk',
  amp: 'clxus0z1l0001ihe4onhcwpkx',
  octapus: 'clxus2dsn0002ihe4zbpinpla',
  resonote: 'clxus2qwy0003ihe41dl7e0p8',
  reeferb: 'clxus35ol0004ihe45m8bdfrt',
  stereo: 'clxus3geq0005ihe4ae0w8f91',
  mono: 'clxus3rmb0006ihe471svgv93',
};

export const PRODUCTS: ProductDictionary = {
  'clxurzyj50000ihe42jmujpmk': {
    'name': 'Krossbow',
    // 'imgUrl': '/gui/krossbow-gui.png',
    'storeLink': 'https://carpaudio.com/products/krossbow',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Krossbow_Init.png?v=1719348324',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47902744052054&quantity=1',
    'width': 425,
    'height': 400,
  },
  'clxus0z1l0001ihe4onhcwpkx': {
    'name': 'APM Live',
    // 'imgUrl': '/gui/amp-live-gui.png',
    'storeLink': 'https://carpaudio.com/products/apm-live',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/APM_Live_Init.png?v=1719348325',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47573083554134&quantity=1',
    'width': 526,
    'height': 351,
  },
  "clxus2dsn0002ihe4zbpinpla": {
    'name': 'Octapus',
    // 'imgUrl': '/gui/octapus-gui.png',
    'storeLink': 'https://carpaudio.com/products/octapus',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Octapus_Init.png?v=1719348324',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47406846869846&quantity=1',
    'width': 280,
    'height': 465,
  },
  'clxus2qwy0003ihe41dl7e0p8': {
    'name': 'Resonote',
    // 'imgUrl': '/gui/resonote-gui.png',
    'storeLink': 'https://carpaudio.com/products/resonote',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Resonote_Init.png?v=1719348325',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47276787073366&quantity=1',
    'width': 800,
    'height': 600,
  },
  'clxus35ol0004ihe45m8bdfrt': {
    'name': 'Reeferb',
    // 'imgUrl': '/gui/reeferb-gui.png',
    'storeLink': 'https://carpaudio.com/products/reeferb',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Reeferb_Init.png?v=1719348324',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=47028435910998&quantity=1',
    'width': 910,
    'height': 459,
  },
  'clxus3geq0005ihe4ae0w8f91': {
    'name': "Stereo Pusher",
    // 'imgUrl': '/gui/stereo-pusher-gui.png',
    'storeLink': 'https://carpaudio.com/products/stereo-pusher',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Stereo_Pusher_Init.png?v=1719348325',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=46882671395158&quantity=1',
    'width': 250,
    'height': 484,
  },
  'clxus3rmb0006ihe471svgv93': {
    'name': "Mono Pusher",
    // 'imgUrl': '/gui/mono-pusher-gui.png',
    'storeLink': 'https://carpaudio.com/products/mono-pusher',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Mono_Pusher_Init.png?v=1719348324',
    'addToCartUrl': 'https://www.carpaudio.com/cart/add?id=46882659238230&quantity=1',
    'width': 248,
    'height': 456,
  }
}