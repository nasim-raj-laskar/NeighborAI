"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const recs = [
  { title: "Sunset Jazz at Riverside", match: 96, distance: "0.7 mi", time: "Fri 7:00 PM" },
  { title: "Art Walk: Local Creators", match: 91, distance: "1.1 mi", time: "Sat 2:00 PM" },
  { title: "Neighborhood Yoga in the Park", match: 89, distance: "0.5 mi", time: "Sun 9:00 AM" },
  { title: "Tech Meetup: Web & AI", match: 94, distance: "1.8 mi", time: "Thu 6:30 PM" },
]

export function AIRecommendations({}: Record<string, never> = {}) {
  const [joined, setJoined] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(id)
  }, [])

  const onJoin = (title: string) => {
    if (!mounted) return
    setJoined((p) => (p.includes(title) ? p : [...p, title]))
  }

  if (!mounted) {
    return (
      <section className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-64"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-[#333333]">AI Recommendations</h3>
        <p className="text-xs text-gray-500">Based on your interests</p>
      </div>
      <div
        className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        } transition-all duration-500`}
      >
        {recs.map((r, i) => {
          const query = encodeURIComponent(`${r.title} event photo`)
          return (
            <div
              key={i}
              className="group bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 [transform-style:preserve-3d] hover:[transform:rotateX(1.5deg)]"
            >
              <div className="overflow-hidden rounded-t-xl">
                <Image
                  src={`/abstract-geometric-shapes.png?height=160&width=280&query=${query}`}
                  alt={r.title}
                  width={280}
                  height={160}
                  className="w-full h-[160px] object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm text-[#333333]">{r.title}</h4>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#FDECEF", color: "#D95A6A" }}
                  >
                    {`${r.match}%`}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                  <span>{r.distance}</span>
                  <span>{r.time}</span>
                </div>
                <button
                  onClick={() => onJoin(r.title)}
                  className={`mt-3 w-full text-sm rounded-full py-2 transition-all hover:shadow hover:scale-[1.02] ${
                    joined.includes(r.title)
                      ? "bg-[#10B981] text-white"
                      : "bg-gradient-to-r from-[#10B981] to-[#FB7185] text-white"
                  }`}
                >
                  {joined.includes(r.title) ? "Joined" : "Join"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
