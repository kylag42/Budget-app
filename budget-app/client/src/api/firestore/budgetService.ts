import {
  addDoc,
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
export const createBudget = async (
  userId: string,
  data: Omit<Budget, "id" | "userId">
): Promise<Budget> => {
  const ref = await addDoc(
    collection(db, "budgets"),
    {
      userId,
      ...data,
    }
  )

  return {
    id: ref.id,
    userId,
    ...data,
  }
}