import {
    calculateIncome,
    calculateExpenses,
    calculateNetCashFlow,
    calculateBalance,
} from "@/lib/finance/transactionCalculations"

import type { Transaction } from "@/types/transaction"

type Props = {
    transactions: Transaction[]
}

export default function TransactionSummaryCards({
    transactions,
}: Props) {

const income = calculateIncome(transactions)
const expenses = calculateExpenses(transactions)
const netCashFlow = calculateNetCashFlow(transactions)
const currentBalance = calculateBalance(transactions)

return (
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#954B00]/60 rounded-2xl shadow p-4">
          <p className="text-lg text-gray-800">
            Income
          </p>

          <h2 className="text-2xl font-semibold text-[#226000]">
            ${income.toFixed(2)}
          </h2>
        </div>

        <div className="bg-[#954B00]/60 rounded-2xl shadow p-4">
          <p className="text-lg text-gray-800">
            Expenses
          </p>
          <h2 className="text-2xl font-semibold text-red-800">
            ${Math.abs(expenses).toFixed(2)}
          </h2>
        </div>

        <div className="bg-[#954B00]/60 rounded-2xl shadow p-4">
          <p className="text-lg text-gray-800">
            Net Cash Flow
          </p>

          <h2 className="text-2xl font-semibold">
            ${netCashFlow.toFixed(2)}
          </h2>
        </div>

        <div className="bg-[#954B00]/60 rounded-2xl shadow p-4">
          <p className="text-lg text-gray-800">
            Current Balance
          </p>

          <h2 className="text-2xl font-semibold">
            ${currentBalance.toFixed(2)}
          </h2>
        </div>
      </div>
      )

}