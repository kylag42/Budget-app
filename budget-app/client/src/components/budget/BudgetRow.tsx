import type { Category } from "@/types/category"
import type { Transaction } from "@/types/transaction"

import {
  getActualSpent,
  getPercentUsed,
} from "@/services/transactions/transactionCalculations"

import BudgetProgress from "./BudgetProgress"

type Props = {
  category: Category
  transactions: Transaction[]

  isEditing: boolean

  editBudget: string
  setEditBudget: (v: string) => void

  onStartEdit: (c: Category) => void
  onSave: (category: Category, budget: number) => void
  onViewCategoryTransactions: (c: Category) => void

  budget: number
}

export default function BudgetRow({
  category,
  transactions,

  isEditing,
  editBudget,
  setEditBudget,

  onStartEdit,
  onSave,
  onViewCategoryTransactions,

  budget,
}: Props) {
  const actual = getActualSpent(
    transactions,
    category.id
  )

  const percent =
    budget > 0
      ? getPercentUsed(actual, budget)
      : 0

  return (
    <tr className="border-b hover:bg-gray-50">

      {/* CATEGORY (READ ONLY) */}
      <td className="p-1 text-sm">
        {category.name}
      </td>

      {/* EXPECTED (EDITABLE) */}
      <td className="p-1 text-sm">
        {isEditing ? (
          <input
            autoFocus
            type="number"
            value={editBudget}
            onChange={(e) =>
              setEditBudget(e.target.value)
            }
            onBlur={() =>
              onSave(
                category,
                Number(editBudget)
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur()
              }
              if (e.key === "Escape") {
                e.currentTarget.blur()
              }
            }}
            className="border px-2 py-1 rounded w-24"
          />
        ) : (
          <span
            className="cursor-pointer"
            onClick={() =>
              onStartEdit(category)
            }
          >
            ${budget}
          </span>
        )}
      </td>

      {/* ACTUAL (click to view transactions) */}
      <td
        className="p-1 text-sm cursor-pointer"
        title="Click to view recent transactions"
        onClick={() =>
          onViewCategoryTransactions(category)
        }
      >
        ${actual}
      </td>

      {/* % USED */}
      <td className="p-1 text-sm">
        <BudgetProgress percent={percent} />
        <p className="text-xs">
          {percent}%
        </p>
      </td>
    </tr>
  )
}