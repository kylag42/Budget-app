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
  createAccount,
  deleteAccount,
  updateAccount,
} from "@/api/firestore/accountsService"

import type {
  Account,
  AccountInput,
} from "@/types/account"

export function useAccounts() {
  const { user } = useAuth()

  const [accounts, setAccounts] = useState<
    Account[]
  >([])

  const [loading, setLoading] =
    useState(false)

  // -----------------------
  // REAL-TIME LISTENER
  // -----------------------
  useEffect(() => {
    if (!user) return

    setLoading(true)

    const q = query(
      collection(db, "accounts"),
      where("userId", "==", user.uid)
    )

    const unsub = onSnapshot(q, (snap) => {
      const data: Account[] = snap.docs.map(
        (doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<
            Account,
            "id"
          >),
        })
      )

      setAccounts(data)
      setLoading(false)
    })

    return () => unsub()
  }, [user])

  // -----------------------
  // WRITE OPERATIONS ONLY
  // -----------------------
  const addAccount = async (
    data: AccountInput
  ): Promise<Account> => {
    if (!user) {
        throw new Error("User not logged in")
    }

    const normalizedName =
    data.name.trim().toLowerCase()

    const exists = accounts.some(
        (a) => 
            a.name.trim().toLowerCase() === normalizedName
    )

    if(exists) {
        throw new Error(
            "Account already exists"
        )
    }

    const newAccount= await createAccount(
      user.uid,
      data
    )
    return newAccount
  }

  const editAccount = async (
    id: string,
    data: Partial<AccountInput>
  ) => {
    return await updateAccount(id, data)
  }

  const removeAccount = async (
    id: string
  ) => {
    return await deleteAccount(id)
  }

  return {
    accounts,
    loading,
    addAccount,
    editAccount,
    removeAccount,
  }
}