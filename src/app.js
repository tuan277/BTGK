

const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Route mặc định
app.get('/', (req, res) => {
    res.json({
        message: 'API CRUD Sản phẩm - Ứng dụng Thương mại điện tử Đa mặt hàng',
        endpoints: {
            'POST   /api/products': 'Tạo sản phẩm mới (Create)',
            'GET    /api/products': 'Lấy danh sách sản phẩm (Read)',
            'GET    /api/products/:id': 'Lấy chi tiết 1 sản phẩm (Read)',
            'PUT    /api/products/:id': 'Cập nhật sản phẩm (Update)',
            'DELETE /api/products/:id': 'Xóa sản phẩm (Delete)'
        }
    });
});

// Đăng ký routes cho Product
app.use('/api/products', productRoutes);

// Xử lý route không tồn tại
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route không tồn tại' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
