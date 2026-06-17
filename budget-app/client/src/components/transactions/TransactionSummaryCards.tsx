import type { Transaction } from "@/types/transaction"
import {
  getTotalIncome,
  getTotalExpenses,
} from "@/services/transactions/transactionCalculations"

type Props = {
  transactions: Transaction[]
}

export default function TransactionSummaryCards({
  transactions,
}: Props) {
  const income =
    getTotalIncome(transactions)

  const expenses =
    getTotalExpenses(transactions)

  const net = income - expenses

  return (
      <div className="bg-base-brown/80 rounded-xl overflow-hidden">
            <div className="bg-accent-brown px-4 py-3">
      <h2 className="text-lg font-semibold text-white">
        Monthly Snapshot
        </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
      <Card
        label="Income"
        value={`$${income}`}
      />

      <Card
        label="Expenses"
        value={`$${expenses}`}
      />

      <Card
        label="Net"
        value={`$${net}`}
      />
    </div>
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
    <div className="p-4 bg-accent-brown/70 rounded shadow">
      <p className="text-sm text-white opacity-80">
        {label}
      </p>
      <p className="text-xl font-bold text-white">
        {value}
      </p>
    </div>
  )
}