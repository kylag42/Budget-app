import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/firebase/firebase"

import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/api/firestore/transactionsApi"

import type {
  Transaction,
  TransactionInput,
} from "@/types/transaction"

export function useTransactions() {
  const { user } = useAuth()

  const [transactions, setTransactions] =
    useState<Transaction[]>([])

  const [loading, setLoading] =
    useState(false)

  // -----------------------
  // REAL-TIME LISTENER
  // -----------------------
  useEffect(() => {
    if (!user) return

    setLoading(true)

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    )

    const unsub = onSnapshot(q, (snap) => {
      const data: Transaction[] = snap.docs.map(
        (doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<
            Transaction,
            "id"
          >),
        })
      )

      setTransactions(data)
      setLoading(false)
    })

    return () => unsub()
  }, [user])

  // -----------------------
  // WRITE ONLY
  // -----------------------
  const addTx = async (
    data: TransactionInput
  ) => {
    if (!user) return

    return await addTransaction(
      user.uid,
      data
    )
  }

  const editTransaction = async (
    id: string,
    data: Partial<TransactionInput>
  ) => {
    return await updateTransaction(id, data)
  }

  const removeTransaction = async (
    id: string
  ) => {
    return await deleteTransaction(id)
  }

  return {
    transactions,
    loading,
    addTransaction: addTx,
    editTransaction,
    deleteTransaction: removeTransaction,
  }
}