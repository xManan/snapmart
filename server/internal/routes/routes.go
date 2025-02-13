package routes

import (
	"github.com/xManan/snapmart/server/internal/controllers"
	"github.com/xManan/snapmart/server/internal/types"
)

func Init(app *types.App) {
    r := app.Router
    r.Static("/public", app.Config.PublicStoragePath)

    indexController := controllers.NewIndexController(app)
    productController := controllers.NewProductController(app)
    authController := controllers.NewAuthController(app)
    
    api := r.Group("/api")
    {
        v1 := api.Group("/v1")
        {
            v1.GET("/test", indexController.TestApi)
            v1.GET("/index", indexController.Index)
            v1.GET("/login", authController.Login)

            v1.GET("/category/:categoryId/products", productController.GetProductsByCategory)
            v1.GET("/category/:categoryId/:subcategoryId/products", productController.GetProductsByCategory)
        }
    }
}
