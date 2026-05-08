import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type SortingState,
} from "@tanstack/react-table"
import { useState } from "react"
import { columns } from "./columns"
import type { Transaction } from "@/types/transaction"
import type { RowSelectionState, } from "@tanstack/react-table"

type Props = {
    data: Transaction[]
    onDeleteSelected: (ids: string[]) => void
}

export default function TransactionTable({ data, onDeleteSelected, }: Props) {
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

        enableRowSelection: true,
    })

    const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original)
        
        
    return (
        <div className="border rounded">
            <div className="flex gap-2 p-2 border-b">

            <button className="border p-2 rounded w-20">Add</button>
            <button className="border p-2 rounded w-20 disabled:opacity-50" disabled={selectedRows.length !== 1}>Edit</button>
            <button className="border p-2 rounded w-20 disabled:opacity-50" disabled={selectedRows.length === 0} onClick={() => {const ids = selectedRows.map((t) => t.id) 
                onDeleteSelected(ids)}}>Delete</button>
            
            </div>

            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="p-2 text-left cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>

                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-t">
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

    )
}