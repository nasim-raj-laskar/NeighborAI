"use client"

import Image from "next/image"
import { X, Pencil } from "lucide-react"
import { useEffect, useState } from "react"

type AttendingEvent = { id: string; title: string; date: string; category: string }
type Friend = { id: string; name: string; avatar: string; tags: string[] }

const mockFriends: Friend[] = [
  { id: "f1", name: "Ava", avatar: "/woman-profile-avatar.png", tags: ["🎵 Music", "🎨 Arts"] },
  { id: "f2", name: "Liam", avatar: "/profile-avatar-man.png", tags: ["🏃 Fitness", "🍕 Food"] },
  { id: "f3", name: "Sofia", avatar: "/woman-smiling-avatar.png", tags: ["💻 Tech", "🎪 Festivals"] },
  { id: "f4", name: "Noah", avatar: "/profile-avatar-man-beard.png", tags: ["🌿 Outdoors", "📚 Books"] },
]

export function SlidingSidebar({
  open = false,
  onClose = () => {},
}: {
  open?: boolean
  onClose?: () => void
} = {}) {
  const [attending, setAttending] = useState<AttendingEvent[]>([])
  const [previous, setPrevious] = useState<AttendingEvent[]>([])
  const [profile, setProfile] = useState({ name: "You", avatar: "/diverse-profile-avatars.png" })

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("neighborai_attending") || "[]")
    if (Array.isArray(a)) setAttending(a)
    const p = JSON.parse(localStorage.getItem("neighborai_attended_past") || "[]")
    if (Array.isArray(p)) setPrevious(p)
    const pf = JSON.parse(localStorage.getItem("neighborai_profile") || "{}")
    if (pf && (pf.name || pf.avatar)) setProfile((prev) => ({ ...prev, ...pf }))
  }, [open])

  const categoryColor = (cat: string) => {
    if (/music/i.test(cat)) return "#FB7185"
    if (/food|dining/i.test(cat)) return "#58A4B0"
    if (/art|culture/i.test(cat)) return "#B4AEE8"
    if (/fitness|yoga|sport/i.test(cat)) return "#10B981"
    return "#888"
  }

  const onQuickEdit = () => {
    const name = prompt("Update your display name", profile.name) || profile.name
    const avatar = prompt("Paste an avatar image URL", profile.avatar) || profile.avatar
    const next = { name, avatar }
    setProfile(next)
    localStorage.setItem("neighborai_profile", JSON.stringify(next))
  }

  return (
    <>
      {/* Backdrop below sidebar but above map */}
      <div
        className={`fixed inset-0 z-[1990] transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.25)" }}
        onClick={onClose}
        aria-hidden
      />
      {/* Right fixed panel (always above Leaflet controls/watermark) */}
      <aside
        className={`fixed top-0 right-0 h-svh w-[90%] sm:w-[420px] z-[2000] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="relative h-full bg-white/85 backdrop-blur-xl border-l border-white/50 shadow-[-10px_0_30px_rgba(0,0,0,0.08)]">
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-2 bg-gradient-to-l from-transparent to-black/5"
            aria-hidden="true"
          />
          <button
            aria-label="Close sidebar"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full p-2 hover:bg-white shadow-sm"
          >
            <X />
          </button>
          <div className="h-full overflow-y-auto p-4 sm:p-5">
            {/* Profile Summary */}
            <section className="mt-6">
              <div className="flex items-center gap-3">
                <Image
                  src={profile.avatar || "/placeholder.svg"}
                  alt="Profile"
                  width={56}
                  height={56}
                  className="rounded-full border"
                />
                <div>
                  <h3 className="font-semibold text-[#333333]">{profile.name}</h3>
                  <button
                    onClick={onQuickEdit}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[#10B981] hover:underline"
                  >
                    <Pencil size={14} />
                    Quick edit
                  </button>
                </div>
              </div>
            </section>

            {/* Events You’re Attending */}
            <section className="mt-6">
              <h4 className="font-semibold text-[#333333]">Events You’re Attending</h4>
              <ul className="mt-2 space-y-2">
                {attending.length === 0 && (
                  <li className="text-xs text-gray-500">No events yet. Explore the map to join events.</li>
                )}
                {attending.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-center justify-between rounded-xl border bg-white p-2 hover:shadow-md hover:-translate-y-0.5 hover:bg-[#FEFCF9] transition-all"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#333333]">{e.title}</p>
                      <p className="text-xs text-gray-500">{e.date}</p>
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${categoryColor(e.category)}22`, color: categoryColor(e.category) }}
                    >
                      {e.category}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Previous Events Attended */}
            <section className="mt-6">
              <h4 className="font-semibold text-[#333333]">Previous Events Attended</h4>
              <ul className="mt-2 space-y-2">
                {previous.length === 0 && <li className="text-xs text-gray-500">No previous events yet.</li>}
                {previous.map((e) => (
                  <li
                    key={e.id}
                    className="rounded-xl border bg-white p-2 hover:shadow-md hover:-translate-y-0.5 hover:bg-[#F8F9FA] transition-all"
                  >
                    <a href="#" className="block">
                      <p className="text-sm font-medium text-[#333333]">{e.title}</p>
                      <p className="text-xs text-gray-500">{e.date}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Find Friends with Similar Interests */}
            <section className="mt-6">
              <h4 className="font-semibold text-[#333333]">Find Friends with Similar Interests</h4>
              <div className="mt-2 flex gap-3 overflow-x-auto pb-1">
                {mockFriends.map((f) => (
                  <div
                    key={f.id}
                    className="min-w-[160px] bg-white border rounded-xl p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={f.avatar || "/placeholder.svg"}
                        alt={f.name}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <div className="text-sm font-medium text-[#333333]">{f.name}</div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {f.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "#E6FFFB", color: "#58A4B0" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </>
  )
}
