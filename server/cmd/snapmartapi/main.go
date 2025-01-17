package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"

	"github.com/jackc/pgx/v5"

	"github.com/xManan/snapmart/server/internal/db/sqlc"
	"github.com/xManan/snapmart/server/internal/routes"
	"github.com/xManan/snapmart/server/internal/types"
)

func main() {
    ctx := context.Background()

	conn, err := pgx.Connect(ctx, "postgres://manan:asdf@localhost:5432/testdb?sslmode=disable")
	if err != nil {
        log.Fatal(err)
	}
	defer conn.Close(ctx)

    queries := sqlc.New(conn)
    
	router := gin.Default()

    app := &types.App {
        DBQueries: queries,
        Router: router,
    }

    routes.Init(app)

	app.Router.Run() // listen and serve on 0.0.0.0:8080
}
