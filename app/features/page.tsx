"use client"

const features = [
  { title: "AI-Powered Recommendations", desc: "Personalized matches to your interests." },
  { title: "Hyperlocal Discovery", desc: "Find events, businesses, and communities nearby." },
  { title: "Community Connections", desc: "Meet neighbors you’ll actually click with." },
  { title: "Real-time Map", desc: "Interactive, live markers with smart overlays." },
  { title: "Smart Transport", desc: "Recommendations for getting there fast." },
  { title: "Live Weather", desc: "Plan your day with up-to-date conditions." },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-[100dvh] bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10B981] text-center">Features</h1>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card opacity-0 translate-y-3 bg-white rounded-2xl p-5 border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <h3 className="font-bold text-[#333333]">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .feature-card {
          animation: fadeSlide 600ms ease-out forwards;
        }
        @keyframes fadeSlide {
          to { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </main>
  )
}
