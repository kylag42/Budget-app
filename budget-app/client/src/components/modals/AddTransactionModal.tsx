import type { ReactNode } from "react"

type Props = {
  open: boolean
  onClose: () => void
  mode?: "add" | "edit"
  children: ReactNode

  type: "income" | "expense"
  setType: (v: "income" | "expense") => void
}

export default function AddTransactionModal({
  open,
  onClose,
  mode = "add",
  children,
  type,
  setType,
}: Props) {
  if (!open) return null

  return (
   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-base-brown border border-4 border-accent-brown rounded-2xl p-6 w-full max-w-md shadow-xl relative">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">

          {/* TITLE */}
          <h1 className="font-bold text-2xl">
            {mode === "edit"
              ? "Edit Transaction"
              : "Add Transaction"}
          </h1>

          {/* CLOSE */}
          <button
            className="text-custom-yellow text-xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* FLOATING TYPE TOGGLES */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold transition ${
              type === "expense"
                ? "bg-red-500 text-white"
                : "bg-white/10 text-custom-yellow"
            }`}
          >
            Expense
          </button>

          <button
            type="button"
            onClick={() => setType("income")}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold transition ${
              type === "income"
                ? "bg-green-500 text-white"
                : "bg-white/10 text-custom-yellow"
            }`}
          >
            Income
          </button>
        </div>

        {/* FORM CONTENT */}
        <div className="space-y-3">
          {children}
        </div>
      </div>
    </div>
  )
}