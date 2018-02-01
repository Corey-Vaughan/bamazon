CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    primary key (item_id)
)

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Red Wine', 'Alcohol', 10.99, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Doritos', 'Food', 5.99, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Ground Beef', 'Food', 8.99, 60);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('White Wine', 'Alcohol', 10.99, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Toilet Paper', 'Home Goods', 12.99, 90);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Paper Towels', 'Home Goods', 10.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Cheese', 'Food', 5.99, 80);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Clorox', 'Cleaning Supplies', 15.99, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Tide Pods', 'Laundry', 20.99, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Swifer Padss', 'Cleaning Suppliesl', 25.99, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('Captain Morgan', 'Alcohol', 12.99, 30);