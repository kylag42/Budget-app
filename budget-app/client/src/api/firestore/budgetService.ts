import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"

import { db } from "@/firebase/firebase"
import type { Budget } from "@/types/budget"

// ----------------------
// GET
// ----------------------
export const getBudgets = async (
  userId: string
): Promise<Budget[]> => {
  const q = query(
    collection(db, "budgets"),
    where("userId", "==", userId)
  )

  const snap = await getDocs(q)

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      Budget,
      "id"
    >),
  }))
}

// ----------------------
// CREATE
// ----------------------

export const saveBudget = async (
  userId: string,
  data: { categoryId: string; amount: number; month: string }
) => {
  const id = `${userId}_${data.categoryId}_${data.month}`

  await setDoc(doc(db, "budgets", id), {
    userId,
    ...data,
  })

  return {
    id,
    userId,
    ...data,
  }
}