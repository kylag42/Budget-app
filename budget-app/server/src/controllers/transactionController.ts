import { db } from "../firebase/firebase.js"
import type { Request, Response } from "express"

const collection = db.collection("transactions")

//GET
export const getTransactions = async(_req: Request, res: Response) => {
    try {
        const snapshot = await collection.get()

        const transactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),

        }))

        res.json(transactions)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch transactions" })
    }
}

//POST

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const data = req.body

        const docRef = await collection.add(data)

        res.json({
            id: docRef.id,
            ...data,
        })

       
    } catch(err) {
        res.status(500).json({ error: "Failed to create transaction"})
    }
}

export const updateTransaction = async (req: Request, res: Response) => {
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
            error: "Failed to update transaction",
        })
    }
}

export const deleteTransaction = async ( req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        await collection.doc(id).delete()

        res.json({
            success: true,
        })
    } catch (err) {
        res.status(500).json({
            error: "Failed to delete transaction",
        })
    }
}
