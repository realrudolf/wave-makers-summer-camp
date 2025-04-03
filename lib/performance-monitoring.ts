// Funkcje monitorowania wydajności aplikacji
export function initPerformanceMonitoring() {
  if (typeof window !== "undefined") {
    // Monitoruj LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log("LCP:", lastEntry.startTime, "ms")

      // Raportuj do analityki (można rozszerzyć)
      if (lastEntry.startTime > 2500) {
        // LCP powyżej 2.5s jest uważane za wolne
        console.warn("Slow LCP detected:", lastEntry.startTime, "ms")
      }
    })

    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

    // Monitoruj FID (First Input Delay)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        console.log("FID:", entry.processingStart - entry.startTime, "ms")

        // Raportuj do analityki (można rozszerzyć)
        if (entry.processingStart - entry.startTime > 100) {
          // FID powyżej 100ms jest uważane za wolne
          console.warn("Slow FID detected:", entry.processingStart - entry.startTime, "ms")
        }
      })
    })

    fidObserver.observe({ type: "first-input", buffered: true })

    // Monitoruj CLS (Cumulative Layout Shift)
    let clsValue = 0
    const clsEntries = []

    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()

      entries.forEach((entry) => {
        // Tylko jeśli użytkownik nie przewinął od ostatniego obliczenia
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          clsEntries.push(entry)
        }
      })

      console.log("Current CLS:", clsValue)

      // Raportuj do analityki (można rozszerzyć)
      if (clsValue > 0.1) {
        // CLS powyżej 0.1 jest uważane za wysokie
        console.warn("High CLS detected:", clsValue)
      }
    })

    clsObserver.observe({ type: "layout-shift", buffered: true })

    // Monitoruj czas ładowania zasobów
    const resourceObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()

      entries.forEach((entry) => {
        if (entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest") {
          console.log(`API call to ${entry.name} took ${entry.duration}ms`)
        }

        if (entry.initiatorType === "img" && entry.duration > 1000) {
          console.warn(`Slow image loading: ${entry.name} took ${entry.duration}ms`)
        }
      })
    })

    resourceObserver.observe({ type: "resource", buffered: true })

    // Cleanup function
    return () => {
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
      resourceObserver.disconnect()
    }
  }

  return () => {} // No-op for SSR
}

