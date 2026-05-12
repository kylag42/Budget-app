export type TransactionFormState = {
    date: string
    merchant: string
    amount: string
    category: string
    account: string
    description: string
    type: "income" | "expense"
}