import type { Transaction, Category } from "@/types"

type Props = {
    transactions: Transaction[]
    categories: Category[]
}

export default function RecentTransactionsCard({
    transactions,
    categories,
}: Props) {

    const recent = [...transactions]
        .sort(
            (a, b) =>
                new Date(b.date).getTime() -
                new Date(a.date).getTime()
        )
        .slice(0, 5)

    // format date → "May 5"
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
            }
        )
    }

    return (
        <div className="bg-base-brown/80 rounded-xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-accent-brown px-4 py-3">
                <h2 className="text-white font-semibold">
                    Recent Transactions
                </h2>
            </div>

            {/* CONTENT */}
            <div className="p-3 space-y-3">

                {recent.map((t) => (
                    <div
                        key={t.id}
                        className="flex justify-between items-center text-sm border-b border-white/10 pb-2 last:border-none"
                    >

                        {/* LEFT SIDE */}
                        <div className="flex flex-col">

                            {/* DATE */}
                            <span className="text-xs">
                                {formatDate(t.date)}
                            </span>

                            {/* MERCHANT */}
                            <span className="font-medium">
                                {t.merchant}
                            </span>

                            {/* CATEGORY / DESCRIPTION */}
                            <span className="text-xs text-black/50">
                                {t.description}
                            </span>

                        </div>

                        {/* RIGHT SIDE (AMOUNT) */}
                        <div
                            className={
                                t.type === "expense"
                                    ? "text-red-400 font-semibold"
                                    : "text-green-400 font-semibold"
                            }
                        >
                            {t.type === "expense" ? "-" : "+"}
                            ${Math.abs(t.amount).toFixed(2)}
                        </div>

                    </div>
                ))}

                {recent.length === 0 && (
                    <p className="text-sm text-white/70 text-center py-4">
                        No recent transactions
                    </p>
                )}
            </div>
        </div>
    )
}