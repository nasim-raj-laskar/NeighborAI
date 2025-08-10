"use client"

import { Flame, Users, CalendarDays, Target } from "lucide-react"

export function LiveStatsSidebar({
  stats = { activity: 0, neighbors: 0, events: 0, match: 0 },
}: {
  stats?: { activity: number; neighbors: number; events: number; match: number }
} = {}) {
  return (
    <aside className="bg-white rounded-2xl p-4 shadow-sm h-fit">
      <h2 className="font-bold text-[#333333] mb-3">Live Stats</h2>
      <div className="space-y-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="text-[#10B981]" />
              <span className="text-sm text-gray-700">Activity</span>
            </div>
            <span className="font-semibold text-[#333333]">{`${stats.activity}%`}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-[#10B981]" style={{ width: `${stats.activity}%` }} />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="text-[#58A4B0]" />
              <span className="text-sm text-gray-700">Active Neighbors</span>
            </div>
            <span className="font-semibold text-[#333333]">{stats.neighbors}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-[#B4AEE8]" />
              <span className="text-sm text-gray-700">Events (this week)</span>
            </div>
            <span className="font-semibold text-[#333333]">{stats.events}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="text-[#FB7185]" />
              <span className="text-sm text-gray-700">Match Score</span>
            </div>
            <span className="font-semibold text-[#333333]">{`${stats.match}%`}</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .stat-card {
          padding: 12px;
          border: 1px solid #f1f1f1;
          border-radius: 12px;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </aside>
  )
}
