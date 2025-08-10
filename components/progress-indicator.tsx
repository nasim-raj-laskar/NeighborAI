export function ProgressIndicator({
  step = 1,
  total = 2,
  label = `Step ${step} of ${total}`,
}: {
  step?: number
  total?: number
  label?: string
} = {}) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
        <span>{label}</span>
        <span>{`${pct}%`}</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#10B981] rounded-full transition-all"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
