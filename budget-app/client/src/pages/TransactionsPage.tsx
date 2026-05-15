import { useState, useEffect } from "react"
import type { Transaction, TransactionInput } from "@/types/transaction"
import TransactionTable from "@/components/transactions/TransactionTable"
import bg from "@/assets/beige-bg.png"
import AddTransactionModal from "@/components/transactions/AddTransactionModal"
import TransactionForm from "@/components/transactions/TransactionForm"
import TransactionSummaryCards from "@/components/transactions/TransactionSummaryCards"
import TransactionFilters from "@/components/transactions/TransactionFilters"
import { getTransactions, createTransaction, updateTransaction as updateTransactionAPI, deleteTransaction as deleteTransactionAPI } from "../api/transactions"




export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [account, setAccount] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])

  useEffect(() => {
    getTransactions().then((data) => {
      console.log("FROM FIREBASE:", data) 
      setTransactions(data)})
    }, [])


  const deleteTransactions = async (ids: string[]) => {
    await Promise.all(
      ids.map((id) => deleteTransactionAPI(id))
    )
    
    setTransactions((prev) =>
      prev.filter((t) => !ids.includes(t.id)))
  }

  const addTransaction = async (tx: TransactionInput) => {
    const created = await createTransaction(tx)

    setTransactions((prev) => [created, ...prev])
  }

  const updateTransaction = async (updated: Transaction) => {
      const saved = await updateTransactionAPI(
        updated.id, 
        updated
      )
    
    
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === saved.id ? saved : t
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
        <h1 className="text-lg text-custom-yellow bg-accent-brown shadow-2xl border-4 border-accent-brown font-semibold  px-3 py-2 rounded inline-block">
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
            onSubmit={async (tx) => {

              if (editingTransaction) {
                await updateTransaction({
                  ...tx,
                id: editingTransaction.id,
              })
             } else {
                await addTransaction(tx)
              }
              setIsModalOpen(false)
            }}
          />
        </AddTransactionModal>


      </div>
    </div>

  )
}