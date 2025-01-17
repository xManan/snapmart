package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/xManan/snapmart/server/internal/types"
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
