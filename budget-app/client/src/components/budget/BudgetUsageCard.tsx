import type { Category, Transaction } from "@/types"

import {
  getActualSpent,
  getPercentUsed,
} from "@/services/transactions/transactionCalculations"

import BudgetProgress from "./BudgetProgress"
import type { Budget } from "@/types/budget"

type Props = {
  categories: Category[]
  transactions: Transaction[]
  
  budgets: Budget[]
  currentMonth: string

}

export default function BudgetUsageCard({
  categories,
  transactions,
  budgets,
  currentMonth,
}: Props) {
  // -----------------------
  // BUILD + CALCULATE DATA
  // -----------------------
  const data = categories
  .map((cat) => {
    const budget =
      budgets.find(
        (b) =>
          b.categoryId === cat.id &&
          b.month === currentMonth
      )?.amount ?? 0

    const actual = getActualSpent(
      transactions,
      cat.id
    )

    const percent =
      budget > 0
        ? getPercentUsed(actual, budget)
        : 0

    return {
      id: cat.id,
      name: cat.name,
      budget,
      actual,
      percent,
    }
  })

  // SORT BY MONEY SPENT
  .sort((a, b) => b.actual - a.actual)

  //TOP 5 ONLY
  .slice(0, 5)

  return (
    <div className="bg-base-brown/80 rounded-xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-accent-brown px-4 py-3">
        <h2 className="text-white font-semibold">
          Budget Usage (Top 5)
        </h2>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-4">

        {data.map((item) => (
          <div key={item.id} className="space-y-1">

            {/* TOP ROW */}
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>

              <span className="opacity-80">
                ${item.actual} / ${item.budget}
              </span>
            </div>

            {/* PROGRESS BAR */}
            <BudgetProgress percent={item.percent} />

            {/* PERCENT */}
            <p className="text-xs">
              {item.percent.toFixed(0)}% used
            </p>
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-sm text-center py-4">
            No budget data available
          </p>
        )}
      </div>
    </div>
  )
}