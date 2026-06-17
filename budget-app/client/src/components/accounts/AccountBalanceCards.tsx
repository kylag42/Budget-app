import type { Account, Transaction } from "@/types"

type Props = {
  accounts: Account[]
  transactions: Transaction[]
}

export default function AccountBalanceCards({
  accounts,
  transactions,
}: Props) {
  const accountBalances = accounts.map((account) => {
    const balance = transactions
      .filter((t) => t.accountId === account.id)
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      ...account,
      balance,
    }
  })

  const total = accountBalances.reduce(
    (sum, a) => sum + a.balance,
    0
  )

  return (
    <div className="space-y-4 mb-6">
        

      {/* TOTAL */}
      <div className="bg-base-brown/80 rounded-xl overflow-hidden max-w-sm">
            <div className="bg-accent-brown px-4 py-3 text-lg font-semibold">
     
      <h1 className="text-white">Account Balances</h1>
      </div>
      
      <div className="m-4">
        <p className="text-center text-md">
          Total Balance
        </p>

        <p className="text-2xl font-bold text-center">
          ${total.toFixed(2)}
        </p>
      </div>

      {/* ACCOUNTS */}
      <div className="flex flex-col gap-2 p-3">

        {accountBalances.map((account) => (
          <div
            key={account.id}
            className="bg-accent-brown p-4 rounded-xl border border-accent-brown/30"
          >
            <p className="text-md text-white">
              {account.name}
            </p>

            <p
              className={`text-xl font-bold ${
                account.balance >= 0
                  ? "text-[#33B864]"
                  : "text-red-500"
              }`}
            >
              ${account.balance.toFixed(2)}
            </p>
          </div>
        ))}

      </div>
    </div>
    </div>
  )
}