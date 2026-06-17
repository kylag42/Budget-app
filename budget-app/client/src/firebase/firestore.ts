import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"

import { db } from "./firebase"
import type { Category } from "@/types/category"

const colRef = collection(db, "categories")

export const getCategories = async (): Promise<Category[]> => {
  const snap = await getDocs(colRef)

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as Category[]
}

export const createCategory = async (
  data: Omit<Category, "id">
) => {
  const ref = await addDoc(colRef, data)

  return { id: ref.id, ...data }
}

export const updateCategory = async (
  id: string,
  data: Partial<Category>
) => {
  const ref = doc(db, "categories", id)
  await updateDoc(ref, data)
}

export const deleteCategory = async (id: string) => {
  await deleteDoc(doc(db, "categories", id))
}