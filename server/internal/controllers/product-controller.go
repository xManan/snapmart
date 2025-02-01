package controllers

import (
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
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

    categoryIdStr := c.Param("categoryId")
    categoryPgInt8, err := utils.StringToPgV5Int8(categoryIdStr)
    if err != nil {
        utils.ErrorResponse(c, utils.NewError(100, err.Error()), "")
        return
    }
	subcategories, err := q.GetSubcategories(context.Background(), categoryPgInt8)
	if err != nil {
		utils.ErrorResponse(c, utils.NewError(100, err.Error()), nil)
		return
	}
    subcategoryIdStr := c.Param("categoryId")
    var subcategoryPgInt8 pgtype.Int8 
    if len(subcategoryIdStr) == 0 {
        subcategoryPgInt8 = pgtype.Int8 { Int64: subcategories[0].CategoryID, Valid: true }
    } else {
        subcategoryPgInt8 = pgtype.Int8 { Int64: 1, Valid: true }
    }
	utils.SuccessResponse(c, "", gin.H{
        "subcategories": subcategories,
    })
}
