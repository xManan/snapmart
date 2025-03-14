package controllers

import (
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/xManan/snapmart/server/internal/db/sqlc"
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
    data, err := q.GetProductsByCategory(ctx, subcategoryId);
	productMap := make(map[int64]*types.Product)
    products := []*types.Product{}
	for _, row := range data {
		var productPtr *types.Product
		var productFound bool
		if productPtr, productFound = productMap[row.ProductID]; !productFound {
			productPtr = &types.Product{
				Product: sqlc.Product{
					ProductID:   row.ProductID,
					ProductName: row.ProductName,
				},
			}
            if row.ProductImgPath.Valid {
                productPtr.Product.ProductImgPath = pgtype.Text{ 
                    String: ctrl.App.Config.StaticURL + row.ProductImgPath.String,
                    Valid: true,
                }
            }
			productMap[row.ProductID] = productPtr
		}
		productPtr.ProductUnits = append(productPtr.ProductUnits, sqlc.ProductUnit{
			ProductUnitID: row.ProductUnitID,
			Quantity:      row.Quantity,
			Unit:          row.Unit,
			Price:         row.Price,
		})
        if !productFound {
            products = append(products, productPtr)
        }
    }
	if err != nil {
		utils.ErrorResponse(c, utils.NewError(100, err.Error()), nil)
		return
	}
	utils.SuccessResponse(c, "", gin.H{
        "subcategories": subcategories,
        "products": products,
    })
}
