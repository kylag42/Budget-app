import type {Category, Account} from "@/types";

type Props = {
  search: string
  setSearch: (v: string) => void

  category: string
  setCategory: (v: string) => void

  accountId: string
  setAccount: (v: string) => void

  categories: Category[]
  accounts: Account[]
}

export default function TransactionFilters({
  search,
  setSearch,
  category,
  setCategory,
  accountId,
  setAccount,
  categories,
  accounts,
}: Props) {
  return (
    <div className="flex gap-3 flex-wrap">

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search transactions..."
        className="border border-accent-brown bg-base-brown p-2 rounded"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="border border-accent-brown bg-base-brown p-2 rounded"
      >
        <option value="all">
          All Categories
        </option>

        {categories.map((c) => (
          <option
          key={c.id}
          value={c.id}
          >
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={accountId}
        onChange={(e) =>
          setAccount(e.target.value)
        }
        className="border border-accent-brown bg-base-brown p-2 rounded"
      >
        <option value="all">
          All Accounts
        </option>
        {accounts.map((a) => (
          <option
          key={a.id}
          value={a.id}
          >
            {a.name}
          </option>
        ))}
      </select>
    </div>
  )
}