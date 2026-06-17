import type { Transaction, Account } from "@/types"

/**
 * Filter transactions by user
 */
export const filterByUser = (
  transactions: Transaction[],
  userId: string
): Transaction[] => {
  return transactions.filter(
    (t) => t.userId === userId
  )
}

/**
 * Filter transactions by category
 */
export const filterByCategory = (
  transactions: Transaction[],
  categoryId: string
): Transaction[] => {
  return transactions.filter(
    (t) => t.categoryId === categoryId
  )
}

/**
 * Get ONLY expenses
 */
export const getExpenses = (
  transactions: Transaction[]
): Transaction[] => {
  return transactions.filter(
    (t) => t.type === "expense"
  )
}

/**
 * Get ONLY income
 */
export const getIncome = (
  transactions: Transaction[]
): Transaction[] => {
  return transactions.filter(
    (t) => t.type === "income"
  )
}

/**
 * Calculate total income
 */
export const getTotalIncome = (
  transactions: Transaction[]
): number => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Calculate total expenses
 * (positive number representing total spent)
 */
export const getTotalExpenses = (
  transactions: Transaction[]
): number => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Calculate total net balance
 * income - expenses
 */
export const getMonthlyTotal = (
  transactions: Transaction[]
): number => {
  return transactions.reduce((sum, t) => {
    if (t.type === "income") return sum + t.amount
    if (t.type === "expense") return sum - t.amount
    return sum
  }, 0)
}

/**
 * Calculate actual spent for a category
 * (used in BudgetPage)
 */
export const getActualSpent = (
  transactions: Transaction[],
  categoryId: string
): number => {
  return transactions
    .filter(
      (t) =>
        t.categoryId === categoryId &&
        t.type === "expense"
    )
    .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Budget percentage used
 */
export const getPercentUsed = (
  actual: number,
  budget: number
): number => {
  if (budget <= 0) return 0

  return Math.round(
    (actual / budget) * 100
  )
}

/**
 * Remaining budget
 */
export const getRemainingBudget = (
  actual: number,
  budget: number
): number => {
  return budget - actual
}

//account balances
export const getAccountBalances = (
    transactions: Transaction[],
    accounts: Account[]
) => {
    return accounts.map((account) => {
        const balance = transactions.filter((t) => t.accountId === account.id)
        .reduce((sum, t) => sum + t.amount, 0)

        return {
            ...account,
            balance
        }
    })
}