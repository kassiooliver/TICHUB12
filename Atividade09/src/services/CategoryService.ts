import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto.js"
import { Category } from "../entities/Category.js"
import { AppError } from "../errors/AppError.js"
import { CategoryRepository } from "../repositories/CategoryRepository.js"

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll(page: number, size: number) {
    return this.categoryRepository.getAllCategories(page, size)
  }

  async getById(id: string) {
    const category = await this.categoryRepository.getCategoryById(id)

    if (!category) {
      throw new AppError("Categoria nao encontrada.", 404)
    }

    return category
  }

  async create(dto: CreateCategoryDto) {
    const category = Category.create({ name: dto.name })
    return this.categoryRepository.createCategory(category)
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.getCategoryById(id)

    if (!category) {
      throw new AppError("Categoria nao encontrada.", 404)
    }

    category.rename(dto.name)

    const updatedCategory = await this.categoryRepository.updateCategory(category)

    if (!updatedCategory) {
      throw new AppError("Categoria nao encontrada.", 404)
    }

    return updatedCategory
  }

  async delete(id: string) {
    const category = await this.categoryRepository.getCategoryById(id)

    if (!category) {
      throw new AppError("Categoria nao encontrada.", 404)
    }

    await this.categoryRepository.deleteCategory(id)
  }
}
