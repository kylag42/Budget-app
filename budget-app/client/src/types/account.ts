export type Account = {
  id: string
  userId: string
  name: string
  createdAt?: string
}

export type AccountType = "checking" | "savings"

export type AccountInput = {
  name: string
  type: AccountType
}