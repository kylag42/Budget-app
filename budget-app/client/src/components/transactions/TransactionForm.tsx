import { useState, useEffect } from "react"

import type {
  Transaction,
  TransactionInput,
  Category,
  Account,
} from "@/types"

type Props = {
  initial?: Transaction
  categories: Category[]
  accounts: Account[]

  type: "income" | "expense"
  setType: (value: "income" | "expense") => void

  onSubmit: (data: TransactionInput) => void

  setIsCategoryModalOpen: (v: boolean) => void
  setIsAccountModalOpen: (v: boolean) => void

  categoryId: string
  setCategoryId: (v: string) => void

  accountId: string
  setAccountId: (v: string) => void
}

export default function TransactionForm({
  initial,
  categories,
  accounts,
  type,
  setType,
  onSubmit,
  setIsCategoryModalOpen,
  setIsAccountModalOpen,
  categoryId,
  setCategoryId,
  accountId,
  setAccountId,
}: Props) {
  // -----------------------
  // LOCAL INPUT STATE ONLY
  // -----------------------
  const [date, setDate] = useState("")
  const [merchant, setMerchant] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")

  // -----------------------
  // HYDRATE ON EDIT
  // -----------------------
  useEffect(() => {
    if (!initial) {
      setDate("")
      setMerchant("")
      setDescription("")
      setAmount("")
      setCategoryId("")
      setAccountId("")
      setType("expense")
      return
    }

    setDate(initial.date)
    setMerchant(initial.merchant)
    setDescription(initial.description)
    setAmount(String(initial.amount))

    setCategoryId(initial.categoryId ?? "")
    setAccountId(initial.accountId ?? "")
    setType(initial.type ?? "expense") // ✅ safe fallback
  }, [initial])

  // -----------------------
  // SUBMIT
  // -----------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      date,
      merchant,
      description,
      accountId,
      amount: Number(amount),
      categoryId,
      type, // ✅ ONLY SOURCE OF TRUTH
    })
  }

  // -----------------------
  // RENDER
  // -----------------------
  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      {/* DATE */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border border-accent-brown p-2 w-full"
      />

      {/* MERCHANT */}
      <input
        placeholder="Merchant"
        value={merchant}
        onChange={(e) => setMerchant(e.target.value)}
        className="border border-accent-brown p-2 w-full"
      />

      {/* DESCRIPTION */}
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-accent-brown p-2 w-full"
      />

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-accent-brown p-2 w-full"
      />

      {/* TYPE */}
      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value as "income" | "expense")
        }
        className="border border-accent-brown p-2 w-full"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* CATEGORY */}
      <select
        value={categoryId}
        onChange={(e) => {
          const value = e.target.value

          if (value === "__add_category") {
            setIsCategoryModalOpen(true)
            return
          }

          setCategoryId(value)
        }}
        className="border border-accent-brown p-2 w-full"
      >
        <option value="">Select category</option>

        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}

        <option value="__add_category">
          + Add Category
        </option>
      </select>

      {/* ACCOUNT */}
      <select
        value={accountId}
        onChange={(e) => {
          const value = e.target.value

          if (value === "__add_account") {
            setIsAccountModalOpen(true)
            return
          }

          setAccountId(value)
        }}
        className="border border-accent-brown p-2 w-full"
      >
        <option value="">Select account</option>

        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}

        <option value="__add_account">
          + Add Account
        </option>
      </select>

      {/* SUBMIT */}
      <button
        type="submit"
        className="bg-accent-brown text-white px-4 py-2 rounded w-full"
      >
        Save Transaction
      </button>
    </form>
  )
}