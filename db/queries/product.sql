-- name: ListProductsWithCategory :many
SELECT 
    products.*, 
    c1.category_id, 
    c1.category_name, 
    c1.category_img_path, 
    c2.category_id AS category_parent_id,
    c2.category_name AS category_parent_name,
    c2.category_img_path AS category_parent_img_path 
FROM products
JOIN categories c1 ON products.product_category_id = c1.category_id
LEFT JOIN categories c2 ON c1.category_parent_id = c2.category_id
ORDER BY CASE
    WHEN c1.category_parent_id IS NULL THEN c1.category_id
    ELSE c1.category_parent_id
END;

-- name: ListProductsByCategoryId :many
SELECT * FROM products 
WHERE product_category_id = ?;
