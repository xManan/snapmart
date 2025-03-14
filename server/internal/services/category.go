package services

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/xManan/snapmart/server/internal/db/sqlc"
	"github.com/xManan/snapmart/server/internal/types"
)

type CategoryService struct {
	App *types.App
}

func NewCategoryService(app *types.App) *CategoryService {
	return &CategoryService{App: app}
}

func (cs *CategoryService) GetFeaturedCategoriesWithProducts(ctx context.Context, maxProductCount int) ([]*types.CategoryWithProducts, error) {
	q := cs.App.DBQueries
	data, err := q.GetFeaturedCategoriesWithProducts(ctx)
	if err != nil {
		return []*types.CategoryWithProducts{}, err
	}
	productMap := make(map[int64]*types.Product)
	categoryMap := make(map[int64]*types.CategoryWithProducts)
    categories := []*types.CategoryWithProducts{}
	for _, row := range data {
		var productPtr *types.Product
		var productFound bool
		if productPtr, productFound = productMap[row.ProductID]; !productFound {
			productPtr = &types.Product{
				Product: sqlc.Product{
					ProductID:   row.ProductID,
					ProductName: row.ProductName,
				},
			}
            if row.ProductImgPath.Valid {
                productPtr.Product.ProductImgPath = pgtype.Text{ 
                    String: cs.App.Config.StaticURL + row.ProductImgPath.String,
                    Valid: true,
                }
            }
			productMap[row.ProductID] = productPtr
		}
		productPtr.ProductUnits = append(productPtr.ProductUnits, sqlc.ProductUnit{
			ProductUnitID: row.ProductUnitID,
			Quantity:      row.Quantity,
			Unit:          row.Unit,
			Price:         row.Price,
		})
		var categoryPtr *types.CategoryWithProducts
        var categoryFound bool
		if categoryPtr, categoryFound = categoryMap[row.CategoryID]; !categoryFound {
			categoryPtr = &types.CategoryWithProducts{
				Category: sqlc.Category{
					CategoryID:   row.CategoryID,
					CategoryName: row.CategoryName,
				},
			}
            categoryMap[row.CategoryID] = categoryPtr
            categories = append(categories, categoryPtr)
		}
        if !productFound {
            categoryPtr.Products = append(categoryPtr.Products, productPtr)
        }
	}
	return categories, nil
}
