export type Transaction = {
  id: string
  userId: string   
  date: string
  description: string
  merchant: string
  categoryId: string
  accountId: string
  amount: number

  type?: "expense" | "income"
  transferTo?: string
}

export type TransactionInput = Omit<Transaction, "id" | "userId">