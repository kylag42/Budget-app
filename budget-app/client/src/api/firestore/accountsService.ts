import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  getDoc
} from "firebase/firestore"

import { db } from "@/firebase/firebase"
import type { Account, AccountInput } from "@/types/account"

export const getAccounts = async (
  userId: string
): Promise<Account[]> => {
  const q = query(
    collection(db, "accounts"),
    where("userId", "==", userId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Account, "id">),
  }))
}

export const addAccount = async (
  userId: string,
  name: string
) => {
  const ref = await addDoc(
    collection(db, "accounts"),
    {
      userId,
      name,
      createdAt: new Date().toISOString(),
    }
  )

  return {
    id: ref.id,
    userId,
    name,
  }
}

export const createAccount = async (
  userId: string,
  data: AccountInput
): Promise<Account> => {
  const ref = await addDoc(
    collection(db, "accounts"),
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

export const deleteAccount = async (
  id: string
) => {
  await deleteDoc(doc(db, "accounts", id))
}

export const updateAccount = async (
  id: string,
  data: Partial<Account>
): Promise<Account> => {
  const ref = doc(db, "accounts", id)

  await updateDoc(ref, data)

  const snap = await getDoc(ref)

  return {
    id: snap.id,
    ...(snap.data() as Omit<Account, "id">),
  }
}