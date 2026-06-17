import type { Transaction, Account, Category } from "@/types"
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    createColumnHelper,
    getSortedRowModel,
    type SortingState,
} from "@tanstack/react-table"
import { useState } from "react"



type Props = {
    transactions: Transaction[]
    accounts: Account[]
    categories: Category[]
    selectedIds: string[]
    setSelectedIds: (
        updater:
            string[] |
            ((prev: string[]) => string[])
    ) => void

    onEdit: (tx: Transaction) => void
    onDelete: (id: string) => void
}

export default function TransactionTable({
    transactions,
    accounts,
    categories,
    selectedIds,
    setSelectedIds,
}: Props) {

    const categoryMap = new Map(
        categories.map((c) => [c.id, c.name])
    )

    const accountMap = new Map(
        accounts.map((a) => [a.id, a.name])
    )

    const [sorting, setSorting] = useState<SortingState>([])

    const columnHelper = createColumnHelper<Transaction>()

    const columns = [
        columnHelper.display({
            id: "select",
            enableSorting: false,
            header: () => {
                const allSelected =
                    transactions.length > 0 &&
                    selectedIds.length ===
                    transactions.length

                return (
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedIds(
                                    transactions.map(
                                        (t) => t.id
                                    )
                                )
                            } else {
                                setSelectedIds([])
                            }
                        }}
                        className="h-4 w-4 accent-[#5a2d06]"
                    />
                )
            },
            cell: ({ row }) => {
                const tx = row.original

                return (
                    <input
                        type="checkbox"
                        checked={selectedIds.includes(
                            tx.id
                        )}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedIds((prev) => [
                                    ...prev,
                                    tx.id,
                                ])
                            } else {
                                setSelectedIds((prev) =>
                                    prev.filter(
                                        (id) => id !== tx.id
                                    )
                                )
                            }
                        }}
                        className="h-4 w-4 accent-[#5a2d06]"
                    />
                )
            },
        }),

        columnHelper.accessor("date", {
            header: "Date",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("merchant", {
            header: "Merchant",
            cell: (info) => {
                const tx = info.row.original

                return (
                    <div>
                        <p className="font-medium">
                            {tx.merchant}
                        </p>

                        <p className="text-xs opacity-60">
                            {tx.description}
                        </p>
                    </div>
                )
            },
        }),
        columnHelper.accessor("categoryId", {
            header: "Category",
            cell: (info) =>
                categoryMap.get(
                    info.getValue()

                ) ?? "Unknown",
        }),
        columnHelper.accessor("accountId", {
            header: "Account",
            cell: (info) =>
                accountMap.get(
                    info.getValue()
                ) ?? "Unknown",
        }),
        columnHelper.accessor("type", {
            header: "Type",
            cell: (info) => (
                <span className="capitalize">
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.accessor("amount", {
            header: "Amount",
            cell: (info) => {
                const tx = info.row.original

                return (
                    <span
                        className={`font-medium ${tx.type === "income"
                            ? "text-green-600"
                            : "text-red-500"
                            }`}
                    >
                        ${info
                            .getValue()
                            .toFixed(2)}
                    </span>
                )
            },
        }),
    ]

    const table = useReactTable({
        data: transactions,
        columns,

        state: {
            sorting,
        },

        onSortingChange: setSorting,

        getCoreRowModel:
            getCoreRowModel(),

        getSortedRowModel:
            getSortedRowModel(),

        getPaginationRowModel:
            getPaginationRowModel(),

        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    return (
        <div className="space-y-4 bg-base-brown">
            <table className="w-full border-collapse">
                <thead>
                    {table
                        .getHeaderGroups()
                        .map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="border-b bg-accent-brown/50 text-white"
                            >
                                {headerGroup.headers.map(
                                    (header) => (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="text-left p-2 cursor-pointer select-none"
                                        >
                                            <div className="flex items-center gap-1">

                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                                {header.column.id !== "select" && (
                                                    <span className="text-xs opacity-60">
                                                        {header.column.getIsSorted() === "asc"
                                                            ? "↑"
                                                            : header.column.getIsSorted() === "desc"
                                                                ? "↓"
                                                                : "↕"}
                                                    </span>
                                                )}

                                            </div>
                                        </th>
                                    )
                                )}
                            </tr>
                        ))}
                </thead>
                <tbody>
                    {table
                        .getRowModel()
                        .rows.map((row) => {
                            const tx = row.original

                            const isSelected =
                                selectedIds.includes(tx.id)

                            return (
                                <tr
                                    key={row.id}
                                    className={`border-b border-accent-brown transition ${isSelected
                                        ? "bg-yellow-100"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    {row
                                        .getVisibleCells()
                                        .map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="p-2"
                                            >
                                                {flexRender(
                                                    cell.column
                                                        .columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {/* PAGINATION */}
            <div className="flex items-center justify-between m-2">
                <div className="text-sm opacity-70">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            table.previousPage()
                        }
                        disabled={
                            !table.getCanPreviousPage()
                        }
                        className="border border-accent-brown px-3 py-1 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() =>
                            table.nextPage()
                        }
                        disabled={
                            !table.getCanNextPage()
                        }
                        className="border border-accent-brown px-3 py-1 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}


