package controllers

import (
	"context"

	"github.com/gin-gonic/gin"
	"github.com/xManan/snapmart/server/internal/types"
	"github.com/xManan/snapmart/server/pkg/utils"
)

type CategoryController struct {
	App *types.App
}

func NewCategoryController(app *types.App) *CategoryController {
	return &CategoryController{App: app}
}

func (ctrl *CategoryController) GetCategoryById(c *gin.Context) {
	q := ctrl.App.DBQueries

	categories, err := q.GetCategories(context.Background())
	if err != nil {
		utils.ErrorResponse(c, utils.NewError(100, err.Error()), nil)
		return
	}
	utils.SuccessResponse(c, "", categories)
}
