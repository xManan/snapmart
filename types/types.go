package types

import (
	"snapmart/db"

	"github.com/gin-gonic/gin"
)

type App struct {
    Router *gin.Engine
    Queries *db.Queries
}

type CategoryWithProducts struct {
    db.Category
    Products []Product
}

type Product struct{
    db.Product
    ProductAttributesJson map[string]interface{}
}

