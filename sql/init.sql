

CREATE DATABASE IF NOT EXISTS ecommerce_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ecommerce_db;

CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL DEFAULT 0,
    stock_quantity INT NOT NULL DEFAULT 0,
    category_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

INSERT INTO categories (category_name, description) VALUES
('Điện thoại', 'Các loại điện thoại di động'),
('Laptop', 'Máy tính xách tay'),
('Phụ kiện', 'Phụ kiện công nghệ');

INSERT INTO products (product_name, description, price, stock_quantity, category_id, image_url) VALUES
('iPhone 15', 'Điện thoại Apple iPhone 15 128GB', 22990000, 50, 1, 'iphone15.jpg'),
('Samsung Galaxy S24', 'Điện thoại Samsung Galaxy S24', 19990000, 40, 1, 'galaxys24.jpg'),
('MacBook Air M2', 'Laptop Apple MacBook Air chip M2', 27990000, 20, 2, 'macbookairm2.jpg'),
('Tai nghe AirPods Pro', 'Tai nghe không dây chống ồn', 5990000, 100, 3, 'airpodspro.jpg');
