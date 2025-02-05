import { Product } from '@/types/product'
export interface Category {
    category_id: number
    category_parent_id: number
    category_name: string
    category_img_path: string
}

export interface CategoryWithProducts {
	category_id: number
	category_name: string
    products: Product[]
}

