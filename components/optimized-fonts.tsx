"use client"

import type React from "react"
import { useEffect } from "react"
import { Inter } from "next/font/google"

// Konfiguracja czcionki z display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Zapobiega blokowaniu renderowania
  preload: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export function OptimizedFonts({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Prevent layout shifts by setting font-display strategy
    document.documentElement.classList.add(inter.variable)

    // Font loading optimization
    if ("fonts" in document) {
      // Preemptively load and cache important font variants
      void Promise.all([document.fonts.load("400 1em Inter"), document.fonts.load("700 1em Inter")]).then(() => {
        document.documentElement.classList.add("fonts-loaded")
      })
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        }
        html.fonts-loaded body {
          opacity: 1;
        }
      `}</style>
      {children}
    </>
  )
}

