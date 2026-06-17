import { db } from "../firebase/firebase.js"
import type { Request, Response } from "express"


const collection = db.collection("categories")

//GET
export const getCategories = async(_req: Request, res: Response) => {
    try {
        const snapshot = await collection.get()

        const categories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),

        }))

        res.json(categories)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" })
    }
}

//POST

export const createCategory= async (req: Request, res: Response) => {
    try {
        const data = req.body

        const docRef = await collection.add(data)

        res.json({
            id: docRef.id,
            ...data,
        })

       
    } catch(err) {
        res.status(500).json({ error: "Failed to create category"})
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const {id: _id, ...data }= req.body

        await collection.doc(id).update(data)

        res.json({
            id, 
            ...data,
        })

    } catch (err) {
        console.error(err)

        res.status(500).json({
            error: "Failed to update category",
        })
    }
}

export const deleteCategory= async ( req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        await collection.doc(id).delete()

        res.json({
            success: true,
        })
    } catch (err) {
        res.status(500).json({
            error: "Failed to delete category",
        })
    }
}
