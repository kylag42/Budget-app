export type Transaction = {
    id: string
    date: string
    description: string
    merchant: string
    category: string
    account: string
    amount: number
    type?: "expense" | "income" | "transfer"
    transferTo?: string
}

export type TransactionInput = Omit<Transaction, "id">