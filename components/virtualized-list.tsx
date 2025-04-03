"use client"

import type React from "react"
import { useCallback, useRef, useState, useEffect } from "react"

interface VirtualizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number, isVisible: boolean) => React.ReactNode
  itemHeight: number
  overscan?: number
  className?: string
}

export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  overscan = 3,
  className = "",
}: VirtualizedListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [listHeight, setListHeight] = useState(0)

  // Oblicz, które elementy są widoczne
  const visibleStartIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleEndIndex = Math.min(items.length - 1, Math.floor((scrollTop + listHeight) / itemHeight) + overscan)
  const visibleItems = items.slice(visibleStartIndex, visibleEndIndex + 1)

  // Odpowiednie umiejscowienie widocznych elementów
  const offsetY = visibleStartIndex * itemHeight

  const onScroll = useCallback(() => {
    if (listRef.current) {
      setScrollTop(listRef.current.scrollTop)
    }
  }, [])

  // Aktualizuj wysokość listy przy zmianie rozmiaru okna
  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.clientHeight)
    }

    const updateSize = () => {
      if (listRef.current) {
        setListHeight(listRef.current.clientHeight)
      }
    }

    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div ref={listRef} className={className} style={{ overflowY: "auto", position: "relative" }} onScroll={onScroll}>
      <div style={{ height: items.length * itemHeight }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleItems.map((item, index) => renderItem(item, visibleStartIndex + index, true))}
        </div>
      </div>
    </div>
  )
}

