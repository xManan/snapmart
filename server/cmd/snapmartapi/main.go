package main

import (
	"context"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	_ "github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/xManan/snapmart/server/internal/db/sqlc"
	"github.com/xManan/snapmart/server/internal/routes"
	"github.com/xManan/snapmart/server/internal/types"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

func main() {
    ctx := context.Background()

    err := godotenv.Load(".env")
    if err != nil { 
        log.Fatalf("unable to load .env: %v\n", err)
    }

    port := os.Getenv("SNAPMART_API_PORT")
    portInt, err := strconv.Atoi(port)
    if err != nil {
        log.Fatalf("unable to parse port: %v\n", err)
    }
    config := &types.Config {
        AppURL: os.Getenv("SNAPMART_API_APP_URL"),
        ClientURL: os.Getenv("SNAPMART_API_CLIENT_URL"),
        PublicStoragePath: os.Getenv("SNAPMART_API_PUBLIC_STORAGE_PATH"),
        PGConnString: os.Getenv("SNAPMART_API_PG_CONN_STRING"),
        RedisConnString: os.Getenv("SNAPMART_API_REDIS_CONN_STRING"),
        JWTSecret: os.Getenv("SNAPMART_API_JWT_SECRET"),
        Host: os.Getenv("SNAPMART_API_HOST"),
        Port: portInt,
        BaseURL: os.Getenv("SNAPMART_API_BASE_URL"),
        StaticURL: os.Getenv("SNAPMART_API_STATIC_URL"),
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
        AllowOrigins:     []string{config.ClientURL},
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

    app.Router.Run(config.Host + ":" + strconv.Itoa(config.Port))
}
