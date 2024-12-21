-- name: ListProductsByCategory :many
SELECT * FROM products
WHERE product_category_id = ?;
