"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    emoji: "🤖",
    title: "AI-Powered Recommendations",
    desc: "Smart matching based on your preferences",
    color: "#E8FFF6",
  },
  {
    emoji: "🗺️",
    title: "Hyperlocal Discovery",
    desc: "Find events & businesses near you",
    color: "#E6FFFB",
  },
  {
    emoji: "👥",
    title: "Community Connections",
    desc: "Meet compatible neighbors",
    color: "#F2EEFF",
  },
]

export function FeatureCardsCarousel({ intervalMs = 4500 }: { intervalMs?: number } = { intervalMs: 4500 }) {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % features.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  const onDot = (i: number) => setIndex(i)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchMove = (e: React.TouchEvent) => {
    // prevent vertical scroll from being blocked
    if (!touchStartX.current) return
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start == null) return
    const dx = e.changedTouches[0].clientX - start
    if (Math.abs(dx) < 30) return
    if (dx < 0) {
      setIndex((i) => (i + 1) % features.length)
    } else {
      setIndex((i) => (i - 1 + features.length) % features.length)
    }
  }

  return (
    <section id="features" className="max-w-6xl mx-auto">
      <div
        ref={containerRef}
        className="relative h-[320px] sm:h-[360px] bg-transparent"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides */}
        <div className="absolute inset-0 grid place-items-center">
          {features.map((f, i) => {
            const active = i === index
            return (
              <div
                key={f.title}
                className={`absolute w-full max-w-sm sm:max-w-md mx-auto transition-all duration-500 ${
                  active ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
                }`}
              >
                <div
                  className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:-translate-y-0.5 relative"
                  style={{ boxShadow: "0 10px 24px rgba(16, 185, 129, 0.06)" }}
                >
                  <div
                    className="w-full h-32 rounded-xl mb-4 grid place-items-center"
                    style={{ backgroundColor: f.color }}
                    aria-hidden="true"
                  >
                    <Image
                      src={`/abstract-geometric-shapes.png?height=96&width=96&query=${encodeURIComponent(f.title + " pastel illustration")}`}
                      width={96}
                      height={96}
                      alt={`${f.title} illustration`}
                      className="rounded-xl"
                    />
                  </div>
                  <h3 className="font-bold text-[#333333]">{`${f.emoji} ${f.title}`}</h3>
                  <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ boxShadow: "0 0 0 4px rgba(180, 174, 232, 0.15)" }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
          {features.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to feature ${i + 1}`}
              onClick={() => onDot(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${i === index ? "bg-[#10B981] w-6" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
