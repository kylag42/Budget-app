import { useState } from "react"
import { mockTransactions } from "@/data/mockTransactions"
import type { Transaction } from "@/types/transaction"
import TransactionTable from "@/components/transactions/TransactionTable"
import bg from "@/assets/bg.png"


export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  const deleteTransactions = (ids: string[]) => {
    setTransactions((prev) =>
      prev.filter((t) => !ids.includes(t.id)))
  }

  return (
    <div className="min-h-screen relative">
    <div
    className="absolute inset-0 bg-cover bg-center"
    //style={{backgroundImage: `url(${bg})` }} 
    />
      <div className="relative p-6 space-y-4">
        <h1 className="text-2xl font-semibold">
          Transactions
        </h1>
      <div className="flex gap-3">
        <input 
        className="border p-2 rounded w-64"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

        <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          <option value="Income">Income</option>
          <option value="Transport">Transport</option>
          <option value="Food">Food</option>
        </select>
        
      </div>

    

      <TransactionTable data={transactions}
      onDeleteSelected={deleteTransactions}
      />

      </div>
    </div >
  )
}