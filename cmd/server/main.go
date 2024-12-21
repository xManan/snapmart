package main

import (
	_ "fmt"
	_ "net/http"

	_ "github.com/a-h/templ"
	"snapmart/web/components"
    "github.com/gin-gonic/gin"
    _ "github.com/mattn/go-sqlite3"
    "log"
    "database/sql"
    "context"
    "snapmart/db"
    _ "reflect"
    _ "embed"

)

func main() {
	ctx := context.Background()

	conn, err := sql.Open("sqlite3", "./snapmart.sqlite")
	if err != nil {
        log.Fatal(err)
	}

	queries := db.New(conn)
    router := gin.Default()
    router.Static("/static", "./web/static")
    router.GET("/", func(c *gin.Context) {
        c.Status(200)
        categories, err := queries.ListCategories(ctx)
        if err != nil {
            c.String(200, err.Error())
        }
        templComp := components.Index(categories)
        templComp.Render(c.Request.Context(), c.Writer)
    })

    router.Run(":3000")
}
