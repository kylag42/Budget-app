import type { ColumnDef } from "@tanstack/react-table"
import type { Transaction } from "@/types/transaction"
import { useEffect, useRef } from "react"

export const columns: ColumnDef<Transaction>[] = [ 
    {
        id: "select",
        header: ({table}) => (
            <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()} />
        ),

        cell: ({ row }) => (
            <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()} />
        ),
    },
    {
        accessorKey: "date",
        header: "Date",

         cell: ({ row }) => {
             const formatted = new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
            }).format(new Date(row.original.date))

            return formatted
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
                <span className={amount < 0 ? "text-red-500" : "text-green-500"}>
                    {amount}
                </span>
            )
        }
    },

]
    