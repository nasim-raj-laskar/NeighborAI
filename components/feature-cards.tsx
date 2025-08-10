import Image from "next/image"

export function FeatureCards({}: Record<string, never> = {}) {
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
  return (
    <section id="features" className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
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
              style={{
                boxShadow: "0 0 0 4px rgba(180, 174, 232, 0.15)",
              }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
