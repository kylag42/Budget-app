export type CoachPayload = {
  transactions: any[]
  budgets: any[]
  currentMonth: string
}

export async function getCoachAdvice({
  transactions,
  budgets,
  currentMonth,
}: {
  transactions: any[]
  budgets: any[]
  currentMonth: string
}) {
  const res = await fetch(
    "http://localhost:3001/api/coach",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactions,
        budgets,
        currentMonth,
      }),
    }
  )

  if (!res.ok) {
    throw new Error("Coach request failed")
  }

  const data = await res.json()

  return data
}