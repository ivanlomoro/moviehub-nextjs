import type { Metadata } from 'next'
import './globals.css'
import { akaya_kanadaka } from './ui/fonts'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.jpg"/>
        <title>MovieHat</title>
      </head>
      <body className={akaya_kanadaka.className}>{children}</body>
    </html>
  )
}
