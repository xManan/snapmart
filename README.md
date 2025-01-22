server:
export POSTGRES_URL='postgres://manan:asdf@localhost:5432/snapmart?sslmode=disable'

migrate create -ext sql -dir ./internal/db/migrations -seq create_table
migrate -database $POSTGRES_URL -path ./internal/db/migrations up
migrate -database $POSTGRES_URL -path ./internal/db/migrations down

docker exec -i postgres-container psql -U manan -d snapmart < ./internal/db/seeders/*sql

sqlc generate

air

client:
cp .env.example
npm i
npm run dev
