import { NextFunction, Request, Response } from "express"
import { CreateProductDto, ProductListDto, ProductResponseDto, UpdateProductDto } from "../dtos/product.dto.js"
import { ProductService } from "../services/ProductService.js"

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, size } = res.locals.query as { page: number; size: number }
      const products = await this.productService.getAll(page, size)

      return res.status(200).json(ProductListDto.create(products, page, size))
    } catch (error) {
      return next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals.params as { id: string }
      const product = await this.productService.getById(id)

      return res.status(200).json(ProductResponseDto.create(product))
    } catch (error) {
      return next(error)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateProductDto.create(req.body)
      const product = await this.productService.create(dto)

      return res.status(201).json(ProductResponseDto.create(product))
    } catch (error) {
      return next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals.params as { id: string }
      const dto = UpdateProductDto.create(req.body)
      const product = await this.productService.update(id, dto)

      return res.status(200).json(ProductResponseDto.create(product))
    } catch (error) {
      return next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals.params as { id: string }
      await this.productService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}
