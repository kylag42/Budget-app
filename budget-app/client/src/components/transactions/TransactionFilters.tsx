
type Props = {
    search: string
    setSearch: (value: string) => void
    
    category: string
    setCategory: (value: string) => void

    account: string
    setAccount: (value:string) => void
}



export default function TransactionFilters({
    search,
    setSearch,
    category,
    setCategory,
    account,
    setAccount,
}: Props) {
    return (
        <div className="flex gap-3">
                <input 
                className="border-2 border-[#800100] p-2 rounded w-64 placeholder:font-bold bg-base-brown"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
        
                <select
                className="border-2 border-[#800100] p-2 rounded"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                >
                  <option value="all">All accounts</option>
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
        
                <select
                className="border-2 border-accent-red p-2 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All categories</option>
                  <option value="Income">Income</option>
                  <option value="Transport">Transport</option>
                  <option value="Food">Food</option>
                  <option value="Transfer">Transfer</option>
                </select>
                
              </div>
        
    )
}