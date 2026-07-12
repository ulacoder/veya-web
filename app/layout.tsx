import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veya - Eye Disease Detection',
  description: 'AI-powered eye disease detection system',
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
