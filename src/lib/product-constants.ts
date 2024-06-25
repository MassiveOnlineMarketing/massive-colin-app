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
    'imgUrl': '/gui/krossbow-gui.png'
  },
  'clxus0z1l0001ihe4onhcwpkx': {
    'name': 'APM Live',
    'imgUrl': '/gui/amp-live-gui.png'
  },
  "clxus2dsn0002ihe4zbpinpla": {
    'name': 'Octapus',
    'imgUrl': '/gui/octapus-gui.png'
  },
  'clxus2qwy0003ihe41dl7e0p8': {
    'name': 'Resonote',
    'imgUrl': '/gui/resonote-gui.png'
  },
  'clxus35ol0004ihe45m8bdfrt': {
    'name': 'Reeferb',
    'imgUrl': '/gui/reeferb-gui.png'
  },
  'clxus3geq0005ihe4ae0w8f91': {
    'name': "Stereo Pusher",
    'imgUrl': '/gui/stereo-pusher-gui.png'
  },
  'clxus3rmb0006ihe471svgv93': {
    'name': "Mono Pusher",
    'imgUrl': '/gui/mono-pusher-gui.png'
  }
}