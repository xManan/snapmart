TRUNCATE product_units RESTART IDENTITY CASCADE;
TRUNCATE product_category RESTART IDENTITY CASCADE;
TRUNCATE products RESTART IDENTITY CASCADE;
TRUNCATE categories RESTART IDENTITY CASCADE;

INSERT INTO categories (category_name, category_img_path, category_parent_id, category_is_featured, category_featured_seq) VALUES
-- 1
('Fresh Vegetables', '/public/imgs/categories/fresh-vegetables', NULL, true, 5),
-- subcategories
-- 2
('Leafy Greens', '/public/imgs/categories/leafy-greens', 1, false, NULL), 
-- 3
('Root Vegetables', '/public/imgs/categories/root-vegetables', 1, false, NULL),
-- 4
('Cruciferous Vegetables', '/public/imgs/categories/cruciferous-vegetables', 1, false, NULL),
-- 5
('Squash', '/public/imgs/categories/squash', 1, false, NULL),
-- 6
('Tomatoes & Peppers', '/public/imgs/categories/tomatoes-peppers', 1, false, NULL),
-- 7
('Beans & Peas', '/public/imgs/categories/beans-peas', 1, false, NULL),
-- 8
('Corn', '/public/imgs/categories/corn', 1, false, NULL),
-- 9
('Onions & Garlic', '/public/imgs/categories/onions-garlic', 1, false, NULL),
-- 10
('Cucumbers & Zucchini', '/public/imgs/categories/cucumbers-zucchini', 1, false, NULL),
-- 11
('Broccoli & Cauliflower', '/public/imgs/categories/broccoli-cauliflower', 1, false, NULL),
-- 12
('Asparagus', '/public/imgs/categories/asparagus', 1, false, NULL),
-- 13
('Mushrooms', '/public/imgs/categories/mushrooms', 1, false, NULL),
-- 14
('Herbs', '/public/imgs/categories/herbs', 1, false, NULL);
INSERT INTO products (product_name) VALUES 
-- 1
('Potatoes'),
-- 2
('Beans'),
-- 3
('Peas'),
-- 4
('Raddish'),
-- 5
('Onions'),
-- 6
('Ladyfinger'),
-- 7
('Carrots'),
-- 8
('Cauliflower'),
-- 9
('Spinach'),
-- 10
('Fenugreek');
INSERT INTO product_category (category_id, product_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10),
(7, 1), (7, 2), (7, 3), (7, 4), (7, 5), (7, 6), (7, 7), (7, 8), (7, 9), (7, 10),
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 6), (8, 7), (8, 8), (8, 9), (8, 10),
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 6), (9, 7), (9, 8), (9, 9), (9, 10),
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6), (10, 7), (10, 8), (10, 9), (10, 10),
(11, 1), (11, 2), (11, 3), (11, 4), (11, 5), (11, 6), (11, 7), (11, 8), (11, 9), (11, 10),
(12, 1), (12, 2), (12, 3), (12, 4), (12, 5), (12, 6), (12, 7), (12, 8), (12, 9), (12, 10),
(13, 1), (13, 2), (13, 3), (13, 4), (13, 5), (13, 6), (13, 7), (13, 8), (13, 9), (13, 10),
(14, 1), (14, 2), (14, 3), (14, 4), (14, 5), (14, 6), (14, 7), (14, 8), (14, 9), (14, 10);
INSERT INTO product_units (product_id, quantity, unit, price) VALUES
(1, 1, 'kg', 2500), (1, 2, 'kg', 5000), (2, 1, 'kg', 10000), (3, 1, 'kg', 13200), (4, 1, 'kg', 5600), (5, 1, 'kg', 3400), (6, 1, 'kg', 4600), (7, 1, 'kg', 3900), (8, 1, 'kg', 2100), (9, 1, 'kg', 1500), (10, 1, 'kg', 7600);

INSERT INTO categories (category_name, category_img_path, category_parent_id, category_is_featured, category_featured_seq) VALUES
-- 15
('Fresh Fruits', '/public/imgs/categories/fresh-fruits', NULL, true, 6),
-- subcategories
-- 16
('Citrus Fruits', '/public/imgs/categories/citrus-fruits', 15, false, NULL),
-- 17
('Berries', '/public/imgs/categories/berries', 15, false, NULL),
-- 18
('Stone Fruits', '/public/imgs/categories/stone-fruits', 15, false, NULL),
-- 19
('Melons', '/public/imgs/categories/melons', 15, false, NULL),
-- 20
('Tropical Fruits', '/public/imgs/categories/tropical-fruits', 15, false, NULL);
INSERT INTO products (product_name) VALUES 
-- 11
('Apple'),
-- 12
('Grapes'),
-- 13
('Bananas'),
-- 14
('Oranges'),
-- 15
('Dragon Fruit'),
-- 16
('Lemons'),
-- 17
('Mango'),
-- 18
('Coconut'),
-- 19
('Avocado'),
-- 20
('Green Apple');
INSERT INTO product_category (category_id, product_id) VALUES
(15, 11), (15, 12), (15, 13), (15, 14), (15, 15), (15, 16), (15, 17), (15, 18), (15, 19), (15, 20),
(16, 11), (16, 12), (16, 13), (16, 14), (16, 15), (16, 16), (16, 17), (16, 18), (16, 19), (16, 20),
(17, 11), (17, 12), (17, 13), (17, 14), (17, 15), (17, 16), (17, 17), (17, 18), (17, 19), (17, 20),
(18, 11), (18, 12), (18, 13), (18, 14), (18, 15), (18, 16), (18, 17), (18, 18), (18, 19), (18, 20),
(19, 11), (19, 12), (19, 13), (19, 14), (19, 15), (19, 16), (19, 17), (19, 18), (19, 19), (19, 20),
(20, 11), (20, 12), (20, 13), (20, 14), (20, 15), (20, 16), (20, 17), (20, 18), (20, 19), (20, 20);
INSERT INTO product_units (product_id, quantity, unit, price) VALUES
(11, 1, 'kg', 2500), (11, 2, 'kg', 5000), (12, 1, 'kg', 10000), (13, 1, 'kg', 13200), (14, 1, 'kg', 5600), (15, 1, 'kg', 3400), (16, 1, 'kg', 4600), (17, 1, 'kg', 3900), (18, 1, 'kg', 2100), (19, 1, 'kg', 1500), (20, 1, 'kg', 7600);

INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Dairy, Breads and Eggs', '/public/imgs/categories/dairy-bread-eggs', true, 1);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Rice, Atta and Dals', '/public/imgs/categories/rice-atta-dals', true, 2);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Masala and Dry Fruits', '/public/imgs/categories/masala-dry-fruits', false, NULL);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Edible Oils and Ghee', '/public/imgs/categories/edible-oils-ghee', true, 3);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Munchies', '/public/imgs/categories/munchies', false, NULL),
('Sweet Tooth', '/public/imgs/categories/sweet-tooth', false, NULL),
('Cold Drinks and Juices', '/public/imgs/categories/cold-drinks-juices', false, NULL),
('Biscuits and Cakes', '/public/imgs/categories/biscuits-cakes', false, NULL),
('Instant and Frozen Food', '/public/imgs/categories/instant-frozen-food', false, NULL),
('Meat and Seafood', '/public/imgs/categories/meat-seafood', false, NULL);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Cereals and Breakfast', '/public/imgs/categories/cereals-breakfast', true, 4);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Sauces and Spreads', '/public/imgs/categories/sauces-spreads', false, NULL);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Tea, Coffee and More', '/public/imgs/categories/tea-coffee-more', true, 7);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Cleaning Essentials', '/public/imgs/categories/cleaning-essentials', false, NULL),
('Pharma and Hygiene', '/public/imgs/categories/pharma-hygiene', false, NULL),
('Bath, Body and Hair', '/public/imgs/categories/bath-body-hair', false, NULL),
('Paan Corner', '/public/imgs/categories/paan-corner', false, NULL);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Home and Kitchen', '/public/imgs/categories/home-kitchen', true, 8);
INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Office and Electricals', '/public/imgs/categories/office-electricals', false, NULL),
('Baby Care', '/public/imgs/categories/baby-care', false, NULL),
('Pet Supplies', '/public/imgs/categories/pet-supplies', false, NULL),
('Beauty and Grooming', '/public/imgs/categories/beauty-grooming', false, NULL);
