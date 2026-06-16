import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto.js"
import { Product } from "../entities/Product.js"
import { AppError } from "../errors/AppError.js"
import { CategoryRepository } from "../repositories/CategoryRepository.js"
import { ProductRepository } from "../repositories/ProductRepository.js"

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async getAll(page: number, size: number) {
    return this.productRepository.getAllProducts(page, size)
  }

  async getById(id: string) {
    const product = await this.productRepository.getProductById(id)

    if (!product) {
      throw new AppError("Produto nao encontrado.", 404)
    }

    return product
  }

  async create(dto: CreateProductDto) {
    const category = await this.categoryRepository.getCategoryById(dto.categoryId)

    if (!category) {
      throw new AppError("Categoria nao encontrada.", 404)
    }

    const product = Product.create({
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
      categoryId: dto.categoryId
    })

    return this.productRepository.createProduct(product)
  }

  async update(id: string, dto: UpdateProductDto) {
    const currentProduct = await this.productRepository.getProductById(id)

    if (!currentProduct) {
      throw new AppError("Produto nao encontrado.", 404)
    }

    const nextCategoryId = dto.categoryId ?? currentProduct.categoryId

    if (nextCategoryId !== currentProduct.categoryId) {
      const category = await this.categoryRepository.getCategoryById(nextCategoryId)

      if (!category) {
        throw new AppError("Categoria nao encontrada.", 404)
      }
    }

    const product = Product.create({
      id: currentProduct.id,
      name: dto.name ?? currentProduct.name,
      price: dto.price ?? currentProduct.price,
      stock: dto.stock ?? currentProduct.stock,
      categoryId: nextCategoryId
    })

    const updatedProduct = await this.productRepository.updateProduct(product)

    if (!updatedProduct) {
      throw new AppError("Produto nao encontrado.", 404)
    }

    return updatedProduct
  }

  async delete(id: string) {
    const product = await this.productRepository.getProductById(id)

    if (!product) {
      throw new AppError("Produto nao encontrado.", 404)
    }

    await this.productRepository.deleteProduct(id)
  }
}
