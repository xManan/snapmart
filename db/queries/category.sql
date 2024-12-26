-- name: GetCategory :one
SELECT * FROM categories
WHERE category_id = ? LIMIT 1;

-- name: ListCategories :many
SELECT * FROM categories
ORDER BY category_name;

-- name: ListCategoriesWithProducts :many
SELECT * FROM categories
LEFT JOIN products p1 on p1.product_category_id = category_id
LEFT JOIN products p2 on p2.product_category_id = category_parent_id
ORDER BY category_id, p1.product_id, p2.product_id;
