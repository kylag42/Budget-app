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
    createCategory,
    deleteCategory,
    updateCategory,
} from "@/api/firestore/categoriesApi"

import type {
    Category,
    CategoryInput,
} from "@/types"

export function useCategories() {
    const { user } = useAuth()

    const [categories, setCategories] =
        useState<Category[]>([])

    const [loading, setLoading] =
        useState(false)

    // -----------------------
    // REAL-TIME LISTENER
    // -----------------------
    useEffect(() => {
        if (!user) return

        setLoading(true)

        const q = query(
            collection(db, "categories"),
            where("userId", "==", user.uid)
        )

        const unsub = onSnapshot(q, (snap) => {
            const data: Category[] = snap.docs.map(
                (doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<
                        Category,
                        "id"
                    >),
                })
            )

            setCategories(data)
            setLoading(false)
        })

        return () => unsub()
    }, [user])

    // -----------------------
    // WRITE OPERATIONS ONLY
    // -----------------------
    const addCategory = async (
        data: CategoryInput
    ): Promise<Category> => {
        if (!user) {
            throw new Error("User not logged in")
        }

        const normalizedName =
            data.name.trim().toLowerCase()

        const exists = categories.some(
            (c) =>
                c.name.trim().toLowerCase() ===
                normalizedName
        )

        if (exists) {
            throw new Error(
                "Category already exists"
            )
        }

        const newCategory = await createCategory(
            user.uid,
            data
        )
        return newCategory
    }

    const editCategory = async (
        id: string,
        data: Partial<CategoryInput>
    ) => {
        return await updateCategory(id, data)
    }

    const removeCategory = async (
        id: string
    ) => {
        return await deleteCategory(id)
    }

    return {
        categories,
        loading,
        addCategory,
        editCategory,
        removeCategory,
    }
}