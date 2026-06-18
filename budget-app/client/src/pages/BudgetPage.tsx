import { useState } from "react"

import BudgetTable from "@/components/budget/BudgetTable"
import CategoryTransactionsModal from "@/components/modals/CategoryTransactionsModal"
import AddCategoryModal from "@/components/modals/AddCategoryModal"

import { useCategories } from "@/hooks/useCategories"
import { useTransactions } from "@/hooks/useTransactions"

import type { Category } from "@/types/category"


import SavingsGoalsCard from "@/components/budget/SavingsGoalsCard"
import TopCategoriesCard from "@/components/budget/TopCategoriesCard"

import bg from "@/assets/beige-bg.png"

import { useBudgets } from "@/hooks/useBudget"
import AiCoach from "@/components/ai/AiCoach"

export default function BudgetPage() {
  const { categories } = useCategories()
  const { transactions } = useTransactions()
  const {
    budgets,
    addBudget,
  } = useBudgets();

  const goals = [
    {
      id: "1",
      name: "Emergency Fund",
      current: 2500,
      target: 10000,
    },
    {
      id: "2",
      name: "Vacation",
      current: 1200,
      target: 3000,
    },
    {
      id: "3",
      name: "New Car",
      current: 5000,
      target: 15000,
    },
  ]

  // -----------------------
  // BUDGET STATE
  // -----------------------

  const currentMonth = new Date()
    .toISOString()
    .slice(0, 7)

  // -----------------------
  // MODALS
  // -----------------------
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null)

  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState(false)

  const [isAddCategoryOpen, setIsAddCategoryOpen] =
    useState(false)

  // -----------------------
  // EDIT STATE
  // -----------------------
  const [editingId, setEditingId] =
    useState<string | null>(null)

  const [editBudget, setEditBudget] = useState("")

  // -----------------------
  // HANDLERS
  // -----------------------
  const handleViewCategoryTransactions = (
    category: Category
  ) => {
    setSelectedCategory(category)
    setIsCategoryModalOpen(true)
  }

  const handleStartEdit = (category: Category) => {
    setEditingId(category.id)

    const existing = budgets.find(
      (b) =>
        b.categoryId === category.id &&
        b.month === currentMonth
    )

    setEditBudget(String(existing?.amount ?? 0))
  }

  const handleSave = async (
    category: Category,
    amount: number
  ) => {
    await addBudget({
      categoryId: category.id,
      amount,
      month: currentMonth,
    })

    setEditingId(null)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="space-y-6 p-4">

        {/* HEADER */}
        <h1 className="text-xl font-bold bg-accent-brown p-3 rounded text-white">
          Budget
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <SavingsGoalsCard
            goals={goals} />

          <TopCategoriesCard
            transactions={transactions}
            categories={categories}
          />

          {/* FULL WIDTH TABLE */}
          <div className="lg:col-span-2 rounded-xl bg-base-brown/80 overflow-hidden">

            <div className="bg-accent-brown px-4 py-3">
              <h1 className="text-center font-semibold text-white">
                Category Breakdown
              </h1>
            </div>

            <BudgetTable
              categories={categories}
              transactions={transactions}
              budgets={budgets}
              currentMonth={currentMonth}
              editingId={editingId}
              editBudget={editBudget}
              setEditBudget={setEditBudget}
              onStartEdit={handleStartEdit}
              onSave={handleSave}
              onViewCategoryTransactions={
                handleViewCategoryTransactions
              }
            />
          </div>

        </div>

        {/* MODALS */}
        <CategoryTransactionsModal
          open={isCategoryModalOpen}
          category={selectedCategory}
          transactions={transactions}
          onClose={() => {
            setIsCategoryModalOpen(false)
            setSelectedCategory(null)
          }}
        />

        <AddCategoryModal
          open={isAddCategoryOpen}
          onClose={() => setIsAddCategoryOpen(false)}
        />

        <AiCoach
          transactions={transactions}
          budgets={budgets}
          currentMonth={currentMonth}
        />

      </div>
    </div>
  )
}