import "./globals.css"
import { Inter } from "next/font/google"
import Navigation from "@/components/Navigation"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rea Jampane Studios",
  description: "Capturing moments, creating magic",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}



import './globals.css'