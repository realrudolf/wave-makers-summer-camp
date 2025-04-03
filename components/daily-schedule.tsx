"use client"

import { useState, memo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

// Zdefiniuj MemoizedListItem przed komponentem DailySchedule
const MemoizedListItem = memo(
  ({ item, index, animated }: { item: { time: string; activity: string }; index: number; animated: boolean }) => {
    return (
      <motion.li
        key={`${item.time}-${item.activity}`}
        custom={index}
        initial="hidden"
        animate={animated ? "visible" : "hidden"}
        variants={itemVariants}
        className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-blue-50 transition-colors"
      >
        <div className="bg-blue-100 text-blue-700 font-medium px-2 md:px-3 py-1 rounded-full w-14 md:w-16 text-center text-xs md:text-sm">
          {item.time}
        </div>
        <div className="text-sm md:text-base">{item.activity}</div>
      </motion.li>
    )
  },
)
MemoizedListItem.displayName = "MemoizedListItem"

export default function DailySchedule() {
  const [activeTab, setActiveTab] = useState("morning")

  const scheduleData = {
    morning: [
      { time: "7:30", activity: "Pobudka" },
      { time: "8:00", activity: "Poranna rozgrzewka" },
      { time: "8:30", activity: "Śniadanie" },
      { time: "9:30", activity: "Zajęcia sportowe (blok I)" },
      { time: "11:30", activity: "Przerwa na przekąskę" },
    ],
    afternoon: [
      { time: "12:00", activity: "Zajęcia wodne nad jeziorem" },
      { time: "14:00", activity: "Obiad" },
      { time: "15:00", activity: "Odpoczynek" },
      { time: "16:00", activity: "Zajęcia sportowe (blok II)" },
      { time: "18:00", activity: "Kolacja" },
    ],
    evening: [
      { time: "19:00", activity: "Gry i zabawy integracyjne" },
      { time: "20:30", activity: "Ognisko / Dyskoteka / Film / Nocne podchody" },
      { time: "22:00", activity: "Przygotowanie do snu" },
      { time: "22:30", activity: "Cisza nocna" },
    ],
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <Tabs defaultValue="morning" onValueChange={handleTabChange}>
        <div className="bg-blue-50 p-3 md:p-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger
              value="morning"
              className="text-xs md:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Poranek
            </TabsTrigger>
            <TabsTrigger
              value="afternoon"
              className="text-xs md:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Popołudnie
            </TabsTrigger>
            <TabsTrigger
              value="evening"
              className="text-xs md:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Wieczór
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-3 md:p-6">
          <TabsContent value="morning" className="mt-0">
            <ul className="space-y-3 md:space-y-4">
              {scheduleData.morning.map((item, i) => (
                <MemoizedListItem key={`morning-${i}`} item={item} index={i} animated={activeTab === "morning"} />
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="afternoon" className="mt-0">
            <ul className="space-y-3 md:space-y-4">
              {scheduleData.afternoon.map((item, i) => (
                <MemoizedListItem key={`afternoon-${i}`} item={item} index={i} animated={activeTab === "afternoon"} />
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="evening" className="mt-0">
            <ul className="space-y-3 md:space-y-4">
              {scheduleData.evening.map((item, i) => (
                <MemoizedListItem key={`evening-${i}`} item={item} index={i} animated={activeTab === "evening"} />
              ))}
            </ul>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

