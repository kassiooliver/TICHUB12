import { AppError } from "../errors/AppError.js";
export class CartService {
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async getCart(userId) {
        return this.cartRepository.getCartByUserId(userId);
    }
    async addItem(userId, dto) {
        const product = await this.productRepository.getProductById(dto.productId);
        if (!product) {
            throw new AppError("Produto nao encontrado.", 404);
        }
        return this.cartRepository.addItem(userId, dto.productId, dto.quantity);
    }
    async updateItem(userId, productId, dto) {
        const item = await this.cartRepository.updateItem(userId, productId, dto.quantity);
        if (!item) {
            throw new AppError("Item do carrinho nao encontrado.", 404);
        }
        return item;
    }
    async removeItem(userId, productId) {
        const removed = await this.cartRepository.removeItem(userId, productId);
        if (!removed) {
            throw new AppError("Item do carrinho nao encontrado.", 404);
        }
    }
    async clearCart(userId) {
        await this.cartRepository.clearCart(userId);
    }
}
