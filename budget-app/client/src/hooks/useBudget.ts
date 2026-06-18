 import { useEffect, useState } from "react"
import {
  onAuthStateChanged,
} from "firebase/auth"

import { auth } from "@/firebase/firebase"
import { saveBudget } from "@/api/firestore/budgetService"

import {
  getBudgets,
} from "@/api/firestore/budgetService"

import type { Budget } from "@/types/budget"

export function useBudgets() {
  const [budgets, setBudgets] =
    useState<Budget[]>([])

  const [userId, setUserId] =
    useState<string | null>(null)

  // -----------------------
  // AUTH LISTENER
  // -----------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        setUserId(user?.uid ?? null)
      }
    )

    return unsub
  }, [])

  // -----------------------
  // LOAD BUDGETS
  // -----------------------
  useEffect(() => {
    if (!userId) return

    getBudgets(userId).then(setBudgets)
  }, [userId])


  // -----------------------
  // ADD / SAVE BUDGET
  // -----------------------
  const addBudget = async (
    data: Omit<Budget, "id" | "userId">
  ) => {
    if (!userId) return

    const newBudget = await saveBudget(userId, data)

    setBudgets((prev) => {
      const filtered = prev.filter(
        (b) =>
          !(
            b.categoryId === data.categoryId &&
            b.month === data.month
          )
      )

      return [...filtered, newBudget]
    })

    return newBudget
  }

  return {
    budgets,
    addBudget,
  }
}