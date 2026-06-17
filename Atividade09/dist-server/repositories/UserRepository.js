import { pool } from "../database/connection.js";
import { User } from "../entities/User.js";
export class UserRepository {
    async createUser(user) {
        const result = await pool.query("INSERT INTO users (id, username, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, password_hash, role", [user.id, user.username, user.email, user.passwordHash, user.role]);
        return this.toEntity(result.rows[0]);
    }
    async getUserByEmail(email) {
        const result = await pool.query("SELECT id, username, email, password_hash, role FROM users WHERE email = $1", [email.trim().toLowerCase()]);
        if (result.rowCount === 0) {
            return null;
        }
        return this.toEntity(result.rows[0]);
    }
    toEntity(row) {
        return User.create({
            id: row.id,
            username: row.username,
            email: row.email,
            passwordHash: row.password_hash,
            role: row.role
        });
    }
}
