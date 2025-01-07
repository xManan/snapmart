// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db

import (
	"database/sql"
)

type Category struct {
	CategoryID       int64
	CategoryName     string
	CategoryImgPath  string
	CategoryParentID sql.NullInt64
}

type Product struct {
	ProductID         int64
	ProductName       string
	ProductImgPath    string
	ProductPrice      int64
	ProductCategoryID int64
	ProductAttributes sql.NullString
}
