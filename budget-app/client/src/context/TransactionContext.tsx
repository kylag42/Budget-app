
import { db } from "../firebase/firebase"

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"

import {
    collection,
    onSnapshot,
    query,
} from "firebase/firestore"

import type {Transaction } from "@/types/transaction"

type TransactionContextType = {
  transactions: Transaction[]
}

const TransactionContext =
  createContext<TransactionContextType | null>(null)

export function TransactionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [transactions, setTransactions] =
    useState<Transaction[]>([])

  useEffect(() => {
    const q = query(
      collection(db, "transactions")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[]

      setTransactions(data)
    })

    return () => unsubscribe()
  }, [])

  return (
    <TransactionContext.Provider
      value={{ transactions }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider"
    )
  }

  return context
}
