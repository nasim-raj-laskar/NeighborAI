"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProgressIndicator } from "@/components/progress-indicator"
import { CategorySelectGrid } from "@/components/category-select-grid"
import { Button } from "@/components/ui/button"

export default function PreferencesStep() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const min = 3
  const canContinue = selected.length >= min

  useEffect(() => {
    // preload any previous selections
    const saved = JSON.parse(localStorage.getItem("neighborai_prefs") || "[]")
    if (Array.isArray(saved)) setSelected(saved)
  }, [])

  const handleToggle = (val: string) => {
    setSelected((prev) => {
      const next = prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      localStorage.setItem("neighborai_prefs", JSON.stringify(next))
      return next
    })
  }

  const start = () => {
    if (!canContinue) return
    router.push("/dashboard")
  }

  return (
    <main className="min-h-[100dvh] bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <ProgressIndicator step={2} total={2} label="Step 2 of 2" />
        <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#10B981] text-center">{"What interests you?"}</h1>
          <p className="text-center text-sm text-gray-600 mt-1">{"Help our AI find perfect matches for you"}</p>

          <div className="mt-6">
            <CategorySelectGrid selected={selected} onToggle={handleToggle} />
            <p className="mt-3 text-center text-sm" style={{ color: "#C25E6B" }}>
              {selected.length >= min ? "" : `Select at least ${min} categories`}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={start}
              disabled={!canContinue}
              className="rounded-full text-white bg-gradient-to-r from-[#10B981] to-[#FB7185] hover:opacity-95 disabled:opacity-50"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
