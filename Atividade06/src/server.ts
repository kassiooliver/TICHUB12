import express, { Request, Response } from "express"
import { logger } from "./middlewares/logger.js"
import ordersRouter from "./routes/orders.js"
import productsRouter from "./routes/products.js"

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(express.json())
app.use(logger)

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ message: "API rodando." })
})

app.use("/products", productsRouter)
app.use("/orders", ordersRouter)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
