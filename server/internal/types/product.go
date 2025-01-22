package types

import "github.com/xManan/snapmart/server/internal/db/sqlc"

type Product struct {
    sqlc.Product
    ProductUnits []sqlc.ProductUnit `json:"product_units"`
}
