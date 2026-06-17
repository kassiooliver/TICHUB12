import { pool } from "../database/connection.js"
import { Role } from "../enums/Role.js"
import { User } from "../entities/User.js"

type UserRow = {
  id: string
  username: string
  email: string
  password_hash: string
  role: Role
}

export class UserRepository {
  async createUser(user: User): Promise<User> {
    const result = await pool.query<UserRow>(
      "INSERT INTO users (id, username, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, password_hash, role",
      [user.id, user.username, user.email, user.passwordHash, user.role]
    )

    return this.toEntity(result.rows[0])
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query<UserRow>(
      "SELECT id, username, email, password_hash, role FROM users WHERE email = $1",
      [email.trim().toLowerCase()]
    )

    if (result.rowCount === 0) {
      return null
    }

    return this.toEntity(result.rows[0])
  }

  private toEntity(row: UserRow) {
    return User.create({
      id: row.id,
      username: row.username,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role
    })
  }
}
