import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type SortingState,
    type RowSelectionState,
    getPaginationRowModel,
} from "@tanstack/react-table"
import { useState } from "react"
import { columns } from "./columns"
import type { Transaction } from "@/types/transaction"
import {
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
} from "lucide-react"
import AddTransactionModal from "./AddTransactionModal"

type Props = {
    data: Transaction[]
    onDeleteSelected: (ids: string[]) => void
    onAdd: () => void
    onEdit: (transaction: Transaction) => void
}

export default function TransactionTable({ data, onDeleteSelected, onAdd, onEdit }: Props) {
    const [sorting, setSorting] = useState<SortingState>([])

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})


    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            rowSelection,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),

        enableRowSelection: true,
    })

    const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original)


    return (
        <div className="border-base-brown rounded">
            <div className="flex gap-2 p-2 border-b rounded bg-[#954B00]/50">

                <button 
                onClick={onAdd}
                className="border p-2 rounded w-20">Add</button>
                <button 
                onClick={() => onEdit(selectedRows[0])}
                className="border p-2 rounded w-20 disabled:opacity-50" disabled={selectedRows.length !== 1}>Edit</button>
                <button className="border p-2 rounded w-20 disabled:opacity-50" disabled={selectedRows.length === 0} onClick={() => {
                    const ids = selectedRows.map((t) => t.id)
                    onDeleteSelected(ids)
                }}>Delete</button>

            </div>
            <div className="border">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id}>
                                {hg.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="p-2 text-left cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}>
                                        <div className="inline-flex items-center gap-1 whitespace-nowrap">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanSort() && (
                                                {
                                                    asc: <ArrowUp className="w-4 h-4" />,
                                                    desc: <ArrowDown className="w-4 h-4" />,
                                                }[header.column.getIsSorted() as string] ?? (
                                                    <ArrowUpDown className="w-4 h-4 opacity-40" />
                                                ))
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>

                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t border-gray-600">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-2">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-accent-brown/50 border rounded-full shadow-sm w-fit">
                    Page {table.getState().pagination.pageIndex + 1} of {" "}
                    {table.getPageCount()}
                    <button
                        className="px-3 py-1 bg-base-brown border border-accent-red rounded disabled:opacity-50 enabled:bg-base-brown/50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        Previous
                    </button>

                    <button className="px-3 py-1 bg-base-brown/50 border border-accent-red rounded disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                    <select
                        className="bg-base-brown/50 border border-accent-red p-1 rounded"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                Number of rows: {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
           </div>
        
    )
}