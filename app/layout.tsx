import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Japanese Text App',
  description: 'A simple app displaying Japanese text',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} bg-white`}>{children}</body>
    </html>
  )
}
