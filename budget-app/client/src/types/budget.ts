export type Budget = {
  id: string
  userId: string
  categoryId: string
  amount: number
  month: string // e.g. "2026-01"
}

export type SavingsGoal = {
    id: string
    name: string
    current: number
    target: number
}