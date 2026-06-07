import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NEXUS PROTOCOL — AI-Powered Crypto Intelligence",
  description: "Discover, analyze, and trade crypto with AI-powered intelligence. Real-time rug detection, whale tracking, and alpha aggregation.",
  keywords: ["crypto", "AI", "trading", "Solana", "memecoin", "alpha", "intelligence"],
  openGraph: {
    title: "NEXUS PROTOCOL — AI-Powered Crypto Intelligence",
    description: "Discover, analyze, and trade crypto with AI-powered intelligence.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
