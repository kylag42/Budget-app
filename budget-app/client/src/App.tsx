import { Routes, Route } from "react-router-dom"

import AppLayout from "@/layouts/AppLayout"
import DashboardPage from "@/pages/DashboardPage"
import TransactionsPage from "@/pages/TransactionsPage"
import BudgetPage from "@/pages/BudgetPage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"

export default function App() {
  return (
    <Routes>

      {/* auth routes (no layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* app layout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Route>

    </Routes>
  )
}