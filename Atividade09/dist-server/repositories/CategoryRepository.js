import { pool } from "../database/connection.js";
import { Category } from "../entities/Category.js";
export class CategoryRepository {
    async createCategory(category) {
        const result = await pool.query("INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING id, name", [category.id, category.name]);
        return this.toEntity(result.rows[0]);
    }
    async getAllCategories(page, size) {
        const offset = (page - 1) * size;
        const result = await pool.query("SELECT id, name FROM categories ORDER BY name LIMIT $1 OFFSET $2", [size, offset]);
        return result.rows.map(row => this.toEntity(row));
    }
    async getCategoryById(id) {
        const result = await pool.query("SELECT id, name FROM categories WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return null;
        }
        return this.toEntity(result.rows[0]);
    }
    async updateCategory(category) {
        const result = await pool.query("UPDATE categories SET name = $2 WHERE id = $1 RETURNING id, name", [category.id, category.name]);
        if (result.rowCount === 0) {
            return null;
        }
        return this.toEntity(result.rows[0]);
    }
    async deleteCategory(id) {
        const result = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING id, name", [id]);
        if (result.rowCount === 0) {
            return null;
        }
        return this.toEntity(result.rows[0]);
    }
    toEntity(row) {
        return Category.create(row);
    }
}
