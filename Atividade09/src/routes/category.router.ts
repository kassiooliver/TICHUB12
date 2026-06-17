import { Router } from "express"
import { CategoryController } from "../controllers/category.controller.js"
import { Role } from "../enums/Role.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { authorize } from "../middlewares/authorize.js"
import { CategoryRepository } from "../repositories/CategoryRepository.js"
import { CategoryService } from "../services/CategoryService.js"

const router = Router()
const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)

router.get("/", categoryController.getAll)
router.get("/:id", categoryController.getById)

router.post("/", authMiddleware, authorize(Role.ADMIN), categoryController.create)
router.put("/:id", authMiddleware, authorize(Role.ADMIN), categoryController.update)
router.delete("/:id", authMiddleware, authorize(Role.ADMIN), categoryController.delete)

export default router
