"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Testimonial = {
  name: string
  city: string
  quote: string
  avatar: string
}

const items: Testimonial[] = [
  {
    name: "Ava Thompson",
    city: "Austin, TX",
    quote: "NeighborAI helped me find weekly farmer's markets and a book club within walking distance.",
    avatar: "/woman-profile-avatar.png",
  },
  {
    name: "Liam Chen",
    city: "Brooklyn, NY",
    quote: "I met three neighbors who love bouldering. We climb together every weekend now.",
    avatar: "/profile-avatar-man.png",
  },
  {
    name: "Sofia Patel",
    city: "San Jose, CA",
    quote: "The personalized recommendations are spot-on. I never miss a local festival anymore!",
    avatar: "/woman-smiling-avatar.png",
  },
  {
    name: "Noah Johnson",
    city: "Seattle, WA",
    quote: "Discovered cozy cafes and maker meetups I didn't know existed. Fantastic.",
    avatar: "/profile-avatar-man-beard.png",
  },
]

export function TestimonialsCarousel({ intervalMs = 5000 }: { intervalMs?: number } = { intervalMs: 5000 }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative min-h-[180px]">
        {items.map((t, i) => {
          const active = i === index
          return (
            <figure
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${active ? "opacity-100" : "opacity-0"}`}
              aria-hidden={!active}
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={t.avatar || "/placeholder.svg"}
                  alt={`${t.name} avatar`}
                  width={80}
                  height={80}
                  className="rounded-full ring-2 ring-white shadow-sm"
                />
                <blockquote className="mt-4 italic text-gray-600">{`"${t.quote}"`}</blockquote>
                <figcaption className="mt-2 text-sm text-gray-500">{`${t.name} · ${t.city}`}</figcaption>
              </div>
            </figure>
          )
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2" aria-label="Testimonials pagination">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${i === index ? "bg-[#10B981] w-6" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}
