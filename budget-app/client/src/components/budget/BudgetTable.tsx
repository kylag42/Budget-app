import type { Category, Transaction } from "@/types"
import type { Budget } from "@/types/budget"

import BudgetRow from "./BudgetRow"

type Props = {
  categories: Category[]
  transactions: Transaction[]

  budgets: Budget[]
  currentMonth: string

  editingId: string | null

  editBudget: string
  setEditBudget: (v: string) => void

  onStartEdit: (c: Category) => void
  onSave: (category: Category, budget: number) => void

  onViewCategoryTransactions: (c: Category) => void
}

export default function BudgetTable({
  categories,
  transactions,
  budgets,
  currentMonth,

  editingId,
  editBudget,
  setEditBudget,

  onStartEdit,
  onSave,
  onViewCategoryTransactions,
}: Props) {

  // -----------------------
  // SUMMARY CALCS
  // -----------------------

  const budgeted = budgets
    .filter((b) => b.month === currentMonth)
    .reduce((sum, b) => sum + b.amount, 0)

  const spent = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const remaining = budgeted - spent

  const expenseCategories = categories.filter(
  (c) => c.name.toLowerCase() !== "income"
)

  return (
    <table className="w-full border-collapse table-fixed">

      {/* HEADER */}
      <thead>

      </thead>

      {/* BODY */}
      <tbody>

        {/* SUMMARY ROW */}
        <tr className="bg-accent-brown/20 font-semibold">
          <td className="p-3" colSpan={4}>

            <div className="grid grid-cols-3 md:grid-cols-3 w-full text-center">

              <div>
                <p className="text-xs opacity-70">Budgeted</p>
                <p className="text-lg font-bold">
                  ${budgeted}
                </p>
              </div>

              <div>
                <p className="text-xs opacity-70">Spent</p>
                <p className="text-lg font-bold">
                  ${spent}
                </p>
              </div>

              <div>
                <p className="text-xs opacity-70">Remaining</p>
                <p
                  className={`text-lg font-bold ${remaining >= 0
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  ${remaining.toFixed(2)}
                </p>
              </div>

            </div>

          </td>
        </tr>

        {/* COLUMN HEADER ROW */}
        <tr className="border-b bg-accent-brown/50">
          <th className="text-left p-1 text-sm">
            Category
          </th>

          <th className="text-left p-1 text-sm">
            Expected
          </th>

          <th className="text-left p-1 text-sm">
            Actual
          </th>

          <th className="text-left p-1 text-sm">
            % Used
          </th>
        </tr>

        {/* CATEGORY ROWS */}
        {expenseCategories.map((cat) => {
          const budget =
            budgets.find(
              (b) =>
                b.categoryId === cat.id &&
                b.month === currentMonth
            )?.amount ?? 0

          return (
            <BudgetRow
              key={cat.id}
              category={cat}
              transactions={transactions}
              budget={budget}
              isEditing={editingId === cat.id}
              editBudget={editBudget}
              setEditBudget={setEditBudget}
              onStartEdit={onStartEdit}
              onSave={onSave}
              onViewCategoryTransactions={
                onViewCategoryTransactions
              }
            />
          )
        })}
      </tbody>
    </table>
  )
}