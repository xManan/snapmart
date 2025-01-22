CREATE TABLE order_product (
    order_id BIGINT NOT NULL,
    product_unit_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_unit_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_unit_id) REFERENCES product_units(product_unit_id)
); 
