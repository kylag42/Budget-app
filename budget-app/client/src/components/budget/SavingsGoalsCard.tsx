import type { SavingsGoal } from "@/types";

type Props = {
    goals: SavingsGoal[]
}

export default function SavingsGoalsCard({
    goals,
}: Props) {
    return (
        <div className="bg-base-brown/80 rounded-xl overflow-hidden">
            <div className="bg-accent-brown px-4 py-3">
      <h2 className="text-lg font-semibold text-white">
        Savings Goals
      </h2>
      </div>

      <div className="p-4 space-y-4">

      {goals.map((goal) => {
        const percent = Math.min(
          (goal.current / goal.target) * 100,
          100
        )

        return (
          <div
            key={goal.name}
            className="space-y-1"
          >
            <div className="flex justify-between text-sm">
              <span>{goal.name}</span>

              <span>
                ${goal.current} / $
                {goal.target}
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-brown transition-all"
                style={{
                  width: `${percent}%`,
                }}
              />
            </div>

            <p className="text-xs opacity-70">
              {percent.toFixed(0)}% complete
            </p>
          </div>
        )
      })}
    </div>
    </div>
  )
}

    