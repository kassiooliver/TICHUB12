import { Product } from "../entities/Product.js";
import { AppError } from "../errors/AppError.js";
export class ProductService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async getAll(page, size) {
        return this.productRepository.getAllProducts(page, size);
    }
    async getById(id) {
        const product = await this.productRepository.getProductById(id);
        if (!product) {
            throw new AppError("Produto nao encontrado.", 404);
        }
        return product;
    }
    async create(dto) {
        const category = await this.categoryRepository.getCategoryById(dto.categoryId);
        if (!category) {
            throw new AppError("Categoria nao encontrada.", 404);
        }
        const product = Product.create({
            name: dto.name,
            price: dto.price,
            stock: dto.stock,
            categoryId: dto.categoryId
        });
        return this.productRepository.createProduct(product);
    }
    async update(id, dto) {
        const currentProduct = await this.productRepository.getProductById(id);
        if (!currentProduct) {
            throw new AppError("Produto nao encontrado.", 404);
        }
        const nextCategoryId = dto.categoryId ?? currentProduct.categoryId;
        if (nextCategoryId !== currentProduct.categoryId) {
            const category = await this.categoryRepository.getCategoryById(nextCategoryId);
            if (!category) {
                throw new AppError("Categoria nao encontrada.", 404);
            }
        }
        const product = Product.create({
            id: currentProduct.id,
            name: dto.name ?? currentProduct.name,
            price: dto.price ?? currentProduct.price,
            stock: dto.stock ?? currentProduct.stock,
            categoryId: nextCategoryId
        });
        const updatedProduct = await this.productRepository.updateProduct(product);
        if (!updatedProduct) {
            throw new AppError("Produto nao encontrado.", 404);
        }
        return updatedProduct;
    }
    async delete(id) {
        const product = await this.productRepository.getProductById(id);
        if (!product) {
            throw new AppError("Produto nao encontrado.", 404);
        }
        await this.productRepository.deleteProduct(id);
    }
}
