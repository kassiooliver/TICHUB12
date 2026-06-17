import { AddCartItemDto, UpdateCartItemDto } from "../dtos/cart.dto.js"
import { AppError } from "../errors/AppError.js"
import { CartRepository } from "../repositories/CartRepository.js"
import { ProductRepository } from "../repositories/ProductRepository.js"

export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async getCart(userId: string) {
    return this.cartRepository.getCartByUserId(userId)
  }

  async addItem(userId: string, dto: AddCartItemDto) {
    const product = await this.productRepository.getProductById(dto.productId)

    if (!product) {
      throw new AppError("Produto nao encontrado.", 404)
    }

    return this.cartRepository.addItem(userId, dto.productId, dto.quantity)
  }

  async updateItem(userId: string, productId: string, dto: UpdateCartItemDto) {
    const item = await this.cartRepository.updateItem(userId, productId, dto.quantity)

    if (!item) {
      throw new AppError("Item do carrinho nao encontrado.", 404)
    }

    return item
  }

  async removeItem(userId: string, productId: string) {
    const removed = await this.cartRepository.removeItem(userId, productId)

    if (!removed) {
      throw new AppError("Item do carrinho nao encontrado.", 404)
    }
  }

  async clearCart(userId: string) {
    await this.cartRepository.clearCart(userId)
  }
}
