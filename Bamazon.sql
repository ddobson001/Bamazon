
DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)

Values ('Nintendo Entertainment System', 'electronics' , 100, 50),
('Super Mario Bros. 3', 'electronics', 49.99, 150),
('Pizza', 'food', 9.99, 2000),
('Futon', 'home & garden',349.99, 300),
('Shampoo', 'beauty',6.99, 320),
('Mugs', 'home & garden' ,3.49, 100),
('Shirt', 'clothing' ,19.99, 300),
('Jeans', 'clothing' ,39.50, 50),
('Harry Potter', 'books' ,15.99, 99),
('Instant Noodles', 'food' ,.89, 3000);