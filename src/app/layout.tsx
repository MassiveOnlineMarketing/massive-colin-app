import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import { Toaster } from '@/components/toast/toaster'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'License Dashboard - CARP Audio',
    template: '%s | CARP Audio',
  },
  description:
    'The plugin license dashboard portal for CARP Audio customers.',
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
  verification: {
    google: 'google',
    yahoo: 'yahoo',
  },
}

export const viewport = {
  themeColor: 'dark',
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
    <html lang="en">
      <Script
        id='google-tag-analytics-manager'
        src={`https://www.googletagmanager.com/gtag/js?id=G-29DZW9T8BB`}
        strategy="lazyOnload"
      />
      <Script id="google-tag-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-29DZW9T8BB', {
                page_path: window.location.pathname,
            });
        `}
      </Script>
      <Script id='google-tag-manager' strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KFF97V7M');
        `}
      </Script>

      <body className={`${inter.className} overflow-x-hidden `}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFF97V7M"
          height="0" width="0" style={{display:"none", visibility:"hidden"}}></iframe></noscript>
        {children}

        <Toaster />
      </body>
    </html>
  )
}
