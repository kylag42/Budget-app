import type { Transaction } from "@/types/transaction"

type Props = {
  transaction: Transaction
  categoryName?: string
  selectedIds: string[]
  setSelectedIds: (
    id: string
  ) => void

  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}

export default function TransactionRow({
  transaction,
  categoryName,
  selectedIds,
  setSelectedIds,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-b border-accent-brown hover:bg-base-brown/20 transition">
      {/* DATE */}
      <td className="p-2">
        {transaction.date}
      </td>

      {/* MERCHANT + DESCRIPTION */}
      <td className="p-2">
        <p className="font-medium">
          {transaction.merchant}
        </p>
        <p className="text-xs opacity-60">
          {transaction.description}
        </p>
      </td>

      {/* CATEGORY */}
      <td className="p-2">
        {categoryName ?? "Uncategorized"}
      </td>

      {/* ACCOUNT */}
      <td className="p-2">
        {transaction.accountId}
      </td>

      {/* AMOUNT */}
      <td
        className={`p-2 font-medium ${transaction.amount < 0
          ? "text-red-500"
          : "text-green-500"
          }`}
      >
        ${Math.abs(transaction.amount)}
      </td>

    </tr>
  )
}