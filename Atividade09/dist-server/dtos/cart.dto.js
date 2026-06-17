import { ProductResponseDto } from "./product.dto.js";
export class AddCartItemDto {
    constructor(productId, quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
    static create(data) {
        return new AddCartItemDto(data.productId, data.quantity ?? 1);
    }
}
export class UpdateCartItemDto {
    constructor(quantity) {
        this.quantity = quantity;
    }
    static create(data) {
        return new UpdateCartItemDto(data.quantity);
    }
}
export class CartItemResponseDto {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    static create(item) {
        return new CartItemResponseDto(ProductResponseDto.create(item.product), item.quantity);
    }
}
export class CartResponseDto {
    constructor(data) {
        this.data = data;
    }
    static create(items) {
        return new CartResponseDto(items.map(CartItemResponseDto.create));
    }
}
