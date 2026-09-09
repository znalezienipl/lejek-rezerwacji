import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Cormorant_Garamond,
  Jost,
  Bodoni_Moda,
  Montserrat,
  Fraunces,
  Nunito_Sans,
} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
})
const jost = Jost({ subsets: ['latin'], variable: '--font-jost' })
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-bodoni',
})
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-fraunces',
})
const nunito = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'Znalezieni Beauty — Premium Websites for Beauty Businesses',
  description:
    'Three award-winning premium website experiences for beauty salons, nail studios, and wellness spaces. Built by Znalezieni.pl.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#f5f1ea',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${cormorant.variable} ${jost.variable} ${bodoni.variable} ${montserrat.variable} ${fraunces.variable} ${nunito.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
