package types

import (
	"github.com/gin-gonic/gin"
	"github.com/xManan/snapmart/server/internal/db/sqlc"
    "github.com/redis/go-redis/v9"
)

type App struct {
	Config    *Config
	Router    *gin.Engine
	DBQueries *sqlc.Queries
    RedisClient *redis.Client
}
