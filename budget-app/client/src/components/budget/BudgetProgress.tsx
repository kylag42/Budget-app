type Props = {
  percent: number
}

export default function BudgetProgress({
  percent,
}: Props) {
  const safe = Number.isFinite(percent)
    ? Math.min(percent, 100)
    : 0

  return (
    <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
      <div
        className={`h-2 rounded transition-all ${
          safe > 90
            ? "bg-red-500"
            : safe > 70
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
        style={{
          width: `${safe}%`,
        }}
      />
    </div>
  )
}