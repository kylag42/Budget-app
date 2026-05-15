import axios from "axios"
import type { Transaction } from "@/types/transaction"

const API = "http://localhost:3001/transactions"

export const getTransactions = async () => {
    const res = await axios.get(API)
    return res.data
}

export const createTransaction = async (tx: Transaction) => {
    const res = await axios.post(API, tx)
    return res.data
}

export const updateTransaction = async (id: string, tx: Transaction) => 
{
    const res = await axios.put(
        `${API}/${id}`,
        tx
    )
    return res.data
}

export const deleteTransaction = async (id: string) => {
    await axios.delete(`${API}/${id}`)
}
