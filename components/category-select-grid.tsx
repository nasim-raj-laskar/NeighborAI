"use client"

import type { MouseEvent } from "react"

const categories = [
  "🎵 Live Music",
  "🍕 Food & Dining",
  "🎨 Arts & Culture",
  "🏃 Sports & Fitness",
  "👥 Social Events",
  "🛍️ Shopping",
  "🎓 Learning & Skills",
  "💼 Networking",
  "🌱 Community Service",
  "🎭 Entertainment",
  "📚 Book Clubs",
  "🐕 Pet-Friendly",
  "🍷 Nightlife",
  "👨‍👩‍👧‍👦 Family Events",
  "🧘 Wellness",
  "🎪 Festivals",
  "💻 Tech Meetups",
  "🌿 Outdoor Activities",
]

export function CategorySelectGrid({
  selected = [],
  onToggle = () => {},
}: {
  selected?: string[]
  onToggle?: (val: string) => void
} = {}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>, val: string) => {
    e.preventDefault()
    onToggle(val)
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {categories.map((c) => {
        const isSel = selected.includes(c)
        return (
          <button
            key={c}
            onClick={(e) => handleClick(e, c)}
            className={`rounded-2xl px-3 py-3 text-sm text-left transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4AEE8]
              ${isSel ? "bg-[#E8FFF6] ring-2 ring-[#10B981]" : "bg-white border"}`}
          >
            <span className="inline-block">{c}</span>
            <style jsx>{`
              button:hover span {
                animation: bounce 400ms ease;
              }
              @keyframes bounce {
                0%, 100% { transform: translateY(0) }
                50% { transform: translateY(-3px) }
              }
            `}</style>
          </button>
        )
      })}
    </div>
  )
}
