-- name: GetCategory :one
SELECT * FROM categories
WHERE category_id = ? AND category_parent_id IS NULL LIMIT 1;

-- name: ListCategories :many
SELECT * FROM categories
ORDER BY category_name;

-- name: ListSubcategories :many
SELECT * FROM 
categories WHERE category_parent_id = ?;

-- name: GetCategoryName :one
SELECT category_name FROM categories
WHERE category_id = ? LIMIT 1;
