export class Category {
  private constructor(
    public readonly id: string,
    public name: string
  ) {}

  static create(data: { id?: string; name: string }) {
    const name = data.name.trim()

    if (name.length < 3) {
      throw new Error("O nome da categoria deve ter no minimo 3 caracteres.")
    }

    return new Category(data.id ?? crypto.randomUUID(), name)
  }

  rename(name: string) {
    const newName = name.trim()

    if (newName.length < 3) {
      throw new Error("O nome da categoria deve ter no minimo 3 caracteres.")
    }

    this.name = newName
  }
}
