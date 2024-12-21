CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    product_price INTEGER NOT NULL,
    product_category_id INTEGER NOT NULL,
    product_attributes TEXT,
    FOREIGN KEY (product_category_id) REFERENCES categories(category_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
