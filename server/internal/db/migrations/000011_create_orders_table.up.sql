CREATE TABLE orders (
    order_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    consumer_user_id BIGINT REFERENCES consumer_users(consumer_user_id) NOT NULL,
    total_products INT NOT NULL,
    total_amount BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    is_paid BOOLEAN NOT NULL,
    delivery_agent_id BIGINT REFERENCES delivery_agents(delivery_agent_id) NOT NULL,
    payment_mode VARCHAR(100) NOT NULL,
    payment_details JSONB
); 
