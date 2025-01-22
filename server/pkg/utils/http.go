package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewError(code int, message string) Error {
    return Error { Code: code, Message: message }
}

func SuccessResponse(c *gin.Context, message string, data any) {
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": message,
		"data":    data,
	})
}

func ErrorResponse(c *gin.Context, error Error, data any) {
	c.JSON(http.StatusOK, gin.H{
		"success": false,
		"error":   error,
		"data":    data,
	})
}
