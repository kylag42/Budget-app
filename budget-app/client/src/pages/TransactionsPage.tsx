import { useState } from "react"
import { mockTransactions } from "@/data/mockTransactions"
import type { Transaction } from "@/types/transaction"
import TransactionTable from "@/components/transactions/TransactionTable"
import bg from "@/assets/beige-bg.png"
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react"
import AddTransactionModal from "@/components/transactions/AddTransactionModal"
import TransactionForm from "@/components/transactions/TransactionForm"
import TransactionSummaryCards from "@/components/transactions/TransactionSummaryCards"
import TransactionFilters from "@/components/transactions/TransactionFilters"


export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [account, setAccount] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const deleteTransactions = (ids: string[]) => {
    setTransactions((prev) =>
      prev.filter((t) => !ids.includes(t.id)))
  }

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev])
  }

  const updateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === updated.id ? updated : t
      )
    )
  }

const mode = editingTransaction ? "edit" : "add"


  //account and category filters
  const filteredTransactions = transactions.filter((t) => {
    const query = search.toLowerCase()

    const matchesSearch =
      t.merchant.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.account.toLowerCase().includes(query) ||
      t.amount.toString().includes(search)


    const matchesCategory =
      category === "all" ||
      t.category === category ||
      (category === "Transfer" && t.category === "Transfer")

    const matchesAccount =
      account === "all" ||
      t.account === account

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAccount
    )
  })

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="relative p-6 space-y-4">
        <h1 className="text-3xl text-custom-yellow bg-accent-brown shadow-2xl border-4 border-accent-brown font-semibold  px-3 py-2 rounded inline-block">
          All Transactions
        </h1>
        <TransactionSummaryCards
          transactions={transactions}
        />

        {/* search bar and filtering dropdowns */}
        <TransactionFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          account={account}
          setAccount={setAccount} />

        {/*table rendering */}
        <div className="rounded-2xl shadow-md bg-base-brown">
          <TransactionTable data={filteredTransactions}
            onDeleteSelected={deleteTransactions}
            onAdd={() => {
              setIsModalOpen(true)
              setEditingTransaction(null)
            }}
            onEdit={(transaction => {
              setEditingTransaction(transaction)
              setIsModalOpen(true)
            })}
          />
        </div>
        <AddTransactionModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={mode}
          >
          <TransactionForm
            initial={editingTransaction ?? undefined}
            onSubmit={(tx) => {

              if (editingTransaction) {
                updateTransaction(tx)
              } else {
                addTransaction(tx)
              }

              setIsModalOpen(false)
            }}
          />
        </AddTransactionModal>


      </div>
    </div>

  )
}