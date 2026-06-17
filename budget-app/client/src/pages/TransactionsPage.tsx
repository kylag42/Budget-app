import { useState } from "react"

import TransactionTable from "@/components/transactions/TransactionTable"
import TransactionFilters from "@/components/transactions/TransactionFilters"

import AddTransactionModal from "@/components/modals/AddTransactionModal"
import AddCategoryModal from "@/components/modals/AddCategoryModal"
import AddAccountModal from "@/components/modals/AddAccountModal"
import TransactionForm from "@/components/transactions/TransactionForm"

import { useTransactions } from "@/hooks/useTransactions"
import { useCategories } from "@/hooks/useCategories"
import { useAccounts } from "@/hooks/useAccounts"

import type { Transaction } from "@/types/transaction"
import bg from "@/assets/beige-bg.png"

export default function TransactionsPage() {
  const {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
  } = useTransactions()

  const { categories } = useCategories()
  const { accounts } = useAccounts()

  // -----------------------
  // UI STATE
  // -----------------------
  const [search, setSearch] = useState("")
  const [category, setCategory] =
    useState("all")
  const [account, setAccount] =
    useState("all")

  const [isModalOpen, setIsModalOpen] =
    useState(false)

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)

  const [editingTx, setEditingTx] =
    useState<Transaction | null>(null)

  const [type, setType] =
    useState<"income" | "expense">("expense")

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [categoryId, setCategoryId] = useState("")
  const [accountId, setAccountId] = useState("")

  const openTransactionModal = (tx?: Transaction) => {
    setEditingTx(tx ?? null)

    setType(tx?.type ?? "expense")
    setCategoryId(tx?.categoryId ?? "")
    setAccountId(tx?.accountId ?? "")

    setIsModalOpen(true)
  }

  // -----------------------
  // FILTERS
  // -----------------------
  const filtered = transactions.filter(
    (t) => {
      const query =
        search.toLowerCase()

      const matchesSearch =
        t.merchant
          .toLowerCase()
          .includes(query) ||
        t.description
          .toLowerCase()
          .includes(query)

      const matchesAccount =
        account === "all" ||
        t.accountId === account

      const matchesCategory =
        category === "all" ||
        t.categoryId === category

      return (
        matchesSearch &&
        matchesAccount &&
        matchesCategory
      )
    }
  )

  // -----------------------
  // SUBMIT
  // -----------------------
  const handleSubmit = async (
    data: Omit<
      Transaction,
      "id" | "userId"
    >
  ) => {
    if (editingTx) {
      await editTransaction(
        editingTx.id,
        data
      )
    } else {
      await addTransaction(data)
    }

    setIsModalOpen(false)
    setEditingTx(null)
  }



  return (
    <div
      className="
      min-h-screen
      bg-cover
      bg-center
      bg-no-repeat
      relative
    "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="p-6 space-y-4">


        <h1 className="inline-block text-xl font-bold text-white bg-accent-brown p-3 rounded">
          Transactions
        </h1>

        <TransactionFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          accountId={account}
          setAccount={setAccount}
          categories={categories}
          accounts={accounts}
        />

        {/* ACTION BUTTONS */}

        <div className="flex gap-3 -mb-1 bg-accent-brown p-2 rounded">

          {/* ADD */}
          <button
            onClick={() => {
              setEditingTx(null)
              setType("expense")
              setIsModalOpen(true)
            }}
            className="bg-base-brown  px-3 py-2 rounded"
          >
            + Add
          </button>

          {/* EDIT */}
          <button
            disabled={selectedIds.length !== 1}
            onClick={() => {
              const tx = transactions.find(
                (t) => t.id === selectedIds[0]
              )

              if (!tx) return

              openTransactionModal(tx)
            }}
            className="border px-3 py-2 rounded disabled:opacity-50"
          >
            Edit
          </button>

          {/* DELETE (BULK SAFE) */}
          <button
            disabled={
              selectedIds.length === 0
            }
            onClick={async () => {
              await Promise.all(
                selectedIds.map((id) =>
                  deleteTransaction(id)
                )
              )

              setSelectedIds([])
            }}
            className="text-red-500 border px-3 py-2 rounded disabled:opacity-50"
          >
            Delete
          </button>
          <div className="flex items-center justify-between">
            {/* LEFT: selection info */}
            <div className="text-sm opacity-70">
              {selectedIds.length > 0
                ? `${selectedIds.length} selected`
                : "No selection"}
            </div>

          </div>
        </div>

        {/* TABLE */}
        <TransactionTable
          transactions={filtered}
          accounts={accounts}
          categories={categories}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}

          onEdit={(tx) => openTransactionModal(tx)}
          
          onDelete={deleteTransaction}
        />

        {/* MODAL */}
        <AddTransactionModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTx(null)
          }}
          type={type}
          setType={setType}
        >
          <TransactionForm
            type={type}
            setType={setType}
            categories={categories}
            accounts={accounts}
            initial={editingTx ?? undefined}
            onSubmit={handleSubmit}

            setIsCategoryModalOpen={setIsCategoryModalOpen}
            setIsAccountModalOpen={setIsAccountModalOpen}

            categoryId={categoryId}
            setCategoryId={setCategoryId}

            accountId={accountId}
            setAccountId={setAccountId}
          />
        </AddTransactionModal>
        <AddCategoryModal
          open={isCategoryModalOpen}

          onClose={() => setIsCategoryModalOpen(false)}
          onCreated={(id) => setCategoryId(id)}
        />

        <AddAccountModal
          open={isAccountModalOpen}
          onClose={() => setIsAccountModalOpen(false)}
          onCreated={(id) => setAccountId(id)}
        />
      </div>
    </div>
  )
}