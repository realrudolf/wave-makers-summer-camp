import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Funkcja pomocnicza do generowania prostych LQIP (Low Quality Image Placeholders)
 * Uwaga: W rzeczywistym projekcie lepiej wygenerować te placeholdery podczas budowania
 * lub używać usług jak Cloudinary, które automatycznie dostarczają LQIP
 */
export function generateSimpleLQIP(color = "#e2e8f0"): string {
  // Generuje bardzo prosty, jednokolorowy placeholder jako base64
  // W rzeczywistym projekcie użylibyśmy prawdziwych, skompresowanych miniatur obrazów
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="${color}"/></svg>`,
  )}`
}

