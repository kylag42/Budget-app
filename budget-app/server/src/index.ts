import express from "express"
import cors from "cors"
import transactionRoutes from "./routes/transactionRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_, res) => {
    res.send("API Running")
})

app.listen(3001, () => {
    console.log("Server running on port 3001")
})

app.use("/transactions", transactionRoutes)
app.use("/categories", categoryRoutes)
