TRUNCATE product_units RESTART IDENTITY CASCADE;
TRUNCATE product_category RESTART IDENTITY CASCADE;
TRUNCATE products RESTART IDENTITY CASCADE;
TRUNCATE categories RESTART IDENTITY CASCADE;

INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Fresh Vegetables', '/public/imgs/categories/fresh-vegetables', true, 5);
INSERT INTO products (product_name) VALUES 
('Potatoes'),
('Beans'),
('Peas'),
('Raddish'),
('Onions'),
('Ladyfinger'),
('Carrots'),
('Cauliflower'),
('Spinach'),
('Fenugreek');
INSERT INTO product_category (category_id, product_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10);
INSERT INTO product_units (product_id, quantity, unit, price) VALUES
(1, 1, 'kg', 2500),
(1, 2, 'kg', 5000),
(2, 1, 'kg', 10000),
(3, 1, 'kg', 13200),
(4, 1, 'kg', 5600),
(5, 1, 'kg', 3400),
(6, 1, 'kg', 4600),
(7, 1, 'kg', 3900),
(8, 1, 'kg', 2100),
(9, 1, 'kg', 1500),
(10, 1, 'kg', 7600);

INSERT INTO categories (category_name, category_img_path, category_is_featured, category_featured_seq) VALUES
('Fresh Fruits', '/public/imgs/categories/fresh-fruits', true, 6);
INSERT INTO products (product_name) VALUES 
('Apple'),
('Grapes'),
('Bananas'),
('Oranges'),
('Dragon Fruit'),
('Lemons'),
('Mango'),
('Coconut'),
('Avocado'),
('Green Apple');
INSERT INTO product_category (category_id, product_id) VALUES
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 17),
(2, 18),
(2, 19),
(2, 20);
INSERT INTO product_units (product_id, quantity, unit, price) VALUES
(11, 1, 'kg', 2500),
(11, 2, 'kg', 5000),
(12, 1, 'kg', 10000),
(13, 1, 'kg', 13200),
(14, 1, 'kg', 5600),
(15, 1, 'kg', 3400),
(16, 1, 'kg', 4600),
(17, 1, 'kg', 3900),
(18, 1, 'kg', 2100),
(19, 1, 'kg', 1500),
(20, 1, 'kg', 7600);

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
