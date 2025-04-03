// Funkcje pomocnicze do optymalizacji obrazów
import { getPlaiceholder } from "plaiceholder"
import fs from "fs/promises"
import path from "path"

type ImageData = {
  img: {
    src: string
    width: number
    height: number
    type: string
  }
  base64: string
}

// Generuj placeholder podczas budowania
export async function getImagePlaceholder(src: string): Promise<string | null> {
  try {
    if (!src.startsWith("/")) {
      return null
    }

    const filePath = path.join(process.cwd(), "public", src)
    const fileBuffer = await fs.readFile(filePath)

    const { base64 } = await getPlaiceholder(fileBuffer)
    return base64
  } catch (error) {
    console.error(`Error generating placeholder for ${src}:`, error)
    return null
  }
}

// Zawija Image component z automatycznym placeholderem
export async function getOptimizedImage(src: string): Promise<ImageData | null> {
  try {
    if (!src.startsWith("/")) {
      return null
    }

    const filePath = path.join(process.cwd(), "public", src)
    const fileBuffer = await fs.readFile(filePath)

    const { base64, img } = await getPlaiceholder(fileBuffer, {
      size: 10, // Mały rozmiar dla placeholdera
    })

    return { base64, img }
  } catch (error) {
    console.error(`Error generating placeholder for ${src}:`, error)
    return null
  }
}

