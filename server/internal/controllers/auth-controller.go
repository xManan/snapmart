package controllers

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/xManan/snapmart/server/internal/types"
)

type AuthController struct {
	App *types.App
}

func NewAuthController(app *types.App) *AuthController {
    return &AuthController{App: app}
}

func (ctrl *AuthController) Login(c *gin.Context) {
    // sleep for 2 seconds
    time.Sleep(2 * time.Second)
    c.JSON(200, gin.H{
        "message": "login successful",
    })
}

