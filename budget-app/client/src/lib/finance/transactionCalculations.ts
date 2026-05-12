import type { Transaction } from "@/types/transaction"

export function calculateIncome(transactions: Transaction[]) {
    return transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0)
}

export function calculateExpenses(transactions: Transaction[]) {
    return transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
}

export function calculateNetCashFlow(transactions: Transaction[]) {
    return calculateIncome(transactions) - calculateExpenses(transactions)
}

export function calculateBalance(transactions: Transaction[]) {
    return transactions.reduce((sum, t) =>
        sum + t.amount, 0
    )
}