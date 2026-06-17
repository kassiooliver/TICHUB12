import { Role } from "../enums/Role.js"

export class User {
  private constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly role: Role
  ) {}

  static create(data: { id?: string; username: string; email: string; passwordHash: string; role?: Role }) {
    const username = data.username.trim()
    const email = data.email.trim().toLowerCase()

    if (username.length < 3) {
      throw new Error("O nome do usuario deve ter no minimo 3 caracteres.")
    }

    if (!email.includes("@")) {
      throw new Error("E-mail invalido.")
    }

    return new User(data.id ?? crypto.randomUUID(), username, email, data.passwordHash, data.role ?? Role.CUSTOMER)
  }
}
