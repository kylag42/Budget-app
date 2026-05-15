import type { ColumnDef } from "@tanstack/react-table"
import type { Transaction } from "@/types/transaction"

export const columns: ColumnDef<Transaction>[] = [ 
    {
        id: "select",
        header: ({table}) => (
            <input
            type="checkbox"
            className="w-5 h-5"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()} />
        ),

        cell: ({ row }) => (
            <input
            type="checkbox"
            className="w-5 h-5"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()} />
        ),
    },
    {
        accessorKey: "date",
        header: "Date",

         cell: ({ row }) => {
             const [year, month,day] = row.original.date.split("-").map(Number)
               return  new Intl.DateTimeFormat("en-US" , {
                month: "short",
                day: "numeric",
               }).format(new Date(year, month - 1, day))
    },
},
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "merchant",
        header: "Merchant",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "account",
        header:"Account",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({row}) => {
            const amount = row.original.amount
            return (
                <span className={amount < 0 ? "text-[#ab002b]" : "text-[#226000]"}>
                    {amount}
                </span>
            )
        }
    },

]
    