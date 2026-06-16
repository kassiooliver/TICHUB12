import { NextFunction, Request, Response } from "express"
import { CategoryListDto, CategoryResponseDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto.js"
import { CategoryService } from "../services/CategoryService.js"

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, size } = res.locals.query as { page: number; size: number }
      const categories = await this.categoryService.getAll(page, size)

      return res.status(200).json(CategoryListDto.create(categories, page, size))
    } catch (error) {
      return next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals.params as { id: string }
      const category = await this.categoryService.getById(id)

      return res.status(200).json(CategoryResponseDto.create(category))
    } catch (error) {
      return next(error)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateCategoryDto.create(req.body)
      const category = await this.categoryService.create(dto)

      return res.status(201).json(CategoryResponseDto.create(category))
    } catch (error) {
      return next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals.params as { id: string }
      const dto = UpdateCategoryDto.create(req.body)
      const category = await this.categoryService.update(id, dto)

      return res.status(200).json(CategoryResponseDto.create(category))
    } catch (error) {
      return next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals.params as { id: string }
      await this.categoryService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}
