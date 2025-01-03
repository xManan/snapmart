package routes

import (
    "snapmart/types"
    "snapmart/internal/controllers"
)

func Init(app *types.App) {
    indexController := controllers.IndexController{ App: app }
    categoryController := controllers.CategoryController{ App: app }
    productController := controllers.ProductController{ App: app }
    authController := controllers.AuthController{ App: app }

    app.Router.Static("/static", "./web/static")

    app.Router.GET("/", indexController.Index)
    app.Router.GET("/login", authController.LoginPage)
    app.Router.GET("/category/:categoryId", categoryController.CategoryPage)
    app.Router.GET("/category/:categoryId/:subcategoryId", categoryController.CategoryPage)
    app.Router.GET("/category/:categoryId/products", productController.ProductContainer)

    app.Router.GET("/product/:productId", productController.ProductPage)
}
