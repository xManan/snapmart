CREATE TABLE consumer_user_addresses (
    consumer_user_addresses BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    consumer_user_id BIGINT REFERENCES consumer_users(consumer_user_id),
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    landmark TEXT,
    address_type TEXT NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL
);
