"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteHeader({}: Record<string, never> = {}) {
  const pathname = usePathname()
  const links = [
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
  ]
  return (
    <header className="sticky top-0 z-20">
      <div className="backdrop-blur-md bg-white/60 border-b border-white/40">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-[#10B981]">
            <span aria-hidden="true">🏠</span>
            <span>NeighborAI</span>
          </Link>
          <nav className="ml-auto hidden sm:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium text-[#333333] relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#333333] after:transition-all hover:after:w-full ${
                  pathname === l.href ? "after:w-full" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
