"use client"

import dynamic from "next/dynamic"

// Dynamicznie ładowane komponenty z opóźnieniem
export const DynamicDailySchedule = dynamic(() => import("./daily-schedule"), {
  loading: () => <div className="w-full h-[400px] bg-blue-50 rounded-xl animate-pulse"></div>,
  ssr: false, // Komponenty z animacjami client-side lepiej ładować tylko po stronie klienta
})

export const DynamicActivityCard = dynamic(() => import("./activity-card"), {
  loading: () => <div className="h-[220px] bg-white rounded-xl animate-pulse"></div>,
})

export const DynamicExcursionCard = dynamic(() => import("./excursion-card"), {
  loading: () => <div className="h-[280px] bg-white rounded-xl animate-pulse"></div>,
})

export const DynamicPackingCategory = dynamic(() => import("./packing-category"), {
  loading: () => <div className="h-[200px] bg-white rounded-xl animate-pulse"></div>,
})

export const DynamicRegistrationPath = dynamic(() => import("./registration-path"), {
  loading: () => <div className="w-full h-[600px] bg-white rounded-xl animate-pulse"></div>,
})

export const DynamicCountdownTimer = dynamic(() => import("./countdown-timer"), {
  ssr: true, // Ten komponent nie ma skomplikowanych obliczeń, można go renderować na serwerze
})

