import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"

import { db } from "@/firebase/firebase"
import type { Transaction } from "@/types/transaction"

const COLLECTION = "transactions"

// -------------------------
// GET ALL (by user)
// -------------------------
export const getTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Transaction, "id">),
  }))
}

// -------------------------
// CREATE
// -------------------------
export const addTransaction = async (
  userId: string,
  data: Omit<Transaction, "id" | "userId">
): Promise<Transaction> => {
  const ref = await addDoc(
    collection(db, COLLECTION),
    {
      ...data,
      userId,
    }
  )

  return {
    id: ref.id,
    userId,
    ...data,
  }
}

// -------------------------
// UPDATE
// -------------------------
export const updateTransaction = async (
  id: string,
  data: Partial<
    Omit<Transaction, "id" | "userId">
  >
): Promise<void> => {
  await updateDoc(
    doc(db, COLLECTION, id),
    data
  )
}

// -------------------------
// DELETE
// -------------------------
export const deleteTransaction = async (
  id: string
): Promise<void> => {
  await deleteDoc(
    doc(db, COLLECTION, id)
  )
}