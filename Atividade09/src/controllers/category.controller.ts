import { NextFunction, Request, Response } from "express"
import { CategoryListDto, CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto.js"
import {
  categoryParamsSchema,
  categoryQueryPaginationSchema,
  createCategorySchema,
  updateCategorySchema
} from "../schemas/category.schema.js"
import { CategoryService } from "../services/CategoryService.js"

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, size } = categoryQueryPaginationSchema.parse(req.query)
      const categories = await this.categoryService.getAll(page, size)

      return res.status(200).json(CategoryListDto.create(categories, page, size))
    } catch (error) {
      return next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = categoryParamsSchema.parse(req.params)
      const category = await this.categoryService.getById(id)

      return res.status(200).json(CategoryResponseDto.create(category))
    } catch (error) {
      return next(error)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createCategorySchema.parse(req.body)
      const dto = CreateCategoryDto.create(data)
      const category = await this.categoryService.create(dto)

      return res.status(201).json(CategoryResponseDto.create(category))
    } catch (error) {
      return next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = categoryParamsSchema.parse(req.params)
      const data = updateCategorySchema.parse(req.body)
      const dto = UpdateCategoryDto.create(data)
      const category = await this.categoryService.update(id, dto)

      return res.status(200).json(CategoryResponseDto.create(category))
    } catch (error) {
      return next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = categoryParamsSchema.parse(req.params)
      await this.categoryService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}
