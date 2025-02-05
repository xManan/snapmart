package controllers

import (
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/xManan/snapmart/server/internal/types"
	"github.com/xManan/snapmart/server/pkg/utils"
)

type ProductController struct {
	App *types.App
}

func NewProductController(app *types.App) *ProductController {
	return &ProductController{App: app}
}

func (ctrl *ProductController) GetProductsByCategory(c *gin.Context) {
	q := ctrl.App.DBQueries
    ctx := context.Background()

    categoryIdStr := c.Param("categoryId")
    categoryPgInt8, err := utils.StringToPgV5Int8(categoryIdStr)
    if err != nil {
        utils.ErrorResponse(c, utils.NewError(100, err.Error()), "")
        return
    }
	subcategories, err := q.GetSubcategories(ctx, categoryPgInt8)
	if err != nil {
		utils.ErrorResponse(c, utils.NewError(100, err.Error()), nil)
		return
	}
    subcategoryIdStr := c.Param("subcategoryId")
    var subcategoryId int64
    if subcategoryIdStr == "" {
        if len(subcategories) == 0 {
            subcategoryId = categoryPgInt8.Int64
        } else {
            subcategoryId = subcategories[0].CategoryID
        }
    } else {
        intId, err := strconv.Atoi(subcategoryIdStr)
        if err != nil {
            utils.ErrorResponse(c, utils.NewError(100, err.Error()), nil)
            return
        }
        found := false
        for _, sub := range subcategories {
            if sub.CategoryID == int64(intId) {
                found = true
                break
            }
        }
        if found {
            subcategoryId = int64(intId)
        } else {
            utils.ErrorResponse(c, utils.NewError(100, "subcategory not found"), nil)
            return
        }
    }
    products, err := q.GetProductsByCategory(ctx, subcategoryId);
	if err != nil {
		utils.ErrorResponse(c, utils.NewError(100, err.Error()), nil)
		return
	}
	utils.SuccessResponse(c, "", gin.H{
        "subcategories": subcategories,
        "products": products,
    })
}
