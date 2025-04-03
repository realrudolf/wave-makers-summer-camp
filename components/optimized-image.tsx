"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "src" | "onLoad"> {
  src: string
  placeholder?: string
  lowSrc?: string
  transitionDuration?: number
}

export function OptimizedImage({
  src,
  alt,
  placeholder = "blur",
  lowSrc,
  transitionDuration = 600,
  className = "",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>(undefined)

  // Generuj domyślny placeholder, jeśli nie podano
  useEffect(() => {
    if (!lowSrc) {
      setBlurDataURL(
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+",
      )
    } else {
      setBlurDataURL(lowSrc)
    }
  }, [lowSrc])

  return (
    <div className="relative overflow-hidden" style={{ ...props.style }}>
      <Image
        {...props}
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`transition-opacity duration-${transitionDuration} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  )
}

