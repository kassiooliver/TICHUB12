import { Category } from "../entities/Category.js";
import { AppError } from "../errors/AppError.js";
export class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getAll(page, size) {
        return this.categoryRepository.getAllCategories(page, size);
    }
    async getById(id) {
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) {
            throw new AppError("Categoria nao encontrada.", 404);
        }
        return category;
    }
    async create(dto) {
        const category = Category.create({ name: dto.name });
        return this.categoryRepository.createCategory(category);
    }
    async update(id, dto) {
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) {
            throw new AppError("Categoria nao encontrada.", 404);
        }
        category.rename(dto.name);
        const updatedCategory = await this.categoryRepository.updateCategory(category);
        if (!updatedCategory) {
            throw new AppError("Categoria nao encontrada.", 404);
        }
        return updatedCategory;
    }
    async delete(id) {
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) {
            throw new AppError("Categoria nao encontrada.", 404);
        }
        await this.categoryRepository.deleteCategory(id);
    }
}
