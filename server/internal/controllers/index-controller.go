package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/xManan/snapmart/server/internal/services"
	"github.com/xManan/snapmart/server/internal/types"
	"github.com/xManan/snapmart/server/pkg/utils"
)

type IndexController struct {
	App *types.App
}

func NewIndexController(app *types.App) *IndexController {
	return &IndexController{App: app}
}

func (ctrl *IndexController) TestApi(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func (ctrl *IndexController) Index(c *gin.Context) {
	q := ctrl.App.DBQueries

	categories, err := q.GetCategories(c.Request.Context())
	if err != nil {
		utils.ErrorResponse(c, utils.NewError(100, err.Error()), nil)
		return
	}

	cs := services.NewCategoryService(ctrl.App)
	categoriesWithProducts, err := cs.GetFeaturedCategoriesWithProducts(c.Request.Context(), 10)
	if err != nil {
		utils.ErrorResponse(c, utils.NewError(100, err.Error()), nil)
		return
	}
    token, _ := c.Cookie("jwt")
    _, err = utils.GetMobileFromToken(token, ctrl.App.Config.JWTSecret)

	res := gin.H{
		"categories":                        categories,
		"featured":                          []any{},
		"featured_categories_with_products": categoriesWithProducts,
	}

	utils.SuccessResponse(c, "", res)
}
