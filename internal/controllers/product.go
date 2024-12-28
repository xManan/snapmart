package controllers

import (
	_ "database/sql"
	"encoding/json"
	_ "snapmart/db"
	"snapmart/types"
	"snapmart/web/components"
    "strconv"

	"github.com/gin-gonic/gin"
)

type ProductController struct {
    App *types.App
}


func(controller *ProductController) ProductContainer(c *gin.Context) {
    ctx := c.Request.Context()
    categoryIdStr := c.Param("categoryId")
    categoryId, err := strconv.Atoi(categoryIdStr)
    if err != nil {
        c.String(200, err.Error())
        return
    }
    categoryName, err := controller.App.Queries.GetCategoryName(ctx, int64(categoryId))
    if err != nil {
        c.String(200, err.Error())
        return
    }
    products, err := controller.App.Queries.ListProductsByCategoryId(ctx, int64(categoryId))
    if err != nil {
        c.String(200, err.Error())
        return
    }
    // TODO: use JSON_EXTRACT
    var prds []types.Product
    for _, product := range products {
        attrJson := make(map[string]interface{})
        err := json.Unmarshal([]byte(product.ProductAttributes.String), &attrJson)
        if err != nil {
            c.String(200, err.Error())
            return
        }
        prds = append(prds, types.Product{product, attrJson})
    }
    templComp := components.ProductContainer(categoryName, prds)
    templComp.Render(ctx, c.Writer)
}
