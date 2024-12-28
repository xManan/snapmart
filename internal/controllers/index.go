package controllers

import (
	"encoding/json"
	"snapmart/db"
	"snapmart/types"
	"snapmart/web/components"

	"github.com/gin-gonic/gin"
)

type IndexController struct {
    App *types.App
}

func(controller *IndexController) Index(c *gin.Context) {
    c.Status(200)
    products, err := controller.App.Queries.ListProductsWithCategory(c.Request.Context())
    if err != nil {
        c.String(200, err.Error())
        return
    }
    var categoryIds []int64
    categoryProductMap := make(map[int64]*types.CategoryWithProducts)
    for _, product := range products {
        var categoryId int64
        if product.CategoryParentID.Valid {
            categoryId = product.CategoryParentID.Int64
        } else {
            categoryId = product.CategoryID
        }

        category, ok := categoryProductMap[categoryId]
        if !ok {
            category = &types.CategoryWithProducts{
                Category: db.Category {
                    CategoryID: categoryId,
                },
            }
            if product.CategoryParentID.Valid {
                category.CategoryName = product.CategoryParentName.String
                category.CategoryImgPath = product.CategoryParentImgPath.String
            } else {
                category.CategoryName = product.CategoryName
                category.CategoryImgPath = product.CategoryImgPath
            }
            categoryProductMap[categoryId] = category
            categoryIds = append(categoryIds, category.CategoryID)
        }

        attrJson := make(map[string]interface{})
        err := json.Unmarshal([]byte(product.ProductAttributes.String), &attrJson)
        prd := types.Product {
            Product: db.Product {
                ProductID: product.ProductID,
                ProductName: product.ProductName,
                ProductImgPath: product.ProductImgPath,
                ProductPrice: product.ProductPrice,
                ProductCategoryID: product.ProductCategoryID,
                ProductAttributes: product.ProductAttributes,
            },
            ProductAttributesJson: nil,
        }
        if err != nil {
            c.String(200, err.Error())
            return
        }
        prd.ProductAttributesJson = attrJson
        category.Products = append(category.Products, prd)
    }
    templComp := components.Index(categoryProductMap, categoryIds)
    templComp.Render(c.Request.Context(), c.Writer)
}
