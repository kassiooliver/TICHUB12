import { pool } from "../database/connection.js"
import { Category } from "../entities/Category.js"

type CategoryRow = {
  id: string
  name: string
}

export class CategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    const result = await pool.query<CategoryRow>(
      "INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING id, name",
      [category.id, category.name]
    )

    return this.toEntity(result.rows[0])
  }

  async getAllCategories(page: number, size: number): Promise<Category[]> {
    const offset = (page - 1) * size
    const result = await pool.query<CategoryRow>(
      "SELECT id, name FROM categories ORDER BY name LIMIT $1 OFFSET $2",
      [size, offset]
    )

    return result.rows.map(row => this.toEntity(row))
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const result = await pool.query<CategoryRow>("SELECT id, name FROM categories WHERE id = $1", [id])

    if (result.rowCount === 0) {
      return null
    }

    return this.toEntity(result.rows[0])
  }

  async updateCategory(category: Category): Promise<Category | null> {
    const result = await pool.query<CategoryRow>(
      "UPDATE categories SET name = $2 WHERE id = $1 RETURNING id, name",
      [category.id, category.name]
    )

    if (result.rowCount === 0) {
      return null
    }

    return this.toEntity(result.rows[0])
  }

  async deleteCategory(id: string): Promise<Category | null> {
    const result = await pool.query<CategoryRow>("DELETE FROM categories WHERE id = $1 RETURNING id, name", [id])

    if (result.rowCount === 0) {
      return null
    }

    return this.toEntity(result.rows[0])
  }

  private toEntity(row: CategoryRow) {
    return Category.create(row)
  }
}
