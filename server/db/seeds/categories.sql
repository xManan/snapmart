INSERT INTO categories (category_id, category_name, category_img_path, category_parent_id) VALUES 
(1, 'Vegetables & Fruits',          '/imgs/categories/fruits-and-vegetables.jpg',       NULL),
(2, 'Dairy, Bread & Eggs',          '/imgs/categories/dairy-Bread-and-eggs.jpg',        NULL),
(3, 'Atta, Rice & Dal',             '/imgs/categories/atta-rice-and-dal.webp',          NULL),
(4, 'Tea, Coffee & Health Drink',   '/imgs/categories/tea-coffee-and-health-drink.jpg', NULL),
(5, 'Breakfast & Instant Food',     '/imgs/categories/breakfast-and-instant-food.jpg',  NULL),
(6, 'Bakery & Biscuits',            '/imgs/categories/bakery-and-biscuits.webp',        NULL),
(7, 'Pharma & Wellness',            '/imgs/categories/pharma-and-wellness.jpg',         NULL),
(8, 'Cleaning Essentials',          '/imgs/categories/cleaning-essentials.webp',        NULL);

INSERT INTO categories (category_id, category_name, category_img_path, category_parent_id) VALUES 
(9,     'Milk',             '/imgs/categories/dairy-Bread-and-eggs.jpg', 2),
(10,    'Bread & Pav',      '/imgs/categories/dairy-Bread-and-eggs.jpg', 2),
(11,    'Eggs',             '/imgs/categories/dairy-Bread-and-eggs.jpg', 2),
(12,    'Cereals',          '/imgs/categories/dairy-Bread-and-eggs.jpg', 2),
(13,    'Paneer & Tofu',    '/imgs/categories/dairy-Bread-and-eggs.jpg', 2),
(14,    'Curd & Yogurt',    '/imgs/categories/dairy-Bread-and-eggs.jpg', 2),
(15,    'Butters & More',   '/imgs/categories/dairy-Bread-and-eggs.jpg', 2),
(16,    'Cheese',           '/imgs/categories/dairy-Bread-and-eggs.jpg', 2);
