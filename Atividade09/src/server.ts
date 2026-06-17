import express, { Request, Response } from "express"
import { pathToFileURL } from "url"
import { initializeDatabase } from "./database/initializeDatabase.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js"
import { logger } from "./middlewares/logger.js"
import authRouter from "./routes/auth.js"
import cartRouter from "./routes/cart.js"
import categoryRouter from "./routes/category.router.js"
import ordersRouter from "./routes/orders.js"
import productsRouter from "./routes/products.js"

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")

  if (req.method === "OPTIONS") {
    return res.sendStatus(204)
  }

  return next()
})
app.use(logger)

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ message: "API rodando." })
})

app.use("/categories", categoryRouter)
app.use("/category", categoryRouter)
app.use("/products", productsRouter)
app.use("/auth", authRouter)
app.use("/cart", cartRouter)
app.use("/orders", ordersRouter)
app.use(errorMiddleware)

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await initializeDatabase()

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
  })
}

export default app
