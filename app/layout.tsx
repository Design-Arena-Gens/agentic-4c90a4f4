import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VOIDWALKER',
  description: 'Gothic Anime Gamer Profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
