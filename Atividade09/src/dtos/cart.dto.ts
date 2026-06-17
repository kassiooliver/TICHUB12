import { CartItemEntity } from "../repositories/CartRepository.js"
import { ProductResponseDto } from "./product.dto.js"

export class AddCartItemDto {
  private constructor(
    public readonly productId: string,
    public readonly quantity: number
  ) {}

  static create(data: { productId: string; quantity?: number }) {
    return new AddCartItemDto(data.productId, data.quantity ?? 1)
  }
}

export class UpdateCartItemDto {
  private constructor(public readonly quantity: number) {}

  static create(data: { quantity: number }) {
    return new UpdateCartItemDto(data.quantity)
  }
}

export class CartItemResponseDto {
  private constructor(
    public readonly product: ProductResponseDto,
    public readonly quantity: number
  ) {}

  static create(item: CartItemEntity) {
    return new CartItemResponseDto(ProductResponseDto.create(item.product), item.quantity)
  }
}

export class CartResponseDto {
  private constructor(public readonly data: CartItemResponseDto[]) {}

  static create(items: CartItemEntity[]) {
    return new CartResponseDto(items.map(CartItemResponseDto.create))
  }
}
