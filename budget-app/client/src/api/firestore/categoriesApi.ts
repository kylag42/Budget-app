import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore"

import { db } from "@/firebase/firebase"
import type { Category } from "@/types/category"


const categoriesRef = collection(db, "categories")

// GET ALL
export const getCategories = async (
  userId: string
): Promise<Category[]> => {
  const q = query(
    categoriesRef,
    where("userId", "==", userId)
  )

  const snap = await getDocs(q)

  return snap.docs.map((d): Category => {
    const data = d.data() as Omit<Category, "id">

    return {
      id: d.id,
      ...data,
    }
  })
}

// CREATE
export const createCategory = async (
  userId: string,
  data: { name: string }
): Promise<Category> => {
  const ref = await addDoc(
    collection(db, "categories"),
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

// UPDATE
export const updateCategory = async (
  id: string,
  data: Partial<Omit<Category, "id">>
): Promise<Category> => {
  const ref = doc(db, "categories", id)

  await updateDoc(ref, data)

  return {
    id,
    ...(data as Omit<Category, "id">),
  }
}

// DELETE
export const deleteCategory = async (
  id: string
): Promise<void> => {
  const ref = doc(db, "categories", id)
  await deleteDoc(ref)
}