import { NextFunction, Request, Response, Router } from "express"
import { validateOrderBody } from "../middlewares/validateOrderBody.js"

interface CreateOrderBody {
  customerName: string
  productIds: number[]
}

interface UpdateOrderStatusBody {
  status: string
}

const router = Router()

router.post("/", validateOrderBody, (req: Request<{}, {}, CreateOrderBody>, res: Response, _next: NextFunction) => {
  return res.status(201).json(req.body)
})

router.patch("/:id", (req: Request<{ id: string }, {}, UpdateOrderStatusBody>, res: Response, _next: NextFunction) => {
  const { id } = req.params
  const { status } = req.body

  return res.status(200).json({
    id,
    status
  })
})

router.delete("/:id", (_req: Request<{ id: string }>, res: Response, _next: NextFunction) => {
  return res.status(204).send()
})

export default router
