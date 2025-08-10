"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Search, NavigationIcon as NavIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProgressIndicator } from "@/components/progress-indicator"

const suggestionsData = [
  "Brooklyn, NY",
  "Manhattan, NY",
  "Queens, NY",
  "San Francisco, CA",
  "Austin, TX",
  "Seattle, WA",
]

export default function LocationStep() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    if (!query) {
      setSuggestions([])
      return
    }
    const next = suggestionsData.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    setSuggestions(next.slice(0, 5))
  }, [query])

  const handleGeo = async () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = `Lat ${pos.coords.latitude.toFixed(3)}, Lng ${pos.coords.longitude.toFixed(3)}`
        setSelected(loc)
        localStorage.setItem("neighborai_location", loc)
      },
      () => {
        // Fallback if permission denied
        const fallback = "Brooklyn, NY"
        setSelected(fallback)
        localStorage.setItem("neighborai_location", fallback)
      },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  const pickSuggestion = (s: string) => {
    setSelected(s)
    setQuery(s)
    localStorage.setItem("neighborai_location", s)
    setSuggestions([])
  }

  const continueNext = () => {
    if (!selected) return
    router.push("/onboarding/preferences")
  }

  return (
    <main className="min-h-[100dvh] bg-[#F8F9FA]">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <ProgressIndicator step={1} total={2} label="Step 1 of 2" />
        <div className="max-w-xl mx-auto mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#10B981] text-center">
            {"Where's your neighborhood?"}
          </h1>

          <div className="mt-6 space-y-4">
            <Button
              onClick={handleGeo}
              className="w-full justify-center rounded-full bg-[#58A4B0] hover:bg-[#4f95a0] text-white text-sm sm:text-base"
            >
              <span className="inline-flex items-center gap-2">
                <NavIcon size={18} />
                {"📍 Use My Current Location"}
              </span>
            </Button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
                placeholder="Search your neighborhood or city"
                className="pl-9 rounded-full"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full bg-white border rounded-xl shadow-sm overflow-hidden">
                  {suggestions.map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => pickSuggestion(s)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                      >
                        <MapPin size={16} className="text-[#10B981]" />
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <div className="rounded-2xl border bg-[#FEFCF9] h-48 sm:h-56 relative overflow-hidden grid place-items-center">
                {/* Center marker and animated radius */}
                <div className="absolute inset-0" aria-hidden="true">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-[#FB7185] rounded-full shadow" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#10B98133] animate-ping h-24 w-24" />
                </div>
                <p className="text-xs text-gray-500">{"Preview area — selection radius"}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              disabled={!selected}
              onClick={continueNext}
              className="rounded-full bg-[#FB7185] hover:bg-[#e36477] text-white disabled:opacity-50"
            >
              Continue
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500 text-center">
            {selected ? `Selected: ${selected}` : "Select a location to continue"}
          </p>
        </div>
      </div>
    </main>
  )
}
