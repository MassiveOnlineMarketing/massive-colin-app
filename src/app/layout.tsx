import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Script from 'next/script'

// Meta data
import businessSchema from './business-schema.json'
import { Toaster } from '@/components/toast/toaster'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Massive Online Marketing',
    template: '%s | Massive Online Marketing',
  },
  description:
    'Zet uw zakelijke visie samen met Massive Online Marketing om in tastbare sucessen met strategieën die ondernemerschap en resultaatgerichtheid combineren',
  metadataBase: new URL(process.env.WEBSITE_URL || 'http://localhost:3000/'),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Massive Online Marketing',
    description:
      'Massive Online Marketing is een online marketing bureau dat zich richt op het helpen van ondernemers met het behalen van hun doelen.',
    url: process.env.WEBSITE_URL,
    siteName: 'Massive Online Marketing',
    // invullen met de juiste afbeeldingen
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
  // // invullen met juiste twitter gegevens
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Next.js',
  //   description: 'Massive Online Marketing is een online marketing bureau dat zich richt op het helpen van ondernemers met het behalen van hun doelen.',
  //   siteId: '1467726470533754880',
  //   creator: '@nextjs',
  //   creatorId: '1467726470533754880',
  //   images: ['https://nextjs.org/og.png'],
  // },
  verification: {
    google: 'google',
    yahoo: 'yahoo',
  },
}

export const viewport = {
  themeColor: 'white',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={`${inter.className} overflow-x-hidden`}>


        
          {children}


        <Toaster />
        <Script type='application/ld+json' id='business schema'>
            {JSON.stringify(businessSchema)}
        </Script>
      </body>
    </html>
  )
}
