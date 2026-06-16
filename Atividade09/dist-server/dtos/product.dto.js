export class CreateProductDto {
    constructor(name, price, stock, categoryId) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.categoryId = categoryId;
    }
    static create(data) {
        return new CreateProductDto(data.name, data.price, data.stock, data.categoryId);
    }
}
export class UpdateProductDto {
    constructor(name, price, stock, categoryId) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.categoryId = categoryId;
    }
    static create(data) {
        return new UpdateProductDto(data.name, data.price, data.stock, data.categoryId);
    }
}
export class ProductResponseDto {
    constructor(id, name, price, stock, categoryId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.categoryId = categoryId;
    }
    static create(product) {
        return new ProductResponseDto(product.id, product.name, product.price, product.stock, product.categoryId);
    }
}
export class ProductListDto {
    constructor(data, page, size) {
        this.data = data;
        this.page = page;
        this.size = size;
    }
    static create(products, page, size) {
        return new ProductListDto(products.map(ProductResponseDto.create), page, size);
    }
}
