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
    "encoding/json"
    "snapmart/db"
    "snapmart/types"
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
        products, err := queries.ListCategoriesWithProducts(ctx)
        if err != nil {
            c.String(200, err.Error())
            return
        }
        categoryProductMap := make(map[int64]*types.CategoryWithProducts)
        for _, product := range products {
            category, ok := categoryProductMap[product.CategoryID]
            if !ok {
                category = &types.CategoryWithProducts{
                    Category: db.Category {
                        CategoryID: product.CategoryID,
                        CategoryName: product.CategoryName,
                        CategoryImgPath: product.CategoryImgPath,
                    },
                }
                categoryProductMap[product.CategoryID] = category
            }
            if product.ProductID.Valid {
                attrJson := make(map[string]interface{})
                err := json.Unmarshal([]byte(product.ProductAttributes.String), &attrJson)
                prd := types.Product {
                    Product: db.Product {
                        ProductID: product.ProductID.Int64,
                        ProductName: product.ProductName.String,
                        ProductImgPath: product.ProductImgPath.String,
                        ProductPrice: product.ProductPrice.Int64,
                        ProductCategoryID: product.ProductCategoryID.Int64,
                        ProductAttributes: product.ProductAttributes,
                    },
                    ProductAttributesJson: nil,
                }
                if err != nil {
                    c.String(200, err.Error())
                    return
                }
                prd.ProductAttributesJson = attrJson
                category.Products = append(category.Products, prd)
            }
        }
        // jsonStr, _ := json.Marshal(categoryProductMap[2].Products[0])
        // c.String(200, string(jsonStr))
        // return
        templComp := components.Index(categoryProductMap)
        templComp.Render(c.Request.Context(), c.Writer)
    })

    router.Run(":3000")
}
