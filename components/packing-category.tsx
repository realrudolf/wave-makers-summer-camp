import { Card, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface PackingCategoryProps {
  title: string
  icon: ReactNode
  items: string[]
}

export default function PackingCategory({ title, icon, items }: PackingCategoryProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="bg-blue-50 p-3 md:p-4 flex items-center gap-2 md:gap-3">
          <div className="bg-blue-100 text-blue-700 p-1.5 md:p-2 rounded-full">{icon}</div>
          <h3 className="font-bold text-base md:text-lg text-blue-800">{title}</h3>
        </div>

        <ul className="p-3 md:p-4 space-y-1 md:space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span className="text-gray-700 text-sm md:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

