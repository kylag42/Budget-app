import type { Category, Transaction } from "@/types"
import {
  getActualSpent,
} from "@/services/transactions/transactionCalculations"

type Props = {
  categories: Category[]
  transactions: Transaction[]

 
  budgetsMap: Record<string, number>
}

export default function BudgetSummary({
  categories,
  transactions,
  budgetsMap,
}: Props) {
  const totalBudget = categories.reduce(
    (sum, c) =>
      sum + (budgetsMap[c.id] || 0),
    0
  )

  const totalSpent = categories.reduce(
    (sum, c) =>
      sum +
      getActualSpent(
        transactions,
        c.id
      ),
    0
  )

  const remaining =
    totalBudget - totalSpent

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card
        label="Budget"
        value={`$${totalBudget}`}
      />

      <Card
        label="Spent"
        value={`$${totalSpent}`}
      />

      <Card
        label="Remaining"
        value={`$${remaining}`}
      />
    </div>
  )
}

function Card({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="text-sm opacity-70">
        {label}
      </p>

      <p className="text-xl font-bold">
        {value}
      </p>
    </div>
  )
}