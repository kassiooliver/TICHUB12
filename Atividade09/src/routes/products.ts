import { Router } from "express"
import { ProductController } from "../controllers/product.controller.js"
import { Role } from "../enums/Role.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { authorize } from "../middlewares/authorize.js"
import { validateData } from "../middlewares/validateData.js"
import { CategoryRepository } from "../repositories/CategoryRepository.js"
import { ProductRepository } from "../repositories/ProductRepository.js"
import { createProductSchema, productParamsSchema, productQuerySchema, updateProductSchema } from "../schemas/product.schema.js"
import { ProductService } from "../services/ProductService.js"

const router = Router()
const productRepository = new ProductRepository()
const categoryRepository = new CategoryRepository()
const productService = new ProductService(productRepository, categoryRepository)
const productController = new ProductController(productService)

router.get("/", validateData(productQuerySchema, "query"), productController.getAll)
router.get("/:id", validateData(productParamsSchema, "params"), productController.getById)
router.post("/", authMiddleware, authorize(Role.ADMIN), validateData(createProductSchema), productController.create)
router.put(
  "/:id",
  authMiddleware,
  authorize(Role.ADMIN),
  validateData(productParamsSchema, "params"),
  validateData(updateProductSchema),
  productController.update
)
router.delete(
  "/:id",
  authMiddleware,
  authorize(Role.ADMIN),
  validateData(productParamsSchema, "params"),
  productController.delete
)

export default router
