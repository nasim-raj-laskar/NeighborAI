"use client"

import { useEffect, useMemo, useState } from "react"
import { Cloud, CloudDrizzle, CloudRain, Snowflake, Sun } from "lucide-react"

type Coords = { lat: number; lon: number }
type Weather = { temp: number; code: number; description: string }

function parseStoredLocation(loc?: string | null): Coords | null {
  if (!loc) return null
  const m = /Lat\s*(-?\d+(\.\d+)?),\s*Lng\s*(-?\d+(\.\d+)?)/i.exec(loc)
  if (m) {
    return { lat: Number.parseFloat(m[1]), lon: Number.parseFloat(m[3]) }
  }
  return null
}

export function WeatherWidget({ locationString }: { locationString?: string }) {
  const [coords, setCoords] = useState<Coords | null>(null)
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    const stored = locationString || localStorage.getItem("neighborai_location")
    const parsed = parseStoredLocation(stored)
    if (parsed) {
      setCoords(parsed)
      return
    }
    const q = encodeURIComponent(stored || "Brooklyn, NY")
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1`)
      .then((r) => r.json())
      .then((d) => {
        const r0 = d?.results?.[0]
        if (r0) setCoords({ lat: r0.latitude, lon: r0.longitude })
      })
      .catch(() => {})
  }, [locationString])

  useEffect(() => {
    if (!coords) return
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`)
      .then((r) => r.json())
      .then((d) => {
        const cw = d?.current_weather
        if (cw) setWeather({ temp: cw.temperature, code: cw.weathercode, description: codeToText(cw.weathercode) })
      })
      .catch(() => {})
  }, [coords])

  const icon = useMemo(() => {
    if (!weather) return null
    const code = weather.code
    if ([0].includes(code)) return <Sun className="text-[#FDBA74]" size={16} />
    if ([1, 2, 3].includes(code)) return <Cloud className="text-[#94A3B8]" size={16} />
    if ([51, 53, 55].includes(code)) return <CloudDrizzle className="text-[#60A5FA]" size={16} />
    if ([61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className="text-[#3B82F6]" size={16} />
    if ([71, 73, 75].includes(code)) return <Snowflake className="text-[#93C5FD]" size={16} />
    return <Cloud size={16} className="text-[#94A3B8]" />
  }, [weather])

  if (!weather) {
    return <div className="text-xs text-gray-500">Loading weather…</div>
  }

  return (
    <div className="flex items-center gap-1 text-sm text-[#333333]">
      {icon}
      <span>{Math.round(weather.temp)}°</span>
      <span className="text-gray-500 text-xs">{weather.description}</span>
    </div>
  )
}

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
