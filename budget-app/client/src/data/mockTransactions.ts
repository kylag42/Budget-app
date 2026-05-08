import type { Transaction } from "@/types/transaction"

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2026-05-01",
    description: "boba milk tea",
    merchant: "Boba Time",
    category: "Food",
    account: "Chase Checkings",
    amount: -6.5
  },
  {
    id: "2",
    date: "2026-05-02",
    description: "airport ride",
    merchant: "Uber",
    category: "Transport",
    account: "Chase Checkings",
    amount: -18.2,
  },
  {
    id: "3",
    date: "2026-05-03",
    description: "Bi-weekly paycheck",
    merchant: "Salary",
    category: "Income",
    account: "Chase Checkings",
    amount: 2500,
  },
  {
    id: "4",
    date: "2026-05-04",
    description: "dinner",
    merchant: "Taco Bell",
    category: "Food",
    account: "Chase Checkings",
    amount: -10.85,
  },
  {
    id: "5",
    date: "2026-05-04",
    description: "gas",
    merchant: "Shell",
    category: "Transport",
    account: "Chase Checkings",
    amount: 55.86,
  },

]