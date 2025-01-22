package types

import "github.com/xManan/snapmart/server/internal/db/sqlc"

type CategoryWithProducts struct {
    sqlc.Category
    Products []*Product `json:"products"`
}
