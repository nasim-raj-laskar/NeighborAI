"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-[100dvh] bg-[#F8F9FA] grid place-items-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 border shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#10B981] text-center">Login</h1>
        <form className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-[#333333]">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="mt-1 rounded-full focus:ring-2 focus:ring-[#10B981]"
            />
          </div>
          <div>
            <label className="text-sm text-[#333333]">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              className="mt-1 rounded-full focus:ring-2 focus:ring-[#10B981]"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[#10B981] to-[#FB7185] hover:scale-[1.02] hover:shadow transition-all"
          >
            Login
          </Button>
        </form>
        <div className="mt-3 text-center text-sm">
          <span className="text-gray-600">No account? </span>
          <Link className="text-[#10B981] hover:underline" href="/signup">
            Sign up
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button className="rounded-full bg-[#E6FFFB] text-[#05807f] hover:shadow">Login with Google</Button>
          <Button className="rounded-full bg-[#F2EEFF] text-[#6b5fd6] hover:shadow">Login with Apple</Button>
        </div>
      </div>
    </main>
  )
}
