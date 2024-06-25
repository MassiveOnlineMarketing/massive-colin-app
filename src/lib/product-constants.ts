type ProductDetails = {
  name: string;
  imgUrl?: string;
};

type ProductDictionary = {
  [key: string]: ProductDetails;
};

export const PRODUCTS: ProductDictionary = {
  'clxurzyj50000ihe42jmujpmk': {
    'name': 'Krossbow',
    // 'imgUrl': '/gui/krossbow-gui.png',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Krossbow_Init.png?v=1719348324'
  },
  'clxus0z1l0001ihe4onhcwpkx': {
    'name': 'APM Live',
    // 'imgUrl': '/gui/amp-live-gui.png',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/APM_Live_Init.png?v=1719348325'
  },
  "clxus2dsn0002ihe4zbpinpla": {
    'name': 'Octapus',
    // 'imgUrl': '/gui/octapus-gui.png',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Octapus_Init.png?v=1719348324'
  },
  'clxus2qwy0003ihe41dl7e0p8': {
    'name': 'Resonote',
    // 'imgUrl': '/gui/resonote-gui.png',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Resonote_Init.png?v=1719348325'
  },
  'clxus35ol0004ihe45m8bdfrt': {
    'name': 'Reeferb',
    // 'imgUrl': '/gui/reeferb-gui.png',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Reeferb_Init.png?v=1719348324'
  },
  'clxus3geq0005ihe4ae0w8f91': {
    'name': "Stereo Pusher",
    // 'imgUrl': '/gui/stereo-pusher-gui.png',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Stereo_Pusher_Init.png?v=1719348325'
  },
  'clxus3rmb0006ihe471svgv93': {
    'name': "Mono Pusher",
    // 'imgUrl': '/gui/mono-pusher-gui.png',
    'imgUrl': 'https://cdn.shopify.com/s/files/1/0771/9249/5446/files/Mono_Pusher_Init.png?v=1719348324'
  }
}