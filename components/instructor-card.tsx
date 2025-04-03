"use client"

import Image from "next/image"

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
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
      <div className="flex flex-col md:flex-row h-full">
        <div className="h-48 md:w-1/3 md:h-auto relative">
          <Image
            src={instructor.image || "/placeholder.svg"}
            alt={instructor.name}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4 md:p-6 md:w-2/3 flex flex-col">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-blue-800">{instructor.name}</h3>
            <p className="text-gray-600 text-sm md:text-base">{instructor.role}</p>
          </div>

          <div className="mt-2 flex-grow">
            <p className="text-gray-700 text-sm md:text-base line-clamp-4 md:line-clamp-6">{instructor.bio}</p>
          </div>

          <div className="mt-3 md:mt-4">
            <h4 className="text-sm md:text-md font-semibold text-blue-700">Specjalizacje:</h4>
            <ul className="list-disc list-inside text-gray-600 text-xs md:text-sm">
              {instructor.specializations.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3 md:mt-4">
            <p className="text-xs md:text-sm text-gray-500">Telefon: {instructor.phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

