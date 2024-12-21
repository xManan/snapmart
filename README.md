migrate create -ext sql -dir db/migrations -seq migration_name
migrate -database sqlite3://./snapmart.sqlite -path db/migrations up
migrate -database sqlite3://./snapmart.sqlite -path db/migrations down

sqlc generate
