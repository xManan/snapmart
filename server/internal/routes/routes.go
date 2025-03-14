package routes

import (
	"github.com/xManan/snapmart/server/internal/controllers"
	"github.com/xManan/snapmart/server/internal/types"
)

func Init(app *types.App) {
	indexController := controllers.NewIndexController(app)
	productController := controllers.NewProductController(app)
	authController := controllers.NewAuthController(app)

	r := app.Router
	base := r.Group(app.Config.BaseURL)
	{
        base.Static("/public", app.Config.PublicStoragePath)
		api := base.Group("/api")
		{
			v1 := api.Group("/v1")
			{
				v1.GET("/test", indexController.TestApi)
				v1.GET("/index", indexController.Index)
				v1.POST("/login", authController.Login)
				v1.POST("/verify-otp", authController.VerifyOtp)
				v1.POST("/signup", authController.Signup)
				v1.POST("/verify-token", authController.VerifyToken)
				v1.POST("/logout", authController.Logout)

				v1.GET("/category/:categoryId/products", productController.GetProductsByCategory)
				v1.GET("/category/:categoryId/:subcategoryId/products", productController.GetProductsByCategory)
			}
		}
	}
}
