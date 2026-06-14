# Đề tài: Xây dựng ứng dụng Thương mại điện tử Đa mặt hàng

## Mô tả
Module thực hành CRUD trên đối tượng **Sản phẩm (Product)** sử dụng Node.js (Express) + MySQL.

## Cấu trúc thư mục
```
ecommerce-crud/
├── sql/
│   └── init.sql              # Script tạo database, bảng, dữ liệu mẫu
├── src/
│   ├── config/db.js           # Kết nối MySQL (pool)
│   ├── models/productModel.js # Các hàm CRUD truy vấn DB
│   ├── controllers/productController.js # Xử lý logic request/response
│   ├── routes/productRoutes.js # Định nghĩa route API
│   └── app.js                 # Khởi chạy server Express
├── package.json
├── .env.example
└── README.md
```

## Yêu cầu đã hoàn thành

| Yêu cầu | Trạng thái | Mô tả |
|---|---|---|
| Xây dựng cơ sở dữ liệu | ✅ | File `sql/init.sql` tạo database `ecommerce_db`, bảng `categories`, `products` và dữ liệu mẫu |
| Thực thi tệp SQL lên RDBMS | ✅ | Hỗ trợ chạy trên MySQL cục bộ hoặc cloud (cấu hình qua `.env`) |
| **Create** (1đ) | ✅ | `POST /api/products` - thêm sản phẩm mới |
| **Read** (1đ) | ✅ | `GET /api/products` (danh sách), `GET /api/products/:id` (chi tiết) |
| **Update** (1đ) | ✅ | `PUT /api/products/:id` - cập nhật sản phẩm |
| **Delete** (1đ) | ✅ | `DELETE /api/products/:id` - xóa sản phẩm |
| Lưu đồ thuật toán CRUD (2đ) | ✅ | Xem mục "Lưu đồ thuật toán" bên dưới |

## Hướng dẫn cài đặt và chạy

### 1. Tạo cơ sở dữ liệu
Chạy file SQL lên MySQL (cục bộ hoặc cloud):
```bash
mysql -u root -p < sql/init.sql
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình môi trường
Sao chép `.env.example` thành `.env` và điền thông tin kết nối MySQL:
```bash
cp .env.example .env
```

### 4. Chạy server
```bash
npm start
```
Server chạy tại `http://localhost:3000`

## API Endpoints (CRUD Sản phẩm)

| Method | Endpoint | Chức năng |
|---|---|---|
| POST | `/api/products` | Tạo mới sản phẩm |
| GET | `/api/products` | Lấy danh sách tất cả sản phẩm |
| GET | `/api/products/:id` | Lấy chi tiết 1 sản phẩm theo ID |
| PUT | `/api/products/:id` | Cập nhật thông tin sản phẩm |
| DELETE | `/api/products/:id` | Xóa sản phẩm |

### Ví dụ body request (Create/Update)
```json
{
  "product_name": "iPad Air",
  "description": "Máy tính bảng Apple iPad Air",
  "price": 16990000,
  "stock_quantity": 30,
  "category_id": 2,
  "image_url": "ipadair.jpg"
}
```

## Lưu đồ thuật toán (Sơ đồ hoạt động) CRUD

Quy trình xử lý chung cho cả 4 chức năng:

1. **Bắt đầu** → Client gửi request tới API `/api/products`
2. Kiểm tra **loại HTTP Method**:
   - `POST` → CREATE: nhận dữ liệu sản phẩm
   - `GET` → READ: lấy danh sách hoặc chi tiết
   - `PUT` → UPDATE: nhận id + dữ liệu mới
   - `DELETE` → DELETE: nhận id sản phẩm
3. **Kiểm tra dữ liệu/ID hợp lệ?**
   - Không hợp lệ → trả lỗi 400/404 cho client
   - Hợp lệ → thực thi câu lệnh SQL tương ứng (INSERT/SELECT/UPDATE/DELETE)
4. **Thực thi thành công?**
   - Không → trả lỗi 400/404
   - Có → trả về kết quả thành công cho client
5. **Kết thúc**

## Công nghệ sử dụng
- Node.js + Express
- MySQL (mysql2)
- dotenv

## Tác giả
Dự án - Bài tập lớn Đề tài: Xây dựng ứng dụng thương mại điện tử Đa mặt hàng
