"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface InstructorCardProps {
  instructor: {
    name: string
    role: string
    phone: string
    image: string
    bio: string
    specializations: string[]
  }
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Skróć bio do około 150 znaków
  const shortBio = instructor.bio.length > 150 ? instructor.bio.substring(0, 150) + "..." : instructor.bio

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      <div className="flex flex-col md:flex-row h-full">
        {/* Zwiększona wysokość na mobile i zmienione pozycjonowanie */}
        <div className="relative w-full h-80 md:w-2/5 md:h-auto bg-blue-50">
          <Image
            src={instructor.image || "/placeholder.svg"}
            alt={instructor.name}
            fill
            className="object-cover object-[center_20%] md:object-top"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        <div className="p-4 md:p-6 md:w-3/5 flex flex-col flex-grow">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-blue-800">{instructor.name}</h3>
            <p className="text-gray-600 text-sm md:text-base">{instructor.role}</p>
          </div>

          <div className="mt-3 flex-grow">
            <p className="text-gray-700 text-sm md:text-base">{isExpanded ? instructor.bio : shortBio}</p>
            {instructor.bio.length > 150 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 h-auto text-blue-600 hover:text-blue-800 text-sm mt-2"
              >
                {isExpanded ? "Zwiń" : "Czytaj więcej"}
              </Button>
            )}
          </div>

          <div className="mt-3 md:mt-4">
            <h4 className="text-sm md:text-md font-semibold text-blue-700">Specjalizacje:</h4>
            <ul className="list-disc list-inside text-gray-600 text-xs md:text-sm">
              {instructor.specializations.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {instructor.phone && (
            <div className="mt-3 md:mt-4">
              <p className="text-xs md:text-sm text-gray-500">Telefon: {instructor.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
