import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import transactionRoutes from "./routes/transactionRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"

dotenv.config()

const app = express()

// -----------------------
// MIDDLEWARE
// -----------------------

app.use(
  cors({
    origin: [
      "http://localhost:5175",
      "http://localhost:5173",
    ],
  })
)

app.use(express.json())


// -----------------------
// AI COACH ROUTE
// -----------------------

app.post("/api/coach", async (req, res) => {
  try {
    const {
      transactions = [],
      budgets = [],
      currentMonth,
    } = req.body


    const income = transactions
      .filter((t: any) => t.type === "income")
      .reduce(
        (sum: number, t: any) =>
          sum + Number(t.amount),
        0
      )


    const spent = transactions
      .filter((t: any) => t.type === "expense")
      .reduce(
        (sum: number, t: any) =>
          sum + Number(t.amount),
        0
      )


    const budgeted = budgets
      .filter(
        (b: any) =>
          b.month === currentMonth
      )
      .reduce(
        (sum: number, b: any) =>
          sum + Number(b.amount),
        0
      )


    const remaining = budgeted - spent


    const prompt = `
You are a financial coach.

Analyze this monthly budget:

Income: $${income}
Budgeted: $${budgeted}
Spent: $${spent}
Remaining: $${remaining}

Create a short financial coaching report.

Return ONLY valid JSON.
No markdown.
No code blocks.
No explanations.

Use exactly this format:

{
  "insight": "A short observation about their finances",
  "risk": "A possible financial concern",
  "action": "One practical next step",
  "savingTip": "One saving recommendation"
}
`


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    )


    const data = await response.json()


    console.log(
      "GEMINI RAW RESPONSE:",
      JSON.stringify(data, null, 2)
    )


    if (data?.error) {
      return res.json({
        insight:
          "AI coach is temporarily unavailable.",
        risk:
          "Try again in a moment.",
        action:
          "Continue tracking your spending.",
        savingTip:
          "Review your budget regularly.",
      })
    }


    const raw =
      data?.candidates?.[0]
        ?.content
        ?.parts?.[0]
        ?.text || "{}"


    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()


    let result

    try {
      result = JSON.parse(cleaned)
    } catch (error) {
      console.error(
        "JSON PARSE ERROR:",
        cleaned
      )

      result = {
        insight:
          "Unable to read AI response.",
        risk:
          "AI returned unexpected data.",
        action:
          "Try asking again.",
        savingTip:
          "Keep monitoring your budget.",
      }
    }


    return res.json(result)


  } catch (err) {
    console.error(
      "COACH ERROR:",
      err
    )

    return res.status(500).json({
      error:
        "Gemini coach failed",
    })
  }
})


// -----------------------
// API ROUTES
// -----------------------

app.use(
  "/transactions",
  transactionRoutes
)

app.use(
  "/categories",
  categoryRoutes
)


// -----------------------
// START SERVER
// -----------------------

app.listen(3001, () => {
  console.log(
    "Server running on port 3001"
  )
})

