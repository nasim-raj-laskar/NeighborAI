"use client"
import dynamic from "next/dynamic";

// Load InteractiveMap only on the client
const InteractiveMap = dynamic(() => import("@/components/interactive-map"), { ssr: false });

import { useEffect, useMemo, useState } from "react"
import { TopNav } from "@/components/top-nav"
// import { InteractiveMap } from "@/components/interactive-map"
import { AIRecommendations } from "@/components/ai-recommendations"
import { BottomTabs } from "@/components/bottom-tabs"
import { SlidingSidebar } from "@/components/sliding-sidebar"
import { PanelRightOpen, X } from "lucide-react"

export default function DashboardPage() {
  const [location, setLocation] = useState("Brooklyn, NY")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const loc = localStorage.getItem("neighborai_location")
    if (loc) setLocation(loc)
  }, [])

  // Reserve only the map's right space when the sidebar is open
  const reservedRight = useMemo(() => (sidebarOpen ? "min(90vw, 420px)" : "0px"), [sidebarOpen])

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
          {/* Trigger map size invalidation when sidebar toggles */}
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
