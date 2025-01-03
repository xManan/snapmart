package controllers

import (
	"snapmart/types"
	"snapmart/web/components"
	"github.com/gin-gonic/gin"
)

type AuthController struct {
    App *types.App
}

func(controller *AuthController) LoginPage(c *gin.Context) {
    ctx := c.Request.Context()
    loginPage := components.Login()
    loginPage.Render(ctx, c.Writer)
}
