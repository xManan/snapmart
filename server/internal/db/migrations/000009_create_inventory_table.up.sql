CREATE TABLE inventory (
    inventory_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    location_id BIGINT REFERENCES locations(location_id) NOT NULL,
    product_unit_id BIGINT REFERENCES product_units(product_unit_id) NOT NULL,
    stock INT NOT NULL
); 
