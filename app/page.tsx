"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <div className="relative">
        <SiteHeader />

        <main className="relative">
          {/* Hero with full-screen Spline background */}
          <section className="relative min-h-[100vh] flex items-center">
            {/* Background layer: fallback image + Spline iframe */}
            <div className="absolute inset-0 z-0">
              {/* Fallback image (required Source URL) */}
              <img
                src="https://sjc.microlink.io/2bN6bg7w0hU9wlE5ZBreXWmxk14mrrAx9bD7bNovhOItVDjTQJC0DtUHnK9ef2n4WoEQKgbUPEYOX6EhH6clOg.jpeg"
                alt="Spline flowing ribbon fallback"
                className="h-full w-full object-cover"
                aria-hidden="true"
              />
              <iframe
                src="https://my.spline.design/flowingribbon-DNbW9azzK5msZhJ6kMQm7Fy4/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="absolute inset-0 h-full w-full"
                style={{ pointerEvents: "none" }}
                title="NeighborAI Hero 3D Background"
              />
            </div>

            {/* Foreground content */}
            <div className="relative z-10 container mx-auto px-4 py-16">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[#10B981] opacity-0 hero-fade">
                  {"Discover Your Neighborhood's Hidden Secrets"}
                </h1>
                <p
                  className="mt-4 text-base sm:text-xl text-[#333333] opacity-0 hero-fade"
                  style={{ animationDelay: "0.15s" }}
                >
                  {
                    "AI-powered local discovery that connects you with events, neighbors, and opportunities right around the corner"
                  }
                </p>
                <div
                  className="mt-8 flex items-center justify-center gap-3 opacity-0 hero-fade"
                  style={{ animationDelay: "0.3s" }}
                >
                  <Link
                    href="/onboarding/location"
                    className="inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-4 text-white text-sm sm:text-base font-semibold shadow-md transition-transform duration-200 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(16,185,129,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#10B981] bg-gradient-to-r from-[#10B981] to-[#FB7185]"
                  >
                    Explore Events
                  </Link>
                </div>
                <p
                  className="mt-3 text-xs sm:text-sm text-[#666666] opacity-0 hero-fade"
                  style={{ animationDelay: "0.45s" }}
                >
                  {"Join 10,000+ neighbors already discovering their communities"}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <SiteFooter />
      <style jsx>{`
        .hero-fade {
          animation: heroFade 800ms ease-out forwards;
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(8px) }
          to { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </div>
  )
}
