import { Router } from "express"
import { createProduct, deleteProduct, listProducts } from "../controllers/product.controller.js"
import { validateData } from "../middlewares/validateData.js"
import { createProductSchema, productParamsSchema, productQuerySchema } from "../schemas/product.schema.js"

const router = Router()

router.get("/", validateData(productQuerySchema, "query"), listProducts)
router.post("/", validateData(createProductSchema), createProduct)
router.delete("/:id", validateData(productParamsSchema, "params"), deleteProduct)

export default router
