"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const total = 3
  const next = () => setStep((s) => Math.min(total, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))
  return (
    <main className="min-h-[100dvh] bg-[#F8F9FA] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 border shadow-sm">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{`Step ${step} of ${total}`}</span>
          <div className="h-2 w-36 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#10B981]" style={{ width: `${(step / total) * 100}%` }} />
          </div>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-[#10B981] text-center">Create your account</h1>

        {step === 1 && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm text-[#333333]">Name</label>
              <Input placeholder="Your name" className="mt-1 rounded-full focus:ring-2 focus:ring-[#10B981]" />
            </div>
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
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm text-[#333333]">Neighborhood</label>
              <Input placeholder="e.g. Brooklyn, NY" className="mt-1 rounded-full" />
            </div>
            <div>
              <label className="text-sm text-[#333333]">Interests (comma separated)</label>
              <Input placeholder="Music, Food, Tech" className="mt-1 rounded-full" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Review your details and click Finish to create your account. You can fine-tune preferences later in
              Settings.
            </p>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <Button
            onClick={back}
            disabled={step === 1}
            className="rounded-full bg-[#E6FFFB] text-[#05807f] disabled:opacity-50"
          >
            Back
          </Button>
          {step < total ? (
            <Button onClick={next} className="rounded-full bg-gradient-to-r from-[#10B981] to-[#FB7185]">
              Next
            </Button>
          ) : (
            <Button className="rounded-full bg-[#10B981] text-white hover:scale-[1.02] hover:shadow">Finish</Button>
          )}
        </div>
      </div>
    </main>
  )
}
