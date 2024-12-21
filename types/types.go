package types

import (
    "snapmart/db"
)

type CategoryWithProducts struct {
    db.Category
    Products []Product
}

type Product struct{
    db.Product
    ProductAttributesJson map[string]interface{}
}

