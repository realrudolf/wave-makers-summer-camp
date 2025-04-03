// Zoptymalizowane warianty animacji dla Framer Motion
// Używanie willChange, transform i skalowanych wartości opacity zamiast wygładzania kolorów

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20, willChange: "transform, opacity" },
  visible: {
    opacity: 1,
    y: 0,
    willChange: "transform, opacity",
    transition: {
      duration: 0.5, // Skrócono czas animacji
      ease: [0.25, 0.1, 0.25, 1.0], // Zoptymalizowana krzywa easingu
    },
  },
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Skrócono opóźnienie między elementami
      delayChildren: 0.1, // Dodano małe opóźnienie przed rozpoczęciem
    },
  },
}

export const cardHoverVariants = {
  initial: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5, // Niższa masa dla szybszej reakcji
    },
  },
}

// Funkcja definiująca zmodyfikowany LazyMotion, który przeładowuje tylko konieczne funkcje animacji
export const loadOptimizedFeatures = () =>
  import("framer-motion").then((mod) => {
    return {
      name: "optimized-features",
      layoutAnimation: () => mod.animate,
      decorators: () => mod.transform,
      // Używamy tylko transform i opacity - bardziej wydajne animacje
      // Pomijamy kolory, które są mniej wydajne
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      domAnimation: (options: any) =>
        mod.animate({
          ...options,
          transformPagePoint: mod.transformPagePoint,
        }),
    }
  })

