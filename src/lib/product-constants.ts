type ProductDetails = {
  name: string;
  imgUrl?: string;
};

type ProductDictionary = {
  [key: string]: ProductDetails;
};

export const PRODUCTS: ProductDictionary = {
  'clxuqpzkq00006ovyrpi8311i': {
    'name': 'Krossbow',
    'imgUrl': '/gui/krossbow-gui.png'
  },
  'clxuqqaq100016ovyw2kvs2f8': {
    'name': 'APM Live',
    'imgUrl': '/gui/amp-live-gui.png'
  },
  'clxuqqgb800026ovy6248m2sx': {
    'name': 'Octapus',
    'imgUrl': '/gui/octapus-gui.png'
  },
  'clxuqqkky00036ovy5eofft70': {
    'name': 'Resonote',
    'imgUrl': '/gui/resonote-gui.png'
  },
  'clxuqqq4w00046ovy9fzhgnu8': {
    'name': 'Reeferb',
    'imgUrl': '/gui/reeferb-gui.png'
  },
  'clxuqqx7600056ovy43toaahn': {
    'name': "Stereo Pusher",
    'imgUrl': '/gui/stereo-pusher-gui.png'
  },
  'clxuqr39300066ovy4k76ie03': {
    'name': "Mono Pusher",
    'imgUrl': '/gui/mono-pusher-gui.png'
  }
}