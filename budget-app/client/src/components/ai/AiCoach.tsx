import { useState } from "react"
import { getCoachAdvice } from "@/api/ai/coachApi"

type CoachResult = {
  insight: string
  risk: string
  action: string
  savingTip: string
}

type Props = {
  transactions: any[]
  budgets: any[]
  currentMonth: string
}

export default function AiCoach({
  transactions,
  budgets,
  currentMonth,
}: Props) {
  const [result, setResult] = useState<CoachResult | null>(null)
  const [loading, setLoading] = useState(false)

  const askCoach = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await getCoachAdvice({
        transactions,
        budgets,
        currentMonth,
      })

      setResult(response)

    } catch (err) {
      console.error(err)

      setResult({
        insight: "Unable to analyze your budget right now.",
        risk: "Try again in a moment.",
        action: "Check your budget data.",
        savingTip: "Keep tracking your spending.",
      })
    }

    setLoading(false)
  }


  return (
    <div className="bg-base-brown/80 rounded-xl overflow-hidden">

            <div className="bg-accent-brown px-4 py-3 rounded-t-xl text-center">
                <h2 className="text-lg font-semibold text-white">
                    Financial Report 
                </h2>
            </div>

        <div className="flex justify-center items-center p-5">
        <button
          onClick={askCoach}
          disabled={loading}
          className="bg-accent-brown px-4 py-2 rounded text-white disabled:opacity-50"
        >
          {loading
            ? "Thinking..."
            : "Generate Report"}
        </button>
      </div>


      {loading && (
        <p className="mt-4 text-md p-3 text-center">
          Analyzing your budget...
        </p>
      )}


      {result && (
        <div className="grid md:grid-cols-2 gap-4 mt-5 p-3">


          <div className="p-4 rounded-xl bg-accent-brown/50 shadow">
            <h3 className="font-bold mb-2">
              Insight
            </h3>
            <p className="text-sm">
              {result.insight}
            </p>
          </div>


          <div className="p-4 rounded-xl bg-accent-brown/50 shadow">
            <h3 className="font-bold mb-2">
              Risk
            </h3>
            <p className="text-sm">
              {result.risk}
            </p>
          </div>


          <div className="p-4 rounded-xl bg-accent-brown/50 shadow">
            <h3 className="font-bold mb-2">
              Action Step
            </h3>
            <p className="text-sm">
              {result.action}
            </p>
          </div>


          <div className="p-4 rounded-xl bg-accent-brown/50 shadow">
            <h3 className="font-bold mb-2">
              Saving Tip
            </h3>
            <p className="text-sm">
              {result.savingTip}
            </p>
          </div>


        </div>
      )}

    </div>
  )
}