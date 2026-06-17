import { pool } from "../database/connection.js";
import { Product } from "../entities/Product.js";
export class CartRepository {
    async getCartByUserId(userId) {
        const result = await pool.query(`SELECT ci.quantity, p.id, p.name, p.price, p.stock, p.category_id
       FROM cart_items ci
       INNER JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = $1
       ORDER BY p.name`, [userId]);
        return result.rows.map(row => ({
            quantity: row.quantity,
            product: this.toProduct(row)
        }));
    }
    async addItem(userId, productId, quantity) {
        const result = await pool.query(`INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
       RETURNING quantity,
         (SELECT id FROM products WHERE id = $2) AS id,
         (SELECT name FROM products WHERE id = $2) AS name,
         (SELECT price FROM products WHERE id = $2) AS price,
         (SELECT stock FROM products WHERE id = $2) AS stock,
         (SELECT category_id FROM products WHERE id = $2) AS category_id`, [userId, productId, quantity]);
        if (result.rowCount === 0 || !result.rows[0].id) {
            return null;
        }
        return {
            quantity: result.rows[0].quantity,
            product: this.toProduct(result.rows[0])
        };
    }
    async updateItem(userId, productId, quantity) {
        const result = await pool.query(`UPDATE cart_items ci
       SET quantity = $3
       FROM products p
       WHERE ci.product_id = p.id AND ci.user_id = $1 AND ci.product_id = $2
       RETURNING ci.quantity, p.id, p.name, p.price, p.stock, p.category_id`, [userId, productId, quantity]);
        if (result.rowCount === 0) {
            return null;
        }
        return {
            quantity: result.rows[0].quantity,
            product: this.toProduct(result.rows[0])
        };
    }
    async removeItem(userId, productId) {
        const result = await pool.query("DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2", [userId, productId]);
        return result.rowCount !== null && result.rowCount > 0;
    }
    async clearCart(userId) {
        await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);
    }
    toProduct(row) {
        return Product.create({
            id: row.id,
            name: row.name,
            price: Number(row.price),
            stock: row.stock,
            categoryId: row.category_id
        });
    }
}
