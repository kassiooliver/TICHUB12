export class Product {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly categoryId: string
  ) {}

  static create(data: { id?: string; name: string; price: number; stock: number; categoryId: string }) {
    const name = data.name.trim()

    if (name.length < 3) {
      throw new Error("O nome do produto deve ter no minimo 3 caracteres.")
    }

    if (data.price <= 0) {
      throw new Error("O preco do produto deve ser positivo.")
    }

    if (data.stock < 0) {
      throw new Error("O estoque do produto nao pode ser negativo.")
    }

    return new Product(data.id ?? crypto.randomUUID(), name, data.price, data.stock, data.categoryId)
  }
}
