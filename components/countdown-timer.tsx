"use client"

import { useState, useEffect, useCallback } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Zoptymalizowana funkcja obliczania pozostałego czasu
  const calculateTimeLeft = useCallback(() => {
    const difference = targetDate.getTime() - new Date().getTime()

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  }, [targetDate])

  useEffect(() => {
    // Natychmiastowe obliczenie przy montowaniu
    setTimeLeft(calculateTimeLeft())

    // Ustawienie interwału
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  // Formatowanie dla czytników ekranu
  const ariaTimeLeft = `${timeLeft.days} dni, ${timeLeft.hours} godzin, ${timeLeft.minutes} minut i ${timeLeft.seconds} sekund do rozpoczęcia obozu`

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4" aria-live="polite" aria-atomic="true">
      <div className="flex flex-col items-center">
        <div className="bg-blue-600/80 backdrop-blur-sm text-white text-xl md:text-3xl font-bold w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center shadow-lg">
          {timeLeft.days}
        </div>
        <span className="text-white text-[10px] md:text-xs mt-1 font-semibold drop-shadow-md">dni</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-blue-600/80 backdrop-blur-sm text-white text-xl md:text-3xl font-bold w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center shadow-lg">
          {timeLeft.hours}
        </div>
        <span className="text-white text-[10px] md:text-xs mt-1 font-semibold drop-shadow-md">godzin</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-blue-600/80 backdrop-blur-sm text-white text-xl md:text-3xl font-bold w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center shadow-lg">
          {timeLeft.minutes}
        </div>
        <span className="text-white text-[10px] md:text-xs mt-1 font-semibold drop-shadow-md">minut</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-blue-600/80 backdrop-blur-sm text-white text-xl md:text-3xl font-bold w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center shadow-lg">
          {timeLeft.seconds}
        </div>
        <span className="text-white text-[10px] md:text-xs mt-1 font-semibold drop-shadow-md">sekund</span>
      </div>
      <span className="sr-only">{ariaTimeLeft}</span>
    </div>
  )
}

