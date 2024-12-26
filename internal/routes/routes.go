package routes

import (
    "snapmart/types"
    "snapmart/internal/controllers"
)

func Init(app *types.App) {
    ic := controllers.IndexController{ App: app }

    app.Router.Static("/static", "./web/static")

    app.Router.GET("/", ic.Index)
}
