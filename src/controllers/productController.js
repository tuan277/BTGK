

const ProductModel = require('../models/productModel');

const ProductController = {

    // CREATE - POST /api/products
    async createProduct(req, res) {
        try {
            const { product_name, description, price, stock_quantity, category_id, image_url } = req.body;

            if (!product_name || price === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Thiếu thông tin bắt buộc: product_name, price'
                });
            }

            const insertId = await ProductModel.create({
                product_name, description, price,
                stock_quantity: stock_quantity || 0,
                category_id: category_id || null,
                image_url: image_url || null
            });

            return res.status(201).json({
                success: true,
                message: 'Tạo sản phẩm thành công',
                data: { product_id: insertId }
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    // READ - GET /api/products
    async getAllProducts(req, res) {
        try {
            const products = await ProductModel.getAll();
            return res.status(200).json({
                success: true,
                total: products.length,
                data: products
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    // READ - GET /api/products/:id
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.getById(id);

            if (!product) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
            }

            return res.status(200).json({ success: true, data: product });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    // UPDATE - PUT /api/products/:id
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const existing = await ProductModel.getById(id);

            if (!existing) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm để cập nhật' });
            }

            const {
                product_name = existing.product_name,
                description = existing.description,
                price = existing.price,
                stock_quantity = existing.stock_quantity,
                category_id = existing.category_id,
                image_url = existing.image_url
            } = req.body;

            const affectedRows = await ProductModel.update(id, {
                product_name, description, price, stock_quantity, category_id, image_url
            });

            if (affectedRows === 0) {
                return res.status(400).json({ success: false, message: 'Cập nhật thất bại' });
            }

            return res.status(200).json({ success: true, message: 'Cập nhật sản phẩm thành công' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    // DELETE - DELETE /api/products/:id
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const existing = await ProductModel.getById(id);

            if (!existing) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm để xóa' });
            }

            await ProductModel.remove(id);
            return res.status(200).json({ success: true, message: 'Xóa sản phẩm thành công' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = ProductController;
