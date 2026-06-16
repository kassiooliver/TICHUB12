export class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static create(data) {
        const name = data.name.trim();
        if (name.length < 3) {
            throw new Error("O nome da categoria deve ter no minimo 3 caracteres.");
        }
        return new Category(data.id ?? crypto.randomUUID(), name);
    }
    rename(name) {
        const newName = name.trim();
        if (newName.length < 3) {
            throw new Error("O nome da categoria deve ter no minimo 3 caracteres.");
        }
        this.name = newName;
    }
}
