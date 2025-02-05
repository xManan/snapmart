package main

import (
	"context"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	_ "github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/xManan/snapmart/server/internal/db/sqlc"
	"github.com/xManan/snapmart/server/internal/routes"
	"github.com/xManan/snapmart/server/internal/types"
)

func main() {
    ctx := context.Background()

    config := &types.Config {
        AppURL: "http://localhost:8080",
        PublicStoragePath: "/home/manan/personal/projects/snapmart/server/internal/storage/public",
        PGConnString: "postgres://postgres:asdf@localhost:5432/snapmart?sslmode=disable",
    }

	pool, err := pgxpool.New(ctx, config.PGConnString)
	if err != nil {
        log.Fatal(err)
	}
	defer pool.Close()

    queries := sqlc.New(pool)
    
	router := gin.Default()

    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"*"},
        AllowHeaders:     []string{"Origin"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge: 12 * time.Hour,
    }))

    app := &types.App {
        Config: config,
        DBQueries: queries,
        Router: router,
    }

    routes.Init(app)

	app.Router.Run() // listen and serve on 0.0.0.0:8080
}
