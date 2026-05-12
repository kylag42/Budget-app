import {useState,} from "react"
import {type Transaction } from "@/types/transaction"
import {type TransactionFormState} from "@/types/form"
import type { ReactNode } from "react"



type Props = {
    open: boolean
    onClose: () => void
    mode?: "add" | "edit"
    children: ReactNode
}

export default function AddTransactionModal({
    open,
    onClose,
    mode,
    children,
}: Props) {

    if(!open) return null


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[#5a2d06] rounded-2xl p-6 w-full max-w-md shadow-xl">
                <h1 className="text-center text-custom-yellow font-bold text-2xl">{mode === "edit"? "Edit Transaction" : "Add Transaction"}</h1>
               <div className="flex justify-end">
                
               <button className="text-custom-yellow" onClick={onClose}>x</button>
               </div>
               {children}
            </div>
        </div>
    )
}

