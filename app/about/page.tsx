"use client"

import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-[100dvh] bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10B981] text-center">About NeighborAI</h1>
        <p className="mt-3 text-center text-[#333333] max-w-2xl mx-auto">
          We help you discover local events, connect with neighbors, and uncover the hidden gems around the corner.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Our Mission", desc: "Foster real-world connections through delightful local discovery." },
            { title: "Our Team", desc: "Designers, engineers, and community lovers from all over the world." },
            { title: "Our Impact", desc: "Empowering neighborhoods in dozens of cities and growing." },
          ].map((f) => (
            <div
              key={f.title}
              className="group bg-white rounded-2xl p-5 border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="h-28 rounded-xl bg-[#E6FFFB] grid place-items-center overflow-hidden">
                <Image
                  src={`/abstract-geometric-shapes.png?height=80&width=80&query=${encodeURIComponent(f.title + " icon")}`}
                  alt={`${f.title} icon`}
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="mt-3 font-bold text-[#333333]">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
