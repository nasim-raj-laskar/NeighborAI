"use client"

import { Bell, MapPin, Sun, Cloud, CloudDrizzle, CloudRain, Snowflake } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Weather = { temp: number; code: number; description: string }

function codeToText(code: number) {
  const map: Record<number, string> = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    61: "Rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Snow",
    73: "Snow",
    75: "Snow",
    80: "Rain showers",
    81: "Rain showers",
    82: "Heavy showers",
  }
  return map[code] || "Weather"
}

export function TopNav(
  { currentLocation = "Brooklyn, NY" }: { currentLocation?: string } = {
    currentLocation: "Brooklyn, NY",
  },
) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [count, setCount] = useState<number>(() => {
    const n = Number(localStorage.getItem("neighborai_notif_count") || "3")
    return Number.isNaN(n) ? 3 : n
  })
  useEffect(() => {
    localStorage.setItem("neighborai_notif_count", String(count))
  }, [count])

  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    let active = true
    async function resolveCoords() {
      const stored = currentLocation || localStorage.getItem("neighborai_location") || "Brooklyn, NY"
      const m = /Lat\s*(-?\d+(\.\d+)?),\s*Lng\s*(-?\d+(\.\d+)?)/i.exec(stored)
      if (m) return { lat: Number.parseFloat(m[1]), lon: Number.parseFloat(m[3]) }
      try {
        const q = encodeURIComponent(stored)
        const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1`)
        const d = await r.json()
        const r0 = d?.results?.[0]
        if (r0) return { lat: r0.latitude, lon: r0.longitude }
      } catch {}
      return { lat: 40.6782, lon: -73.9442 }
    }
    async function loadWeather() {
      const c = await resolveCoords()
      if (!active) return
      try {
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`,
        )
        const d = await r.json()
        const cw = d?.current_weather
        if (cw) setWeather({ temp: cw.temperature, code: cw.weathercode, description: codeToText(cw.weathercode) })
      } catch {
        setWeather({ temp: 0, code: 2, description: "Partly cloudy" })
      }
    }
    loadWeather()
    return () => {
      active = false
    }
  }, [currentLocation])

  const icon = useMemo(() => {
    if (!weather) return <Cloud className="text-[#94A3B8]" size={16} />
    const code = weather.code
    if (code === 0) return <Sun className="text-[#FDBA74]" size={16} />
    if ([1, 2, 3].includes(code)) return <Cloud className="text-[#94A3B8]" size={16} />
    if ([51, 53, 55].includes(code)) return <CloudDrizzle className="text-[#60A5FA]" size={16} />
    if ([61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className="text-[#3B82F6]" size={16} />
    if ([71, 73, 75].includes(code)) return <Snowflake className="text-[#93C5FD]" size={16} />
    return <Cloud size={16} className="text-[#94A3B8]" />
  }, [weather])

  const notifications = [
    { id: "n1", text: "New event near you: Sunset Jazz" },
    { id: "n2", text: "Ava joined 'Book Club'" },
    { id: "n3", text: "Tech Meetup starts in 2 hours" },
  ]

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#10B981] font-extrabold">🏠 NeighborAI</span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-sm text-[#333333]">
          <MapPin size={16} className="text-[#10B981]" />
          <span className="truncate max-w-[220px] text-center">{currentLocation}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-1 text-sm text-[#333333]">
            {icon}
            <span>{weather ? `${Math.round(weather.temp)}°` : "—"}</span>
            <span className="text-gray-500 text-xs">{weather?.description || ""}</span>
          </div>
          <DropdownMenu
            open={notifOpen}
            onOpenChange={(o) => {
              setNotifOpen(o)
              if (o) setCount(0)
            }}
          >
            <DropdownMenuTrigger asChild>
              <button
                className="relative rounded-full p-1.5 hover:bg-[#F3F4F6] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="text-[#333333]" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FB7185] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            {/* Ensure dropdown overlays the map */}
            <DropdownMenuContent align="end" className="w-72 z-[2200]">
              <div className="px-2 py-1.5 text-xs text-gray-500">Notifications</div>
              <DropdownMenuSeparator />
              {notifications.map((n) => (
                <DropdownMenuItem key={n.id} className="text-sm">
                  {n.text}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Image
            src={"/placeholder.svg?height=32&width=32&query=profile%20avatar"}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full border"
          />
        </div>
      </div>
    </div>
  )
}
