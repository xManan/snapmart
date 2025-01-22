CREATE TABLE categories (
    category_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    category_img_path TEXT NOT NULL,
    category_parent_id BIGINT REFERENCES categories(category_id),
    category_is_featured BOOLEAN NOT NULL,
    category_featured_seq INT
);
