export class Product {
    constructor(id, name, price, stock, categoryId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.categoryId = categoryId;
    }
    static create(data) {
        const name = data.name.trim();
        if (name.length < 3) {
            throw new Error("O nome do produto deve ter no minimo 3 caracteres.");
        }
        if (data.price <= 0) {
            throw new Error("O preco do produto deve ser positivo.");
        }
        if (data.stock < 0) {
            throw new Error("O estoque do produto nao pode ser negativo.");
        }
        return new Product(data.id ?? crypto.randomUUID(), name, data.price, data.stock, data.categoryId);
    }
}
