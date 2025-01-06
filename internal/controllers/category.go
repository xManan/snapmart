package controllers

import (
	"database/sql"
	"encoding/json"
	"snapmart/db"
	"snapmart/types"
	"snapmart/web/components"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CategoryController struct {
	App *types.App
}

func (controller *CategoryController) CategoryPage(c *gin.Context) {
	ctx := c.Request.Context()
	idStr, err := strconv.Atoi(c.Param("categoryId"))
	if err != nil {
		c.String(500, err.Error())
		return
	}

	id := int64(idStr)
	category, err := controller.App.Queries.GetCategory(ctx, id)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	var subCategories []db.Category
	subCategories, err = controller.App.Queries.ListSubcategories(ctx, sql.NullInt64{Int64: id, Valid: true})
	if err != nil {
		c.String(500, err.Error())
		return
	}
	if len(subCategories) > 0 {
		category = subCategories[0]
		subIdStr := c.Param("subcategoryId")
		if subIdStr == "" {
			id = category.CategoryID
		} else {
			subId, err := strconv.Atoi(subIdStr)
			if err != nil {
				c.String(500, err.Error())
				return
			}
			for _, subCategory := range subCategories {
				if subCategory.CategoryID == int64(subId) {
					category = subCategory
					id = category.CategoryID
					break
				}
			}
		}
	}
	products, err := controller.App.Queries.ListProductsByCategoryId(ctx, id)
	if err != nil {
		c.String(500, err.Error())
		return
	}
	var productsWithJsonAttr []types.Product
	for _, product := range products {
		parsedJson := make(map[string]interface{})
		err = json.Unmarshal([]byte(product.ProductAttributes.String), &parsedJson)
		if err != nil {
			c.String(500, err.Error())
			return
		}
		productsWithJsonAttr = append(productsWithJsonAttr, types.Product{product, parsedJson})
	}
	templComp := components.CategoryPage(category, subCategories, productsWithJsonAttr)
	templComp.Render(ctx, c.Writer)
}
