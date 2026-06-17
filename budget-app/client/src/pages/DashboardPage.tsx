import AccountBalanceCards from "@/components/accounts/AccountBalanceCards"
import { useAccounts } from "@/hooks/useAccounts"
import { useTransactions } from "@/hooks/useTransactions"
import bg from "@/assets/beige-bg.png"
import TransactionSummaryCards from "@/components/transactions/TransactionSummaryCards"
import RecentTransactionsCard from "@/components/transactions/RecentTransactionsCard"
import { useCategories } from "@/hooks/useCategories"
import BudgetUsageCard from "@/components/budget/BudgetUsageCard"
import { useBudgets } from "@/hooks/useBudget"


export default function DashboardPage() {
    const { accounts } = useAccounts()
    const { transactions } = useTransactions()
    const { categories } = useCategories()
    const { budgets } = useBudgets()
   
    const currentMonth = new Date()
    .toISOString()
    .slice(0, 7)

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="space-y-6 p-4">

                {/*Monthly Snapshot*/}
                <div>
                    <TransactionSummaryCards
                        transactions={transactions}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ACCOUNT BALANCES CARD */}
                    <AccountBalanceCards
                        accounts={accounts}
                        transactions={transactions}
                    />

                    {/*Recent Transactions*/}
                    <RecentTransactionsCard
                        transactions={transactions}
                        categories={categories}
                    />

                    <BudgetUsageCard
                        categories={categories}
                        transactions={transactions}
                        budgets={budgets}
                        currentMonth ={currentMonth}
                    />
                </div>

            </div>
        </div>
    )
}
