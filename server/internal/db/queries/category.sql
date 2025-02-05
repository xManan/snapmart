-- name: GetCategories :many
SELECT 
    category_id, category_name, category_img_path
FROM 
    categories 
WHERE 
    category_parent_id IS NULL;

-- name: GetFeaturedCategoriesWithProducts :many
SELECT 
    c.category_id, 
    category_name, 
    p.product_id, 
    product_name,
    product_unit_id, 
    quantity, 
    unit, 
    price 
FROM 
    categories c
JOIN product_category pc ON c.category_id = pc.category_id
JOIN products p ON pc.product_id = p.product_id
JOIN product_units pu ON p.product_id = pu.product_id
WHERE 
    category_is_featured
ORDER BY category_featured_seq ASC, product_unit_id ASC;

-- name: GetSubcategories :many
SELECT 
    category_id, category_parent_id, category_name, category_img_path
FROM 
    categories 
WHERE 
    category_parent_id = $1;
