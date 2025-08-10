"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { TopNav } from "@/components/top-nav"
import { BottomTabs } from "@/components/bottom-tabs"
import { PanelRightOpen, X } from "lucide-react"

// Dynamically import components that use browser APIs
const InteractiveMap = dynamic(
  () => import("@/components/interactive-map").then((mod) => ({ default: mod.InteractiveMap })),
  {
    ssr: false,
    loading: () => (
      <section className="bg-white rounded-2xl p-3 shadow-sm relative overflow-hidden">
        <div className="h-[65vh] w-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </section>
    ),
  },
)

const AIRecommendations = dynamic(
  () => import("@/components/ai-recommendations").then((mod) => ({ default: mod.AIRecommendations })),
  {
    ssr: false,
    loading: () => (
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
    ),
  },
)

const SlidingSidebar = dynamic(
  () => import("@/components/sliding-sidebar").then((mod) => ({ default: mod.SlidingSidebar })),
  {
    ssr: false,
  },
)

export default function DashboardPage() {
  const [location, setLocation] = useState("Brooklyn, NY")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Only access localStorage after component mounts
    if (typeof window !== "undefined") {
      const loc = localStorage.getItem("neighborai_location")
      if (loc) setLocation(loc)
    }
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-[100dvh] bg-[#F8F9FA]">
        <div className="animate-pulse">
          <div className="h-14 bg-white border-b"></div>
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="bg-white rounded-2xl p-3 shadow-sm">
              <div className="h-[65vh] bg-gray-100 rounded-xl"></div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="h-32 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const reservedRight = sidebarOpen ? "min(90vw, 420px)" : "0px"

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA]">
      <TopNav currentLocation={location} />
      <SlidingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Persistent toggle at top-right, always visible */}
      <button
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        onClick={() => setSidebarOpen((o) => !o)}
        className="fixed right-4 top-[72px] z-[2100] rounded-full p-2 bg-white/90 backdrop-blur border shadow hover:bg-white transition"
        title={sidebarOpen ? "Close panel" : "Open panel"}
      >
        {sidebarOpen ? <X className="text-[#333333]" /> : <PanelRightOpen className="text-[#10B981]" />}
      </button>

      <main className="container mx-auto px-2 sm:px-4 py-4 space-y-4">
        <section
          aria-label="Map"
          className="w-full transition-[margin] duration-300"
          style={{ marginRight: reservedRight }}
        >
          <InteractiveMap sizeSignal={Number(sidebarOpen)} />
        </section>

        <section aria-label="Events" className="w-full">
          <AIRecommendations />
        </section>
      </main>

      <BottomTabs />
    </div>
  )
}
