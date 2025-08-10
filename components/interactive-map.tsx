"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup, useMap } from "react-leaflet"
import { useEffect, useState } from "react"
import Image from "next/image"

type Coords = { lat: number; lon: number }
type EventItem = {
  id: string
  title: string
  time: string
  lat: number
  lon: number
  category: string
  image: string
  recommended?: boolean
  description: string
}

function parseStoredLocation(loc?: string | null): Coords | null {
  if (!loc) return null
  const m = /Lat\s*(-?\d+(\.\d+)?),\s*Lng\s*(-?\d+(\.\d+)?)/i.exec(loc)
  if (m) return { lat: Number.parseFloat(m[1]), lon: Number.parseFloat(m[3]) }
  return null
}

function useResolvedCenter() {
  const [coords, setCoords] = useState<Coords>({ lat: 40.6782, lon: -73.9442 })
  useEffect(() => {
    const stored = localStorage.getItem("neighborai_location") || "Brooklyn, NY"
    const parsed = parseStoredLocation(stored)
    if (parsed) {
      setCoords(parsed)
      return
    }
    const q = encodeURIComponent(stored)
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1`)
      .then((r) => r.json())
      .then((d) => {
        const r0 = d?.results?.[0]
        if (r0) setCoords({ lat: r0.latitude, lon: r0.longitude })
      })
      .catch(() => {})
  }, [])
  return coords
}

function categoryColor(cat: string) {
  if (/music/i.test(cat)) return "#FB7185"
  if (/food|dining/i.test(cat)) return "#58A4B0"
  if (/art|culture/i.test(cat)) return "#B4AEE8"
  if (/fitness|yoga|sport/i.test(cat)) return "#10B981"
  if (/tech/i.test(cat)) return "#7C3AED"
  return "#6B7280"
}

function generateMockEvents(center: Coords): EventItem[] {
  const prefs: string[] = JSON.parse(localStorage.getItem("neighborai_prefs") || "[]")
  const picks = [
    { dLat: 0.004, dLon: 0.006, cat: "🎵 Music", title: "Sunset Jazz by the Park", time: "Fri 7:00 PM" },
    { dLat: -0.003, dLon: 0.003, cat: "🍕 Food & Dining", title: "Pizza Pop-Up Night", time: "Sat 6:30 PM" },
    { dLat: 0.0055, dLon: -0.0045, cat: "🎨 Arts & Culture", title: "Local Artists Gallery Walk", time: "Sun 2:00 PM" },
    { dLat: -0.004, dLon: -0.003, cat: "🏃 Sports & Fitness", title: "Community Yoga Flow", time: "Sat 9:00 AM" },
    { dLat: 0.0025, dLon: -0.0015, cat: "💻 Tech Meetups", title: "Web & AI Meetup", time: "Thu 6:30 PM" },
  ]
  return picks.map((p, i) => {
    const recommended = prefs.some((pref) => pref.includes(p.cat.split(" ")[0])) || i % 2 === 0
    const query = encodeURIComponent(`${p.title} event photo`)
    return {
      id: `evt-${i + 1}`,
      title: p.title,
      time: p.time,
      lat: center.lat + p.dLat,
      lon: center.lon + p.dLon,
      category: p.cat,
      image: `/placeholder.svg?height=160&width=280&query=${query}`,
      recommended,
      description:
        "A lively local gathering with great people. Expect friendly vibes, local flavor, and an easy way to meet neighbors.",
    }
  })
}

function MapController({ center }: { center: Coords }) {
  const map = useMap()
  useEffect(() => {
    map.setView([center.lat, center.lon], 14, { animate: true })
  }, [center, map])
  return null
}

// Keep size invalidation to ensure map fills its container fully.
function MapSizeInvalidator({ sizeSignal }: { sizeSignal: number | boolean }) {
  const map = useMap()
  useEffect(() => {
    const invalidate = () => {
      setTimeout(() => map.invalidateSize(), 0)
    }
    invalidate()
    const onResize = () => invalidate()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [map, sizeSignal])
  return null
}

export function InteractiveMap({ sizeSignal = 0 }: { sizeSignal?: number | boolean } = {}) {
  const center = useResolvedCenter()
  const [events, setEvents] = useState<EventItem[]>([])
  const [attendingIds, setAttendingIds] = useState<string[]>([])
  const [transportFor, setTransportFor] = useState<EventItem | null>(null)

  useEffect(() => {
    setEvents(generateMockEvents(center))
  }, [center])

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("neighborai_attending_ids") || "[]")
    if (Array.isArray(a)) setAttendingIds(a)
  }, [])

  const onJoin = (evt: EventItem) => {
    const nextIds = Array.from(new Set([...attendingIds, evt.id]))
    setAttendingIds(nextIds)
    localStorage.setItem("neighborai_attending_ids", JSON.stringify(nextIds))
    const existing = JSON.parse(localStorage.getItem("neighborai_attending") || "[]")
    const next = Array.isArray(existing)
      ? [
          ...existing,
          { id: evt.id, title: evt.title, date: evt.time, category: evt.category.replace(/^[^\w]+/, "") },
        ].filter((v: any, idx: number, arr: any[]) => arr.findIndex((x) => x.id === v.id) === idx)
      : []
    localStorage.setItem("neighborai_attending", JSON.stringify(next))
  }

  const onLeave = (evt: EventItem) => {
    const nextIds = attendingIds.filter((id) => id !== evt.id)
    setAttendingIds(nextIds)
    localStorage.setItem("neighborai_attending_ids", JSON.stringify(nextIds))
    const cur = JSON.parse(localStorage.getItem("neighborai_attending") || "[]")
    const next = Array.isArray(cur) ? cur.filter((x: any) => x.id !== evt.id) : []
    localStorage.setItem("neighborai_attending", JSON.stringify(next))
    const prev = JSON.parse(localStorage.getItem("neighborai_attended_past") || "[]")
    localStorage.setItem(
      "neighborai_attended_past",
      JSON.stringify([
        ...prev,
        { id: evt.id, title: evt.title, date: evt.time, category: evt.category.replace(/^[^\w]+/, "") },
      ]),
    )
  }

  const reasonsFor = (evt: EventItem) => {
    const prefs: string[] = JSON.parse(localStorage.getItem("neighborai_prefs") || "[]")
    const hits = prefs.filter((p) => evt.category && p.includes(evt.category.split(" ")[0]))
    return hits.length > 0
      ? `Matches your interests: ${hits.join(", ")}`
      : "Based on your proximity and popular events near you"
  }

  return (
    <section className="bg-white rounded-2xl p-3 shadow-sm relative overflow-hidden">
      <div className="h-[65vh] w-full rounded-xl overflow-hidden">
        <MapContainer
          center={[center.lat, center.lon]}
          zoom={14}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <MapController center={center} />
          <MapSizeInvalidator sizeSignal={Number(Boolean(sizeSignal))} />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map((evt) => {
            const color = categoryColor(evt.category)
            return (
              <CircleMarker
                key={evt.id}
                center={[evt.lat, evt.lon]}
                radius={10}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.8, opacity: 0.9 }}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                  <div className="text-[12px]">
                    <div className="font-medium text-[#333333]">{evt.title}</div>
                    <div className="text-gray-600">{evt.time}</div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setTransportFor(evt)
                      }}
                      className="mt-1 text-[11px] px-2 py-0.5 rounded-full bg-[#E6FFFB] text-[#05807f] hover:shadow hover:scale-105 transition-all"
                    >
                      Find recommended transport
                    </button>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="w-[260px]">
                    <Image
                      src={evt.image || "/placeholder.svg"}
                      alt={evt.title}
                      width={260}
                      height={140}
                      className="rounded-md"
                    />
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-[#333333]">{evt.title}</h4>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${color}22`, color }}
                        >
                          {evt.category.replace(/^[^\w]+/, "")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{evt.description}</p>
                      <div className="mt-2 p-2 rounded-md bg-[#FEFCF9] border text-xs text-[#333333]">
                        <span className="font-medium">Why this is relevant to you: </span>
                        <span>{reasonsFor(evt)}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-600">Are you attending?</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onJoin(evt)}
                            className={`text-xs px-3 py-1 rounded-full transition-all hover:shadow ${
                              attendingIds.includes(evt.id)
                                ? "bg-[#10B981] text-white"
                                : "bg-[#E8FFF6] text-[#0d8b67] hover:scale-105"
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => onLeave(evt)}
                            className="text-xs px-3 py-1 rounded-full bg-[#FFF0F2] text-[#D95A6A] hover:scale-105 hover:shadow transition-all"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
      </div>

      {transportFor && (
        <div className="absolute left-3 bottom-3 bg-white/95 backdrop-blur rounded-xl shadow-lg border p-3 w-[320px]">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-sm text-[#333333]">Recommended transport</div>
            <button className="text-xs text-gray-500 hover:underline" onClick={() => setTransportFor(null)}>
              Close
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-1">{transportFor.title}</p>
          <ul className="mt-2 space-y-2 text-sm">
            {[
              { mode: "🚶 Walking", time: "12 min", cost: "$0", color: "#10B981" },
              { mode: "🚇 Public Transit", time: "8 min", cost: "$2.75", color: "#58A4B0" },
              { mode: "🚗 Ride Share", time: "5 min", cost: "~$9-12", color: "#FB7185" },
            ].map((opt) => (
              <li
                key={opt.mode}
                className="flex items-center justify-between rounded-lg border p-2 hover:-translate-y-0.5 hover:shadow transition-all"
              >
                <span className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: opt.color }} />
                  {opt.mode}
                </span>
                <span className="text-xs text-gray-600">
                  {opt.time} • {opt.cost}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
