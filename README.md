server:
docker run --name postgres-container -e POSTGRES_PASSWORD=asdf -p 5432:5432 -d postgres
export POSTGRES_URL='postgres://manan:asdf@localhost:5432/snapmart?sslmode=disable'

docker run --name redis-container -p 6379:6379 -d redis

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
