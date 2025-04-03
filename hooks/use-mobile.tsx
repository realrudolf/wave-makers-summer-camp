"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Funkcja do sprawdzania czy urządzenie jest mobilne
    const checkMobile = () => {
      // Sprawdzamy szerokość ekranu (typowo mobilne urządzenia mają < 768px)
      // oraz sprawdzamy czy istnieje navigator.userAgent (dodatkowe sprawdzenie)
      const isMobileByWidth = window.innerWidth < 768
      const isMobileByAgent =
        typeof navigator !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      setIsMobile(isMobileByWidth || isMobileByAgent)
    }

    // Sprawdź przy pierwszym renderowaniu
    checkMobile()

    // Nasłuchuj na zmiany rozmiaru okna
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

