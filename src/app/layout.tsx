import { Inter } from 'next/font/google'
import '@/styles/globals.css'

import { Toaster } from '@/components/toast/toaster'
import Image from 'next/image'


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
      <body className={`${inter.className} overflow-x-hidden `}>
        
        {children}

        <Toaster />
      </body>
    </html>
  )
}
