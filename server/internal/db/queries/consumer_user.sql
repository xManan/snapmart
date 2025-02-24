-- name: GetConsumerUserByMobile :one
SELECT 
    consumer_user_id, 
    first_name,
    last_name,
    mobile
FROM
    consumer_users
WHERE
    mobile = $1;

-- name: CreateConsumerUser :one
INSERT INTO consumer_users (
    first_name,
    last_name,
    mobile
) VALUES (
    $1, $2, $3
) RETURNING 
    consumer_user_id;
