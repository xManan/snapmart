CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL,
    category_img_path TEXT NOT NULL,
    category_parent_id INTEGER,
    FOREIGN KEY (category_parent_id) REFERENCES categories(category_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
