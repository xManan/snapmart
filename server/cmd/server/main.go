package main

import (
    "github.com/gin-gonic/gin"
    _ "github.com/mattn/go-sqlite3"
    "log"
    "database/sql"
    "snapmart/db"
    "snapmart/internal/routes"
    "snapmart/types"

)

func main() {
	conn, err := sql.Open("sqlite3", "./snapmart.sqlite")
	if err != nil {
        log.Fatal(err)
	}

    app := types.App {
	    Queries: db.New(conn),
        Router: gin.Default(),
    }

    routes.Init(&app)

    app.Router.Run(":3000")
}
