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
		"featured":                          []string{
            ctrl.App.Config.StaticURL + "/public/imgs/featured/1a6296e4-4e39-4279-9e13-12c6dc93a52b.webp",
            ctrl.App.Config.StaticURL + "/public/imgs/featured/da51a2a4-4efd-4924-b86e-4215e0d3a741.webp",
            ctrl.App.Config.StaticURL + "/public/imgs/featured/fe3f1771-1ff0-4b48-aed5-0c9babfaf162.webp",
            ctrl.App.Config.StaticURL + "/public/imgs/featured/3bc5e59d-470a-4ade-a88f-8fd00d6615dc.webp",
            ctrl.App.Config.StaticURL + "/public/imgs/featured/ec96dba9-cca1-4861-8f10-e7d6e6e19435.webp",
        },
		"featured_categories_with_products": categoriesWithProducts,
	}

	utils.SuccessResponse(c, "", res)
}
