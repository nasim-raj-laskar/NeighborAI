"use client"

import Link from "next/link"
import { Map, UsersRound, Target, Settings } from "lucide-react"

export function BottomTabs({}: Record<string, never> = {}) {
  const items = [
    { href: "/dashboard", label: "Explore", icon: <Map size={18} /> },
    { href: "#", label: "Community", icon: <UsersRound size={18} /> },
    { href: "#", label: "For You", icon: <Target size={18} /> },
    { href: "#", label: "Settings", icon: <Settings size={18} /> },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t">
      <div className="mx-auto max-w-3xl px-6 py-2 grid grid-cols-4 gap-2">
        {items.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            className="flex flex-col items-center justify-center py-1 text-xs text-[#333333] hover:text-[#10B981]"
          >
            <span className="text-[#58A4B0]">{it.icon}</span>
            <span className="mt-1">{it.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
