type ProductDetails = {
  name: string;
  imgUrl?: string;
};

type ProductDictionary = {
  [key: string]: ProductDetails;
};

export const PRODUCTS: ProductDictionary = {
  'clxt4rl2e0000emzl8q1yxco1': {
    'name': 'Krossbow',
    'imgUrl': '/gui/krossbow-gui.png'
  },
  'clxt63v5t00009uutbk3u0pzq': {
    'name': 'APM Live',
    'imgUrl': '/gui/amp-live-gui.png'
  },
  'clxt6445s00019uut0hwb70jl': {
    'name': 'Octapus',
    'imgUrl': '/gui/octapus-gui.png'
  },
  'clxt64arb00029uut2bsr49a9': {
    'name': 'Resonote',
    'imgUrl': '/gui/resonote-gui.png'
  },
  'clxt64hdd00039uute2sk3vba': {
    'name': 'Reeferb',
    'imgUrl': '/gui/reeferb-gui.png'
  },
  'clxt64p4100049uutmd2yobsk': {
    'name': "Stereo Pusher",
    'imgUrl': '/gui/stereo-pusher-gui.png'
  },
  'clxt64udm00059uut4r1130op': {
    'name': "Mono Pusher",
    'imgUrl': '/gui/mono-pusher-gui.png'
  }
}