package main

import (
	"fmt"
	"net/http"

	"github.com/a-h/templ"
	"snapmart/web/components"

)
func main() {
	fs := http.FileServer(http.Dir("./web/static"))

	http.Handle("/static/", http.StripPrefix("/static/", fs))

	component := components.Index()
	
	http.Handle("/", templ.Handler(component))

	fmt.Println("Listening on :3000")
	http.ListenAndServe(":3000", nil)
}
