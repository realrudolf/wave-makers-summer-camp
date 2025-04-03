"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ActivityCardProps {
  title: string
  icon: React.ReactNode
  description: string
  color: string
}

export default function ActivityCard({ title, icon, description, color }: ActivityCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile - zoptymalizowane z useCallback
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile, { passive: true })

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleCardClick = useCallback(() => {
    setIsFlipped(!isFlipped)
  }, [isFlipped])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      // Prevent default behavior only on mobile
      if (isMobile) {
        e.preventDefault()
      }
    },
    [isMobile],
  )

  return (
    <div
      className="h-[220px] md:h-[250px] perspective-1000"
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      role="button"
      aria-pressed={isFlipped}
      tabIndex={0}
      aria-label={`Aktywność: ${title}. Kliknij, aby ${isFlipped ? "ukryć" : "zobaczyć"} szczegóły`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleCardClick()
        }
      }}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <Card className="absolute w-full h-full backface-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center h-full space-y-3 md:space-y-4">
            <div className={`${color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center`}>
              {icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-center">{title}</h3>
            <p className="text-gray-500 text-xs md:text-sm text-center">Kliknij, aby dowiedzieć się więcej</p>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card
          className="absolute w-full h-full backface-hidden hover:shadow-lg transition-shadow"
          style={{ transform: "rotateY(180deg)" }}
        >
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center h-full space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-center">{title}</h3>
            <p className="text-gray-700 text-xs md:text-sm text-center">{description}</p>
            <p className="text-gray-500 text-xs md:text-sm text-center">Kliknij, aby wrócić</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

