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

    "github.com/redis/go-redis/v9"
)

func main() {
    ctx := context.Background()

    config := &types.Config {
        AppURL: "http://localhost:8080",
        PublicStoragePath: "/home/manan/personal/projects/snapmart/server/internal/storage/public",
        PGConnString: "postgres://postgres:asdf@localhost:5432/snapmart?sslmode=disable",
        RedisConnString: "redis://localhost:6379/0?protocol=3",
        JWTSecret: "secret",
    }

	pool, err := pgxpool.New(ctx, config.PGConnString)
	if err != nil {
        log.Fatal(err)
	}
	defer pool.Close()

    err = pool.Ping(context.Background())
    if err != nil {
        log.Fatalf("unable to ping database: %v\n", err)
    }

    queries := sqlc.New(pool)

    opts, err := redis.ParseURL(config.RedisConnString)
    if err != nil {
        panic(err)
    }
    redisClient := redis.NewClient(opts) 
    _, err = redisClient.Ping(ctx).Result()
    if err != nil {
        log.Fatalf("unable to ping redis: %v\n", err)
    }

	router := gin.Default()

    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"},
        AllowMethods:     []string{"GET,HEAD,OPTIONS,POST,PUT"},
        AllowHeaders:     []string{"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge: 12 * time.Hour,
    }))

    app := &types.App {
        Config: config,
        DBQueries: queries,
        Router: router,
        RedisClient: redisClient,
    }

    routes.Init(app)

	app.Router.Run() // listen and serve on 0.0.0.0:8080
}
