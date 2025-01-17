package routes

import (
	"github.com/xManan/snapmart/server/internal/controllers"
	"github.com/xManan/snapmart/server/internal/types"
)

func Init(app *types.App) {
    r := app.Router

    indexController := controllers.NewIndexController(app)
    
    api := r.Group("/api")
    {
        v1 := api.Group("/v1")
        {
            v1.GET("/test", indexController.TestApi)
        }
    }
}
