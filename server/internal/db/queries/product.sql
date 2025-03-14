-- name: GetProductsByCategory :many
SELECT 
    p.product_id,
    pu.product_unit_id,
    p.product_name,
    p.product_img_path,
    pu.quantity,
    pu.unit,
    pu.price
FROM
    products p
JOIN product_units pu ON p.product_id = pu.product_id
JOIN product_category pc ON p.product_id = pc.product_id
WHERE
    pc.category_id = $1
ORDER BY pu.product_unit_id ASC;
