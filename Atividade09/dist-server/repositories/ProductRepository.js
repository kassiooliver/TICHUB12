import { pool } from "../database/connection.js";
import { Product } from "../entities/Product.js";
export class ProductRepository {
    async createProduct(product) {
        const result = await pool.query("INSERT INTO products (id, name, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, price, stock, category_id", [product.id, product.name, product.price, product.stock, product.categoryId]);
        return this.toEntity(result.rows[0]);
    }
    async getAllProducts(page, size) {
        const offset = (page - 1) * size;
        const result = await pool.query("SELECT id, name, price, stock, category_id FROM products ORDER BY name LIMIT $1 OFFSET $2", [size, offset]);
        return result.rows.map(row => this.toEntity(row));
    }
    async getProductById(id) {
        const result = await pool.query("SELECT id, name, price, stock, category_id FROM products WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return null;
        }
        return this.toEntity(result.rows[0]);
    }
    async updateProduct(product) {
        const result = await pool.query("UPDATE products SET name = $2, price = $3, stock = $4, category_id = $5 WHERE id = $1 RETURNING id, name, price, stock, category_id", [product.id, product.name, product.price, product.stock, product.categoryId]);
        if (result.rowCount === 0) {
            return null;
        }
        return this.toEntity(result.rows[0]);
    }
    async deleteProduct(id) {
        const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING id, name, price, stock, category_id", [id]);
        if (result.rowCount === 0) {
            return null;
        }
        return this.toEntity(result.rows[0]);
    }
    toEntity(row) {
        return Product.create({
            id: row.id,
            name: row.name,
            price: Number(row.price),
            stock: row.stock,
            categoryId: row.category_id
        });
    }
}
