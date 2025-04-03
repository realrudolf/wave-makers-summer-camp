"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ExcursionCardProps {
  title: string
  icon: React.ReactNode
  description: string
  color: string
  image?: string
}

export default function ExcursionCard({ title, icon, description, color, image }: ExcursionCardProps) {
  const [isHovered, setIsHovered] = useState(false)
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

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isMobile) {
        e.preventDefault()
        setIsHovered(true)
      }
    },
    [isMobile],
  )

  const handleTouchEnd = useCallback(() => {
    if (isMobile) {
      // Keep the description visible for a while before hiding it
      setTimeout(() => {
        setIsHovered(false)
      }, 3000)
    }
  }, [isMobile])

  return (
    <div
      className="relative h-[280px] md:h-[350px] rounded-xl overflow-hidden shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      aria-label={`Wycieczka: ${title}. ${description}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setIsHovered(!isHovered)
        }
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image || "/placeholder.svg?height=350&width=500&text=Wycieczka"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70`}></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end text-white">
        <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-sm md:text-base text-gray-200 mb-4">{description}</p>
        </motion.div>
      </div>
    </div>
  )
}

