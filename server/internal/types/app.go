package types

import (
	"github.com/gin-gonic/gin"
	"github.com/xManan/snapmart/server/internal/db/sqlc"
)

type App struct {
	Config    *Config
	Router    *gin.Engine
	DBQueries *sqlc.Queries
}
