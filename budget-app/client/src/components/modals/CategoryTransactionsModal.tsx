import type { Category, Transaction } from "@/types"


type Props = {
  open: boolean
  onClose: () => void
  category: Category | null
  transactions: Transaction[]
}

export default function CategoryTransactionsModal({
  open,
  onClose,
  category,
  transactions,
}: Props) {
  if (!open || !category) return null

  const filtered = transactions.filter(
    (t) => t.categoryId === category.id
  )

  const totalSpent = filtered.reduce(
    (sum, t) =>
      sum + Math.abs(t.amount),
    0
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-brown w-[500px] max-h-[80vh] overflow-y-auto rounded p-4 border-3 border-accent-brown">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {category.name}
          </h2>

          <button
            onClick={onClose}
            className="text-accent-brown"
          >
            ✕
          </button>
        </div>

        {/* SUMMARY */}
        <div className="mb-4 text-sm">
          Total Spent: ${totalSpent} • Transactions:{" "}
          {filtered.length}
        </div>

        {/* LIST */}
        <div className="space-y-2">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-accent-brown/50 border border-accent-brown rounded p-2 flex justify-between"
            >
              <div>
                <p className="font-medium">
                  {t.merchant}
                </p>
                <p className="text-xs opacity-60">
                  {t.description}
                </p>
              </div>

              <div>
                ${Math.abs(t.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}