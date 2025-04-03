"use client"

import { useState, useEffect } from "react"

// Prosty hook do pobierania statycznych danych z cache'owaniem
export function useStaticData<T>(dataKey: string, getData: () => Promise<T> | T, initialData: T): T {
  const [data, setData] = useState<T>(initialData)

  useEffect(() => {
    // Sprawdź czy dane są już w localStorage
    const cachedData = localStorage.getItem(`wavemakers-${dataKey}`)
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData)
        setData(parsed)
        return
      } catch (e) {
        console.error("Error parsing cached data:", e)
        // Kontynuuj i pobierz dane
      }
    }

    // Pobierz dane
    const fetchData = async () => {
      try {
        const freshData = await getData()
        setData(freshData)
        // Zapisz w localStorage z czasem ważności 24h
        localStorage.setItem(`wavemakers-${dataKey}`, JSON.stringify(freshData))
        localStorage.setItem(`wavemakers-${dataKey}-timestamp`, String(Date.now()))
      } catch (e) {
        console.error("Error fetching data:", e)
      }
    }

    // Sprawdź czy dane w cache są przeterminowane (starsze niż 24h)
    const cachedTimestamp = localStorage.getItem(`wavemakers-${dataKey}-timestamp`)
    if (cachedTimestamp && Date.now() - Number(cachedTimestamp) < 24 * 60 * 60 * 1000) {
      // Dane są aktualne, nie pobieraj ponownie
      return
    }

    fetchData()
  }, [dataKey, getData])

  return data
}

