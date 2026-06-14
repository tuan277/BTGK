

const pool = require('../config/db');

const ProductModel = {

    async create(product) {
        const { product_name, description, price, stock_quantity, category_id, image_url } = product;
        const sql = `
            INSERT INTO products (product_name, description, price, stock_quantity, category_id, image_url)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(sql, [
            product_name, description, price, stock_quantity, category_id, image_url
        ]);
        return result.insertId;
    },


    async getAll() {
        const sql = `
            SELECT p.product_id, p.product_name, p.description, p.price,
                   p.stock_quantity, p.image_url, p.created_at, p.updated_at,
                   c.category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            ORDER BY p.product_id DESC
        `;
        const [rows] = await pool.query(sql);
        return rows;
    },


    async getById(id) {
        const sql = `
            SELECT p.*, c.category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE p.product_id = ?
        `;
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    },


    async update(id, product) {
        const { product_name, description, price, stock_quantity, category_id, image_url } = product;
        const sql = `
            UPDATE products
            SET product_name = ?, description = ?, price = ?,
                stock_quantity = ?, category_id = ?, image_url = ?
            WHERE product_id = ?
        `;
        const [result] = await pool.query(sql, [
            product_name, description, price, stock_quantity, category_id, image_url, id
        ]);
        return result.affectedRows;
    },


    async remove(id) {
        const sql = `DELETE FROM products WHERE product_id = ?`;
        const [result] = await pool.query(sql, [id]);
        return result.affectedRows;
    }
};

module.exports = ProductModel;
