import ReactECharts from "echarts-for-react"

import type {
    Transaction,
    Category,
} from "@/types"

const ECharts = ReactECharts as any

type Props = {
    transactions: Transaction[]
    categories: Category[]
}

export default function TopCategoriesCard({
    transactions,
    categories,
}: Props) {
    // -----------------------
    // MAP CATEGORY NAMES
    // -----------------------
    const categoryMap = new Map(
        categories.map((c) => [c.id, c.name])
    )

    // -----------------------
    // AGGREGATE EXPENSES
    // -----------------------
    const totals = new Map<string, number>()

    transactions
        .filter((t) => t.type === "expense")
        .forEach((tx) => {
            const prev =
                totals.get(tx.categoryId) ?? 0

            totals.set(
                tx.categoryId,
                prev + Math.abs(tx.amount)
            )
        })

    // -----------------------
    // FORMAT DATA
    // -----------------------
    const data = Array.from(totals.entries())
        .map(([categoryId, value]) => ({
            name:
                categoryMap.get(categoryId) ??
                "Unknown",
            value,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)

    // -----------------------
    // ECHARTS
    // -----------------------
    const option = {
        color: [
            "#964b00",
            "#be45aa",
            "#009efe",
            "#00c16b",
            "#ffa600",
        ],
        backgroundColor: "transparent",

        tooltip: {
            trigger: "item",
            backgroundColor: "#1f1a16",
            borderColor: "#5A2D06",
            textStyle: {
                color: "#fff",
            },
        },

        legend: {
            bottom: 0,
            textStyle: {
                color: "#000",
            },
        },

        series: [
            {
                name: "Spending",
                type: "pie",
                radius: "60%",
                data,
                label: {
                    color: "#000",
                    formatter: "{b}: ${c}",
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 15,
                        shadowColor: "rgba(0,0,0,0.5)",
                    },
                },
            },
        ],
    }

    return (
        <div className="bg-base-brown/80 rounded-xl overflow-hidden">

            <div className="bg-accent-brown px-4 py-3 rounded-t-xl">
                <h2 className="text-lg font-semibold text-white">
                    Top 5 Spending Categories
                </h2>
            </div>

            <div className="h-72">
                <ECharts option={option} />
            </div>
        </div>
    )
}
