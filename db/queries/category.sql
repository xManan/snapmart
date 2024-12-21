-- name: GetCategory :one
SELECT * FROM categories
WHERE category_id = ? LIMIT 1;

-- name: ListCategories :many
SELECT * FROM categories
ORDER BY category_name;

-- name: ListCategoriesWithProducts :many
SELECT * FROM categories
LEFT JOIN products on product_category_id = category_id
ORDER BY category_id, product_id;
