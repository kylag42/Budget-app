import { useState, useEffect } from "react"
import type { Transaction } from "@/types/transaction"
import type { TransactionFormState } from "@/types/form"

type Props = {
    initial?: Partial<Transaction>
    onSubmit: (tx: Transaction) => void
}

export default function TransactionForm({
    initial,
    onSubmit,
}: Props) {
    const today = new Date().toISOString().split("T")[0]

    const [form, setForm] = useState<TransactionFormState>({
        date: initial?.date ?? today,
        merchant: initial?.merchant ?? "",
        amount: initial?.amount
        ? Math.abs(initial.amount).toString()
        :"",
        category: initial?.category ?? "Food",
        account: initial?.account ?? "Checking",
        description: initial?.description ?? "",
        type: initial?.type === "income" ? "income" : "expense",
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const parsedAmount = Number(form.amount)

        const normalizedAmount =
            form.type === "expense"
                ? -Math.abs(parsedAmount)
                : Math.abs(parsedAmount)

        const newTransaction: Transaction = {
            id: initial?.id ?? crypto.randomUUID(),
            date: form.date,
            merchant: form.merchant,
            description: form.description || form.merchant,
            category: form.category,
            account: form.account,
            amount: normalizedAmount,
            type: form.type,
        }
        onSubmit(newTransaction)
    }

    const update = (field: keyof TransactionFormState, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }))
        


    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
                <button type="button"
                    onClick={() => update("type", "expense")}
                    className={`flex-1 p-2 border border-accent-brown rounded text-gray-800 ${form.type === "expense" ? "bg-[#CD5C5C]" : "bg-custom-yellow"
                        }`}
                >Expense
                </button>

                <button type="button"
                    onClick={() => update("type", "income")}
                    className={`flex-1 p-2 border border-accent-brown rounded text-gray-800 ${form.type === "income" ? "bg-[#D0F0C0]" : "bg-custom-yellow"
                        }`}
                >
                    Income
                </button>
            </div>

            <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="w-full border bg-custom-yellow p-2 rounded"
            />

            {/* MERCHANT */}
            <input
                placeholder="Merchant"
                value={form.merchant}
                onChange={(e) => update("merchant", e.target.value)}
                className="w-full border bg-custom-yellow  p-2 rounded"
            />

            {/* AMOUNT */}
            <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
                className="w-full border bg-custom-yellow  p-2 rounded"
            />

            {/* CATEGORY */}
            <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full border border-accent-red bg-custom-yellow  p-2 rounded"
            >
                <option>Food</option>
                <option>Transport</option>
                <option>Income</option>
                <option>Transfer</option>
            </select>

            {/* ACCOUNT */}
            <select
                value={form.account}
                onChange={(e) => update("account", e.target.value)}
                className="w-full border bg-custom-yellow  p-2 rounded"
            >
                <option>Checking</option>
                <option>Savings</option>
                <option>Credit Card</option>
            </select>

            {/* DESCRIPTION */}
            <input
                placeholder="Description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="w-full border  bg-custom-yellow  p-2 rounded"
            />

            {/* ACTIONS */}
            <button
                type="submit"
                className="w-full bg-accent-brown text-white p-2 rounded"
            >
                Save Transaction
            </button>
        </form>
    )

}

