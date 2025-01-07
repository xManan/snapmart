package controllers

import (
	"snapmart/types"
	"snapmart/web/components"
	"time"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
    App *types.App
}

func(controller *AuthController) Login(c *gin.Context) {
    ctx := c.Request.Context()
    time.Sleep(4 * time.Second)
    verifyOtp := components.OtpVerify()
    verifyOtp.Render(ctx, c.Writer)
}
